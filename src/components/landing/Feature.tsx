import { useState } from "react";
import AlgoCard from "./AlgoCard";
import { FiSearch } from "react-icons/fi";
import Select from "../ui/Select";
import { algorithms } from "../../data/algorithms";

export default function Feature() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const dropdownOptions = [
    "All Algorithms",
    "Sorting",
    "Pathfinding",
    "Graph",
    "Dynamic Programming",
  ];

  const featuredAlgorithms = Object.values(algorithms).filter(
    (algo) => algo.featured
  );

  return (
    <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl py-1 md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
               bg-clip-text text-transparent"
        >
          Explore our Featured{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Algorithms
          </span>
        </h2>
        <p className="mt-2 text-lg md:text-xl text-gray-400">
          From sorting to pathfinding, pick an algorithm and see it come to
          life.
        </p>
      </header>

      <div className="max-w-4xl w-full mx-auto mt-7.5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-md border-2 border-white/10 shadow-lg">
          <div className="relative flex-2/3 w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-3 rounded-lg border border-white/10 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-400 focus:border-green-400 transition-all duration-200"
            />
          </div>

          <div className="h-auto flex-1/3 w-full">
            <Select
              options={dropdownOptions}
              selected={selectedOption}
              onSelect={setSelectedOption}
              placement="bottom"
            >
              {({ toggle, isOpen }) => (
                <button
                  onClick={toggle}
                  className="w-full h-full px-4 py-2 rounded-md flex justify-between items-center
                  bg-[#0f1014] backdrop-blur-sm
                  text-gray-500 border border-gray-700/60
                  hover:border-indigo-400/50 hover:bg-white/10
                  focus:outline-none focus:ring focus:ring-green-400
                  transition-all duration-200 whitespace-nowrap"
                >
                  {selectedOption || "Filter by category"}
                  <svg
                    className={`w-5 h-5 ml-2 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </Select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredAlgorithms.map((algo, index) => (
            <AlgoCard algorithm={algo} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
