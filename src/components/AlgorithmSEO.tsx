import { Helmet } from "react-helmet";
import { useSearchParams, useLocation } from "react-router-dom";
import { algorithms } from "../data/algorithms";

export default function AlgorithmSEO() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const algorithmKey = searchParams.get("algorithm") || "";
  const algorithm = algorithms[algorithmKey];
  const category =
    algorithm?.category || location.pathname.split("/")[1] || "general";

  const algorithmName = algorithm?.name || "Algorithm Visualizer";

  const categoryMeta: Record<string, { title: string; description: string }> = {
    sorting: {
      title: `Sorting: ${algorithmName} - Algonaut`,
      description:
        "Learn sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort with interactive visualizations that make complex concepts intuitive.",
    },
    arrays: {
      title: `Array: ${algorithmName} - Algonaut`,
      description:
        "Explore array algorithms like reversal, rotation, Kadane’s algorithm, and more — visualized step-by-step to build intuition.",
    },
    recursion: {
      title: `Recursion: ${algorithmName} - Algonaut`,
      description:
        "Understand recursion like never before. Watch function calls and stacks unfold dynamically through visual explanation.",
    },
    "two-pointers": {
      title: `Two Pointers: ${algorithmName} - Algonaut`,
      description:
        "Master the two pointers technique with interactive examples and algorithm visualizations for arrays and strings.",
    },
    searching: {
      title: `Searching: ${algorithmName} - Algonaut`,
      description:
        "Learn searching algorithms like Binary Search and Linear Search through animated step-by-step visualizations.",
    },
    backtracking: {
      title: `Backtracking: ${algorithmName} - Algonaut`,
      description:
        "Visualize backtracking algorithms such as N-Queens, Sudoku Solver, and Subset Generation to understand recursion and decision-making paths.",
    },
    "sliding-window": {
      title: `Sliding Window: ${algorithmName} - Algonaut`,
      description:
        "Explore sliding window techniques for optimizing subarray and substring problems with detailed interactive visualizations.",
    },
    bitmask: {
      title: `Bitmasking: ${algorithmName} - Algonaut`,
      description:
        "Learn bitmask techniques and problems through clear, animated visualizations that demystify binary operations and subset generation.",
    },
    linkedlist: {
      title: `Linked List: ${algorithmName} - Algonaut`,
      description:
        "Understand linked list operations such as reversal, merging, and cycle detection through step-by-step animated visualizations.",
    },
    general: {
      title: `${algorithmName} - Algonaut`,
      description:
        "Learn algorithms through interactive, step-by-step visualizations. Master data structures and algorithms visually with Algonaut.",
    },
  };

  const meta = categoryMeta[category] || categoryMeta.general;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/preview.png" />
      <meta property="og:url" content={encodeURI(window.location.href)} />
    </Helmet>
  );
}
