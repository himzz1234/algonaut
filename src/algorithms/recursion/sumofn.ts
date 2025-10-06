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
      explanation: `Call sum(${k}).`,
      lines: [0],
    };

    if (k <= 1) {
      yield {
        type: "resolve",
        id: id,
        explanation: `Base case reached → return ${k}.`,
        lines: [1, 2],
      };

      yield {
        type: "pop",
        id,
        value: k,
        explanation: `Return ${k} from sum(${k}).`,
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
      explanation: `Compute ${k} + ${sub} = ${result}.`,
      lines: [4],
    };

    yield {
      type: "pop",
      id,
      value: result,
      explanation: `Return ${result} from sum(${k}).`,
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
    explanation: `Compute ${n} + ${sub} = ${result}.`,
    lines: [4],
  };

  yield {
    type: "done",
    explanation: `Done! sum(${n}) = ${result}.`,
    lines: [5],
  };
}
