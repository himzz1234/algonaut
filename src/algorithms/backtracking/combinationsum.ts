import type { Block, BacktrackingStep, TreeNode } from "../types";

export function* generateCombinationSum(
  arr: Block[],
  target: number
): Generator<BacktrackingStep> {
  const a = [...arr].sort((x, y) => (x.value ?? 0) - (y.value ?? 0));
  const n = a.length;

  yield {
    type: "init",
    array: a,
    lines: [10, 11, 12],
    explanation: `We need to generate all possible combinations from [${a
      .map((b) => b.label ?? b.value)
      .join(", ")}] that sum to ${target}.`,
  };

  let offset = 999;
  let nodeId = offset;
  let path: Block[] = [];
  const validNodeIds: number[] = [];

  const rootId = ++nodeId;
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
    explanation: "Start from the root node with an empty path {}.",
  };

  function* backtrack(
    start: number,
    remaining: number,
    parentId: number
  ): Generator<BacktrackingStep> {
    if (remaining === 0) {
      yield {
        type: "found",
        ids: [parentId],
        lines: [1, 2, 3],
        explanation: `We found a valid combination: {${path
          .map((b) => b.label ?? b.value)
          .join(", ")}}, since it sums exactly to ${target}.`,
      };
      validNodeIds.push(parentId);
      return;
    }

    for (let i = start; i < n; i++) {
      const block = a[i];
      if ((block.value ?? 0) > remaining) {
        yield {
          type: "highlight",
          ids: [parentId],
          lines: [5],
          explanation: `Since ${
            block.label ?? block.value
          } is greater than the remaining sum ${remaining}, we stop exploring further.`,
        };

        break;
      }

      path.push(block);
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
        explanation: `Choose ${
          block.label ?? block.value
        }, remaining sum becomes ${remaining - (block.value ?? 0)}.`,
        pointers: { idx: block.id },
      };

      yield* backtrack(i, remaining - (block.value ?? 0), currentNodeId);

      path.pop();
      yield {
        type: "unpick",
        ids: [currentNodeId],
        parentId,
        lines: [8],
        explanation: `Backtrack: remove ${
          block.label ?? block.value
        } and try the next option.`,
      };
    }
  }

  yield* backtrack(0, target, rootId);

  yield {
    type: "done",
    ids: validNodeIds,
    lines: [12],
    explanation: "TA-DA! All valid combinations have been generated.",
  };
}
