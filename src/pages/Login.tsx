import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (!userDoc.exists()) {
        // Register flow for new Google users
        await setDoc(doc(db, 'users', uid), {
          id: uid,
          email: result.user.email,
          displayName: result.user.displayName || 'Google User',
          role: 'ADMIN', // Defaulting to ADMIN for demo
          organizationId: 'demo-org',
          createdAt: new Date().toISOString()
        });
        
        // Auto-seed demo data for new Google admin
        await seedDemoData(uid, result.user.email || '', result.user.displayName || 'Google User');
      }

      const updatedUserDoc = await getDoc(doc(db, 'users', uid));
      const userData = updatedUserDoc.data();
      if (userData?.role === 'CLIENT_USER' || userData?.role === 'CLIENT_ADMIN') {
        navigate('/portal');
      } else {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        
        // Seed the demo data (org, projects, opportunities)
        await seedDemoData(uid, email, name);
        
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
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password sign-in is not enabled in your Firebase console. Please use Google Sign-in below or enable Email/Password in the Firebase Authentication settings.');
      } else {
        setError(err.message || 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const seedDemoData = async (uid: string, userEmail: string, userName: string = 'Admin User') => {
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
      email: userEmail,
      displayName: userName || 'Admin User',
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
        if (e.code === 'auth/operation-not-allowed') {
          throw new Error('Email/Password sign-in is disabled. Please use "Sign in with Google" instead.');
        }
        userCred = await createUserWithEmailAndPassword(auth, 'admin@nexus.test', 'password123');
      }

      const uid = userCred.user.uid;
      await seedDemoData(uid, 'admin@nexus.test');
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
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img 
              src="/logo.gif" 
              alt="Nexus IT Services" 
              className="h-16 object-contain rounded" 
            />
          </Link>
          <h2 className="text-center text-3xl font-extrabold text-slate-900">
            {isRegister ? 'Create an account' : 'Sign in to Nexus IT Services'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {isRegister ? 'Start your 14-day free trial' : 'Access the Nexus IT Services Dashboard'}
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with email</span>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-100">
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
               <p className="max-w-xs text-xs text-slate-400">If Email/Password authentication is not enabled, use the <b>Google Sign-in</b> button above to auto-provision an admin account and seed the dashboard data.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

