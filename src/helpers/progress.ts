import { db } from "../lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

type Progress = {
  visualizationCompleted?: boolean;
  quizCompleted?: boolean;
  lastQuizScore?: number;
  quizTotal?: number;
};

export async function saveProgress(
  uid: string,
  algorithmKey: string,
  progress: Progress
) {
  const ref = doc(db, "users", uid, "progress", algorithmKey);

  await setDoc(
    ref,
    {
      ...progress,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getProgress(uid: string, algorithmKey: string) {
  const ref = doc(db, "users", uid, "progress", algorithmKey);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
