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
          `Starting with array: [${step.array.map((b) => b.value).join(", ")}].`
        );
        break;

      case "compare": {
        const [a, b] = step.ids;
        if (step.relation === "<")
          logs.push(`Comparing elements at ids ${a} and ${b} → ${a} < ${b}.`);
        else if (step.relation === ">")
          logs.push(`Comparing elements at ids ${a} and ${b} → ${a} > ${b}.`);
        else if (step.relation === "=")
          logs.push(`Comparing elements at ids ${a} and ${b} → equal.`);
        else logs.push(`Comparing elements at ids ${a} and ${b}.`);

        break;
      }

      case "swap":
        logs.push(
          `Swapping elements at ids ${step.ids[0]} and ${step.ids[1]}.`
        );
        break;

      case "highlight":
        switch (step.role) {
          case "key":
            logs.push(`Picked ${step.ids[0]} as the key element to insert.`);
            break;
          case "pivot":
            logs.push(`Chose ${step.ids[0]} as the pivot element.`);
            break;
          case "subarray":
            logs.push(
              `Focusing on subarray [${step.ids.join(", ")}] at depth ${
                step.depth ?? 0
              }.`
            );
            break;
          case "min":
            logs.push(
              `Found a new smaller element → updating minimum candidate to ${step.ids[0]}.`
            );
            break;
          default:
            logs.push(`Highlighting elements: [${step.ids.join(", ")}].`);
        }
        break;

      case "mark_sorted":
        logs.push(`Marked elements at ids [${step.ids.join(", ")}] as sorted.`);
        break;

      case "done":
        logs.push("Sorting complete! ✅");
        break;

      default:
        logs.push("Performing next step...");
    }
  }

  return logs;
}
