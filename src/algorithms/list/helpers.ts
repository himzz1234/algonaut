import type { Node } from "../types";

export function toArray(head: Node | null): Node[] {
  const arr: Node[] = [];
  const visited = new Set<number>();
  let curr = head;

  while (curr && !visited.has(curr.id)) {
    arr.push({
      ...curr,
      next: curr.next ? ({ id: curr.next.id } as any) : null,
    });

    visited.add(curr.id);
    curr = curr.next;
  }

  return arr;
}
