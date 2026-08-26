import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, writeBatch, collection } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

export default function Login({ isRegister = false }: { isRegister?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [isRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        
        await setDoc(doc(db, 'users', uid), {
          id: uid,
          email,
          displayName: name,
          role: 'ADMIN', // Defaulting to ADMIN for simplicity in this demo, real world would be different or require approval
          organizationId: 'demo-org',
          createdAt: new Date().toISOString()
        });

        navigate('/app/dashboard');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'CLIENT_USER' || userData.role === 'CLIENT_ADMIN') {
            navigate('/portal');
          } else {
            navigate('/app/dashboard');
          }
        } else {
          setError('User record not found. Please contact an administrator.');
          await auth.signOut();
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Create or sign in admin user
      let userCred;
      try {
        userCred = await signInWithEmailAndPassword(auth, 'admin@nexus.test', 'password123');
      } catch (e: any) {
        userCred = await createUserWithEmailAndPassword(auth, 'admin@nexus.test', 'password123');
      }

      const uid = userCred.user.uid;
      
      // 2. Create the org
      await setDoc(doc(db, 'organizations', 'demo-org'), {
        name: 'Nexus IT Services Demo',
        createdAt: new Date().toISOString()
      });

      // 3. Make them a member
      await setDoc(doc(db, 'organizations', 'demo-org', 'members', uid), {
        role: 'ADMIN',
        joinedAt: new Date().toISOString()
      });

      // 4. Create user doc
      await setDoc(doc(db, 'users', uid), {
        id: uid,
        email: 'admin@nexus.test',
        displayName: 'Admin User',
        role: 'ADMIN',
        organizationId: 'demo-org',
        createdAt: new Date().toISOString()
      });

      // 5. Create clients and opps
      const batch = writeBatch(db);
      
      const clients = ['Retail & Co', 'Tech Logistics', 'Gulf Healthcare', 'Oasis Estates', 'Alpha Startups'];
      const clientIds: string[] = [];

      clients.forEach((clientName, index) => {
        const ref = doc(db, 'organizations', 'demo-org', 'clients', `client-${index}`);
        clientIds.push(ref.id);
        batch.set(ref, {
          name: clientName,
          industry: 'Technology',
          website: `www.${clientName.replace(/\s+/g, '').toLowerCase()}.com`,
          healthScore: 85 + index,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });

      const opps = [
        { name: 'Cloud Migration', stage: 'Proposal Sent', val: 25000 },
        { name: 'Managed IT Support', stage: 'Negotiation', val: 12000 },
        { name: 'Security Audit', stage: 'Discovery', val: 8000 },
        { name: 'Network Upgrade', stage: 'Qualification', val: 15000 },
        { name: 'AI Automation Pilot', stage: 'Solution Design', val: 30000 },
      ];

      opps.forEach((opp, i) => {
        const ref = doc(db, 'organizations', 'demo-org', 'opportunities', `opp-${i}`);
        batch.set(ref, {
          name: opp.name,
          stage: opp.stage,
          estimatedValue: opp.val,
          clientId: clientIds[i % clientIds.length],
          probability: 50 + (i * 5),
          servicePillar: 'IT Services',
          ownerId: uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });

      const projectRef1 = doc(db, 'organizations', 'demo-org', 'projects', 'proj-1');
      batch.set(projectRef1, {
        name: 'Oasis Estates ERP Rollout',
        status: 'Active',
        clientId: clientIds[3],
        pmId: uid,
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });

      await batch.commit();

      navigate('/app/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Failed to seed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div>
          <div className="mx-auto w-12 h-12 rounded-lg bg-[#0066CC] flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            {isRegister ? 'Create an account' : 'Sign in to Nexus'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {isRegister ? 'Start your 14-day free trial' : 'Demo Mode Enabled. Use the seeded credentials.'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            {isRegister && (
              <div>
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-[#0066CC] focus:border-[#0066CC] focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-[#0066CC] focus:border-[#0066CC] focus:z-10 sm:text-sm",
                  !isRegister ? "rounded-t-md" : ""
                )}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-[#0066CC] focus:border-[#0066CC] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (isRegister ? 'Creating...' : 'Signing in...') : (isRegister ? 'Create Account' : 'Sign in')}
            </button>
          </div>
          
          <div className="mt-4 flex justify-between text-sm">
             <Link to={isRegister ? "/login" : "/register"} className="font-medium text-[#0066CC] hover:text-blue-500 mx-auto">
               {isRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
             </Link>
          </div>

          {!isRegister && (
            <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-center text-slate-500 flex flex-col gap-2 items-center">
              <p>Demo credentials (Admin):</p>
              <p className="font-mono text-xs bg-slate-100 p-2 rounded">admin@nexus.test / password123</p>
              <button 
                type="button" 
                onClick={handleSeed}
                className="mt-2 text-[#0066CC] hover:text-blue-800 font-medium"
              >
                First time? Seed Demo Data & Sign In
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
