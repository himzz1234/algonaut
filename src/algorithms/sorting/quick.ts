import type { Block, SortingStep } from "../types";

export function* quickSort(
  arr: Block[],
  left = 0,
  right = arr.length - 1,
  depth = 0,
  isRoot = true
): Generator<SortingStep> {
  if (isRoot)
    yield {
      type: "init",
      array: [...arr],
      lines: [0],
      explanation: `Start Quick Sort on [${arr
        .map((b) => b.value)
        .join(", ")}].`,
    };

  if (left >= right) return;

  const pivot = arr[right];
  yield {
    type: "highlight",
    ids: [pivot.id],
    drag: true,
    pointers: { pivot: pivot.id },
    lines: [1],
    explanation: `Choose ${pivot.value} as pivot.`,
  };

  let i = left;
  for (let j = left; j < right; j++) {
    const relation =
      arr[j].value < pivot.value ? "<" : arr[j].value > pivot.value ? ">" : "=";

    yield {
      type: "compare",
      ids: [arr[j].id, pivot.id],
      relation,
      pointers: { i: arr[i].id, j: arr[j].id, pivot: arr[right].id },
      lines: [2, 3],
      explanation: `Compare ${arr[j].value} with pivot ${pivot.value}.`,
    };

    if (arr[j].value < pivot.value) {
      if (i !== j) {
        yield {
          type: "swap",
          ids: [arr[i].id, arr[j].id],
          pointers: { i: arr[i].id, j: arr[j].id, pivot: arr[right].id },
          lines: [2, 3],
          explanation: `Swap ${arr[i].value} and ${arr[j].value} (smaller than pivot).`,
        };

        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      i++;
    }
  }

  if (i !== right) {
    const relation =
      arr[i].value === arr[right].value
        ? "="
        : arr[i].value < arr[right].value
        ? "<"
        : ">";

    yield {
      type: "compare",
      ids: [arr[i].id, arr[right].id],
      relation,
      pointers: { i: arr[i].id, pivot: arr[right].id },
      lines: [2, 3],
      explanation: `Place pivot ${pivot.value} into correct position.`,
    };

    yield {
      type: "swap",
      ids: [arr[i].id, arr[right].id],
      pointers: { i: arr[i].id, pivot: arr[right].id },
      lines: [2, 3],
      explanation: `Swap pivot ${pivot.value} with ${arr[i].value}.`,
    };

    [arr[i], arr[right]] = [arr[right], arr[i]];
  }

  yield {
    type: "mark_sorted",
    ids: [arr[i].id],
    lines: [4],
    explanation: `${arr[i].value} is now in sorted position.`,
  };

  if (left < i) {
    const leftSlice = arr.slice(left, i);

    yield {
      type: "highlight",
      ids: leftSlice.map((x) => x.id),
      drag: true,
      depth: depth + 1,
      pointers: { left: arr[left].id, right: arr[i - 1].id },
      lines: [5],
      explanation: `Recurse on left subarray [${leftSlice
        .map((b) => b.value)
        .join(", ")}].`,
    };

    yield* quickSort(arr, left, i - 1, depth + 1, false);

    yield {
      type: "mark_sorted",
      ids: leftSlice.map((b) => b.id),
      explanation: `Left subarray sorted.`,
    };

    yield {
      type: "highlight",
      ids: leftSlice.map((x) => x.id),
      drag: true,
      depth,
      pointers: { left: arr[left].id, right: arr[i - 1].id },
      explanation: `Exit left recursion.`,
    };
  }

  if (i + 1 <= right) {
    const rightSlice = arr.slice(i + 1, right + 1);

    yield {
      type: "highlight",
      ids: rightSlice.map((x) => x.id),
      drag: true,
      depth: depth + 1,
      pointers: { left: arr[i + 1].id, right: arr[right].id },
      lines: [6],
      explanation: `Recurse on right subarray [${rightSlice
        .map((b) => b.value)
        .join(", ")}].`,
    };

    yield* quickSort(arr, i + 1, right, depth + 1, false);

    yield {
      type: "mark_sorted",
      ids: rightSlice.map((b) => b.id),
      explanation: `Right subarray sorted.`,
    };

    yield {
      type: "highlight",
      ids: rightSlice.map((x) => x.id),
      drag: true,
      depth,
      pointers: { left: arr[i + 1].id, right: arr[right].id },
      explanation: `Exit right recursion.`,
    };
  }

  if (isRoot) {
    yield {
      type: "mark_sorted",
      ids: arr.map((x) => x.id),
      explanation: `All elements sorted.`,
    };
    yield { type: "done", lines: [7], explanation: `Quick Sort finished.` };
  }
}
