import type { Block, BacktrackingStep, TreeNode } from "../types";

export function* generatePermutations(
  arr: Block[]
): Generator<BacktrackingStep> {
  const a = [...arr];

  yield {
    type: "init",
    array: a,
    lines: [9, 10, 11],
    explanation: `We need to generate all possible permutations of [${a
      .map((b) => b.label ?? b.value)
      .join(", ")}].`,
  };

  let offset = 999;
  let nodeId = offset;
  let path: Block[] = [];
  let used: boolean[] = Array(a.length).fill(false);
  const leafNodeIds: number[] = [];

  const rootId = ++nodeId;

  yield {
    type: "pick",
    ids: [rootId],
    parentId: -1,
    lines: [1],
    node: {
      id: rootId,
      label: "{ }",
      parentId: -1,
      children: [],
      depth: 0,
    },
    explanation: "Start from the root node with an empty path {}.",
  };

  function* backtrack(parentId: number): Generator<BacktrackingStep> {
    if (path.length === a.length) {
      yield {
        type: "found",
        ids: [parentId],
        lines: [1, 2, 3],
        explanation: `A new permutation is formed: {${path
          .map((b) => b.label ?? b.value)
          .join(", ")}}`,
      };
      leafNodeIds.push(parentId);
      return;
    }

    for (let i = 0; i < a.length; i++) {
      if (used[i]) continue;

      const block = a[i];
      path.push(block);
      used[i] = true;

      const currentNodeId = ++nodeId;

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
        lines: [6, 7],
        explanation:
          path.length === 1
            ? `Choose ${
                block.label ?? block.value
              } as the first element of this permutation.`
            : `Choose ${
                block.label ?? block.value
              }, building permutation so far: {${path
                .map((b) => b.label ?? b.value)
                .join(", ")}}.`,
        pointers: { idx: block.id },
      };

      yield* backtrack(currentNodeId);

      path.pop();
      used[i] = false;

      yield {
        type: "unpick",
        ids: [currentNodeId],
        parentId,
        lines: [8],
        explanation: `Remove ${
          block.label ?? block.value
        } and try a different choice for this position.`,
      };

      const last = path[path.length - 1];
      yield {
        type: "highlight",
        ids: [...path.map((b) => b.id), parentId],
        lines: [4],
        explanation: `Back at {${path
          .map((b) => b.label ?? b.value)
          .join(", ")}}, trying the next unused element.`,
        pointers: { idx: last ? last.id : -1 },
      };
    }
  }

  yield* backtrack(rootId);

  yield {
    type: "done",
    ids: leafNodeIds,
    lines: [11],
    explanation: "TA-DA! All permutations have been generated.",
  };
}
