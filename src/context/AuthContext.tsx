import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type AuthUser = User & {
  college?: string;
  location?: string;
  github?: string;
  linkedin?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            photoURL: currentUser.photoURL || "",
            provider: currentUser.providerId,
            createdAt: serverTimestamp(),
            lastActive: serverTimestamp(),
          });

          setUser({
            ...currentUser,
          });
        } else {
          const data = docSnap.data();

          setUser({
            ...currentUser,
            college: data.college || "",
            location: data.location || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
          });

          await setDoc(
            userRef,
            {
              displayName: currentUser.displayName || "",
              lastActive: serverTimestamp(),
            },
            { merge: true }
          );
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
