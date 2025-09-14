import { Link } from "react-router-dom";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { BsStar, BsStarFill } from "react-icons/bs";
import type { ReactNode } from "react";
import { useModal } from "../context/ModalContext";
import NoteEditor from "./NoteEditor";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import type { AlgorithmMeta } from "../data/algorithms";
import { useProgress } from "../context/ProgressContext";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import AuthPanel from "./AuthPanel";

export type Algo = {
  id: string;
  label: string;
  href?: string;
  difficulty: string;
  effort: string;
};

type AlgoRowProps = {
  algo: AlgorithmMeta;
  note?: string;
  onToggleStar: (algoId: string) => void;
  starred: boolean;
  onEditNote: (algoId: string, label: string) => void;
};

const AlgoRowWrapper = ({
  children,
  algo,
}: {
  children: ReactNode;
  algo: AlgorithmMeta;
}) => {
  const baseCls = `
    relative flex items-center justify-between
    rounded-lg border border-gray-700/50
    px-4 py-3 transition-all duration-300
    hover:scale-[1.01] hover:border-green-400/50 
    hover:shadow-md
    overflow-hidden
  `;

  const Wrapper = algo.href ? Link : "li";

  return (
    <Wrapper
      to={algo.href || ""}
      className={`${baseCls} group`}
      target={algo.href ? "_blank" : undefined}
    >
      <div className="relative z-10 w-full flex items-center justify-between">
        {children}
      </div>
    </Wrapper>
  );
};

export default function AlgoRow({ algo }: AlgoRowProps) {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [note, setNote] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [progress, setProgress] = useState<"none" | "partial" | "complete">(
    "none"
  );

  const { progressMap } = useProgress();

  useEffect(() => {
    if (!progressMap) return;

    const data = progressMap[algo.id];
    if (!data) return setProgress("none");

    if (data.visualizationCompleted && data.quizCompleted) {
      setProgress("complete");
    } else if (data.visualizationCompleted || data.quizCompleted) {
      setProgress("partial");
    } else {
      setProgress("none");
    }
  }, [progressMap, algo.id]);

  useEffect(() => {
    if (!user) {
      setNote(null);
      return;
    }

    const fetchNote = async () => {
      const noteRef = doc(db, "users", user.uid, "notes", algo.id);
      const snap = await getDoc(noteRef);
      setNote(snap.exists() ? snap.data().content || null : null);
    };

    fetchNote();
  }, [user, algo.id]);

  useEffect(() => {
    if (!user) return;

    const checkBookmarks = async () => {
      const userRef = doc(db, "users", user.uid);
      await getDocs(collection(db, "users", user.uid, "notes"));
      const userDoc = await (
        await import("firebase/firestore")
      ).getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setBookmarked((data.bookmarks || []).includes(algo.name));
      }
    };

    checkBookmarks();
  }, [user?.uid, algo.id]);

  const toggleBookmark = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    try {
      if (bookmarked) {
        await updateDoc(userRef, {
          bookmarks: arrayRemove(algo.name),
        });
        setBookmarked(false);
      } else {
        await updateDoc(userRef, {
          bookmarks: arrayUnion(algo.name),
        });
        setBookmarked(true);
      }
    } catch (err) {
      console.error("Failed to update bookmarks:", err);
    }
  };

  const hasNote = !!note;

  return (
    <AlgoRowWrapper algo={algo}>
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-gray-200 text-sm sm:text-base whitespace-nowrap max-w-40 sm:max-w-full truncate font-medium">
          {algo.name}
        </span>

        {algo.difficulty && (
          <span className="text-xs px-2 py-0.5 rounded-sm bg-blue-500/15 text-blue-300 border border-blue-500/20">
            {algo.difficulty}
          </span>
        )}

        {algo.effort && (
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-sm bg-purple-500/15 text-purple-300 border border-purple-500/20">
            {algo.effort}
          </span>
        )}

        {!algo.href && (
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-sm bg-yellow-600/15 text-yellow-300 border border-yellow-600/20">
            Coming Soon
          </span>
        )}

        {hasNote && (
          <span className="text-xs md:text-sm text-gray-400 truncate max-w-24 italic">
            — {note}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {progress === "complete" && (
          <FiCheckCircle
            className="text-green-400 w-4 h-4 mr-2"
            title="Completed"
          />
        )}
        {progress === "partial" && (
          <FiClock
            className="text-yellow-400 w-4 h-4 mr-2"
            title="In Progress"
          />
        )}
        <button
          type="button"
          onClick={toggleBookmark}
          aria-label={bookmarked ? "Unstar algorithm" : "Star algorithm"}
          className="p-2 rounded-full hover:bg-gray-700/40 transition-colors"
        >
          {bookmarked ? (
            <BsStarFill className="h-4 w-4 text-yellow-400" />
          ) : (
            <BsStar className="h-4 w-4 text-gray-400" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!user) return openModal(<AuthPanel />);
            openModal(
              <NoteEditor
                algorithm={algo}
                initialContent={note ?? ""}
                onSave={(newNote) => setNote(newNote)}
              />
            );
          }}
          title={hasNote ? "Edit note" : "Add note"}
          aria-label={hasNote ? "Edit note" : "Add note"}
          className="p-2 rounded-full hover:bg-gray-700/40 transition-colors"
        >
          {hasNote ? (
            <FiEdit2 className="h-4 w-4 text-emerald-300" />
          ) : (
            <FiPlus className="h-5 w-5 text-emerald-300" />
          )}
        </button>
      </div>
    </AlgoRowWrapper>
  );
}
