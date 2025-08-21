import type { PathfindingStep } from "../algorithms/types";

export function describePathfindingStep(
  stepIndex: number,
  steps: PathfindingStep[]
): string[] {
  const logs: string[] = [];

  for (let i = 0; i <= stepIndex && i < steps.length; i++) {
    const step = steps[i];
    switch (step.type) {
      case "init":
        logs.push(
          `Goal: Find a path from start (${step.start.row}, ${step.start.col}) to target (${step.target.row}, ${step.target.col}).`
        );
        break;

      case "visit":
        logs.push(
          `Visiting node at (${step.current.row}, ${step.current.col})`
        );
        break;

      case "expand":
        logs.push(
          `Expanding neighbors of node ${step.from}: [${step.neighbors.join(
            ", "
          )}].`
        );
        break;

      case "enqueue":
        if (step.priority !== undefined)
          logs.push(`Enqueued node ${step.id} with priority ${step.priority}.`);
        else logs.push(`Enqueued node ${step.id}.`);
        break;

      case "relax":
        logs.push(
          `Relaxing edge from ${step.from} → ${step.to}, new distance = ${step.newDistance}.`
        );
        break;

      case "compare":
        logs.push(
          `Comparing node ${step.a} and node ${step.b} (${step.relation}).`
        );
        break;

      case "mark_visited":
        logs.push(`Node ${step.id} is fully processed (marked visited).`);
        break;

      case "dead_end":
        logs.push(`Dead end reached at node ${step.id}.`);
        break;

      case "backtrack":
        logs.push(`Backtracking from node ${step.id}.`);
        break;

      case "path_found":
        logs.push(`Target found! ✅`);
        break;

      case "no_path":
        logs.push(`No path exists from start to target. ❌`);
        break;

      case "done":
        logs.push(`Algorithm finished.`);
        break;

      default:
        logs.push("Performing next step...");
    }
  }

  return logs;
}
