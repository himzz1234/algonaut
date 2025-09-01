import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "../context/ModalContext";
import AuthPanel from "./AuthPanel";
import { useAuth } from "../context/AuthContext";
import { AvatarMenu } from "./AvatarMenu";

export default function Navbar() {
  const { openModal } = useModal();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-[80px] border-b border-gray-700/60 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-bold">
              AlgoVisua<span className="text-green-400">li</span>zer
            </h1>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 flex-1 justify-end mr-8">
          <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
            <Link to="/learn">Learnings</Link>
          </li>
          {/* <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
            <Link to="/about">About</Link>
          </li> */}
        </ul>

        {!loading && (
          <div className="flex items-center gap-4">
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

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-green-400 text-2xl focus:outline-none"
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
            className="md:hidden absolute top-[80px] left-0 w-full bg-black/95 border-b border-green-500/20 backdrop-blur-lg z-40"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 text-lg">
              <li className="text-gray-300 hover:text-green-400 transition-colors">
                <Link to="/learn" onClick={() => setMenuOpen(false)}>
                  Learning
                </Link>
              </li>
              {/* <li className="text-gray-300 hover:text-green-400 transition-colors">
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li> */}
              <li>
                <button
                  onClick={() => openModal(<AuthPanel />)}
                  className="w-full px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors"
                >
                  Login
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
