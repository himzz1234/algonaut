import { Link } from "react-router-dom";

export default function AlgoCard() {
  return (
    <div
      className="relative w-full h-60 rounded-xl p-5 flex flex-col justify-between
        border border-transparent bg-white/5 dark:bg-black/30 backdrop-blur-md
        shadow-md hover:shadow-xl hover:scale-[1.02]
        transition-all duration-300 
        hover:border-green-400/50"
    >
      <div>
        <h3 className="text-lg md:text-xl font-medium text-green-400">
          Merge Sort
        </h3>
        <p className="mt-2 text-gray-400 text-sm md:text-base">
          Merge sort is a divide-and-conquer sorting algorithm that splits an
          array into halves and merges them back in sorted order.
        </p>
      </div>

      <Link to={`/sorting?algorithm=merge-sort`}>
        <button
          className="mt-4 self-start py-2 px-4 text-sm text-white
          rounded-md border border-green-400 
          hover:bg-green-500 hover:border-green-500 
          transition-all duration-200"
        >
          Visualize
        </button>
      </Link>
    </div>
  );
}
