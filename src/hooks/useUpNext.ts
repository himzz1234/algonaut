import { useMemo } from "react";
import { modules } from "../data/modules";

export default function useUpNext({
  current = "insertion-sort",
}: {
  current: string;
}) {
  const allAlgos = modules.flatMap((m) => m.algos);

  const nextPlaying = useMemo(() => {
    const currentIndex = allAlgos.findIndex((algoId) => algoId === current);
    if (currentIndex > -1 && currentIndex + 1 < allAlgos.length) {
      return allAlgos[currentIndex + 1];
    }

    console.log(currentIndex);
    return undefined;
  }, [current, allAlgos]);

  return nextPlaying;
}
