import { algorithms } from "../../data/algorithms";
import AlgorithmInfo from "./AlgorithmInfo";

interface AlgorithmInfoWrapperProps {
  algorithmKey: string;
}

export default function AlgorithmInfoWrapper({
  algorithmKey,
}: AlgorithmInfoWrapperProps) {
  const algo = algorithms[algorithmKey as keyof typeof algorithms];

  if (!algo) {
    return <div className="text-gray-400">No info available.</div>;
  }

  return (
    <AlgorithmInfo
      name={algo.name}
      description={algo.description}
      complexities={algo.complexities}
      pseudocode={algo.pseudocode}
      category={algo.category}
      difficulty={algo.difficulty}
      tags={algo.tags}
    />
  );
}
