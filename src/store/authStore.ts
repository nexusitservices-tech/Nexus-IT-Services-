import { create } from 'zustand';
import { User } from '@/types';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },
  initialize: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            set({ user: userDoc.data() as User, loading: false, initialized: true });
          } else {
            // Handle case where auth exists but no user record (maybe sign out?)
            set({ user: null, loading: false, initialized: true });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ user: null, loading: false, initialized: true });
        }
      } else {
        set({ user: null, loading: false, initialized: true });
      }
    });
  }
}));
