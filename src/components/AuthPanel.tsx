import { auth, db } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

export default function AuthPanel() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { closeModal } = useModal();

  const handle = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
      closeModal();
    } catch (e: any) {
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl bg-[#141414] border border-gray-700/60 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-center p-2">
          <img src="/logo.png" width={160} alt="logo" />
        </div>

        <button
          disabled={busy}
          onClick={() =>
            handle(() => signInWithPopup(auth, new GoogleAuthProvider()))
          }
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0f1014] border border-gray-700/60 text-white py-2.5 hover:bg-black/80 transition
            focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] uppercase tracking-wider text-gray-400">
            or
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-3">
          {mode === "signup" && (
            <input
              className="rounded-lg bg-[#0f1014] border border-gray-700/60 text-white placeholder-gray-400 px-3 py-2.5
                focus:outline-none focus:border-green-400 transition"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="display-name"
            />
          )}

          <input
            className="rounded-lg bg-[#0f1014] border border-gray-700/60 text-white placeholder-gray-400 px-3 py-2.5
              focus:outline-none focus:border-green-400 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <input
            className="rounded-lg bg-[#0f1014] border border-gray-700/60 text-white placeholder-gray-400 px-3 py-2.5
              focus:outline-none focus:border-green-400 transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {mode === "login" ? (
            <button
              disabled={busy}
              onClick={() =>
                handle(() => signInWithEmailAndPassword(auth, email, password))
              }
              className="rounded-lg py-2.5 font-medium
                bg-green-600
                shadow-[0_0_0_0_rgba(16,185,129,0.0)]
                active:scale-[0.99]
                disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {busy ? "Signing in..." : "Sign in"}
            </button>
          ) : (
            <button
              disabled={busy}
              onClick={() =>
                handle(async () => {
                  const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                  );

                  await updateProfile(user, { displayName: name });
                  await user.reload();

                  await setDoc(
                    doc(db, "users", user.uid),
                    {
                      uid: user.uid,
                      email: user.email,
                      displayName: name,
                      createdAt: serverTimestamp(),
                    },
                    { merge: true }
                  );
                })
              }
              className="rounded-lg py-2.5 font-medium
                bg-green-600
                shadow-[0_0_0_0_rgba(16,185,129,0.0)]
                active:scale-[0.99]
                disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {busy ? "Creating account..." : "Sign up"}
            </button>
          )}
        </div>

        <div className="text-center text-gray-400">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-green-400 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-green-400 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
