import LearningPathCard from "./LearningPathCard";

export default function LearningPath() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl py-1 md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
               bg-clip-text text-transparent"
        >
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Level Up
          </span>{" "}
          with Learning Paths
        </h2>
        <p className="mt-2 text-lg md:text-xl text-gray-400 text-balance">
          From beginner basics to interview mastery, follow guided paths at your
          pace.
        </p>
      </header>

      <div className="max-w-4xl w-full mx-auto mt-7.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <LearningPathCard
            title="Beginner"
            description="Basics & Fundamentals"
            progress={100}
          />
          <LearningPathCard
            title="Intermediate"
            description="Data Structures & Algorithms"
            progress={50}
          />
          <LearningPathCard
            title="Interview Prep"
            description="Preparation & Practice"
            progress={0}
          />
        </div>
      </div>
    </main>
  );
}
