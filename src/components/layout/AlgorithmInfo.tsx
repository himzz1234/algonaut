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
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          {name}
        </h2>

        <div className="bg-[#141414] p-4 rounded-lg mt-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm text-xs sm:text-sm bg-blue-500/20 text-blue-400">
              {category}
            </span>
            {difficulty && (
              <span
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm text-xs sm:text-sm ${
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

          <p className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-sm bg-[#141414] text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="h-fit col-span-12 lg:col-span-4 bg-[#000] border border-gray-700/60 rounded-lg p-3 sm:p-4 backdrop-blur-sm shadow-lg mt-4 lg:mt-0">
        <h3 className="font-medium text-gray-200 text-sm sm:text-base md:text-lg mb-3">
          Time & Space Complexity
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="bg-[#141414] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 flex justify-between items-center">
            <span className="text-gray-400">Best:</span>
            <span className="text-green-400 font-medium">
              {complexities?.best}
            </span>
          </div>
          <div className="bg-[#141414] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 flex justify-between items-center">
            <span className="text-gray-400">Average:</span>
            <span className="text-green-400 font-medium">
              {complexities?.average}
            </span>
          </div>
          <div className="bg-[#141414] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 flex justify-between items-center">
            <span className="text-gray-400">Worst:</span>
            <span className="text-green-400 font-medium">
              {complexities?.worst}
            </span>
          </div>
          <div className="bg-[#141414] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 flex justify-between items-center">
            <span className="text-gray-400">Space:</span>
            <span className="text-green-400 font-medium whitespace-nowrap">
              {complexities?.space}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
