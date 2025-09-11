import { useEffect, useRef, useState } from "react";
import { auth } from "../lib/firebase";
import type { User } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export function AvatarMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-sm hover:brightness-110 transition"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 shrink-0 text-lg font-semibold text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center">
            {user?.displayName?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            role="menu"
            className="absolute right-0 mt-2 w-80 rounded-lg overflow-hidden
              bg-[#0b0b0b]/95 backdrop-blur-xl border-2 border-white/10
              shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="p-3">
              <div className="flex gap-3">
                <Link to={`/user/${user.email?.split("@")[0]}`}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 shrink-0 text-lg font-semibold text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center">
                      {user?.displayName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                </Link>

                <Link to={`/user/${user.email?.split("@")[0]}`}>
                  <div className="text-lg font-medium text-white truncate">
                    {user.displayName || user.email || "Signed in"}
                  </div>
                  {user.email && (
                    <div className="text-sm text-zinc-400 truncate">
                      {user.email}
                    </div>
                  )}
                </Link>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <button
              onClick={async () => {
                setOpen(false);
                await auth.signOut();
              }}
              className="w-full text-left px-4 py-2.5 text-sm
                text-zinc-200 hover:bg-zinc-900 hover:text-emerald-400
                focus:outline-none focus:bg-zinc-900 transition"
              role="menuitem"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
