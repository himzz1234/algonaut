export default function Hero() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center max-w-6xl mx-auto">
      <div className="text-center">
        <h1
          className="text-5xl md:text-6xl font-bold 
               bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 
               bg-clip-text text-transparent"
        >
          Visualize{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Algorithms
          </span>
          .
        </h1>

        <h1
          className="text-5xl md:text-6xl font-bold mt-3 
               bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 
               bg-clip-text text-transparent"
        >
          Learn <span>Faster</span>.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Experience a smarter way to master algorithms with interactive visuals
          and AI-powered explanations that adapt to your learning pace.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition">
            Start Visualizing
          </button>
          <button className="px-6 py-3 text-lg font-medium text-green-400 border border-green-400 rounded-lg hover:bg-green-400/10 transition">
            Browse Algorithms
          </button>
        </div>
      </div>
    </div>
  );
}
