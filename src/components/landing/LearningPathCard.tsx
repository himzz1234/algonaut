import { Link } from "react-router-dom";
import ProgressCircle from "../ui/ProgressCircle";

type LearningPathCardProps = {
  title: string;
  description: string;
  progress: number;
  href: string;
};

export default function LearningPathCard({
  title,
  description,
  progress,
  href,
}: LearningPathCardProps) {
  let statusMessage = "Keep going!";
  if (progress === 0)
    statusMessage = "You’re just getting started! Let's roll 🚀";
  else if (progress < 50)
    statusMessage = "Great start! You’ve built a solid foundation 📘";
  else if (progress < 100)
    statusMessage = "You’re halfway there! Keep pushing 💡";
  else if (progress === 100)
    statusMessage = "Amazing! You’ve mastered this path 🏆";

  return (
    <Link to={href} aria-label={`Go to ${title} learning path`}>
      <div
        className="relative w-full h-auto sm:h-48 rounded-xl p-5 flex flex-col justify-between
        bg-[#0f1014] border border-gray-800 shadow-md
        transition-all duration-500 overflow-hidden group
        hover:scale-[1.02] hover:border-green-400/50 hover:shadow-green-500/20"
      >
        {/* Subtle glowing background on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-400/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Content */}
        <div className="flex items-start justify-between relative z-10">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              {description}
            </p>
          </div>
          <ProgressCircle progress={progress} />
        </div>

        {/* Status */}
        <p className="text-xs sm:text-sm text-gray-300 mt-4 relative z-10">
          {statusMessage}
        </p>
      </div>
    </Link>
  );
}
