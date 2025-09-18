import { useSearchParams } from "react-router-dom";
import {
  checkOddEven,
  clearIthBit,
  countSetBits,
  getIthBit,
  powerOfTwo,
  setIthBit,
} from "../../../algorithms/bitmask";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import type { BitmaskStep } from "../../../algorithms/types";
import BitmaskVisualizer from "../../../components/visualizers/bitmask";
import { toggleIthBit } from "../../../algorithms/bitmask/toggleIthbit";

export default function BitmaskPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  let steps: BitmaskStep[] = [];
  switch (algorithm) {
    case "get-ith-bit":
      steps = [...getIthBit(9, 3)];
      break;
    case "clear-ith-bit":
      steps = [...clearIthBit(9, 3)];
      break;
    case "set-ith-bit":
      steps = [...setIthBit(9, 3)];
      break;
    case "toggle-ith-bit":
      steps = [...toggleIthBit(9, 3)];
      break;
    case "check-odd-even":
      steps = [...checkOddEven(7)];
      break;
    case "power-of-two":
      steps = [...powerOfTwo(12)];
      break;
    case "count-set-bits":
      steps = [...countSetBits(10)];
      break;
    default:
      steps = [];
  }

  return (
    <VisualizerLayoutWrapper<BitmaskStep>
      steps={steps}
      renderVisualizer={(steps) => <BitmaskVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
