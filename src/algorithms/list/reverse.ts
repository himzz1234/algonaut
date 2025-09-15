import type { ListStep, Node } from "../types";
import { toArray } from "./helpers";

export function* reverseList(head: Node | null): Generator<ListStep> {
  if (!head) return;

  const nodes = toArray(head);

  let currIndex: number | null = 0;
  let prevIndex: number | null = null;

  yield {
    type: "init",
    array: [...toArray(head)],
    explanation: `We need to reverse the linked list. Start with the head node.`,
    lines: [0],
  };

  yield {
    type: "highlight",
    ids: [nodes[currIndex].id],
    pointers: {
      head: nodes[currIndex].id,
      curr: nodes[currIndex].id,
      prev: null,
    },
    lines: [1, 2],
    explanation: "Set 'curr' to the head and 'prev' to null",
  };

  while (currIndex !== null) {
    const curr: Node = nodes[currIndex];

    const nextId = curr.next ? curr.next.id : null;
    const nextIndex =
      nextId !== null ? nodes.findIndex((n) => n.id === nextId) : null;

    if (nextIndex !== null) {
      yield {
        type: "highlight",
        ids: [nodes[nextIndex].id],
        pointers: {
          head: nodes[0].id,
          curr: curr.id,
          prev: prevIndex !== null ? nodes[prevIndex].id : null,
          next: nodes[nextIndex].id,
        },
        lines: [4],
        explanation: `Save 'next' at ${nodes[nextIndex].value} for later traversal.`,
      };
    } else {
      yield {
        type: "highlight",
        ids: [curr.id],
        pointers: {
          head: nodes[0].id,
          curr: curr.id,
          prev: prevIndex !== null ? nodes[prevIndex].id : null,
        },
        lines: [4],
        explanation: `Next of ${curr.value} is null.`,
      };
    }

    if (nextIndex !== null) {
      yield {
        type: "unlink_next",
        ids: [curr.id, nodes[nextIndex].id],
        pointers: {
          head: nodes[0].id,
          curr: curr.id,
          prev: prevIndex !== null ? nodes[prevIndex].id : null,
          next: nodes[nextIndex].id,
        },
        explanation: `Break the link from ${curr.value} to ${nodes[nextIndex].value}.`,
        lines: [5],
      };
    } else {
      yield {
        type: "unlink_next",
        ids: [curr.id],
        pointers: {
          head: nodes[0].id,
          curr: curr.id,
          prev: prevIndex !== null ? nodes[prevIndex].id : null,
        },
        explanation: `${curr.value} already points to null.`,
        lines: [5],
      };
    }

    curr.next = prevIndex !== null ? nodes[prevIndex] : null;

    yield {
      type: "link_next",
      ids: prevIndex !== null ? [curr.id, nodes[prevIndex].id] : [curr.id],
      pointers: {
        head: nodes[0].id,
        curr: curr.id,
        prev: prevIndex !== null ? nodes[prevIndex].id : null,
        ...(nextIndex !== null && { next: nodes[nextIndex].id }),
      },
      explanation:
        prevIndex !== null
          ? `Point ${curr.value} back to ${nodes[prevIndex].value}.`
          : `${curr.value} now points to null (this will be the new tail).`,
      lines: [5],
    };

    prevIndex = currIndex;

    yield {
      type: "move",
      from: curr.id,
      id: nodes[prevIndex].id,
      pointers: {
        head: nodes[0].id,
        curr: curr.id,
        prev: nodes[prevIndex].id,
        ...(nextIndex !== null && { next: nodes[nextIndex].id }),
      },
      explanation: `Move 'prev' forward — it now sits at ${nodes[prevIndex].value}.`,
      lines: [6],
    };

    const prevIdForCurrFrom = nodes[prevIndex].id;
    currIndex = nextIndex;

    if (currIndex !== null) {
      yield {
        type: "move",
        from: prevIdForCurrFrom,
        id: nodes[currIndex].id,
        pointers: {
          head: nodes[0].id,
          curr: nodes[currIndex].id,
          prev: nodes[prevIndex].id,
          ...(nextIndex !== null && { next: nodes[nextIndex].id }),
        },
        explanation: `Advance 'curr' from ${nodes[prevIndex].value} to the next node: ${nodes[currIndex].value}.`,
        lines: [7],
      };
    } else {
      yield {
        type: "move",
        from: prevIdForCurrFrom,
        id: prevIdForCurrFrom,
        pointers: {
          head: nodes[0].id,
          prev: nodes[prevIndex].id,
        },
        explanation: `Advance 'curr' — reached end of list (curr -> null).`,
        lines: [7],
      };
    }
  }

  if (prevIndex !== null) {
    yield {
      type: "highlight",
      ids: [nodes[prevIndex].id],
      pointers: {
        head: nodes[prevIndex].id,
        prev: nodes[prevIndex].id,
      },
      explanation: `Set head to ${nodes[prevIndex].value} — this is the new start of the list.`,
      lines: [8],
    };
  }

  yield {
    type: "done",
    explanation: `All links are reversed.`,
    lines: [9],
  };
}
