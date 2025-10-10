import { type ModuleIntro } from "../modules";

export const sortingIntro: ModuleIntro = {
  heading: "Sorting Algorithms",
  difficulty: "Beginner – Intermediate",
  estimatedTime: "1–2 hours",
  sections: [
    {
      title: "What is Sorting",
      blocks: [
        {
          type: "text",
          content:
            "Sorting is the process of arranging the items in a list or array in a specific order. Most commonly, this means putting elements in ascending or descending order. It’s a simple but powerful operation that makes data easier to search, process, and work with.",
        },
      ],
    },
    {
      title: "A Real World Analogy",
      blocks: [
        {
          type: "text",
          content:
            "Imagine holding a set of playing cards and sorting them in your hand. You might start with a few cards and then insert each new card in its proper place. By the end, all the cards are in order. Sorting algorithms work in a very similar way: they compare elements and move them around until everything is where it should be.",
        },
      ],
    },
    {
      title: "Why Sorting Matters",
      blocks: [
        {
          type: "text",
          content:
            "Sorting isn’t just an algorithm that stands on its own. It plays a big role in making complex problems easier to solve. When data is sorted, searching becomes faster, merging becomes simpler, and many algorithms become more efficient overall.",
        },
        {
          type: "list",
          items: [
            "Sorting is often the first step before using algorithms like binary search.",
            "It helps organize large amounts of data in a structured way.",
            "It makes it easier to merge, group, and process data.",
            "It is used everywhere from leaderboards and price lists to system logs and schedules.",
          ],
        },
      ],
    },
    {
      title: "Types of Sorting Algorithms",
      blocks: [
        {
          type: "text",
          content:
            "Sorting algorithms can be divided into two broad categories. Comparison-based algorithms work by comparing elements to decide their order. Non-comparison-based algorithms use other techniques, like counting or digit processing, to arrange elements.",
        },
        {
          type: "list",
          items: [
            "Comparison-based algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.",
            "Non-comparison-based algorithms include Counting Sort and Radix Sort.",
          ],
        },
      ],
    },
    {
      title: "Performance and Tradeoffs",
      blocks: [
        {
          type: "text",
          content:
            "Not all sorting algorithms are the same. Some are very simple to write but can be slow when working with large amounts of data. Others are faster and more efficient but a little more complex to understand. Choosing the right algorithm depends on what kind of data you have and what matters most: speed, memory, or simplicity.",
        },
        {
          type: "list",
          items: [
            "Bubble Sort and Insertion Sort are simple but slower on big lists.",
            "Merge Sort and Quick Sort work well on large datasets and are commonly used in practice.",
            "Some algorithms use extra memory while others work in place.",
            "Some algorithms keep the order of equal elements, which is called stability.",
          ],
        },
      ],
    },
    {
      title: "Key Ideas to Pay Attention To",
      blocks: [
        {
          type: "list",
          items: [
            "How elements are compared and moved around.",
            "How the sorted portion of the list grows as the algorithm runs.",
            "Which algorithms are more efficient for larger datasets.",
            "Whether the algorithm is stable or in-place.",
          ],
        },
      ],
    },
    {
      title: "Where Sorting is Used",
      blocks: [
        {
          type: "text",
          content:
            "Sorting is everywhere in computing. You use it every time you order something online by price or rating, or when a game shows you the leaderboard. Sorting happens behind the scenes in search engines, scheduling systems, data processing pipelines, and even operating systems.",
        },
      ],
    },
    {
      title: "What You'll Learn",
      blocks: [
        {
          type: "text",
          content:
            "In this module, you’ll learn how different sorting algorithms work, why they exist, and when to use them. You’ll build a clear understanding of how they move data around, how they compare elements, and how their performance changes depending on the situation.",
        },
      ],
    },
    {
      blocks: [
        {
          type: "quote",
          content:
            "“Sorting isn’t just about putting things in order. It’s about making everything that comes after simpler and faster.”",
        },
      ],
    },
  ],
};
