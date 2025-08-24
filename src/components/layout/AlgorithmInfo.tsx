import type { AlgorithmMeta } from "../../data/algorithms";

export default function AlgorithmInfo({
  name,
  description,
  complexities,
  pseudocode,
  category,
  difficulty,
  tags,
}: Partial<AlgorithmMeta>) {
  return (
    <div className="border border-gray-700/60 rounded-xl p-6 backdrop-blur-sm shadow-lg bg-gradient-to-b from-[#15151c] to-[#0f0f14]">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent tracking-tight">
        {name}
      </h2>

      <div className="flex gap-2 mb-3">
        <span className="px-2 py-1 rounded-sm text-sm bg-blue-500/20 text-blue-400">
          {category}
        </span>
        {difficulty && (
          <span
            className={`px-2 py-1 rounded-sm text-sm ${
              difficulty === "beginner"
                ? "bg-green-500/20 text-green-400"
                : difficulty === "intermediate"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {difficulty}
          </span>
        )}
      </div>

      <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
        {description}
      </p>

      <div className="border-t border-gray-700/50 my-4" />

      <div className="mb-6">
        <h3 className="font-medium text-gray-200 text-sm sm:text-base mb-2">
          Time & Space Complexity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-800/40 rounded-md px-3 py-2">
            <span className="text-gray-400">Best:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.best}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-3 py-2">
            <span className="text-gray-400">Average:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.average}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-3 py-2">
            <span className="text-gray-400">Worst:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.worst}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-3 py-2">
            <span className="text-gray-400">Space:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.space}
            </span>
          </div>
        </div>
      </div>

      {pseudocode && (
        <>
          <div className="border-t border-gray-700/50 my-4" />
          <div>
            <h3 className="font-medium text-gray-200 text-sm sm:text-base mb-2">
              Pseudocode
            </h3>
            <pre className="text-xs sm:text-sm bg-black/40 p-3 rounded-lg overflow-x-auto leading-relaxed text-green-300 font-mono shadow-inner">
              {pseudocode.join("\n")}
            </pre>
          </div>
        </>
      )}

      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm rounded-sm bg-gray-700/40 text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
