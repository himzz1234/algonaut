import { Link } from "react-router-dom";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { BsStar, BsStarFill } from "react-icons/bs";
import type { ReactNode } from "react";

export type Algo = {
  id: string;
  label: string;
  href?: string;
  difficulty: string;
  effort: string;
};

type AlgoRowProps = {
  algo: Algo;
  note?: string;
  starred?: boolean;
  onToggleStar: (id: string) => void;
  onEditNote: (id: string, label: string) => void;
};

const AlgoRowWrapper = ({
  children,
  algo,
}: {
  children: ReactNode;
  algo: Algo;
}) => {
  const baseCls = `
    relative flex items-center justify-between
    rounded-lg border border-gray-700/50
    px-4 py-3 transition-all duration-300
    hover:scale-[1.01] hover:border-green-400/50 
    hover:shadow-md hover:shadow-green-500/10
    overflow-hidden
  `;

  if (algo.href) {
    return (
      <Link to={algo.href} className={baseCls} target="_blank">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 w-full flex items-center justify-between">
          {children}
        </div>
      </Link>
    );
  }

  return (
    <li className={baseCls}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 w-full flex items-center justify-between">
        {children}
      </div>
    </li>
  );
};

export default function AlgoRow({
  algo,
  note,
  starred = false,
  onToggleStar,
  onEditNote,
}: AlgoRowProps) {
  const hasNote = !!note;

  return (
    <AlgoRowWrapper algo={algo}>
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-gray-200 text-sm sm:text-base whitespace-nowrap max-w-40 sm:max-w-full truncate font-medium">
          {algo.label}
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
          <span className="text-xs text-gray-400 truncate max-w-[40ch] italic">
            — {note}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleStar(algo.id)}
          aria-label={starred ? "Unstar algorithm" : "Star algorithm"}
          className="p-1 rounded-full hover:bg-gray-700/40 transition-colors"
        >
          {starred ? (
            <BsStarFill className="h-4 w-4 text-yellow-400" />
          ) : (
            <BsStar className="h-4 w-4 text-gray-400" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onEditNote(algo.id, algo.label)}
          title={hasNote ? "Edit note" : "Add note"}
          aria-label={hasNote ? "Edit note" : "Add note"}
          className="p-1 rounded-full hover:bg-gray-700/40 transition-colors"
        >
          {hasNote ? (
            <FiEdit2 className="h-5 w-5 text-emerald-300" />
          ) : (
            <FiPlus className="h-5 w-5 text-emerald-300" />
          )}
        </button>
      </div>
    </AlgoRowWrapper>
  );
}
