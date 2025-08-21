import { Link } from "react-router-dom";
import type { AlgorithmMeta } from "../../data/algorithms";

type AlgoCardProps = {
  algorithm: AlgorithmMeta;
};

export default function AlgoCard({ algorithm }: AlgoCardProps) {
  return (
    <Link to={algorithm.href}>
      <div
        className="relative w-full h-52 rounded-lg p-5 flex flex-col justify-between
        bg-[#0f1014] backdrop-blur-sm border border-gray-700/60
        shadow-md hover:shadow-xl hover:scale-[1.02]
        transition-all duration-300 
        hover:border-green-400/50"
      >
        <div>
          <h3 className="text-lg md:text-xl text-white">{algorithm.name}</h3>
          <p className="mt-2 text-gray-400 text-sm md:text-base">
            {algorithm.shortDescription}
          </p>
        </div>

        {/* <Link to={algorithm.href}>
        <button
          className="mt-4 self-start py-2 px-4 text-sm text-white
          rounded-md border border-green-400 
          hover:bg-green-500 hover:border-green-500 
          transition-all duration-200 font-thin"
        >
          Visualize
        </button>
      </Link> */}
      </div>
    </Link>
  );
}
