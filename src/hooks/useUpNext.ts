import { useMemo } from "react";
import { modules } from "../data/modules";

export default function useUpNext({
  current = "insertion",
}: {
  current: string;
}) {
  const allAlgos = modules.flatMap((m) => m.algos);

  const nextPlaying = useMemo(() => {
    const currentIndex = allAlgos.findIndex((algo) => algo.id === current);
    if (currentIndex > -1 && currentIndex + 1 < allAlgos.length) {
      return allAlgos[currentIndex + 1];
    }

    console.log(currentIndex);
    return undefined;
  }, [current]);

  return nextPlaying;
}
