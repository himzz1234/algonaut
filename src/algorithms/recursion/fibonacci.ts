import type { RecursionTreeStep, TreeNode } from "../types";

export function* fibonacci(n: number): Generator<RecursionTreeStep> {
  let nodeId = 0;

  function createNode(
    label: string,
    depth: number,
    parentId: number
  ): TreeNode {
    return {
      id: ++nodeId,
      label,
      children: [],
      depth,
      parentId,
    };
  }

  const root = createNode(`fib(${n})`, 0, -1);

  yield {
    type: "init",
    root,
    explanation: `We’ll compute fib(${n}) using recursion and visualize its call tree.`,
    lines: [0],
  };

  function* recurse(
    k: number,
    depth: number,
    parentId: number
  ): Generator<RecursionTreeStep, number> {
    const current = createNode(`fib(${k})`, depth, parentId);

    yield {
      type: "expand",
      parentId,
      node: current,
      explanation: `Entering fib(${k}). A new node is created in the recursion tree.`,
      lines: [0],
    };

    if (k <= 1) {
      yield {
        type: "resolve",
        id: current.id,
        label: `${k}`,
        value: k,
        explanation: `Base case reached since k is ${k}. The function returns ${k}.`,
        lines: [1, 2],
      };

      return k;
    }

    const leftValue = yield* recurse(k - 1, depth + 1, current.id);
    const rightValue = yield* recurse(k - 2, depth + 1, current.id);

    const result = leftValue + rightValue;

    yield {
      type: "resolve",
      id: current.id,
      label: `${result}`,
      value: result,
      explanation: `fib(${k - 1}) returned ${leftValue} and fib(${
        k - 2
      }) returned ${rightValue}. Their sum is ${result}.`,
      lines: [3],
    };

    yield {
      type: "collapse",
      id: current.id,
      explanation: `Exiting fib(${k}) with result ${result}.`,
      lines: [4],
    };

    return result;
  }

  const leftValue = yield* recurse(n - 1, 1, root.id);
  const rightValue = yield* recurse(n - 2, 1, root.id);

  const result = leftValue + rightValue;

  yield {
    type: "resolve",
    id: root.id,
    label: `${result}`,
    value: result,
    explanation: `The final result of fib(${n - 1}) is ${leftValue} and fib(${
      n - 2
    }) is ${rightValue}. Adding them gives ${result}.`,
    lines: [3],
  };

  yield {
    type: "done",
    explanation: `Recursion complete. fib(${n}) equals ${result}.`,
    lines: [4],
  };
}
