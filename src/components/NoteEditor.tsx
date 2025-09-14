import { useState } from "react";
import { db } from "../lib/firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import type { AlgorithmMeta } from "../data/algorithms";
import { useModal } from "../context/ModalContext";

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
    <div className="rounded-xl bg-black/60 border-2 border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-center gap-2 text-white">
          <h2 className="text-lg sm:text-2xl font-medium">Save Notes</h2>
        </div>

        <textarea
          rows={8}
          className="w-full rounded-lg border bg-[#111]/80 border-gray-700/60
            text-zinc-100 p-4 resize-none text-sm sm:text-base
            shadow-inner mt-2
            focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/60
            transition"
          placeholder="Write your notes here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {error && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          disabled={saving || !content.trim()}
          onClick={handleSave}
          className="w-full py-2.5 rounded-md font-medium
                     bg-green-600 text-white
                     hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]
                     active:scale-[0.98]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition"
        >
          {saving ? "Saving..." : "Save Note"}
        </button>
      </div>
    </div>
  );
}
