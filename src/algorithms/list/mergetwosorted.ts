import type { ListStep, Node } from "../types";
import { toArray } from "./helpers";

export function* mergeTwoSorted(
  head1: Node | null,
  head2: Node | null
): Generator<ListStep> {
  if (!head1 && !head2) return;

  const nodes = [...toArray(head1), ...toArray(head2)];

  yield {
    type: "init",
    array: nodes,
    explanation:
      "We will merge two sorted linked lists into a single list in place.",
    lines: [0],
  };

  if (!head1) {
    yield {
      type: "done",
      explanation: "List A is empty, so the merged list is simply List B.",
      lines: [18],
    };
    return;
  }

  if (!head2) {
    yield {
      type: "done",
      explanation: "List B is empty, so the merged list is simply List A.",
      lines: [18],
    };
    return;
  }

  let curr1: Node | null = head1;
  let prev1: Node | null = null;
  let curr2: Node | null = head2;

  yield {
    type: "highlight",
    ids: [head1.id, head2.id],
    pointers: {
      head1: head1.id,
      head2: head2.id,
      curr1: curr1.id,
      curr2: curr2.id,
      prev1: null,
    },
    lines: [1, 2],
    explanation:
      "We set curr1 at the head of List A, curr2 at the head of List B, and prev1 to null.",
  };

  while (curr1 && curr2) {
    yield {
      type: "compare_next",
      ids: [curr1.id, curr2.id],
      pointers: {
        curr1: curr1.id,
        curr2: curr2.id,
        prev1: prev1 ? prev1.id : null,
      },
      explanation: `Compare the current values: ${curr1.value} and ${curr2.value}.`,
      lines: [3],
    };

    if (curr1.value <= curr2.value) {
      prev1 = curr1;
      yield {
        type: "highlight",
        ids: [prev1.id],
        pointers: {
          curr1: curr1.id,
          curr2: curr2.id,
          prev1: prev1.id,
        },
        explanation: `${curr1.value} is smaller, so we keep it in place and update prev1 to this node.`,
        lines: [5],
      };

      curr1 = curr1.next;
      if (curr1) {
        yield {
          type: "move",
          from: prev1.id,
          id: curr1.id,
          pointers: {
            curr1: curr1.id,
            curr2: curr2.id,
            prev1: prev1.id,
          },
          explanation: `Move curr1 forward to the next node, which is ${curr1.value}.`,
          lines: [6],
        };
      } else {
        yield {
          type: "highlight",
          ids: [prev1.id],
          pointers: {
            prev1: prev1.id,
          },
          explanation: `${prev1.value} was the last node in List A. curr1 is now null.`,
          lines: [6],
        };
      }
    } else {
      yield {
        type: "unlink_next",
        ids: [prev1 ? prev1.id : head1.id, curr1.id],
        pointers: {
          curr1: curr1.id,
          curr2: curr2.id,
          ...(prev1 ? { prev1: prev1.id } : {}),
        },
        explanation: `${curr2.value} is smaller, so we will insert it before ${curr1.value}. First, adjust the previous link.`,
        lines: [7],
      };

      if (prev1) {
        prev1.next = curr2;
        yield {
          type: "link_next",
          ids: [prev1.id, curr2.id],
          pointers: {
            curr1: curr1.id,
            curr2: curr2.id,
            prev1: prev1.id,
          },
          explanation: `Link ${prev1.value} to ${curr2.value}. This moves ${curr2.value} from List B into the merged list.`,
          lines: [8, 9],
        };
      } else {
        head1 = curr2;
        yield {
          type: "highlight",
          ids: [curr2.id],
          pointers: {
            head1: head1.id,
            curr1: curr1.id,
            curr2: curr2.id,
          },
          explanation: `${curr2.value} is smaller than the head of List A, so it becomes the new head of the merged list.`,
          lines: [10, 11],
        };
      }

      const next2: Node | null = curr2.next;
      if (next2) {
        yield {
          type: "highlight",
          ids: [next2.id],
          pointers: {
            curr1: curr1.id,
            curr2: curr2.id,
            ...(prev1 ? { prev1: prev1.id } : {}),
            next2: next2.id,
          },
          explanation: `Save the next node of List B, which is ${next2.value}, in a temporary variable.`,
          lines: [12],
        };
      } else {
        yield {
          type: "highlight",
          ids: [],
          pointers: {
            curr1: curr1.id,
            curr2: curr2.id,
            ...(prev1 ? { prev1: prev1.id } : {}),
          },
          explanation: `${curr2.value} was the last node in List B. There are no more nodes after it.`,
          lines: [12],
        };
      }

      curr2.next = curr1;
      yield {
        type: "link_next",
        ids: [curr2.id, curr1.id],
        pointers: {
          curr1: curr1.id,
          curr2: curr2.id,
          ...(prev1 ? { prev1: prev1.id } : {}),
          ...(next2 ? { next2: next2.id } : {}),
        },
        explanation: `Link ${curr2.value} to ${curr1.value}.`,
        lines: [13],
      };

      prev1 = curr2;
      yield {
        type: "highlight",
        ids: [prev1.id],
        pointers: {
          curr1: curr1.id,
          curr2: curr2.id,
          prev1: prev1.id,
          ...(next2 ? { next2: next2.id } : {}),
        },
        explanation: `Update prev1 to ${prev1.value}, the node we just inserted.`,
        lines: [14],
      };

      curr2 = next2;
      if (curr2) {
        yield {
          type: "move",
          from: prev1.id,
          id: curr2.id,
          pointers: {
            curr1: curr1.id,
            curr2: curr2.id,
            prev1: prev1.id,
          },
          explanation: `Move curr2 forward to the next node, which is ${curr2.value}.`,
          lines: [15],
        };
      } else {
        yield {
          type: "highlight",
          ids: [],
          pointers: {
            curr1: curr1.id,
            ...(prev1 ? { prev1: prev1.id } : {}),
          },
          explanation: "List B is now empty. curr2 is null.",
          lines: [15],
        };
      }
    }
  }

  if (curr2) {
    prev1!.next = curr2;
    yield {
      type: "link_next",
      ids: [prev1!.id, curr2.id],
      pointers: {
        prev1: prev1!.id,
        curr2: curr2.id,
      },
      explanation: `Attach the remaining part of List B, starting from ${
        curr2.value
      }, after ${prev1!.value}.`,
      lines: [16, 17],
    };
  } else {
    yield {
      type: "highlight",
      ids: [head1.id],
      pointers: {
        head1: head1.id,
      },
      explanation: "There are no remaining nodes in List B.",
      lines: [16],
    };
  }

  yield {
    type: "done",
    explanation: "The two sorted lists have been merged into one list.",
    lines: [18],
  };
}
