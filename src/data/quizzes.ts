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
    {
      id: 3,
      question: "Why does n & 1 work to check odd/even?",
      options: [
        "Because the least significant bit represents 1’s place",
        "Because AND always returns 1 for odd numbers",
        "Because 1 is a mask for all bits",
      ],
      answer: 0,
    },
    {
      id: 4,
      question: "If n is even, what is the result of n & 1?",
      options: ["0", "1", "Depends on n"],
      answer: 0,
    },
  ],
  "count-set-bits": [
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
    {
      id: 3,
      question: "What does n & (n-1) do?",
      options: [
        "Unsets the rightmost set bit",
        "Unsets the leftmost set bit",
        "Flips all bits",
      ],
      answer: 0,
    },
    {
      id: 4,
      question:
        "If n = 15 (1111), how many iterations will Brian Kernighan’s algorithm take?",
      options: ["1", "4", "log2(n)"],
      answer: 1,
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
    {
      id: 3,
      question: "Why must n > 0 when checking power of two?",
      options: [
        "Because 0 also satisfies n & (n-1) == 0",
        "Because negative numbers can be powers of two",
        "Because the AND operation doesn’t work for zero",
      ],
      answer: 0,
    },
    {
      id: 4,
      question: "Which of these numbers is NOT a power of two?",
      options: ["1", "8", "12"],
      answer: 2,
    },
  ],
  "get-ith-bit": [
    {
      id: 1,
      question: "How do you check if the i-th bit of n is set?",
      options: ["(n & (1 << i)) != 0", "(n | (1 << i))", "(n ^ (1 << i))"],
      answer: 0,
    },
    {
      id: 2,
      question: "If n = 13 (1101), what is the 2nd bit (0-indexed)?",
      options: ["0", "1", "2"],
      answer: 1,
    },
    {
      id: 3,
      question: "Time complexity of get-ith-bit is:",
      options: ["O(1)", "O(log n)", "O(n)"],
      answer: 0,
    },
  ],
  "set-ith-bit": [
    {
      id: 1,
      question: "How do you set the i-th bit of n?",
      options: ["n | (1 << i)", "n & (1 << i)", "n ^ (1 << i)"],
      answer: 0,
    },
    {
      id: 2,
      question: "If n = 8 (1000), setting the 0th bit gives:",
      options: ["9 (1001)", "8 (1000)", "7 (0111)"],
      answer: 0,
    },
    {
      id: 3,
      question: "What happens if the i-th bit is already set?",
      options: ["It remains set", "It gets toggled off", "It resets to 0"],
      answer: 0,
    },
  ],
  "clear-ith-bit": [
    {
      id: 1,
      question: "How do you clear the i-th bit of n?",
      options: ["n & ~(1 << i)", "n | (1 << i)", "n ^ (1 << i)"],
      answer: 0,
    },
    {
      id: 2,
      question: "If n = 7 (0111), clearing the 1st bit gives:",
      options: ["5 (0101)", "6 (0110)", "3 (0011)"],
      answer: 1,
    },
    {
      id: 3,
      question: "What does ~ (bitwise NOT) do in the mask?",
      options: [
        "Inverts the mask bits so only i-th bit is 0",
        "Clears all bits",
        "Sets only the i-th bit",
      ],
      answer: 0,
    },
  ],
  "toggle-ith-bit": [
    {
      id: 1,
      question: "How do you toggle the i-th bit of n?",
      options: ["n ^ (1 << i)", "n | (1 << i)", "n & ~(1 << i)"],
      answer: 0,
    },
    {
      id: 2,
      question: "If n = 5 (0101), toggling the 0th bit gives:",
      options: ["4 (0100)", "5 (0101)", "7 (0111)"],
      answer: 2,
    },
    {
      id: 3,
      question: "If you toggle the same bit twice, the result is:",
      options: [
        "The bit stays unchanged",
        "The bit clears permanently",
        "Random",
      ],
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
    {
      id: 2,
      question: "Why does the two pointers approach work for a sorted array?",
      options: [
        "Because sorting eliminates duplicates",
        "Because we can move pointers based on sum comparison",
        "Because binary search is faster on sorted arrays",
      ],
      answer: 1,
    },
    {
      id: 3,
      question: "Time complexity of the two-pointer two-sum solution is:",
      options: ["O(n)", "O(n log n)", "O(n^2)"],
      answer: 0,
    },
  ],

  "three-sum": [
    {
      id: 1,
      question: "What is the typical first step in solving three-sum?",
      options: [
        "Build a hash map",
        "Sort the array",
        "Use dynamic programming",
      ],
      answer: 1,
    },
    {
      id: 2,
      question:
        "Which technique is used after fixing one element in three-sum?",
      options: [
        "Hash map lookups",
        "Two pointers inward",
        "Divide and conquer",
      ],
      answer: 1,
    },
    {
      id: 3,
      question: "How are duplicates usually avoided in three-sum?",
      options: [
        "Using a hash set of triplets",
        "Skipping identical numbers during iteration",
        "Sorting multiple times",
      ],
      answer: 1,
    },
    {
      id: 4,
      question: "Time complexity of the standard three-sum solution is:",
      options: ["O(n)", "O(n^2)", "O(n^3)"],
      answer: 1,
    },
  ],

  "container-most-water": [
    {
      id: 1,
      question: "What is the two-pointer strategy in container-most-water?",
      options: [
        "Move the taller line inward",
        "Move the shorter line inward",
        "Move both lines inward together",
      ],
      answer: 1,
    },
    {
      id: 2,
      question:
        "Why do we move the shorter line inward in container-most-water?",
      options: [
        "Because only the shorter line limits area",
        "Because it’s always optimal",
        "Because it reduces time complexity",
      ],
      answer: 0,
    },
    {
      id: 3,
      question: "Time complexity of the container-most-water solution is:",
      options: ["O(n)", "O(n log n)", "O(n^2)"],
      answer: 0,
    },
    {
      id: 4,
      question: "What is the key idea of the container-most-water problem?",
      options: [
        "Maximize base × height with two lines",
        "Find largest rectangle in histogram",
        "Use dynamic programming for max area",
      ],
      answer: 0,
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
