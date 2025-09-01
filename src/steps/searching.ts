import type { SearchingStep } from "../algorithms/types";

export function describeSearchingStep(
  stepIndex: number,
  steps: SearchingStep[]
): string[] {
  const logs: string[] = [];

  for (let i = 0; i <= stepIndex && i < steps.length; i++) {
    const step = steps[i];
    switch (step.type) {
      case "init":
        logs.push(
          `We want to find the target value ${
            step.target
          } in the array: [${step.array.map((b) => b.value).join(", ")}].`
        );
        break;

      case "set-range":
        logs.push(
          `Now we will only search between positions ${step.low} and ${step.high}.`
        );
        break;

      case "check":
        logs.push(
          `Looking at the element ${step.values?.[0]} at position ${step.indices?.[0]}.`
        );
        break;

      case "compare":
        if (step.relation === "=") {
          logs.push(
            `The element ${step.values?.[0]} at position ${step.indices?.[0]} is equal to the target ${step.target} → found it! 🎯`
          );
        } else if (step.relation === "<") {
          logs.push(
            `The element ${step.values?.[0]} at position ${step.indices?.[0]} is smaller than the target ${step.target}, so we continue searching to the right.`
          );
        } else if (step.relation === ">") {
          logs.push(
            `The element ${step.values?.[0]} at position ${step.indices?.[0]} is greater than the target ${step.target}, so we continue searching to the left.`
          );
        } else {
          logs.push(
            `Comparing element ${step.values?.[0]} at position ${step.indices?.[0]} with the target ${step.target}.`
          );
        }
        break;

      case "found":
        logs.push(
          `We found the target ${step.values?.[0]} at position ${step.indices?.[0]}!`
        );
        break;

      case "not-found":
        logs.push(
          `The target ${step.target} was not found in the array (${step.reason}).`
        );
        break;

      default:
        logs.push("Performing the next step...");
    }
  }

  return logs;
}
