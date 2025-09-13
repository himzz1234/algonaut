export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export const quizzes: Record<string, Question[]> = {
  "bubble-sort": [
    {
      id: 1,
      question: "What is the main idea of Bubble Sort?",
      options: [
        "Swapping adjacent elements until sorted",
        "Splitting array and merging halves",
        "Inserting elements in sorted position",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the average time complexity of Bubble Sort?",
      options: ["O(N)", "O(N log N)", "O(N²)"],
      answer: 2,
    },
    {
      id: 3,
      question: "Bubble Sort is considered:",
      options: ["Stable", "Unstable"],
      answer: 0,
    },
    {
      id: 4,
      question: "Which scenario gives the best performance for Bubble Sort?",
      options: ["Already sorted array", "Reverse sorted array", "Random array"],
      answer: 0,
    },
    {
      id: 5,
      question:
        "How many passes are required in the worst case for an array of size N?",
      options: ["N", "N-1", "N log N"],
      answer: 1,
    },
  ],
  "selection-sort": [
    {
      id: 1,
      question: "What does Selection Sort repeatedly do?",
      options: [
        "Swaps adjacent elements",
        "Selects the smallest element from the unsorted portion",
        "Splits array into halves",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the space complexity of Selection Sort?",
      options: ["O(N)", "O(1)", "O(N log N)"],
      answer: 1,
    },
    {
      id: 3,
      question:
        "Does Selection Sort maintain relative order of equal elements?",
      options: ["Yes", "No"],
      answer: 1,
    },
    {
      id: 4,
      question: "How many swaps happen in Selection Sort (worst case)?",
      options: ["O(N²)", "O(N)", "O(log N)"],
      answer: 1,
    },
  ],
  "insertion-sort": [
    {
      id: 1,
      question: "Insertion Sort builds the sorted array by:",
      options: [
        "Recursively dividing the array",
        "Inserting each element into its correct position",
        "Swapping adjacent pairs",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the best-case time complexity of Insertion Sort?",
      options: ["O(N)", "O(N²)", "O(log N)"],
      answer: 0,
    },
    {
      id: 3,
      question: "Insertion Sort is efficient when:",
      options: [
        "Array is nearly sorted",
        "Array is random",
        "Array is reverse sorted",
      ],
      answer: 0,
    },
    {
      id: 4,
      question:
        "Which sorting algorithm does Insertion Sort resemble conceptually?",
      options: [
        "Playing cards sorting by hand",
        "Merging piles",
        "Heap adjustment",
      ],
      answer: 0,
    },
  ],
  "merge-sort": [
    {
      id: 1,
      question: "Merge Sort is based on which technique?",
      options: ["Divide and Conquer", "Dynamic Programming", "Greedy"],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the space complexity of Merge Sort?",
      options: ["O(1)", "O(N)", "O(N log N)"],
      answer: 1,
    },
    {
      id: 3,
      question: "What is the time complexity of Merge Sort in the worst case?",
      options: ["O(N log N)", "O(N²)", "O(N)"],
      answer: 0,
    },
    {
      id: 4,
      question: "Is Merge Sort an in-place algorithm?",
      options: ["Yes", "No"],
      answer: 1,
    },
    {
      id: 5,
      question: "Which step dominates Merge Sort’s runtime?",
      options: ["Dividing array", "Merging arrays", "Choosing pivots"],
      answer: 1,
    },
  ],
  "quick-sort": [
    {
      id: 1,
      question: "Quick Sort chooses a pivot and:",
      options: [
        "Merges sorted halves",
        "Partitions elements into two sides",
        "Shifts elements like Insertion Sort",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(N log N)", "O(N²)", "O(N)"],
      answer: 1,
    },
    {
      id: 3,
      question: "Quick Sort is typically implemented as:",
      options: ["Stable", "Unstable"],
      answer: 1,
    },
    {
      id: 4,
      question: "Worst-case of Quick Sort happens when pivot is:",
      options: [
        "Middle element",
        "Always smallest or largest",
        "Random element",
      ],
      answer: 1,
    },
    {
      id: 5,
      question: "Which optimization improves Quick Sort performance?",
      options: [
        "Median-of-three pivot",
        "Always pick first element",
        "Stop recursion early",
      ],
      answer: 0,
    },
  ],
  "reverse-array": [
    {
      id: 1,
      question: "What is the main technique used to reverse an array?",
      options: [
        "Stack push-pop",
        "Two pointers swapping ends",
        "Divide and Conquer",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the time complexity of reversing an array?",
      options: ["O(N)", "O(N²)", "O(log N)"],
      answer: 0,
    },
    {
      id: 3,
      question: "Reversing an array in-place requires:",
      options: ["Extra O(N) space", "Constant space", "Stack for recursion"],
      answer: 1,
    },
  ],
  "rotate-array": [
    {
      id: 1,
      question: "Rotating an array by K steps shifts elements:",
      options: [
        "By swapping neighbors",
        "By moving them K positions with wrap-around",
        "By sorting them again",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the time complexity of array rotation?",
      options: ["O(N)", "O(N²)", "O(K)"],
      answer: 0,
    },
    {
      id: 3,
      question: "Rotating by N (array length) results in:",
      options: ["Same array", "Reversed array", "Empty array"],
      answer: 0,
    },
  ],
  kadane: [
    {
      id: 1,
      question: "Kadane’s algorithm is used to:",
      options: [
        "Find max element",
        "Find maximum sum subarray",
        "Sort an array",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the time complexity of Kadane’s algorithm?",
      options: ["O(N)", "O(N²)", "O(log N)"],
      answer: 0,
    },
    {
      id: 3,
      question: "Kadane’s algorithm fails if array contains:",
      options: [
        "All negative numbers",
        "All positive numbers",
        "Mixed numbers",
      ],
      answer: 0,
    },
  ],
  "prefix-sum": [
    {
      id: 1,
      question: "Prefix Sum is mainly used for:",
      options: [
        "Fast range sum queries",
        "Sorting arrays",
        "Finding maximum element",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the space complexity of Prefix Sum?",
      options: ["O(N)", "O(1)", "O(N log N)"],
      answer: 0,
    },
  ],

  "move-zeroes": [
    {
      id: 1,
      question: "The goal of Move Zeroes algorithm is:",
      options: [
        "Sort the array",
        "Move all zeroes to the end while maintaining order",
        "Count number of zeroes",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the time complexity of Move Zeroes?",
      options: ["O(N)", "O(N²)", "O(log N)"],
      answer: 0,
    },
  ],
  "linear-search": [
    {
      id: 1,
      question: "Linear Search works by:",
      options: [
        "Checking each element sequentially",
        "Dividing the array in half",
        "Using hashing",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "Best case time complexity of Linear Search is:",
      options: ["O(1)", "O(N)", "O(N log N)"],
      answer: 0,
    },
    {
      id: 3,
      question: "Linear Search is preferred when:",
      options: [
        "Array is small or unsorted",
        "Array is large and sorted",
        "Array is hashed",
      ],
      answer: 0,
    },
  ],
  "binary-search": [
    {
      id: 1,
      question: "Binary Search requires the array to be:",
      options: ["Unsorted", "Sorted", "Randomized"],
      answer: 1,
    },
    {
      id: 2,
      question: "Average time complexity of Binary Search is:",
      options: ["O(N)", "O(N log N)", "O(log N)"],
      answer: 2,
    },
    {
      id: 3,
      question: "If target is less than mid element, Binary Search:",
      options: [
        "Searches left half",
        "Searches right half",
        "Stops immediately",
      ],
      answer: 0,
    },
  ],

  "find-min-max": [
    {
      id: 1,
      question: "The Min-Max algorithm finds:",
      options: [
        "Only minimum element",
        "Only maximum element",
        "Both minimum and maximum",
      ],
      answer: 2,
    },
    {
      id: 2,
      question: "What is the time complexity of finding min & max in one scan?",
      options: ["O(N)", "O(N log N)", "O(N²)"],
      answer: 0,
    },
  ],

  factorial: [
    {
      id: 1,
      question: "What is the base case of factorial recursion?",
      options: ["n == 0 or 1", "n == 2", "n < 0"],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the space complexity of recursive factorial?",
      options: ["O(1)", "O(N)", "O(N²)"],
      answer: 1,
    },
  ],

  fibonacci: [
    {
      id: 1,
      question: "Recursive Fibonacci has what time complexity?",
      options: ["O(N)", "O(N²)", "O(2^N)"],
      answer: 2,
    },
    {
      id: 2,
      question: "What are the base cases of Fibonacci?",
      options: ["F(0)=0, F(1)=1", "F(1)=1, F(2)=2", "F(0)=1, F(1)=1"],
      answer: 0,
    },
  ],

  "sum-n": [
    {
      id: 1,
      question: "The recursive formula for sum of first N numbers is:",
      options: ["n + sumN(n-1)", "n * sumN(n-1)", "n - sumN(n-1)"],
      answer: 0,
    },
    {
      id: 2,
      question: "Base case of sumN recursion is:",
      options: ["n==0 returns 0", "n==1 returns 0", "n==2 returns 2"],
      answer: 0,
    },
  ],

  "tower-of-hanoi": [
    {
      id: 1,
      question: "Tower of Hanoi demonstrates:",
      options: [
        "Divide and Conquer recursion",
        "Greedy approach",
        "Dynamic Programming",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "Time complexity of Tower of Hanoi with N disks is:",
      options: ["O(N)", "O(N log N)", "O(2^N)"],
      answer: 2,
    },
  ],

  "reverse-string": [
    {
      id: 1,
      question: "Recursive string reversal works by:",
      options: [
        "Appending first char after reversing the rest",
        "Swapping ends",
        "Using a stack",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the space complexity of recursive string reversal?",
      options: ["O(1)", "O(N)", "O(N log N)"],
      answer: 1,
    },
  ],

  "check-odd-even": [
    {
      id: 1,
      question: "How do you check if a number is odd using bits?",
      options: ["n & 1 == 1", "n % 2 == 0", "n >> 1"],
      answer: 0,
    },
    {
      id: 2,
      question: "Checking odd/even using bitwise operations takes:",
      options: ["O(1)", "O(N)", "O(log N)"],
      answer: 0,
    },
  ],

  "ith-bit": [
    {
      id: 1,
      question: "Which operation gets the ith bit?",
      options: ["n & (1<<i)", "n | (1<<i)", "n ^ (1<<i)"],
      answer: 0,
    },
    {
      id: 2,
      question: "Which operation toggles the ith bit?",
      options: ["n & (1<<i)", "n | (1<<i)", "n ^ (1<<i)"],
      answer: 2,
    },
  ],

  "count-bits": [
    {
      id: 1,
      question: "Brian Kernighan’s algorithm clears:",
      options: ["Highest set bit", "Lowest set bit", "All set bits at once"],
      answer: 1,
    },
    {
      id: 2,
      question: "Time complexity depends on:",
      options: ["Number of bits set", "Array length", "Value of n squared"],
      answer: 0,
    },
  ],

  "single-number": [
    {
      id: 1,
      question: "XOR is used in single number problem because:",
      options: [
        "XOR of duplicates cancels out",
        "XOR sorts the numbers",
        "XOR gives maximum value",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the space complexity of single number algorithm?",
      options: ["O(1)", "O(N)", "O(log N)"],
      answer: 0,
    },
  ],

  "power-of-two": [
    {
      id: 1,
      question: "A number is power of two if:",
      options: ["It has one set bit", "It is even", "It is divisible by 4"],
      answer: 0,
    },
    {
      id: 2,
      question: "Which expression checks power of two?",
      options: ["n & (n-1) == 0", "n | (n-1) == 0", "n ^ (n-1) == 0"],
      answer: 0,
    },
  ],

  "swap-using-xor": [
    {
      id: 1,
      question: "The XOR swap trick avoids using:",
      options: ["Extra variable", "Array", "Loop"],
      answer: 0,
    },
    {
      id: 2,
      question: "Time complexity of XOR swap is:",
      options: ["O(1)", "O(N)", "O(N²)"],
      answer: 0,
    },
  ],

  "lowest-set-bit": [
    {
      id: 1,
      question: "Expression to extract lowest set bit is:",
      options: ["n & -n", "n & (n-1)", "n | -n"],
      answer: 0,
    },
  ],

  "clear-lowest-set-bit": [
    {
      id: 1,
      question: "Expression to clear lowest set bit is:",
      options: ["n & (n-1)", "n | (n-1)", "n ^ (n-1)"],
      answer: 0,
    },
  ],

  "ll-insert-end": [
    {
      id: 1,
      question: "Inserting at the end of a singly linked list takes:",
      options: ["O(1)", "O(N)", "O(N²)"],
      answer: 1,
    },
    {
      id: 2,
      question: "Why is it O(N)?",
      options: [
        "We traverse to the last node",
        "We use recursion",
        "We need to reallocate all nodes",
      ],
      answer: 0,
    },
  ],
  "ll-reverse": [
    {
      id: 1,
      question: "Reversing a linked list requires:",
      options: ["Reversing pointers", "Swapping data", "Sorting nodes"],
      answer: 0,
    },
    {
      id: 2,
      question: "Time complexity of linked list reversal is:",
      options: ["O(N)", "O(N²)", "O(log N)"],
      answer: 0,
    },
    {
      id: 3,
      question: "Reversing a linked list iteratively requires:",
      options: ["Three pointers", "One pointer", "Hash table"],
      answer: 0,
    },
  ],
  "ll-cycle-detect-floyd": [
    {
      id: 1,
      question: "Floyd’s cycle detection uses:",
      options: [
        "Two pointers moving at different speeds",
        "Sorting nodes",
        "Hashing node values",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "What is the space complexity?",
      options: ["O(1)", "O(N)", "O(N²)"],
      answer: 0,
    },
  ],

  "ll-merge-two-sorted": [
    {
      id: 1,
      question: "Merging two sorted linked lists runs in:",
      options: ["O(N + M)", "O(N*M)", "O(N²)"],
      answer: 0,
    },
    {
      id: 2,
      question: "Merging is typically done by:",
      options: [
        "Rewiring next pointers",
        "Copying into arrays",
        "Sorting nodes again",
      ],
      answer: 0,
    },
  ],

  "ll-middle-node": [
    {
      id: 1,
      question: "Finding the middle node uses:",
      options: ["Slow and fast pointers", "Hashing nodes", "Binary search"],
      answer: 0,
    },
    {
      id: 2,
      question: "Time complexity of middle node finding is:",
      options: ["O(N)", "O(N log N)", "O(N²)"],
      answer: 0,
    },
  ],

  "two-sum-sorted": [
    {
      id: 1,
      question: "Two sum in sorted array uses:",
      options: [
        "Brute force pairs",
        "Two pointers inward",
        "Binary search for each element",
      ],
      answer: 1,
    },
  ],

  "remove-duplicates-sorted": [
    {
      id: 1,
      question: "Removing duplicates from sorted array uses:",
      options: ["Two pointers (read & write)", "Sorting again", "Hash table"],
      answer: 0,
    },
  ],

  "container-most-water": [
    {
      id: 1,
      question: "Container With Most Water is solved using:",
      options: ["Two pointers", "Dynamic Programming", "Greedy heap"],
      answer: 0,
    },
    {
      id: 2,
      question: "Area is computed as:",
      options: [
        "(right-left) * min(height[left], height[right])",
        "(right+left) * max(height[left], height[right])",
        "right-left",
      ],
      answer: 0,
    },
  ],

  "trap-rain-water": [
    {
      id: 1,
      question: "Trapping rain water uses:",
      options: ["LeftMax & RightMax tracking", "Sorting bars", "Binary search"],
      answer: 0,
    },
    {
      id: 2,
      question: "Time complexity is:",
      options: ["O(N)", "O(N²)", "O(N log N)"],
      answer: 0,
    },
  ],

  "max-sum-subarray-k": [
    {
      id: 1,
      question: "Max sum subarray of size K uses:",
      options: ["Sliding window", "Sorting", "Binary search"],
      answer: 0,
    },
  ],

  "longest-substring-without-repeat": [
    {
      id: 1,
      question: "Longest substring without repeats uses:",
      options: [
        "Sliding window with set/map",
        "Binary search",
        "Divide and conquer",
      ],
      answer: 0,
    },
  ],

  "min-window-substring": [
    {
      id: 1,
      question: "Minimum window substring is solved by:",
      options: [
        "Sliding window with frequency map",
        "Sorting substrings",
        "Greedy skipping",
      ],
      answer: 0,
    },
  ],

  "sliding-window-median": [
    {
      id: 1,
      question: "Sliding window median uses:",
      options: ["Two heaps (max + min)", "Two pointers", "Hash maps"],
      answer: 0,
    },
  ],

  dfs: [
    {
      id: 1,
      question: "DFS explores:",
      options: [
        "Level by level",
        "As deep as possible before backtracking",
        "Only neighbors of start node",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "Space complexity of DFS is:",
      options: ["O(V)", "O(E)", "O(1)"],
      answer: 0,
    },
  ],

  bfs: [
    {
      id: 1,
      question: "BFS explores:",
      options: ["Depth-first", "Level by level", "Only leaves"],
      answer: 1,
    },
    {
      id: 2,
      question: "BFS uses which data structure?",
      options: ["Queue", "Stack", "Heap"],
      answer: 0,
    },
  ],
};
