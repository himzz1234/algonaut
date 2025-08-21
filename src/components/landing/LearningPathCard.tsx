import ProgressCircle from "../ui/ProgressCircle";

type LearningPathCardProps = {
  title: string;
  description: string;
  progress: number;
};

export default function LearningPathCard({
  title,
  description,
  progress,
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
    <div
      className="relative w-full h-52 rounded-lg p-5 flex flex-col
        bg-[#0f1014] backdrop-blur-sm border border-gray-700/60
        shadow-md hover:shadow-xl hover:scale-[1.02]
        transition-all duration-300 
        hover:border-green-400/50"
    >
      <div className="flex-1">
        <h3 className="text-xl font-medium text-white">{title}</h3>
        <p className="text-gray-400 text-base mt-1">{description}</p>
      </div>

      <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/40 p-3 rounded-lg flex items-center space-x-4 text-balance">
        <ProgressCircle progress={progress} />
        <p className="text-sm leading-relaxed">{statusMessage}</p>
      </div>
    </div>
  );
}
