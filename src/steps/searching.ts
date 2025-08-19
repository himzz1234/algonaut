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
          `Goal: Search for ${step.target} in [${step.array
            .map((b) => b.value)
            .join(", ")}].`
        );
        break;

      case "set-range":
        logs.push(
          `Now searching between index ${step.low} and index ${step.high}.`
        );
        break;

      case "check":
        logs.push(`Checking element at index ${step.id}.`);
        break;

      case "compare":
        if (step.relation === "=")
          logs.push(`Element equals target → found! 🎯`);
        else if (step.relation === "<")
          logs.push(`Element is smaller than target → search towards right.`);
        else if (step.relation === ">")
          logs.push(`Element is greater than target → search towards left.`);
        else logs.push(`Comparing element with target.`);
        break;

      case "found":
        logs.push(`Target found at index ${step.id}! ✅`);
        break;

      case "not-found":
        logs.push(`Target not found (${step.reason}). ❌`);
        break;

      default:
        logs.push("Performing next step...");
    }
  }

  return logs;
}
