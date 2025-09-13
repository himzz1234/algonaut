import { useState, useMemo } from "react";
import AlgoCard from "../AlgoCard";
import { algorithms } from "../../data/algorithms";

export default function Feature() {
  const [searchTerm] = useState("");
  const [selectedOption] = useState("All Algorithms");

  const featuredAlgorithms = useMemo(() => {
    return Object.values(algorithms)
      .filter((algo) => algo.featured)
      .filter((algo) => {
        const matchesSearch = algo.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedOption === "All Algorithms" ||
          algo.category === selectedOption;
        return matchesSearch && matchesCategory;
      });
  }, [searchTerm, selectedOption]);

  return (
    <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-2xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
               bg-clip-text text-transparent leading-snug"
        >
          Explore our Featured{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Algorithms
          </span>
        </h2>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400">
          From sorting to pathfinding, pick an algorithm and see it come to
          life.
        </p>
      </header>

      <div className="max-w-5xl w-full mx-auto mt-10 flex flex-col gap-4">
        {featuredAlgorithms.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredAlgorithms.map((algo, index) => (
              <AlgoCard algorithm={algo} key={index} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-500 text-center">
            No algorithms found. Try adjusting your search or filter.
          </p>
        )}
      </div>
    </main>
  );
}
