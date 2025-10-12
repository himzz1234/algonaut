import type { Block, BacktrackingTreeStep, TreeNode } from "../types";

export function* generatePermutations(
  arr: Block[]
): Generator<BacktrackingTreeStep> {
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
    ids: [],
    nodeIds: [rootId],
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

  function* backtrack(parentId: number): Generator<BacktrackingTreeStep> {
    if (path.length === a.length) {
      yield {
        type: "found",
        ids: [...path.map((b) => b.id)],
        nodeIds: [parentId],
        lines: [1, 2, 3],
        explanation: `A new permutation is formed: {${path
          .map((b) => b.label ?? b.value)
          .join(", ")}}`,
        pointers: {
          idx: path.length > 0 ? path[path.length - 1].id : -1,
        },
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
        ids: [...path.map((b) => b.id)],
        nodeIds: [currentNodeId],
        parentId,
        node,
        lines: [6, 7],
        explanation:
          path.length === 1
            ? `Pick ${
                block.label ?? block.value
              } as the first element of this permutation.`
            : `Pick ${
                block.label ?? block.value
              }, building permutation so far: {${path
                .map((b) => b.label ?? b.value)
                .join(", ")}}.`,
        pointers: { idx: block.id },
      };

      yield* backtrack(currentNodeId);

      const idxId = block.id;

      path.pop();

      yield {
        type: "unpick",
        ids: [idxId],
        nodeIds: [currentNodeId],
        parentId,
        lines: [8],
        explanation: `Undo last pick ${
          block.label ?? block.value
        } and try a different choice for this position.`,
        pointers: {
          idx: idxId,
        },
      };

      const hasNext = used.some((u) => !u);
      yield {
        type: "highlight",
        ids: [...path.map((b) => b.id)],
        nodeIds: [parentId],
        lines: [4],
        explanation: hasNext
          ? `Backtracked to {${path
              .map((b) => b.label ?? b.value)
              .join(", ")}}. Trying the next unused element.`
          : `Backtracked to {${path
              .map((b) => b.label ?? b.value)
              .join(", ")}}. No unused elements left, this branch is done.`,
        pointers: {
          idx: path[path.length - 1] ? path[path.length - 1].id : -1,
        },
      };

      used[i] = false;
    }
  }

  yield* backtrack(rootId);

  yield {
    type: "done",
    ids: [],
    nodeIds: leafNodeIds,
    lines: [11, 12],
    explanation: "TA-DA! All permutations have been generated.",
  };
}
