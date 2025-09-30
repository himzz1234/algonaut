import { useState } from "react";
import { db } from "../lib/firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import type { AlgorithmMeta } from "../data/algorithms";
import { useModal } from "../context/ModalContext";
import { FiX } from "react-icons/fi";

type NoteEditorProps = {
  algorithm: AlgorithmMeta;
  initialContent?: string;
  onSave: (note: string) => void;
};

export default function NoteEditor({
  algorithm,
  initialContent = "",
  onSave,
}: NoteEditorProps) {
  const { closeModal } = useModal();
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) {
      setError("You must be signed in to save notes.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const noteRef = doc(db, "users", user.uid, "notes", algorithm.id);

      const newNote = {
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(noteRef, newNote, { merge: true });

      onSave(newNote.content);
      setContent("");
      closeModal();
    } catch (e: any) {
      setError(e?.message ?? "Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="relative bg-gradient-to-b from-[#111214] to-[#0f1014] 
                    border border-green-600/40 rounded-2xl
                    px-5 py-6 sm:px-7 sm:py-8
                    w-full
                    text-white shadow-2xl"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-green-500 rounded-b-full" />

      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition"
        aria-label="Close note editor"
      >
        <FiX size={18} className="sm:w-5 sm:h-5" />
      </button>

      <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-4 text-center">
        Save Notes
      </h2>

      <textarea
        rows={6}
        className="w-full rounded-lg border border-gray-700/60
                   bg-[#111]/80 text-zinc-100 p-3 sm:p-4
                   text-sm sm:text-base resize-none shadow-inner
                   focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/60
                   transition"
        placeholder="Write your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && (
        <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        disabled={saving || !content.trim()}
        onClick={handleSave}
        className="mt-5 w-full py-2.5 rounded-md font-medium text-sm sm:text-base
                   bg-gradient-to-r from-green-500 to-emerald-600
                   hover:from-green-400 hover:to-emerald-500
                   text-white shadow-lg
                   disabled:opacity-60 disabled:cursor-not-allowed
                   transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {saving ? "Saving..." : "Save Note"}
      </button>

      {/* Bottom glow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-40 h-10 sm:h-12 bg-green-500/20 blur-2xl rounded-full" />
    </div>
  );
}
