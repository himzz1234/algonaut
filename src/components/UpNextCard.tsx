import { Link } from "react-router-dom";
import useUpNext from "../hooks/useUpNext";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "motion/react";

export default function UpNextCard() {
  const nextAlgo = useUpNext();
  if (!nextAlgo) return null;
  if (!nextAlgo.href) return null;

  return (
    <Link
      to={nextAlgo.href}
      className="absolute bottom-16 md:bottom-20 right-0 cursor-pointer
        flex items-center justify-between gap-2
        backdrop-blur-md bg-[#141414] border border-gray-700/60 shadow-md 
        rounded-l-lg px-3 py-2 w-44 md:w-48
        hover:bg-green-500/40 transition-all z-20"
    >
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-green-400 uppercase">Up Next</span>
        <span className="text-sm md:text-base mt-2 text-white truncate max-w-32">
          {nextAlgo.name}
        </span>
      </div>
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <FiChevronRight className="text-gray-300" size={18} />
      </motion.div>{" "}
    </Link>
  );
}
