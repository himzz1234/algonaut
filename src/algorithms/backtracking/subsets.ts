import type { Block, BacktrackingStep, TreeNode } from "../types";

export function* generateSubsets(arr: Block[]): Generator<BacktrackingStep> {
  const a = [...arr];

  yield {
    type: "init",
    array: a,
    lines: [7, 8],
    explanation: `We need to generate all possible subsets of [${a
      .map((b) => b.label ?? b.value)
      .join(", ")}].`,
  };

  let offset = 999;
  let nodeId = offset;
  let path: Block[] = [];
  const allNodeIds: number[] = [];

  const rootId = ++nodeId;
  allNodeIds.push(rootId);

  yield {
    type: "pick",
    ids: [rootId],
    parentId: -1,
    lines: [0],
    node: {
      id: rootId,
      label: "{ }",
      parentId: -1,
      children: [],
      depth: 0,
    },
    explanation: "Start from the root node with an empty subset {}.",
  };

  function* backtrack(
    start: number,
    parentId: number
  ): Generator<BacktrackingStep> {
    yield {
      type: "found",
      ids: [parentId],
      lines: [1],
      explanation: `We add the current subset {${
        path.map((b) => b.label ?? b.value).join(", ") || " "
      }} to the result list.`,
    };

    for (let i = start; i < a.length; i++) {
      const block = a[i];
      path.push(block);

      const currentNodeId = ++nodeId;
      allNodeIds.push(currentNodeId);

      const node: TreeNode = {
        id: currentNodeId,
        label: `{${path.map((b) => b.label ?? b.value).join(", ")}}`,
        parentId,
        children: [],
        depth: path.length,
      };

      yield {
        type: "pick",
        ids: [...path.map((b) => b.id), currentNodeId],
        parentId,
        node,
        lines: [3, 4],
        explanation:
          path.length === 1
            ? `Pick ${block.label ?? block.value} to start a new subset.`
            : `Add ${
                block.label ?? block.value
              } to the current subset, now we have {${path
                .map((b) => b.label ?? b.value)
                .join(", ")}}.`,
        pointers: { idx: block.id, start: path[0].id },
      };

      yield* backtrack(i + 1, currentNodeId);

      path.pop();

      yield {
        type: "unpick",
        ids: [currentNodeId],
        parentId,
        lines: [5],
        explanation:
          i === a.length - 1
            ? `No more elements left after ${
                block.label ?? block.value
              }, go back to {${path
                .map((b) => b.label ?? b.value)
                .join(", ")}}.`
            : `Finished exploring subsets with ${
                block.label ?? block.value
              }, backtrack to {${path
                .map((b) => b.label ?? b.value)
                .join(", ")}}.`,
      };

      const first = path[0];
      const last = path[path.length - 1];
      yield {
        type: "highlight",
        ids: [...path.map((b) => b.id), parentId],
        lines: [4],
        explanation: `Back at {${path
          .map((b) => b.label ?? b.value)
          .join(", ")}}, try the next element from here.`,
        pointers: { idx: last ? last.id : -1, start: first ? first.id : -1 },
      };
    }
  }

  yield* backtrack(0, rootId);

  yield {
    type: "done",
    ids: allNodeIds,
    lines: [8],
    explanation: "TA-DA! All subsets have been generated and returned.",
    pointers: {
      start: { ids: [], value: a.length },
    },
  };
}
