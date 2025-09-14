import { Link } from "react-router-dom";
import type { AlgorithmMeta } from "../data/algorithms";

export default function AlgoCard({ algorithm }: { algorithm: AlgorithmMeta }) {
  const Wrapper: any = algorithm.href ? Link : "div";
  const wrapperProps: any = algorithm.href ? { to: algorithm.href } : {};

  const isComingSoon = !algorithm.href;

  return (
    <Wrapper
      {...wrapperProps}
      aria-label={
        algorithm.href
          ? `Open ${algorithm.name}`
          : `${algorithm.name} (Coming Soon)`
      }
      className={`block transition-transform duration-150 ${
        algorithm.href ? "hover:-translate-y-1" : "opacity-95"
      }`}
    >
      <article
        className={`relative w-full h-40 md:h-52 rounded-md md:rounded-xl p-4 flex flex-col
          bg-[#0f1014] border border-gray-700/60
          shadow-md transition-all duration-300 overflow-hidden
          ${
            algorithm.href
              ? "hover:shadow-green-500/20 hover:border-green-400/50 group"
              : "opacity-80"
          }
        `}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-500/8 via-transparent to-green-400/8
            opacity-0 ${
              algorithm.href ? "group-hover:opacity-100" : ""
            } transition-opacity duration-300 pointer-events-none`}
        />

        <div className="flex flex-col items-start flex-1 relative z-10">
          <h3 className="text-base md:text-xl font-medium text-white line-clamp-1">
            {algorithm.name}
          </h3>

          <p className="mt-1 flex-1 text-gray-400 text-sm md:text-[15px] leading-normal line-clamp-4">
            {algorithm.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            {algorithm?.tags && (
              <div className="flex flex-wrap gap-2">
                {algorithm?.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-sm font-light bg-gray-700/40 text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {isComingSoon && (
          <div className="absolute inset-0 rounded-xl bg-black/30 pointer-events-none" />
        )}
      </article>
    </Wrapper>
  );
}
