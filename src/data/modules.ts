export type Module = {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "interview";
  algos: string[];
};

export const modules: Module[] = [
  {
    id: "m-sorting",
    title: "Sorting Algorithms",
    description:
      "Learn and practice fundamental sorting algorithms, from simple quadratic methods to efficient divide-and-conquer approaches.",
    level: "beginner",
    algos: [
      "bubble-sort",
      "selection-sort",
      "insertion-sort",
      "merge-sort",
      "quick-sort",
    ],
  },
  {
    id: "m-arrays",
    title: "Arrays",
    description:
      "Master fundamental array operations and patterns commonly asked in coding interviews.",
    level: "beginner",
    algos: [
      "linear-search",
      "binary-search",
      "find-min-max",
      "reverse-array",
      "rotate-array",
      "prefix-sum",
      "kadane",
    ],
  },
  {
    id: "m-recursion",
    title: "Recursion Basics",
    description:
      "Understand recursion and the call stack through simple, classic problems.",
    level: "beginner",
    algos: [
      "factorial",
      "fibonacci",
      "sum-n",
      "tower-of-hanoi",
      "reverse-string",
    ],
  },
  {
    id: "m-bits",
    title: "Bit Manipulation",
    description:
      "Learn how to use bitwise operations to solve problems efficiently.",
    level: "beginner",
    algos: [
      "get-ith-bit",
      "set-ith-bit",
      "clear-ith-bit",
      "toggle-ith-bit",
      "check-odd-even",
      "count-set-bits",
      "power-of-two",
      "lowest-set-bit",
      "clear-lowest-set-bit",
    ],
  },
  {
    id: "m-two-pointers",
    title: "Two Pointers & Sliding Window",
    description:
      "Master the two-pointers technique and its powerful extension, the sliding window pattern.",
    level: "beginner",
    algos: [
      "two-sum-sorted",
      "move-zeroes",
      "three-sum",
      "container-most-water",
      "trap-rain-water",
      "max-sum-subarray-k",
      "longest-substring-without-repeat",
      "min-window-substring",
      "sliding-window-median",
    ],
  },
  {
    id: "m-linked-lists",
    title: "Linked Lists",
    description:
      "Work with pointers, traversal, and in-place edits. Focused on singly linked lists (common interview patterns).",
    level: "intermediate",
    algos: [
      "ll-insert-end",
      "ll-delete-node",
      "ll-reverse",
      "ll-middle-node",
      "ll-cycle-detect-floyd",
      "ll-remove-cycle",
      "ll-merge-two-sorted",
    ],
  },
  {
    id: "m-graphs-intro",
    title: "Graphs (Intro)",
    description: "Model connections; explore with BFS/DFS.",
    level: "intermediate",
    algos: ["dfs", "bfs"],
  },
];

// export const modules: Module[] = [
//   {
//     id: "m-strings",
//     title: "Strings",
//     description: "Practice character operations, scanning, and comparisons.",
//     level: "beginner",
//     algos: [
//       {
//         id: "reverse-string-it",
//         label: "Reverse String",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "palindrome",
//         label: "Palindrome Check",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "anagram",
//         label: "Anagram Check (Frequency Map)",
//         difficulty: "Easy",
//         effort: "Low–Medium",
//       },
//       {
//         id: "naive-substring",
//         label: "Substring Search (Naive)",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "longest-common-prefix",
//         label: "Longest Common Prefix",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//     ],
//   },
//   {
//     id: "m-hashing",
//     title: "Hashing Basics",
//     description: "Use maps and sets for fast lookups and counting.",
//     level: "beginner",
//     algos: [
//       {
//         id: "freq-counter",
//         label: "Frequency Counter",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "first-unique",
//         label: "First Non-Repeating Character",
//         difficulty: "Easy",
//         effort: "Low–Medium",
//       },
//       {
//         id: "two-sum-map",
//         label: "Two Sum (Hash Map)",
//         difficulty: "Easy",
//         effort: "Low–Medium",
//       },
//       {
//         id: "subarray-sum-k",
//         label: "Subarray Sum = K",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "group-anagrams",
//         label: "Group Anagrams",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-stacks-queues-intro",
//     title: "Stacks & Queues (Intro)",
//     description: "Learn LIFO/FIFO with practical problems.",
//     level: "beginner",
//     algos: [
//       {
//         id: "stack-array",
//         label: "Implement Stack (Array)",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "valid-parentheses",
//         label: "Valid Parentheses",
//         difficulty: "Easy",
//         effort: "Low–Medium",
//       },
//       {
//         id: "queue-array",
//         label: "Implement Queue (Array)",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "next-greater-element",
//         label: "Next Greater Element",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-math",
//     title: "Basic Math",
//     description: "Quick math tools for coding problems.",
//     level: "beginner",
//     algos: [
//       {
//         id: "gcd-euclid",
//         label: "GCD (Euclid)",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "prime-check",
//         label: "Prime Check (Trial Division)",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "sieve",
//         label: "Sieve of Eratosthenes",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "fast-power",
//         label: "Fast Power (Binary Exponentiation)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-trees",
//     title: "Trees & BSTs",
//     description: "Traverse and manipulate hierarchical data.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "bt-traversals",
//         label: "DFS Traversals (Pre/In/Post)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "bfs-levelorder",
//         label: "BFS (Level Order)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "bst-ops",
//         label: "BST Insert/Search/Delete",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "balanced-height",
//         label: "Check Balanced Tree",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "lowest-common-ancestor",
//         label: "Lowest Common Ancestor",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-heaps",
//     title: "Heaps & Priority Queues",
//     description: "Optimize retrieval of min/max elements.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "heapify",
//         label: "Heapify & Build Heap",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "priority-queue",
//         label: "Priority Queue (Operations)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "top-k-elements",
//         label: "Top K Elements",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "kth-largest",
//         label: "Kth Largest Element",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-graphs-intro",
//     title: "Graphs (Intro)",
//     description: "Model connections; explore with BFS/DFS.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "graph-repr",
//         label: "Adjacency List/Matrix",
//         difficulty: "Easy",
//         effort: "Low",
//       },
//       {
//         id: "bfs",
//         label: "BFS Traversal",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "dfs",
//         label: "DFS Traversal",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "connected-components",
//         label: "Connected Components",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "cycle-undirected",
//         label: "Detect Cycle (Undirected)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-greedy",
//     title: "Greedy",
//     description: "Pick locally optimal choices for global results.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "activity-selection",
//         label: "Activity Selection",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "fractional-knapsack",
//         label: "Fractional Knapsack",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "boats-people",
//         label: "Boats to Save People",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "interval-scheduling",
//         label: "Interval Scheduling",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-backtracking",
//     title: "Backtracking",
//     description: "Explore search spaces with pruning.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "subsets",
//         label: "Subsets (Power Set)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "permutations",
//         label: "Permutations",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "n-queens",
//         label: "N-Queens",
//         difficulty: "Medium",
//         effort: "High",
//       },
//       {
//         id: "combination-sum",
//         label: "Combination Sum",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-dp-basics",
//     title: "Dynamic Programming (Basics)",
//     description: "Turn recurrences into efficient solutions.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "climb-stairs",
//         label: "Climbing Stairs",
//         difficulty: "Easy",
//         effort: "Low–Medium",
//       },
//       {
//         id: "house-robber",
//         label: "House Robber",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "coin-change",
//         label: "Coin Change (Min Coins)",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "longest-inc-subseq",
//         label: "Longest Increasing Subsequence",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//     ],
//   },
//   {
//     id: "m-strings-advanced",
//     title: "String Algorithms (Advanced)",
//     description: "Efficient pattern matching and preprocessing.",
//     level: "intermediate",
//     algos: [
//       {
//         id: "rabin-karp",
//         label: "Rabin–Karp",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "kmp",
//         label: "KMP Prefix Function (LPS)",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "z-algorithm",
//         label: "Z-Algorithm",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "manacher",
//         label: "Manacher’s Algorithm",
//         difficulty: "Hard",
//         effort: "High",
//       },
//     ],
//   },
//   {
//     id: "m-intervals",
//     title: "Intervals & Ranges",
//     description: "Sort, merge, and schedule intervals.",
//     level: "interview",
//     algos: [
//       {
//         id: "merge-intervals",
//         label: "Merge Intervals",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "insert-interval",
//         label: "Insert Interval",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "meeting-rooms",
//         label: "Meeting Rooms I/II",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "non-overlapping",
//         label: "Non-Overlapping Intervals",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-binary-search-patterns",
//     title: "Binary Search Patterns",
//     description: "Search answers, not just indices.",
//     level: "interview",
//     algos: [
//       {
//         id: "first-last-pos",
//         label: "First/Last Position in Sorted Array",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "search-rotated",
//         label: "Search in Rotated Sorted Array",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "min-capacity-ship",
//         label: "Min Capacity to Ship Packages",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "koko-bananas",
//         label: "Koko Eating Bananas (BS on Answer)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-heaps-scheduling",
//     title: "Heaps & Scheduling Patterns",
//     description: "Use priority queues for ordering and deadlines.",
//     level: "interview",
//     algos: [
//       {
//         id: "task-scheduler",
//         label: "Task Scheduler",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "k-closest",
//         label: "K Closest Points",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "reorganize-string",
//         label: "Reorganize String",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//     ],
//   },
//   {
//     id: "m-graph-advanced",
//     title: "Graph Patterns (Interview)",
//     description: "Toposort, shortest paths, and unions.",
//     level: "interview",
//     algos: [
//       {
//         id: "toposort-kahn",
//         label: "Topological Sort (Kahn)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "course-schedule",
//         label: "Course Schedule (Cycle in Directed)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "dijkstra",
//         label: "Dijkstra’s Algorithm",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "union-find",
//         label: "Union–Find (DSU)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "mst-kruskal",
//         label: "Minimum Spanning Tree (Kruskal)",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//     ],
//   },
//   {
//     id: "m-tries",
//     title: "Tries & Prefix Structures",
//     description: "Fast prefix lookups for words and keys.",
//     level: "interview",
//     algos: [
//       {
//         id: "trie-impl",
//         label: "Trie (Insert/Search/StartsWith)",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "word-search-ii",
//         label: "Word Search II (Trie + DFS)",
//         difficulty: "Hard",
//         effort: "High",
//       },
//       {
//         id: "replace-words",
//         label: "Replace Words (Dictionary Rooting)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//     ],
//   },
//   {
//     id: "m-dp-interview",
//     title: "DP Patterns (Interview)",
//     description: "Subsequence, partition, and grid DP.",
//     level: "interview",
//     algos: [
//       {
//         id: "edit-distance",
//         label: "Edit Distance",
//         difficulty: "Hard",
//         effort: "High",
//       },
//       {
//         id: "lcs",
//         label: "Longest Common Subsequence",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//       {
//         id: "partition-equal",
//         label: "Partition Equal Subset Sum",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "unique-paths",
//         label: "Unique Paths (Grid DP)",
//         difficulty: "Easy",
//         effort: "Low–Medium",
//       },
//     ],
//   },
//   {
//     id: "m-matrix-grid",
//     title: "Matrix & Grid Patterns",
//     description: "Traverse, flood-fill, and islands.",
//     level: "interview",
//     algos: [
//       {
//         id: "spiral-matrix",
//         label: "Spiral Matrix",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "number-of-islands",
//         label: "Number of Islands",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "rotting-oranges",
//         label: "Rotting Oranges (BFS)",
//         difficulty: "Medium",
//         effort: "Medium",
//       },
//       {
//         id: "word-search",
//         label: "Word Search (Backtracking)",
//         difficulty: "Medium",
//         effort: "Medium–High",
//       },
//     ],
//   },
// ];
