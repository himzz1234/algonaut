import type { Block, BacktrackingStep, TreeNode } from "../types";

const phoneMap: Record<string, string[]> = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
};

export function* generateLetterCombinations(
  digits: string
): Generator<BacktrackingStep> {
  const arr: Block[] = digits.split("").map((d, idx) => ({
    id: idx + 1,
    label: d,
    value: Number(d),
  }));

  const permanentPointers: Record<string, number> = {};
  arr.forEach((b) => {
    if (b.label) {
      permanentPointers[`"${phoneMap[b.label]?.join("") || ""}"`] = b.id;
    }
  });

  yield {
    type: "init",
    array: arr,
    lines: [10, 11],
    explanation:
      digits.length === 0
        ? "Input digits are empty, so there are no combinations."
        : `We need to generate all possible letter combinations for digits "${digits}".`,
  };

  let offset = 999;
  let nodeId = offset;
  let path: string[] = [];
  const leafNodeIds: number[] = [];

  const rootId = ++nodeId;
  yield {
    type: "pick",
    ids: [rootId],
    parentId: -1,
    lines: [0],
    node: {
      id: rootId,
      label: `" "`,
      parentId: -1,
      children: [],
      depth: 0,
    },
    explanation: `Start from the root node with an empty path "".`,
    pointers: { ...permanentPointers },
  };

  function* backtrack(
    index: number,
    parentId: number
  ): Generator<BacktrackingStep> {
    if (index === digits.length) {
      yield {
        type: "found",
        ids: [parentId],
        lines: [1, 2, 3],
        explanation: `A new combination is formed: "${path.join("")}".`,
        pointers: { ...permanentPointers },
      };

      leafNodeIds.push(parentId);
      return;
    }

    const digit = digits[index];
    const letters = phoneMap[digit] || [];

    for (const letter of letters) {
      path.push(letter);
      const currentNodeId = ++nodeId;

      const node: TreeNode = {
        id: currentNodeId,
        label: `"${path.join("")}"`,
        parentId,
        children: [],
        depth: path.length,
      };

      const digitBlock = arr[index];

      yield {
        type: "pick",
        ids: [...path.map((_, j) => arr[j].id), currentNodeId],
        parentId,
        node,
        lines: [4, 5, 6],
        explanation:
          path.length === 1
            ? `Pick letter '${letter}' from digit ${digit} as the first character.`
            : `Add letter '${letter}' for digit ${digit}, current path: "${path.join(
                ""
              )}".`,
        pointers: { ...permanentPointers, idx: digitBlock.id },
      };

      yield* backtrack(index + 1, currentNodeId);

      path.pop();

      yield {
        type: "unpick",
        ids: [currentNodeId],
        parentId,
        lines: [9],
        explanation: `Remove '${letter}' and try the next letter for digit ${digit}.`,
        pointers: { ...permanentPointers },
      };

      yield {
        type: "highlight",
        ids: [...path.map((_, j) => arr[j].id), parentId],
        lines: [5],
        explanation: `Back at prefix "${path.join(
          ""
        )}", exploring other letters for digit ${digit}.`,
        pointers: { ...permanentPointers },
      };
    }
  }

  yield* backtrack(0, rootId);

  yield {
    type: "done",
    ids: leafNodeIds,
    lines: [12, 13],
    explanation: "TA-DA! All possible letter combinations have been generated.",
  };
}
