import type { AlgorithmMeta } from "../../data/algorithms";

export default function AlgorithmInfo({
  name,
  description,
  complexities,
  category,
  difficulty,
  tags,
}: Partial<AlgorithmMeta>) {
  return (
    <>
      <div className="col-span-12 lg:col-span-8 backdrop-blur-sm shadow-lg">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white">
          {name}
        </h2>

        <div className="flex gap-2 mb-3 mt-5">
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

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        {tags && (
          <div className="mt-5 flex flex-wrap gap-2">
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

      <div className="h-fit col-span-12 lg:col-span-4 bg-[#0f1014] border border-gray-700/60 rounded-lg p-4 backdrop-blur-sm shadow-lg">
        <h3 className="font-medium text-gray-200 text-sm sm:text-lg mb-2">
          Time & Space Complexity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4">
          <div className="bg-gray-800/40 rounded-md px-3 py-2 justify-between flex items-center">
            <span className="text-gray-400">Best:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.best}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-3 py-2 justify-between flex items-center">
            <span className="text-gray-400">Average:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.average}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-3 py-2 justify-between flex items-center">
            <span className="text-gray-400">Worst:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.worst}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-3 py-2 justify-between flex items-center">
            <span className="text-gray-400">Space:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities?.space}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
