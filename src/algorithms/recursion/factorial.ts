import type { Block, RecursionStep } from "../types";

export function* factorial(n: number): Generator<RecursionStep> {
  const rootFrame: Block = { id: 1, label: `factorial(${n})`, value: n };
  let idCounter = 1;

  yield {
    type: "init",
    stack: [rootFrame],
    explanation: `We will compute factorial(${n}) recursively.`,
    lines: [0],
  };

  function* recurse(k: number): Generator<RecursionStep, number> {
    const id = ++idCounter;
    const frame: Block = { id, label: `factorial(${k})`, value: k };

    yield {
      type: "push",
      frame,
      explanation: `Entering factorial(${k}). A new stack frame is added.`,
      lines: [0],
    };

    if (k <= 1) {
      yield {
        type: "resolve",
        id: id,
        label: "1",
        explanation: `Base case reached since k is ${k}. The function returns 1.`,
        lines: [1, 2],
      };

      yield {
        type: "pop",
        id,
        value: 1,
        explanation: `Exiting factorial(${k}) with result 1.`,
        lines: [2],
      };
      return 1;
    }

    const sub = yield* recurse(k - 1);

    const result = k * sub;
    yield {
      type: "resolve",
      id: id,
      label: `${result}`,
      explanation: `The result of factorial(${
        k - 1
      }) is ${sub}. Multiply by ${k} to get ${result}.`,
      lines: [4],
    };

    yield {
      type: "pop",
      id,
      value: result,
      explanation: `Returning ${result} from factorial(${k}).`,
      lines: [5],
    };

    return result;
  }

  const sub = yield* recurse(n - 1);
  const result = n * sub;

  yield {
    type: "resolve",
    id: rootFrame.id,
    label: `${result}`,
    explanation: `The result of factorial(${
      n - 1
    }) is ${sub}. Multiply by ${n} to get ${result}.`,
    lines: [4],
  };

  yield {
    type: "done",
    explanation: `Recursion complete. factorial(${n}) equals ${result}.`,
    lines: [5],
  };
}
