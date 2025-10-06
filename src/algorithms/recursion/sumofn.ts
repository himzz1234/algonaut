import type { Block, RecursionStep } from "../types";

export function* sumOfN(n: number): Generator<RecursionStep> {
  const rootFrame: Block = { id: 1, label: `sum(${n})`, value: n };
  let idCounter = 1;

  yield {
    type: "init",
    stack: [rootFrame],
    explanation: `We will compute sum(${n}) recursively.`,
    lines: [0],
  };

  function* recurse(k: number): Generator<RecursionStep, number> {
    const id = ++idCounter;
    const frame: Block = { id, label: `sum(${k})`, value: k };

    yield {
      type: "push",
      frame,
      explanation: `Entering sum(${k}). A new stack frame is added.`,
      lines: [0],
    };

    if (k <= 1) {
      yield {
        type: "resolve",
        id: id,
        explanation: `Base case reached since k is ${k}. The function returns ${k}.`,
        lines: [1, 2],
      };

      yield {
        type: "pop",
        id,
        value: k,
        explanation: `Exiting sum(${k}) with result ${k}.`,
        lines: [2],
      };

      return k;
    }

    const sub = yield* recurse(k - 1);

    const result = k + sub;
    yield {
      type: "resolve",
      id: id,
      label: `${result}`,
      explanation: `The result of sum(${
        k - 1
      }) is ${sub}. Add ${k} to get ${result}.`,
      lines: [4],
    };

    yield {
      type: "pop",
      id,
      value: result,
      explanation: `Returning ${result} from sum(${k}).`,
      lines: [5],
    };

    return result;
  }

  const sub = yield* recurse(n - 1);
  const result = n + sub;

  yield {
    type: "resolve",
    id: rootFrame.id,
    label: `${result}`,
    explanation: `The result of sum(${
      n - 1
    }) is ${sub}. Add ${n} to get ${result}.`,
    lines: [4],
  };

  yield {
    type: "done",
    explanation: `Recursion complete. sum(${n}) equals ${result}.`,
    lines: [5],
  };
}
