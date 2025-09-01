import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useModal } from "../context/ModalContext";

export default function AuthPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { closeModal } = useModal();

  const handle = async (fn: () => Promise<unknown>) => {
    setErr(null);
    setBusy(true);
    try {
      await fn();
      closeModal();
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="rounded-2xl bg-black/70 border-2 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-center p-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              AlgoVisua<span className="text-green-400">li</span>zer
            </h1>{" "}
          </div>

          <button
            disabled={busy}
            onClick={() =>
              handle(() => signInWithPopup(auth, new GoogleAuthProvider()))
            }
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900/80 border border-zinc-700/60 text-zinc-100 py-2.5 hover:bg-zinc-800 transition
                       focus:outline-none focus:ring-2 focus:ring-emerald-400/60 mt-2.5"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-[11px] uppercase tracking-wider text-zinc-500">
              or
            </span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="grid gap-3">
            <input
              className="rounded-lg bg-zinc-900/80 border border-zinc-700/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5
                         focus:outline-none focus:border-green-400
                         hover:border-zinc-500/70 transition"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              className="rounded-lg bg-zinc-900/80 border border-zinc-700/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5
                         focus:outline-none focus:border-green-400
                         hover:border-zinc-500/70 transition"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              disabled={busy}
              onClick={() =>
                handle(() => signInWithEmailAndPassword(auth, email, password))
              }
              className="rounded-lg py-2.5 font-medium
                         bg-gradient-to-r text-white bg-green-600
                         shadow-[0_0_0_0_rgba(16,185,129,0.0)]
                         hover:shadow-[0_0_24px_4px_rgba(16,185,129,0.35)]
                         active:scale-[0.99]
                         disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {busy ? "Signing in..." : "Sign in"}
            </button>

            <button
              disabled={busy}
              onClick={() =>
                handle(() =>
                  createUserWithEmailAndPassword(auth, email, password)
                )
              }
              className="rounded-lg py-2.5 text-zinc-200 bg-zinc-900/80 border border-zinc-700/60
                         hover:border-emerald-400/40 hover:bg-zinc-900/90
                         focus:outline-none focus:ring-2 focus:ring-emerald-400/60
                         disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              Create account
            </button>
          </div>

          {err && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {err}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
