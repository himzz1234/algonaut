import type { ArrayStep } from "../algorithms/types";

export function describeArrayStep(
  stepIndex: number,
  steps: ArrayStep[]
): string[] {
  const logs: string[] = [];

  for (let i = 0; i <= stepIndex && i < steps.length; i++) {
    const step = steps[i];

    switch (step.type) {
      case "init":
        switch (step.op) {
          case "reverse":
            logs.push(
              `We are reversing the array: [${step.array
                .map((b) => b.value)
                .join(", ")}].`
            );
            break;
          case "rotate":
            logs.push(
              `We are rotating the array [${step.array
                .map((b) => b.value)
                .join(", ")}] by ${step.meta?.k} position${
                step.meta?.k !== 1 ? "s" : ""
              }.`
            );
            break;
          default:
            logs.push(
              `Starting array operation on: [${step.array
                .map((b) => b.value)
                .join(", ")}].`
            );
        }
        break;

      case "highlight":
        switch (step.role) {
          case "pair":
            logs.push(
              `Focusing on pair ${step.values?.[0]} (at position ${step.indices?.[0]}) and ${step.values?.[1]} (at position ${step.indices?.[1]}).`
            );
            break;
          case "current":
            logs.push(
              `Focusing on the current element ${step.values?.[0]} at position ${step.indices?.[0]}.`
            );
            break;
          case "subarray":
            logs.push(
              `Looking at the subarray [${step.values?.join(
                ", "
              )}] spanning positions ${step.indices?.[0]} to ${
                step.indices?.slice(-1)[0]
              } at depth ${step.depth ?? 0}.`
            );
            break;
          default:
            logs.push(
              `Highlighting elements [${step.values?.join(
                ", "
              )}] at positions [${step.indices?.join(", ")}].`
            );
        }
        break;

      case "swap":
        logs.push(
          `Swapping ${step.values?.[0]} (at position ${step.indices?.[0]}) with ${step.values?.[1]} (at position ${step.indices?.[1]}).`
        );
        break;

      case "move":
        logs.push(
          `Moving ${step.values?.[0]} to position ${step?.targetIndex}.`
        );
        break;

      case "remove":
        logs.push(
          `Removing ${step.value} from position ${step.fromIndex} at depth ${step.depth}.`
        );
        break;

      case "insert":
        logs.push(
          `Inserting ${step.values?.[0]} at position ${
            step.targetIndex
          } (depth ${step.depth ?? 0}).`
        );
        break;

      case "done":
        switch (step.op) {
          case "reverse":
            logs.push("Reversing complete!");
            break;
          case "rotate":
            logs.push("Rotation complete!");
            break;
          default:
            logs.push("Array operation complete!");
        }
        break;
      default:
        logs.push("Performing the next array operation...");
    }
  }

  return logs;
}
