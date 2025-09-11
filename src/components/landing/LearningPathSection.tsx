import { useCallback, useState } from "react";
import AlgoRow from "./AlgoRow";
import { algorithms } from "../../data/algorithms";

type Module = {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "interview";
  algos: string[]; // <-- now just IDs
};

type LearningPathSectionProps = {
  id: string;
  title: string;
  accentClass?: string;
  modules: Module[];
};

export function LearningPathSection({
  id,
  title,
  accentClass = "text-green-500",
  modules,
}: LearningPathSectionProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [starred, setStarred] = useState<Record<string, boolean>>({});

  const toggleStar = useCallback(
    (algoId: string) => setStarred((s) => ({ ...s, [algoId]: !s[algoId] })),
    []
  );

  const addOrEditNote = (algoId: string, label: string) => {
    const current = notes[algoId] ?? "";
    const next = window.prompt(`Add/Edit note for "${label}"`, current);
    if (next === null) return;
    const trimmed = next.trim();
    setNotes((n) => {
      const copy = { ...n };
      if (trimmed) copy[algoId] = trimmed;
      else delete copy[algoId];
      return copy;
    });
  };

  return (
    <section id={id}>
      <div className="flex items-center justify-between px-2.5">
        <h2
          className={`mb-4 font-semibold ${accentClass} text-xl sm:text-2xl lg:text-3xl`}
        >
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {modules.map((m) => (
          <details
            key={m.id}
            className="group rounded-xl border border-gray-700/60 bg-[#0f1014] transition-shadow focus-within:shadow-lg hover:shadow-lg"
          >
            <summary
              className="cursor-pointer list-none p-3 sm:p-4 flex flex-col sm:justify-between gap-2 sm:gap-2
                outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-emerald-500 rounded-xl"
            >
              <div className="min-w-0 flex items-center">
                <h3 className="text-base sm:text-lg font-medium text-gray-200 truncate flex-1">
                  {m.title}
                </h3>
                <span
                  aria-hidden
                  className="text-gray-400 transition-transform duration-200 group-open:rotate-90"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 118.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-400 line-clamp-3 sm:line-clamp-none">
                {m.description}
              </p>
            </summary>

            <ul className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-2">
              {m.algos.map((algoId) => {
                const algo = algorithms[algoId];
                if (!algo) return null;

                return (
                  <AlgoRow
                    key={algoId}
                    algo={algo}
                    note={notes[algoId]}
                    starred={!!starred[algoId]}
                    onToggleStar={toggleStar}
                    onEditNote={addOrEditNote}
                  />
                );
              })}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
