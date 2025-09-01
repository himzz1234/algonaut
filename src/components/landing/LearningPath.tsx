import LearningPathCard from "./LearningPathCard";

export default function LearningPath() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
               bg-clip-text text-transparent leading-snug"
        >
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Level Up
          </span>{" "}
          with Learning Paths
        </h2>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400 text-balance px-2">
          From beginner basics to interview mastery, follow guided paths at your
          pace.
        </p>
      </header>

      <div className="max-w-5xl w-full mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
          <LearningPathCard
            title="Beginner"
            description="Basics & Fundamentals"
            progress={100}
            href="/learn#path_beginner"
          />

          <LearningPathCard
            title="Intermediate"
            description="Data Structures & Algorithms"
            progress={50}
            href="/learn#path_intermediate"
          />

          <LearningPathCard
            title="Interview Prep"
            description="Preparation & Practice"
            progress={0}
            href="/learn#path_interview_prep"
          />
        </div>
      </div>
    </main>
  );
}
