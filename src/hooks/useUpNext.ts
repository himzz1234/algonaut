import { useMemo } from "react";
import { modules } from "../data/modules";
import { algorithms } from "../data/algorithms";
import { useSearchParams } from "react-router-dom";

export default function useUpNext() {
  const [searchParams] = useSearchParams();
  const current = searchParams.get("algorithm") ?? "";

  const algos = modules.flatMap((m) => m.algos);

  const nextPlaying = useMemo(() => {
    let currentIndex = algos.findIndex((algo) => algo === current);

    while (currentIndex > -1 && currentIndex + 1 < algos.length) {
      currentIndex += 1;
      const algorithm = algos[currentIndex];
      const algorithmInfo = algorithms[algorithm];

      if (algorithmInfo?.href) {
        return algorithmInfo;
      }
    }

    return undefined;
  }, [current, algos]);

  return nextPlaying;
}
