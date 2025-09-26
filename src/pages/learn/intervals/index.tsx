import { useSearchParams } from "react-router-dom";
import type { Interval, IntervalStep } from "../../../algorithms/types";
import {
  employeeFreeTime,
  insertInterval,
  meetingRoomsII,
  mergeIntervals,
  nonOverlappingIntervals,
} from "../../../algorithms/intervals";
import IntervalsVisualizer from "../../../components/visualizers/intervals";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";

export default function IntervalsPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialIntervals: Interval[] = [
    { id: 1, start: 0, end: 3 },
    { id: 2, start: 4, end: 9 },
    { id: 3, start: 8, end: 12 },
    { id: 4, start: 15, end: 18 },
  ];

  let steps: IntervalStep[] = [];
  switch (algorithm) {
    case "merge-intervals": {
      steps = [...mergeIntervals(initialIntervals)];
      break;
    }

    case "insert-interval": {
      const newInterval: Interval = {
        id: initialIntervals.length + 1,
        start: 5,
        end: 10,
      };

      steps = [...insertInterval(initialIntervals, newInterval)];
      break;
    }

    case "non-overlapping-intervals": {
      steps = [...nonOverlappingIntervals(initialIntervals)];
      break;
    }

    case "meeting-rooms-ii": {
      steps = [...meetingRoomsII(initialIntervals)];
      break;
    }

    case "employee-free-time": {
      steps = [...employeeFreeTime(initialIntervals.map((iv) => [iv]))];
      break;
    }

    default:
      steps = [{ type: "init", intervals: initialIntervals }];
  }

  return (
    <VisualizerLayoutWrapper<IntervalStep>
      steps={steps}
      renderVisualizer={(steps) => <IntervalsVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
