import type { ModuleIntro } from "../../data/modules";
import IntroSectionRenderer from "./IntroSectionRenderer";

interface IntroLayoutProps {
  moduleId: string;
  intro: ModuleIntro;
}

export default function IntroLayout({ intro }: IntroLayoutProps) {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
      }}
      className="max-w-6xl mx-auto px-6 py-16 space-y-8"
    >
      <div className="pb-4 space-y-2 text-center">
        <p className="text-xl text-gray-400">An introduction to</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100">
          {intro.heading}
        </h1>
      </div>

      <div className="space-y-8">
        {intro.sections.map((section, index) => (
          <IntroSectionRenderer key={index} section={section} />
        ))}
      </div>
    </div>
  );
}
