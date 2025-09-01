import { Link } from "react-router-dom";
import type { AlgorithmMeta } from "../../data/algorithms";
import { FaProjectDiagram } from "react-icons/fa";
import type { JSX } from "react";
import { TiSortNumerically } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

type AlgoCardProps = {
  algorithm: AlgorithmMeta;
};

const algoIcons: Record<string, JSX.Element> = {
  quicksort: <TiSortNumerically size={22} />,
  mergesort: <TiSortNumerically size={22} />,
  insertionsort: <TiSortNumerically size={22} />,
  linearsearch: <IoSearch size={22} />,
  binarysearch: <IoSearch size={22} />,
};

export default function AlgoCard({ algorithm }: AlgoCardProps) {
  const normalizedName = algorithm.name.toLowerCase().replace(/\s+/g, "");
  const icon = algoIcons[normalizedName] || <FaProjectDiagram size={22} />;

  return (
    <Link to={algorithm.href}>
      <div
        className="relative w-full h-64 rounded-2xl p-5 flex flex-col
        bg-[#0f1014] backdrop-blur-sm border border-gray-700/60
        shadow-md transition-all duration-500 overflow-hidden
        hover:shadow-green-500/20 hover:border-green-400/50
        group"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-400/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="flex flex-col items-start flex-1 relative z-10">
          <div className="flex flex-col items-start gap-3">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-lg
              text-green-300 border border-green-400/20 bg-green-500/5"
            >
              {icon}
            </div>

            <h3 className="text-lg md:text-2xl font-medium text-white">
              {algorithm.name}
            </h3>
          </div>
          <p className="mt-1.5 text-gray-400 text-sm md:text-base leading-relaxed">
            {algorithm.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
