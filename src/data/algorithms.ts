export interface AlgorithmMeta {
  name: string;
  category: "sorting" | "searching" | "array" | "linkedlist" | "graph";
  description: string;
  shortDescription: string;
  complexities: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  pseudocode?: string[];
  featured?: boolean;
  href: string;
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export const algorithms: Record<string, AlgorithmMeta> = {
  "bubble-sort": {
    name: "Bubble Sort",
    category: "sorting",
    description:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. It continues until the array is sorted.",
    shortDescription: "Simple sort by swapping adjacent elements.",
    complexities: {
      best: "O(N)",
      average: "O(N²)",
      worst: "O(N²)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the full array",
      "repeat until array is sorted:",
      "    compare each pair of neighbors",
      "    if left > right, swap them",
      "    mark the last element as sorted",
      "done (array is sorted)",
    ],
    href: "/learn/sorting?algorithm=bubble-sort",
    difficulty: "beginner",
    tags: ["Brute Force", "Stable"],
  },
  "quick-sort": {
    name: "Quick Sort",
    category: "sorting",
    description:
      "Quick Sort is a divide-and-conquer algorithm. It picks a pivot and partitions the array around the pivot, recursively sorting the partitions.",
    shortDescription: "Divide-and-conquer sorting using a pivot.",
    complexities: {
      best: "O(N log N)",
      average: "O(N log N)",
      worst: "O(N²)",
      space: "O(log N)",
    },
    pseudocode: [
      "start with the array",
      "choose the last element as the pivot",
      "    put all smaller elements to the left of the pivot",
      "    put all bigger elements to the right of the pivot",
      "place the pivot in its correct position",
      "recursively sort the left part",
      "recursively sort the right part",
      "done (array is sorted)",
    ],
    featured: true,
    href: "/learn/sorting?algorithm=quick-sort",
    difficulty: "intermediate",
    tags: ["Divide & Conquer", "Recursion", "In-place"],
  },
  "insertion-sort": {
    name: "Insertion Sort",
    category: "sorting",
    description:
      "Insertion Sort builds the sorted array one element at a time by repeatedly inserting the current element into its correct position among the already-sorted elements.",
    shortDescription: "Builds sorted array one item at a time.",
    complexities: {
      best: "O(N)",
      average: "O(N²)",
      worst: "O(N²)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the array",
      "for each element from the second one:",
      "    pick it as the 'key'",
      "    compare the key with previous elements",
      "        if key is smaller, shift the bigger one right",
      "    put the key in the correct spot",
      "mark elements up to here as sorted",
      "done (array is sorted)",
    ],
    featured: true,
    href: "/learn/sorting?algorithm=insertion-sort",
    difficulty: "beginner",
    tags: ["Stable", "Online"],
  },
  "selection-sort": {
    name: "Selection Sort",
    category: "sorting",
    description:
      "Selection Sort repeatedly selects the smallest element from the unsorted portion and swaps it with the first unsorted element, expanding the sorted portion one step at a time.",
    shortDescription: "Repeatedly selects the smallest element.",
    complexities: {
      best: "O(N²)",
      average: "O(N²)",
      worst: "O(N²)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the array",
      "for each position from start to end:",
      "    assume the first unsorted element is the smallest",
      "    compare it with the rest of the unsorted elements",
      "        if a smaller element is found, mark it as the new smallest",
      "    swap the smallest element with the first unsorted element",
      "    mark this element as sorted",
      "done (array is sorted)",
    ],
    href: "/learn/sorting?algorithm=selection-sort",
    difficulty: "beginner",
    tags: ["In-place", "Unstable"],
  },
  "merge-sort": {
    name: "Merge Sort",
    category: "sorting",
    description:
      "Merge Sort is a divide-and-conquer algorithm. It recursively splits the array into halves, sorts each half, and then merges the sorted halves back together.",
    shortDescription: "Splits array and merges sorted halves.",
    complexities: {
      best: "O(N log N)",
      average: "O(N log N)",
      worst: "O(N log N)",
      space: "O(N)",
    },
    pseudocode: [
      "start with the array",
      "split the array into two halves",
      "    recursively sort the left half",
      "    recursively sort the right half",
      "merge the two sorted halves:",
      "    compare the first elements of each half",
      "        move the smaller one into the new array",
      "    repeat until one half is empty",
      "    copy any remaining elements",
      "place the merged result back into the array",
      "done (array is sorted)",
    ],
    href: "/learn/sorting?algorithm=merge-sort",
    difficulty: "intermediate",
    tags: ["Divide & Conquer", "Stable", "Recursion"],
    featured: true,
  },
  "reverse-array": {
    name: "Reverse Array",
    category: "array",
    description:
      "Reverse Array swaps elements from both ends moving toward the center. It uses a two-pointer approach where one pointer starts at the beginning and another at the end, swapping until they meet. This reverses the array in-place.",
    shortDescription: "Reverses an array in-place using two pointers.",
    complexities: {
      best: "O(N)",
      average: "O(N)",
      worst: "O(N)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the array",
      "point to the first element (left) and the last element (right)",
      "while left is before right:",
      "    swap the two elements",
      "    move left forward and right back",
      "done (array is reversed)",
    ],
    href: "/learn/arrays?algorithm=reverse-array",
    difficulty: "beginner",
    tags: ["Two Pointers", "In-place", "Array"],
  },
  "rotate-array": {
    name: "Rotate Array by K steps",
    category: "array",
    description:
      "Rotate Array shifts elements in the array by a given number of steps. Each element is moved to a new position based on the rotation count, and the array is adjusted so that the order of elements wraps around. This results in the array being rotated to the left or right depending on the direction of rotation.",
    shortDescription: "Rotates an array by k steps, wrapping elements around.",
    complexities: {
      best: "O(N)",
      average: "O(N)",
      worst: "O(N)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the array and the number of steps (k)",
      "repeat k times:",
      "    take out the first element",
      "    move every other element one place to the left",
      "    put the taken element at the end",
      "done (array is rotated)",
    ],
    href: "/algorithms/array?algorithm=rotate-array",
    difficulty: "beginner",
    featured: true,
    tags: ["Array", "Rotation", "Two Pointers"],
  },
  "linear-search": {
    name: "Linear Search",
    category: "searching",
    description:
      "Linear Search scans each element in the array sequentially until the target is found or the end of the array is reached.",
    shortDescription: "Scans elements sequentially for target.",
    complexities: {
      best: "O(1)",
      average: "O(N)",
      worst: "O(N)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the array and the target value",
      "check each element one by one:",
      "    if the element = target → found",
      "    else if the element < target → keep checking",
      "    else if the element > target → keep checking",
      "if no element matches, return 'not found'",
    ],
    href: "/learn/searching?algorithm=linear-search",
    featured: true,
    difficulty: "beginner",
    tags: ["Brute Force", "Sequential"],
  },
  "binary-search": {
    name: "Binary Search",
    category: "searching",
    description:
      "Binary Search repeatedly divides the search interval in half. It compares the target with the middle element and eliminates half of the array each step, until the element is found or the interval is empty.",
    shortDescription: "Halves search space to find target fast.",
    complexities: {
      best: "O(1)",
      average: "O(log N)",
      worst: "O(log N)",
      space: "O(1)",
    },
    pseudocode: [
      "start with the array and the target value",
      "set the search range between the first and last element",
      "while the range is valid:",
      "    check the middle element",
      "    if the middle = target → found",
      "    else if the middle > target:",
      "        move the search range to the left half",
      "    else if the middle < target:",
      "        move the search range to the right half",
      "if the range becomes invalid → target not found",
    ],
    featured: true,
    href: "/learn/searching?algorithm=binary-search",
    difficulty: "beginner",
    tags: ["Divide & Conquer", "Efficient"],
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    category: "graph",
    description:
      "Depth-First Search explores as far as possible along one branch before backtracking. It is often used to traverse or search graph/tree structures, and can be implemented using recursion or a stack.",
    shortDescription: "Explores deep paths before backtracking.",
    complexities: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
      space: "O(V)",
    },
    pseudocode: [
      "function DFS(graph, start):",
      "   visited = set()",
      "   stack = [start]",
      "   while stack is not empty:",
      "       node = stack.pop()",
      "       if node not in visited:",
      "           mark node as visited",
      "           for neighbor in graph[node]:",
      "               if neighbor not in visited:",
      "                   stack.push(neighbor)",
    ],
    href: "/learn/pathfinding?algorithm=dfs",
    difficulty: "intermediate",
    tags: ["Graph Traversal", "Stack", "Recursion"],
  },
  bfs: {
    name: "Breadth-First Search (BFS)",
    category: "graph",
    description:
      "Breadth-First Search explores the graph level by level. It visits all neighbors of a node before moving to the next level. BFS is commonly used for finding the shortest path in unweighted graphs.",
    shortDescription: "Explores graph level by level.",
    complexities: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
      space: "O(V)",
    },
    pseudocode: [
      "function BFS(graph, start):",
      "   visited = set()",
      "   queue = [start]",
      "   while queue is not empty:",
      "       node = queue.pop(0)",
      "       if node not in visited:",
      "           mark node as visited",
      "           for neighbor in graph[node]:",
      "               if neighbor not in visited:",
      "                   queue.append(neighbor)",
    ],
    href: "/learn/pathfinding?algorithm=bfs",
    difficulty: "beginner",
    tags: ["Graph Traversal", "Queue", "Shortest Path"],
  },
};
