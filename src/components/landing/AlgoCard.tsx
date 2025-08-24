import { Link } from "react-router-dom";
import type { AlgorithmMeta } from "../../data/algorithms";

type AlgoCardProps = {
  algorithm: AlgorithmMeta;
};

const difficultyColors: Record<
  NonNullable<AlgorithmMeta["difficulty"]>,
  string
> = {
  beginner: "bg-green-500/20 text-green-400",
  intermediate: "bg-yellow-500/20 text-yellow-400",
  advanced: "bg-red-500/20 text-red-400",
};

export default function AlgoCard({ algorithm }: AlgoCardProps) {
  return (
    <Link to={algorithm.href}>
      <div
        className="relative w-full h-64 rounded-lg p-5 flex flex-col
        bg-[#0f1014] backdrop-blur-sm border border-gray-700/60
        shadow-md hover:shadow-xl hover:scale-[1.02]
        transition-all duration-300 
        hover:border-green-400/50"
      >
        <div className="flex justify-between items-start">
          <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 capitalize">
            {algorithm.category}
          </span>
          {algorithm.difficulty && (
            <span
              className={`text-xs px-2 py-1 rounded capitalize ${
                difficultyColors[algorithm.difficulty]
              }`}
            >
              {algorithm.difficulty}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start mt-4 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg md:text-xl text-white">{algorithm.name}</h3>
          </div>
          <p className="mt-1 text-gray-400 text-sm md:text-base">
            {algorithm.shortDescription}
          </p>
        </div>

        {algorithm.tags && algorithm.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {algorithm.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded bg-gray-700/50 text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
