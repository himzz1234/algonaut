import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "../context/ModalContext";
import AuthPanel from "./AuthPanel";
import { useAuth } from "../context/AuthContext";
import { AvatarMenu } from "./AvatarMenu";

export default function Navbar() {
  const { openModal } = useModal();
  const { pathname } = useLocation();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = (path: string) => pathname.split("/")[1].startsWith(path);
  return (
    <nav className="h-[80px] border-b border-gray-700/60 bg-[#0a0a0a] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center px-6">
        <div className="flex items-center flex-1 gap-2">
          <Link to="/" className="block">
            <picture>
              <source srcSet="/logo.avif" type="image/avif" />
              <img
                src="/logo.png"
                width="144"
                height="42"
                alt="Algonaut logo"
                loading="lazy"
                className="h-11 md:h-11 w-auto"
              />
            </picture>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-4 flex-1 justify-end mr-6">
          <li
            className={`cursor-pointer transition-colors ${
              isCurrent("learn")
                ? "text-green-400"
                : "text-gray-400 hover:text-green-400"
            }`}
          >
            <Link to="/learn">Learnings</Link>
          </li>
          <li
            className={`cursor-pointer transition-colors ${
              isCurrent("explore")
                ? "text-green-400"
                : "text-gray-400 hover:text-green-400"
            }`}
          >
            <Link to="/explore">Explore</Link>
          </li>
        </ul>

        <div className="flex gap-2">
          <Link
            target="_blank"
            to="https://www.buymeacoffee.com/himanshuhim1230"
            className="hidden md:flex bg-green-600 hover:bg-green-500 rounded-md w-40 py-1.5 px-3"
          >
            <img src="/images/buy-me-a-coffee.png" alt="Buy Me A Coffee" />
          </Link>
          {!loading && (
            <div className="flex">
              {!user ? (
                <button
                  onClick={() => openModal(<AuthPanel />)}
                  className="hidden md:block px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <AvatarMenu user={user} />
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-4 text-gray-400 hover:text-green-400 text-xl w-6 h-6 focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-[80px] left-0 w-full bg-black/95 border-b border-green-500/20 backdrop-blur-lg shadow-xl z-40"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 text-lg">
              <li
                className={`transition-colors ${
                  isCurrent("learn")
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                <Link to="/learn" onClick={() => setMenuOpen(false)}>
                  Learning
                </Link>
              </li>
              <li
                className={`transition-colors ${
                  isCurrent("explore")
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                <Link to="/explore" onClick={() => setMenuOpen(false)}>
                  Explore
                </Link>
              </li>
              {!user && (
                <li>
                  <button
                    onClick={() => openModal(<AuthPanel />)}
                    className="w-full px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors"
                  >
                    Login
                  </button>
                </li>
              )}
              <Link
                target="_blank"
                to="https://www.buymeacoffee.com/himanshuhim1230"
                className="bg-green-600 hover:bg-green-500 rounded-md w-36 py-1.5 px-3"
              >
                <img src="/images/buy-me-a-coffee.png" alt="Buy Me A Coffee" />
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
