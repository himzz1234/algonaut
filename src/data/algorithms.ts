export interface AlgorithmMeta {
  name: string;
  category: "sorting" | "searching" | "linkedlist" | "graph";
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
      "for i from 0 to N-1:",
      "   for j from 0 to N-i-1:",
      "      if arr[j] > arr[j+1]:",
      "         swap(arr[j], arr[j+1])",
    ],
    href: "/sorting?algorithm=bubble-sort",
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
      "function quicksort(arr):",
      "   if length(arr) <= 1: return arr",
      "   pivot = choose pivot",
      "   left = elements < pivot",
      "   right = elements > pivot",
      "   return quicksort(left) + pivot + quicksort(right)",
    ],
    featured: true,
    href: "/sorting?algorithm=quick-sort",
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
      "function insertionSort(arr):",
      "   for i from 1 to length(arr) - 1:",
      "       key = arr[i]",
      "       j = i - 1",
      "       while j >= 0 and arr[j] > key:",
      "           arr[j + 1] = arr[j]",
      "           j = j - 1",
      "       arr[j + 1] = key",
    ],
    featured: true,
    href: "/sorting?algorithm=insertion-sort",
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
      "function selectionSort(arr):",
      "   for i from 0 to length(arr) - 1:",
      "       minIndex = i",
      "       for j from i+1 to length(arr) - 1:",
      "           if arr[j] < arr[minIndex]:",
      "               minIndex = j",
      "       swap arr[i] with arr[minIndex]",
    ],
    href: "/sorting?algorithm=selection-sort",
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
      "function mergeSort(arr):",
      "   if length(arr) <= 1: return arr",
      "   mid = length(arr) / 2",
      "   left = mergeSort(arr[0...mid-1])",
      "   right = mergeSort(arr[mid...end])",
      "   return merge(left, right)",
      "",
      "function merge(left, right):",
      "   result = []",
      "   while left and right are not empty:",
      "       if left[0] <= right[0]:",
      "           append left[0] to result",
      "           remove left[0] from left",
      "       else:",
      "           append right[0] to result",
      "           remove right[0] from right",
      "   append remaining elements of left and right to result",
      "   return result",
    ],
    href: "/sorting?algorithm=merge-sort",
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
      "function linearSearch(arr, target):",
      "   for i from 0 to length(arr) - 1:",
      "       if arr[i] == target:",
      "           return i",
      "   return -1",
    ],
    href: "/searching?algorithm=linear-search",
    featured: true,
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
      "function binarySearch(arr, target):",
      "   left = 0, right = length(arr) - 1",
      "   while left <= right:",
      "       mid = floor((left + right) / 2)",
      "       if arr[mid] == target:",
      "           return mid",
      "       else if arr[mid] < target:",
      "           left = mid + 1",
      "       else:",
      "           right = mid - 1",
      "   return -1",
    ],
    featured: true,
    href: "/searching?algorithm=binary-search",
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
    href: "/pathfinding?algorithm=dfs",
    featured: true,
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
    featured: true,
    href: "/pathfinding?algorithm=bfs",
  },
};
