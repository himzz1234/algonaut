import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Progress = {
  visualizationCompleted?: boolean;
  quizCompleted?: boolean;
  quizScore?: number;
  quizTotal?: number;
  updatedAt?: any;
  completedAt?: any;
};

type ProgressMap = Record<string, Progress>;

type ProgressContextType = {
  progressMap: ProgressMap;
  loading: boolean;
  refresh: () => Promise<void>;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    if (!user) {
      setProgressMap({});
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const progressRef = collection(db, "users", user.uid, "progress");
      const snap = await getDocs(progressRef);

      const map: ProgressMap = {};
      snap.forEach((doc) => {
        map[doc.id] = doc.data() as Progress;
      });

      setProgressMap(map);
    } catch (err) {
      console.error("Failed to fetch progress:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return (
    <ProgressContext.Provider
      value={{
        progressMap,
        loading,
        refresh: fetchProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return ctx;
}
