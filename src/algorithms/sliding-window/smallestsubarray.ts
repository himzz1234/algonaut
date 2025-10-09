import type { Block, SlidingWindowStep } from "../types";

export function* smallestSubarrayWithSumGreaterThanK(
  arr: Block[],
  k: number
): Generator<SlidingWindowStep> {
  const a = [...arr];
  if (a.length === 0) return;

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `We need to find the shortest subarray with sum > ${k} of any window size.`,
  };

  let start = 0;
  let currSum = 0;
  let minLen = Infinity;
  let bestRange: [number, number] = [-1, -1];

  for (let end = 0; end < a.length; end++) {
    currSum += a[end].value;

    const window = a.slice(start, end + 1);
    const windowIds = window.map((b) => b.id);

    yield {
      type: "expand",
      ids: windowIds,
      pointers: {
        sum: { ids: windowIds, value: currSum, pos: "top" },
        ...(bestRange[0] !== -1
          ? {
              minLen: {
                ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
                value: minLen,
                pos: "bottom",
              },
            }
          : {}),
      },
      lines: [2, 3],
      explanation: `Expand window by adding ${a[end].value}, sum becomes ${currSum}.`,
    };

    while (currSum > k) {
      const currentLen = end - start + 1;
      const currentWindow = a.slice(start, end + 1);
      const currentWindowIds = currentWindow.map((b) => b.id);

      if (currentLen < minLen) {
        minLen = currentLen;
        bestRange = [start, end];

        yield {
          type: "found",
          ids: currentWindowIds,
          pointers: {
            ...(currentWindowIds.length > 0
              ? { sum: { ids: currentWindowIds, value: currSum, pos: "top" } }
              : {}),
            minLen: { ids: currentWindowIds, value: minLen, pos: "bottom" },
          },
          lines: [5],
          explanation: `New smaller valid window found with length ${minLen} and sum ${currSum} >= ${k}.`,
        };
      }

      currSum -= a[start].value;
      start++;

      const newWindow = a.slice(start, end + 1);
      const newWindowIds = newWindow.map((b) => b.id);

      yield {
        type: "shrink",
        ids: newWindowIds,
        pointers: {
          ...(currSum !== 0
            ? {
                sum: {
                  ids: newWindowIds,
                  value: currSum,
                  pos: "top",
                },
              }
            : {}),
          ...(bestRange[0] !== -1
            ? {
                minLen: {
                  ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
                  value: minLen,
                  pos: "bottom",
                },
              }
            : {}),
        },
        lines: [6, 7],
        explanation: newWindowIds.length
          ? `Remove ${
              a[start - 1].value
            } to shrink the window and minimize length.`
          : `No elements left in the window. Sum reset to 0.`,
      };
    }
  }

  yield {
    type: "found",
    ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
    pointers: {
      minLen: {
        ids:
          bestRange[0] === -1
            ? []
            : a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
        value: minLen === Infinity ? 0 : minLen,
        pos: "bottom",
      },
    },
    lines: [8],
    explanation:
      minLen === Infinity
        ? `No subarray found with sum > ${k}.`
        : `Done. The smallest subarray is of length ${minLen} and sum > ${k}.`,
  };
}
