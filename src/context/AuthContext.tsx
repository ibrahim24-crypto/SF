
'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInAnonymously as firebaseSignInAnonymously } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  uid: string;
  email: string | null;
  username: string | null;
  photoURL?: string | null;
  highScore?: number;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, username: string) => Promise<void>;
  logInWithEmail: (email: string, password: string) => Promise<void>;
  signInAnonymously: (pseudo: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateUserHighScore: (score: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDocSnap.data() } as UserProfile);
        } else {
          // This case might be hit if an anonymous user was created but their doc wasn't set yet,
          // or for a new Google/Email user if doc creation failed before.
          // For anonymous users, their profile is explicitly created in signInAnonymously.
          // For new Google/Email users, profile creation is handled in their respective sign-in functions.
          if (!firebaseUser.isAnonymous) {
            const newUserProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              photoURL: firebaseUser.photoURL,
              highScore: 0,
              isAnonymous: false,
            };
            await setDoc(userDocRef, { ...newUserProfile, createdAt: serverTimestamp() });
            setUser(newUserProfile);
          } else {
             // If an anonymous user lands here and has no doc, it's an edge case.
             // For now, we assume signInAnonymously handles doc creation.
             // If needed, we could create a default anonymous profile here too.
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          const newUserProfile: UserProfile = {
            uid: result.user.uid,
            email: result.user.email,
            username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
            photoURL: result.user.photoURL,
            highScore: 0,
            isAnonymous: false,
          };
          await setDoc(userDocRef, { ...newUserProfile, createdAt: serverTimestamp() });
          setUser(newUserProfile);
        } else {
           setUser({ uid: result.user.uid, ...userDocSnap.data() } as UserProfile);
        }
      }
      toast({ title: "Signed in with Google successfully!" });
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      if (error.code === 'auth/user-cancelled' || error.code === 'auth/popup-closed-by-user') {
        toast({ title: "Google Sign-In Cancelled", description: "The sign-in process was not completed.", variant: "default" });
      } else {
        toast({ title: "Google Sign-In Failed", description: error.message, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      // Check if username already exists
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({ title: "Sign-Up Failed", description: "Username already taken. Please choose another.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      
      const newUserProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        username: username,
        photoURL: userCredential.user.photoURL, 
        highScore: 0,
        isAnonymous: false,
      };
      await setDoc(doc(db, "users", userCredential.user.uid), { ...newUserProfile, createdAt: serverTimestamp() });
      setUser(newUserProfile);
      toast({ title: "Signed up successfully!" });
    } catch (error: any) {
      console.error("Email Sign-Up Error:", error);
      toast({ title: "Sign-Up Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const logInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Logged in successfully!" });
    } catch (error: any)      {
      console.error("Email Login Error:", error);
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const signInAnonymously = async (pseudo: string) => {
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', pseudo));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({ title: "Login Failed", description: "This pseudo is already taken. Please choose another.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const userCredential = await firebaseSignInAnonymously(auth);
      const firebaseUser = userCredential.user;

      const newUserProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: null, // Anonymous users don't have email by default
        username: pseudo,
        photoURL: null, // Anonymous users don't have photoURL by default
        highScore: 0,
        isAnonymous: true,
      };
      await setDoc(doc(db, "users", firebaseUser.uid), { ...newUserProfile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      setUser(newUserProfile);
      toast({ title: "Logged in as guest successfully!" });
    } catch (error: any) {
      console.error("Anonymous Sign-In Error:", error);
      toast({ title: "Anonymous Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };


  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast({ title: "Logged out successfully." });
    } catch (error: any) {
      console.error("Logout Error:", error);
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateUserHighScore = async (score: number) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        if (score > (user.highScore || 0)) {
          await updateDoc(userDocRef, { highScore: score, updatedAt: serverTimestamp() });
          setUser(prevUser => prevUser ? { ...prevUser, highScore: score } : null);
        }
      } catch (error) {
        console.error("Error updating high score in Firebase:", error);
        toast({ title: "Error Syncing Score", description: "Could not update high score in Firebase.", variant: "destructive" });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signUpWithEmail, logInWithEmail, signInAnonymously, logOut, updateUserHighScore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
