import { motion, AnimatePresence } from "motion/react";
import { useRef, useLayoutEffect, useState } from "react";
import { algorithms } from "../../data/algorithms";

interface PseudoCodeBlockProps {
  algorithmKey: string;
  activeLines: number[];
}

export function PseudoCodeBlock({
  algorithmKey,
  activeLines,
}: PseudoCodeBlockProps) {
  const algo = algorithms[algorithmKey as keyof typeof algorithms];
  const code = algo.pseudocode ?? [];

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightBox, setHighlightBox] = useState<{
    top: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (activeLines.length === 0) {
      setHighlightBox(null);
      return;
    }

    const firstIdx = Math.min(...activeLines);
    const lastIdx = Math.max(...activeLines);

    const firstEl = lineRefs.current[firstIdx];
    const lastEl = lineRefs.current[lastIdx];

    if (firstEl && lastEl) {
      const top = firstEl.offsetTop;
      const height = lastEl.offsetTop + lastEl.offsetHeight - firstEl.offsetTop;

      setHighlightBox({ top, height });
    }
  }, [activeLines]);

  const getIndentLevel = (line: string) => {
    const match = line.match(/^(\s+)/);
    return match ? match[0].length : 1;
  };

  return (
    <div className="flex-1 h-full rounded-lg text-sm leading-relaxed">
      <div className="p-4 relative">
        <h3 className="font-medium text-sm sm:text-lg">
          Pseudocode for analysis
        </h3>

        <div className="relative mt-4">
          <AnimatePresence>
            {highlightBox && (
              <motion.div
                key={activeLines.join(",")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ top: highlightBox.top, height: highlightBox.height }}
                className="absolute left-0 right-0 bg-green-500/20 border-green-400 rounded-sm pointer-events-none"
              />
            )}
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
                    className={`font-mono text-base whitespace-pre-wrap ${
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
