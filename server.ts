import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let firebaseConfig: any = null;

// Initialize Firebase Admin
try {
  if (!getApps().length) {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      initializeApp({
        projectId: firebaseConfig.projectId
      });
      console.log('Firebase Admin initialized with project ID:', firebaseConfig.projectId);
    }
  }
} catch (e) {
  console.log('Firebase Admin initialization error:', e);
}

const getDb = () => {
  return getFirestore(undefined, firebaseConfig?.firestoreDatabaseId);
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // AI Copilot Endpoint
  app.post('/api/ai', async (req, res) => {
    try {
      // Very basic token verification (in a real app you'd verify the Firebase ID token)
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { prompt, context } = req.body;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `Context: ${JSON.stringify(context)}\n\nUser request: ${prompt}`,
      });

      res.json({ result: response.text });
    } catch (error) {
      console.error('AI Error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  // Seed Endpoint for Demo Data
  app.post('/api/seed', async (req, res) => {
    try {
      if (!getApps().length) {
        return res.status(500).json({ error: 'Firebase Admin not initialized' });
      }
      
      const db = getDb();
      
      // We will seed: 1 Organization, 1 User (admin), 5 Clients, 10 Opportunities
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
      
      // Make them member of the org
      await db.collection('organizations').doc('demo-org').collection('members').doc(uid).set({
        role: 'ADMIN',
        joinedAt: new Date().toISOString()
      }, { merge: true });

      // Assuming the user logging in triggers this, we'll assign them to the demo org.
      // But for a true seed, we can just create the records.
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

      // Projects
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

      res.json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
      console.error('Seeding error:', error);
      res.status(500).json({ error: 'Failed to seed database' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
