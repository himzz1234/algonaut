import type { ListStep, Node } from "../../algorithms/types";
import VisualizerLayoutWrapper from "../../components/layout/VisualizerLayoutWrapper";
import LinkedListVisualizer from "../../components/visualizers/list";
import { cycleDetect } from "../../algorithms/list/cycledetect";

function createLinkedList(
  values: number[],
  cycleStartIndex?: number
): Node | null {
  if (values.length === 0) return null;
  const nodes: Node[] = values.map((v, i) => ({
    id: i + 1,
    value: v,
    next: null,
  }));

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (
    cycleStartIndex &&
    cycleStartIndex >= 0 &&
    cycleStartIndex < nodes.length
  ) {
    nodes[nodes.length - 1].next = nodes[cycleStartIndex];
  }

  return nodes[0];
}

export default function FloydDemo() {
  let initialList: Node | null = createLinkedList([10, 20, 30, 40, 50], 2);

  let steps: ListStep[] = Array.from(cycleDetect(initialList));

  return (
    <VisualizerLayoutWrapper<ListStep>
      steps={steps}
      renderVisualizer={(step) => <LinkedListVisualizer steps={step} />}
      algorithmKey="ll-cycle-detect-floyd"
      autoplay
      repeat
      hideControls
      pseudocode={false}
    />
  );
}
