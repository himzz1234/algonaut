import { algorithms } from "../data/algorithms";
import { modules } from "../data/modules";
import ProgressCircle from "./ui/ProgressCircle";
import { useProgress } from "../context/ProgressContext";

type Counts = { beginner: number; intermediate: number; advanced: number };

export default function StatsGrid() {
  const { progressMap, loading } = useProgress();

  const algoIds = Array.from(new Set(modules.flatMap((m) => m.algos)));
  const totalAlgos = algoIds.length;

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

  let beginner = 0,
    intermediate = 0,
    advanced = 0;

  Object.entries(progressMap).forEach(([algoId, data]) => {
    if (data.visualizationCompleted && data.quizCompleted) {
      const meta = algorithms[algoId];
      const diff: string = meta?.difficulty ?? "beginner";
      if (diff === "beginner") beginner += 1;
      else if (diff === "intermediate") intermediate += 1;
      else if (diff === "advanced") advanced += 1;
    }
  });

  const completed = {
    total: beginner + intermediate + advanced,
    beginner,
    intermediate,
    advanced,
  };

  const pct = (done: number, total: number) =>
    total === 0 ? 0 : Math.round((done / total) * 100);

  if (loading) {
    return (
      <div className="bg-[#0f1014] border border-gray-700/60 rounded-lg p-6 text-gray-400">
        Loading progress…
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#141414] border border-gray-700/60 shadow-md rounded-lg min-h-24">
      <div className="flex items-center justify-between px-5 py-4 border-r border-gray-800/80">
        <div>
          <h4 className="text-gray-400 capitalize tracking-wide">
            Total Progress
          </h4>
          <p className="mt-1 text-xl font-medium text-white">
            {completed.total}
            <span className="text-gray-400">/{totalAlgos}</span>
          </p>
        </div>
        <ProgressCircle progress={pct(completed.total, totalAlgos)} size={50} />
      </div>

      <div className="flex flex-row items-center justify-between px-5 py-4 border-r border-gray-800/80">
        <div>
          <h4 className="text-gray-400 capitalize tracking-wide">Beginner</h4>
          <p className="mt-2 text-xl font-medium">
            {completed.beginner}
            <span className="text-gray-400">/{counts.beginner}</span>
          </p>
        </div>
        <ProgressCircle
          progress={pct(completed.beginner, counts.beginner)}
          size={50}
        />
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-r border-gray-800/80">
        <div>
          <h4 className="text-gray-400 capitalize tracking-wide">
            Intermediate
          </h4>
          <p className="mt-2 text-xl font-medium">
            {completed.intermediate}
            <span className="text-gray-400">/{counts.intermediate}</span>
          </p>
        </div>
        <ProgressCircle
          progress={pct(completed.intermediate, counts.intermediate)}
          size={50}
        />
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h4 className="text-gray-400 capitalize tracking-wide">Advanced</h4>
          <p className="mt-2 text-xl font-medium">
            {completed.advanced}
            <span className="text-gray-400">/{counts.advanced}</span>
          </p>
        </div>
        <ProgressCircle
          progress={pct(completed.advanced, counts.advanced)}
          size={50}
        />
      </div>
    </div>
  );
}
