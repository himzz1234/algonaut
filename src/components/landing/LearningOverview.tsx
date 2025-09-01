import { LearningPathSection } from "../../components/landing/LearningPathSection";
import { modules } from "../../data/modules";

export default function LearningPage() {
  const beginner = modules.filter((m) => m.level === "beginner");
  const intermediate = modules.filter((m) => m.level === "intermediate");
  const interview = modules.filter((m) => m.level === "interview");

  return (
    <>
      <section>
        <main className="flex flex-col items-center justify-center lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight">
              <span className="text-green-500">Learning</span> Paths
            </h1>
            <p className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl text-gray-400 max-w-lg sm:max-w-2xl mx-auto px-2">
              Follow guided paths to master algorithmic concepts, <br></br>from
              the basics to advanced topics.
            </p>
          </div>
        </main>
      </section>

      <section className="lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8 md:pt-16 pb-16 space-y-12">
        <LearningPathSection
          id="path_beginner"
          title="Beginner"
          accentClass="text-green-500"
          modules={beginner}
        />
        <LearningPathSection
          id="path_intermediate"
          title="Intermediate"
          accentClass="text-cyan-400"
          modules={intermediate}
        />
        <LearningPathSection
          id="path_interview_prep"
          title="Interview Prep"
          accentClass="text-fuchsia-400"
          modules={interview}
        />
      </section>
    </>
  );
}
