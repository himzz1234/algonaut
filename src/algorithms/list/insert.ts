import type { ListStep, Node } from "../types";
import { toArray } from "./helpers";

export function* insertAtEnd(
  head: Node | null,
  value: number
): Generator<ListStep> {
  if (!head) return;

  const nodes = toArray(head);
  let currIndex = 0;

  yield {
    type: "init",
    array: [...toArray(head)],
    explanation: `We need to insert ${value} at end. Begin at head.`,
    lines: [0],
  };

  yield {
    type: "highlight",
    ids: [nodes[currIndex].id],
    pointers: { head: nodes[currIndex].id, curr: nodes[currIndex].id },
    explanation: "Assign curr to head",
    lines: [4],
  };

  while (nodes[currIndex].next) {
    const fromId = nodes[currIndex].id;
    const nextIndex = nodes.findIndex(
      (n) => n.id === nodes[currIndex].next?.id
    );

    if (nextIndex === -1) break;

    currIndex = nextIndex;

    yield {
      type: "move",
      from: fromId,
      id: nodes[currIndex].id,
      pointers: { head: nodes[0].id, curr: nodes[currIndex].id },
      explanation: `curr.next is not null → advance curr from ${
        nodes.find((n) => n.id === fromId)?.value
      } to node ${nodes[currIndex].value}.`,
      lines: [5, 6],
    };
  }

  const newNode: Node = { id: 6, value, next: null };
  nodes.push(newNode);

  yield {
    type: "create_node",
    id: newNode.id,
    value,
    pointers: {
      head: nodes[0].id,
      curr: nodes[currIndex].id,
      newnode: newNode.id,
    },
    explanation: `Create new node with value ${value}.`,
    lines: [7],
  };

  nodes[currIndex].next = newNode;

  yield {
    type: "link_next",
    ids: [nodes[currIndex].id, newNode.id],
    pointers: {
      head: nodes[0].id,
      curr: nodes[currIndex].id,
      newnode: newNode.id,
    },
    explanation: `Link curr.next to the new node.`,
    lines: [8],
  };

  yield {
    type: "done",
    explanation: `New node with value ${newNode.value} has been inserted.`,
    lines: [9],
  };
}
