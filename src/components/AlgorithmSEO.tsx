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
        "Learn sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort with simple step-by-step visualizations.",
    },
    arrays: {
      title: `Array: ${algorithmName} - Algonaut`,
      description:
        "Explore array problems like rotation, reversal, or finding subarrays with clear, easy-to-follow visuals.",
    },
    recursion: {
      title: `Recursion: ${algorithmName} - Algonaut`,
      description:
        "Understand recursion through animations that show how function calls and the call stack work.",
    },
    "two-pointers": {
      title: `Two Pointers: ${algorithmName} - Algonaut`,
      description:
        "Master the two pointers technique with simple visuals that explain how it helps solve array and string problems.",
    },
    searching: {
      title: `Searching: ${algorithmName} - Algonaut`,
      description:
        "See how Binary Search, Linear Search, and other search methods work through clear, animated examples.",
    },
    backtracking: {
      title: `Backtracking: ${algorithmName} - Algonaut`,
      description:
        "Watch how backtracking explores and undoes choices in problems like N-Queens or Sudoku.",
    },
    "sliding-window": {
      title: `Sliding Window: ${algorithmName} - Algonaut`,
      description:
        "Learn how the sliding window technique helps solve subarray and substring problems efficiently.",
    },
    bitmask: {
      title: `Bitmasking: ${algorithmName} - Algonaut`,
      description:
        "Understand bitmasking with simple visual explanations that show how bits can represent sets or states.",
    },
    linkedlist: {
      title: `Linked List: ${algorithmName} - Algonaut`,
      description:
        "See linked list operations like reversal, merging, and cycle detection come to life with step-by-step visuals.",
    },
    intervals: {
      title: `Intervals: ${algorithmName} - Algonaut`,
      description:
        "Visualize interval problems like merging, insertion, and meeting rooms through clear and simple animations.",
    },
    general: {
      title: `${algorithmName} - Algonaut`,
      description:
        "Learn algorithms visually with easy, interactive explanations that make every concept simple to understand.",
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
