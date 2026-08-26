import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';
dotenv.config();

initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID
});

const db = getFirestore();

async function seed() {
  try {
    const orgRef = db.collection('organizations').doc('demo-org');
    await orgRef.set({ name: 'Nexus IT Services Demo', createdAt: new Date().toISOString() });

    let adminUserRecord;
    try {
      adminUserRecord = await getAuth().getUserByEmail('admin@nexus.test');
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        adminUserRecord = await getAuth().createUser({
          email: 'admin@nexus.test',
          password: 'password123',
          displayName: 'Admin User',
        });
      } else {
        throw e;
      }
    }

    const uid = adminUserRecord.uid;
    await db.collection('users').doc(uid).set({
      id: uid,
      email: 'admin@nexus.test',
      displayName: 'Admin User',
      role: 'ADMIN',
      organizationId: 'demo-org',
      createdAt: new Date().toISOString()
    }, { merge: true });
    
    await db.collection('organizations').doc('demo-org').collection('members').doc(uid).set({
      role: 'ADMIN',
      joinedAt: new Date().toISOString()
    }, { merge: true });

    const batch = db.batch();
    
    const clients = ['Retail & Co', 'Tech Logistics', 'Gulf Healthcare', 'Oasis Estates', 'Alpha Startups'];
    const clientRefs: any[] = [];

    clients.forEach((clientName, index) => {
      const ref = db.collection('organizations').doc('demo-org').collection('clients').doc(`client-${index}`);
      clientRefs.push(ref);
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
      const ref = db.collection('organizations').doc('demo-org').collection('opportunities').doc(`opp-${i}`);
      batch.set(ref, {
        name: opp.name,
        stage: opp.stage,
        estimatedValue: opp.val,
        clientId: clientRefs[i % clientRefs.length].id,
        probability: 50 + (i * 5),
        servicePillar: 'IT Services',
        ownerId: 'demo-user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });

    const projectRef1 = db.collection('organizations').doc('demo-org').collection('projects').doc('proj-1');
    batch.set(projectRef1, {
      name: 'Oasis Estates ERP Rollout',
      status: 'Active',
      clientId: clientRefs[3].id,
      pmId: 'demo-user',
      startDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    const projectRef2 = db.collection('organizations').doc('demo-org').collection('projects').doc('proj-2');
    batch.set(projectRef2, {
      name: 'Tech Logistics Cloud Setup',
      status: 'At Risk',
      clientId: clientRefs[1].id,
      pmId: 'demo-user',
      startDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    await batch.commit();
    console.log('Seed success');
  } catch (error) {
    console.error('Seed error:', error);
  }
}

seed();
