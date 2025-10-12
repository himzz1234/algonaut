import { motion, AnimatePresence } from "motion/react";
import { useRef, useLayoutEffect, useState } from "react";
import { algorithms } from "../../data/algorithms";
import { usePlayback } from "../../context/PlaybackContext";
import type { Step } from "../../algorithms/types";

interface PseudoCodeBlockProps<TStep> {
  algorithmKey: string;
  steps: TStep[];
}

export function PseudoCodeBlock<TStep extends Step>({
  algorithmKey,
  steps,
}: PseudoCodeBlockProps<TStep>) {
  const { stepIndex } = usePlayback();

  const algo = algorithms[algorithmKey as keyof typeof algorithms];
  const code = algo?.pseudocode ?? [];

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [highlightBoxes, setHighlightBoxes] = useState<
    { top: number; height: number }[]
  >([]);

  const activeLines = steps[stepIndex].lines ?? [];
  useLayoutEffect(() => {
    if (activeLines.length === 0) {
      setHighlightBoxes([]);
      return;
    }

    const sorted = [...activeLines].sort((a, b) => a - b);

    const groups: number[][] = [];
    let currentGroup: number[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) {
        currentGroup.push(sorted[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [sorted[i]];
      }
    }
    groups.push(currentGroup);

    const newBoxes = groups
      .map((group) => {
        const firstEl = lineRefs.current[group[0]];
        const lastEl = lineRefs.current[group[group.length - 1]];
        if (firstEl && lastEl) {
          const top = firstEl.offsetTop;
          const height =
            lastEl.offsetTop + lastEl.offsetHeight - firstEl.offsetTop;
          return { top, height };
        }
        return null;
      })
      .filter(Boolean) as { top: number; height: number }[];

    setHighlightBoxes(newBoxes);

    const lastGroup = groups[groups.length - 1];
    const lastEl = lineRefs.current[lastGroup[lastGroup.length - 1]];
    if (lastEl) {
      lastEl.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [activeLines]);

  const getIndentLevel = (line: string) => {
    const match = line.match(/^(\s+)/);
    return match ? match[0].length : 1;
  };

  return (
    <div className="flex-1 h-full rounded-lg text-sm leading-relaxed">
      <div className="relative">
        <h3 className="font-medium text-sm sm:text-lg pt-4 pb-2 px-4">
          Pseudocode for analysis
        </h3>

        <div
          className="relative px-2 overflow-y-auto h-[450px] sm:h-[420px] lg:h-[490px] no-scrollbar"
          ref={containerRef}
        >
          <AnimatePresence>
            {highlightBoxes.map((box, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ top: box.top, height: box.height }}
                className="absolute left-0 right-0 bg-green-500/20 border-green-400 pointer-events-none"
              />
            ))}
          </AnimatePresence>

          <div className="relative">
            {code.map((line, i) => {
              const indent = getIndentLevel(line);
              return (
                <div
                  key={i}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="flex items-center py-1.5"
                  style={{
                    paddingLeft: indent * 0.5 + "rem",
                    paddingRight: "0.25rem",
                  }}
                >
                  <p
                    className={`font-mono text-[15px] whitespace-pre-wrap ${
                      activeLines.includes(i)
                        ? "text-green-300"
                        : "text-gray-300"
                    }`}
                  >
                    {line.trimStart()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
