export interface AlgorithmMeta {
  name: string;
  category: "sorting" | "searching" | "linkedlist" | "graph";
  description: string;
  complexities: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  pseudocode?: string[];
}

export const algorithms: Record<string, AlgorithmMeta> = {
  "bubble-sort": {
    name: "Bubble Sort",
    category: "sorting",
    description:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. It continues until the array is sorted.",
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
  },
  "quick-sort": {
    name: "Quick Sort",
    category: "sorting",
    description:
      "Quick Sort is a divide-and-conquer algorithm. It picks a pivot and partitions the array around the pivot, recursively sorting the partitions.",
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
  },
  "insertion-sort": {
    name: "Insertion Sort",
    category: "sorting",
    description:
      "Insertion Sort builds the sorted array one element at a time by repeatedly inserting the current element into its correct position among the already-sorted elements.",
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
  },

  "selection-sort": {
    name: "Selection Sort",
    category: "sorting",
    description:
      "Selection Sort repeatedly selects the smallest element from the unsorted portion and swaps it with the first unsorted element, expanding the sorted portion one step at a time.",
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
  },

  "merge-sort": {
    name: "Merge Sort",
    category: "sorting",
    description:
      "Merge Sort is a divide-and-conquer algorithm. It recursively splits the array into halves, sorts each half, and then merges the sorted halves back together.",
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
  },

  "linear-search": {
    name: "Linear Search",
    category: "searching",
    description:
      "Linear Search scans each element in the array sequentially until the target is found or the end of the array is reached.",
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
  },

  "binary-search": {
    name: "Binary Search",
    category: "searching",
    description:
      "Binary Search repeatedly divides the search interval in half. It compares the target with the middle element and eliminates half of the array each step, until the element is found or the interval is empty.",
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
  },
};
