import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0120926980",
  appId: "1:59497187354:web:27659ebb55bd9eea9a29a3",
  apiKey: "AIzaSyDyPfPK3ob-CXc8IuSAJfqsEia0BVWDPeY",
  authDomain: "gen-lang-client-0120926980.firebaseapp.com",
  storageBucket: "gen-lang-client-0120926980.firebasestorage.app",
  messagingSenderId: "59497187354"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-cb679304-2fad-4dde-bd67-88ca38d752dc");
