interface AlgorithmInfoProps {
  name: string;
  description: string;
  complexities: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  pseudocode?: string[];
}

export default function AlgorithmInfo({
  name,
  description,
  complexities,
  pseudocode,
}: AlgorithmInfoProps) {
  return (
    <div className="border border-gray-700/60 rounded-xl p-4 backdrop-blur-sm shadow-lg bg-gradient-to-b from-[#15151c] to-[#0f0f14]">
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent tracking-tight">
        {name}
      </h2>

      <p className="text-gray-300 mb-6 text-base leading-relaxed">
        {description}
      </p>

      <div className="border-t border-gray-700/50 my-4" />

      <div className="mb-6">
        <h3 className="font-medium text-gray-200 text-base mb-2">
          Time & Space Complexity
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-800/40 rounded-dm px-3 py-3">
            <span className="text-gray-400">Best:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities.best}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-dm px-3 py-3">
            <span className="text-gray-400">Average:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities.average}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-dm px-3 py-3">
            <span className="text-gray-400">Worst:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities.worst}
            </span>
          </div>
          <div className="bg-gray-800/40 rounded-dm px-3 py-3">
            <span className="text-gray-400">Space:</span>{" "}
            <span className="text-green-400 font-medium">
              {complexities.space}
            </span>
          </div>
        </div>
      </div>

      {pseudocode && <div className="border-t border-gray-700/50 my-4" />}

      {pseudocode && (
        <div>
          <h3 className="font-medium text-gray-200 text-base mb-2">
            Pseudocode
          </h3>
          <pre className="text-sm bg-black/40 p-3 rounded-lg overflow-x-auto leading-relaxed text-green-300 font-mono shadow-inner">
            {pseudocode.join("\n")}
          </pre>
        </div>
      )}
    </div>
  );
}
