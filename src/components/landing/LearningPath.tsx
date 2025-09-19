import { algorithms } from "../../data/algorithms";
import { modules } from "../../data/modules";
import type { Counts } from "../StatsGrid";
import LearningPathCard from "./LearningPathCard";

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function LearningPath() {
  const algoIds = Array.from(new Set(modules.flatMap((m) => m.algos)));

  const counts = algoIds.reduce<Counts>(
    (acc, id) => {
      const meta = algorithms[id];
      const diff: string = meta?.difficulty ?? "beginner";

      if (diff === "beginner") acc.beginner += 1;
      else if (diff === "intermediate") acc.intermediate += 1;
      else if (diff === "advanced") acc.advanced += 1;
      else acc.beginner += 1;

      return acc;
    },
    { beginner: 0, intermediate: 0, advanced: 0 }
  );

  const minutesPerLesson = {
    beginner: 5,
    intermediate: 8,
    advanced: 10,
  };

  const beginnerMinutes = counts.beginner * minutesPerLesson.beginner;
  const intermediateMinutes =
    counts.intermediate * minutesPerLesson.intermediate;
  const advancedMinutes = counts.advanced * minutesPerLesson.advanced;

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
               bg-clip-text text-transparent leading-snug"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Level Up
          </span>{" "}
          with Learning Paths
        </h2>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400 text-balance px-2">
          From beginner basics to interview mastery, follow guided paths at your
          pace.
        </p>
      </header>

      <div className="max-w-5xl w-full mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
          <LearningPathCard
            title="Beginner"
            description="Basics & Fundamentals"
            duration={formatDuration(beginnerMinutes)}
            progress={100}
            href="/learn#path_beginner"
            lessons={counts.beginner}
          />

          <LearningPathCard
            title="Intermediate"
            description="Data Structures & Algorithms"
            duration={formatDuration(intermediateMinutes)}
            progress={50}
            href="/learn#path_intermediate"
            lessons={counts.intermediate}
          />

          <LearningPathCard
            title="Interview Prep"
            description="Preparation & Practice"
            duration={formatDuration(advancedMinutes)}
            progress={0}
            href="/learn#path_interview_prep"
            lessons={counts.advanced}
          />
        </div>
      </div>
    </main>
  );
}
