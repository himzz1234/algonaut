import type { SortingStep } from "../algorithms/types";

export function describeSortingStep(
  stepIndex: number,
  steps: SortingStep[]
): string[] {
  const logs: string[] = [];

  for (let i = 0; i <= stepIndex && i < steps.length; i++) {
    const step = steps[i];

    switch (step.type) {
      case "init":
        logs.push(
          `Starting with array: [${step.array
            .map((b) => b?.value)
            .join(", ")}].`
        );
        break;

      case "compare": {
        const [aIdx, bIdx] = step.indices ?? [];
        const [aVal, bVal] = step.values ?? [];

        if (step.relation === "<")
          logs.push(
            `Comparing ${aVal} (at position ${aIdx}) with ${bVal} (at position ${bIdx}) → ${aVal} is smaller.`
          );
        else if (step.relation === ">")
          logs.push(
            `Comparing ${aVal} (at position ${aIdx}) with ${bVal} (at position ${bIdx}) → ${aVal} is larger.`
          );
        else
          logs.push(
            `Comparing ${aVal} (at position ${aIdx}) with ${bVal} (at position ${bIdx}) → they are equal.`
          );
        break;
      }

      case "swap":
        logs.push(
          `Swapping ${step.values?.[0]} (at position ${step.indices?.[0]}) with ${step.values?.[1]} (at position ${step.indices?.[1]}).`
        );
        break;

      case "highlight":
        switch (step.role) {
          case "key":
            if (step.depth === 1) {
              logs.push(
                `Picked ${step.values?.[0]} (at position ${step.indices?.[0]}) as the key to insert.`
              );
            } else if (step.depth === 0) {
              logs.push(
                `Placed key ${step.values?.[0]} into its correct spot at position ${step.indices?.[0]}.`
              );
            }
            break;

          case "pivot":
            logs.push(
              `Chose ${step.values?.[0]} (at position ${step.indices?.[0]}) as the pivot for partitioning.`
            );
            break;

          case "subarray":
            if (step.action === "enter") {
              logs.push(
                `Now focusing on subarray [${step.values?.join(
                  ", "
                )}] spanning positions ${step.indices?.[0]} to ${
                  step.indices?.slice(-1)[0]
                } (depth ${step.depth ?? 0}).`
              );
            } else if (step.action === "exit") {
              logs.push(
                `Finished sorting subarray [${step.values?.join(", ")}].`
              );
            }
            break;

          case "target":
            logs.push(
              `Position ${step.indices?.[0]} is the target slot where the next minimum will be placed.`
            );
            break;

          case "min":
            logs.push(
              `Found a new smaller element: ${step.values?.[0]} (at position ${step.indices?.[0]}).`
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

      case "stage_move":
        logs.push(
          `Placed ${step.values?.[0]} (from position ${step.fromIndex}) into the temporary merged array at position ${step.toIndex}.`
        );
        break;

      case "stage_commit":
        logs.push(
          `Copied merged subarray [${step.values?.join(
            ", "
          )}] back into the main array at positions ${step.indices?.[0]} to ${
            step.indices?.slice(-1)[0]
          }.`
        );
        break;

      case "mark_sorted":
        logs.push(`Marked [${step.values?.join(", ")}] as sorted.`);
        break;

      case "done":
        logs.push("Sorting complete!");
        break;

      default:
        logs.push("Performing the next step...");
    }
  }

  return logs;
}
