import { useSearchParams } from "react-router-dom";
import type { ListStep, Node } from "../../../algorithms/types";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import LinkedListVisualizer from "../../../components/visualizers/list";
import {
  insertAtEnd,
  reverseList,
  cycleDetect,
  findMiddleNode,
  mergeTwoSorted,
} from "../../../algorithms/list";

function createLinkedList(
  values: number[],
  cycleStartIndex?: number,
  offset: number = 0
): Node | null {
  if (values.length === 0) return null;
  const nodes: Node[] = values.map((v, i) => ({
    id: offset + i + 1,
    value: v,
    next: null,
  }));

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (
    cycleStartIndex !== undefined &&
    cycleStartIndex >= 0 &&
    cycleStartIndex < nodes.length
  ) {
    nodes[nodes.length - 1].next = nodes[cycleStartIndex];
  }

  return nodes[0];
}

export default function ListPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm") ?? "";

  let listA: Node | null = null;
  let listB: Node | null = null;

  if (algorithm === "ll-merge-two-sorted") {
    listA = createLinkedList([1, 3, 5], undefined, 0);
    listB = createLinkedList([2, 4, 6], undefined, 100);
  } else if (algorithm === "ll-cycle-detect-floyd") {
    listA = createLinkedList([10, 20, 30, 40, 50], 2, 0);
  } else {
    listA = createLinkedList([10, 20, 30, 40, 50], undefined, 0);
  }

  const value = Number(searchParams.get("value") ?? 60);

  let steps: ListStep[] = [];
  switch (algorithm) {
    case "ll-insert-end": {
      steps = Array.from(insertAtEnd(listA, value));
      break;
    }

    case "ll-reverse": {
      steps = Array.from(reverseList(listA));
      break;
    }

    case "ll-cycle-detect-floyd": {
      steps = Array.from(cycleDetect(listA));
      break;
    }

    case "ll-merge-two-sorted": {
      steps = Array.from(mergeTwoSorted(listA, listB));
      break;
    }

    case "ll-middle-node": {
      steps = Array.from(findMiddleNode(listA));
      break;
    }

    default: {
      steps = [
        { type: "done", explanation: "Select an algorithm to animate." },
      ];
    }
  }

  return (
    <VisualizerLayoutWrapper<ListStep>
      steps={steps}
      renderVisualizer={(steps) => <LinkedListVisualizer steps={steps} />}
      algorithmKey={algorithm}
    />
  );
}
