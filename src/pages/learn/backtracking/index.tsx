import { useSearchParams } from "react-router-dom";
import type {
  Block,
  BacktrackingTreeStep,
  BacktrackingStep,
} from "../../../algorithms/types";
import BacktrackingVisualizer from "../../../components/visualizers/backtracking";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import {
  generateCombinationSum,
  generateLetterCombinations,
  generateNQueens,
  generatePermutations,
  generateRatInMaze,
  generateSubsets,
  generateSudoku,
} from "../../../algorithms/backtracking";

export default function BacktrackingPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
  ];

  const nQueensGrid: Block[][] = Array.from({ length: 4 }, (_, r) =>
    Array.from({ length: 4 }, (_, c) => ({
      id: r * 4 + c + 1,
      value: 0,
      label: "",
    }))
  );

  const ratMazeGrid: Block[][] = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1],
  ].map((row, r) =>
    row.map((val, c) => ({
      id: r * 4 + c + 1,
      value: val,
      label: r === 3 && c === 3 ? "🧀" : "",
    }))
  );

  const sudokuGrid: Block[][] = [
    [1, 0, 0, 4],
    [0, 4, 0, 0],
    [0, 0, 0, 0],
    [3, 0, 0, 2],
  ].map((row, r) =>
    row.map((val, c) => ({
      id: r * 4 + c + 1,
      value: val,
      label: val === 0 ? "" : val.toString(),
    }))
  );

  let steps: (BacktrackingTreeStep | BacktrackingStep)[] = [];

  switch (algorithm) {
    case "subsets":
      steps = [...generateSubsets(initialArray)];
      break;

    case "permutations":
      steps = [...generatePermutations(initialArray)];
      break;

    case "combination-sum":
      steps = [...generateCombinationSum(initialArray, 3)];
      break;

    case "letter-combinations-phone":
      steps = [...generateLetterCombinations("23")];
      break;

    case "n-queens":
      steps = [...generateNQueens(nQueensGrid, 4)];
      break;

    case "rat-in-a-maze":
      steps = [...generateRatInMaze(ratMazeGrid)];
      break;

    case "sudoku-solver":
      steps = [...generateSudoku(sudokuGrid)];
      break;

    default:
      steps = [
        {
          type: "init",
          array: initialArray,
          explanation: "No algorithm selected. Showing input only.",
        },
      ];
  }

  const gridAlgorithms = new Set([
    "n-queens",
    "rat-in-a-maze",
    "sudoku-solver",
  ]);

  return (
    <VisualizerLayoutWrapper<BacktrackingTreeStep | BacktrackingStep>
      steps={steps}
      renderVisualizer={(steps) => (
        <BacktrackingVisualizer
          steps={steps}
          mode={gridAlgorithms.has(algorithm ?? "") ? "grid" : "tree"}
        />
      )}
      algorithmKey={algorithm ?? ""}
    />
  );
}
