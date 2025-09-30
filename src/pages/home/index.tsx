import Faqs from "../../components/landing/Faqs";
import Hero from "../../components/landing/Hero";
import LearningPath from "../../components/landing/LearningPath";
import Pricing from "../../components/landing/Pricing";
import ReadySection from "../../components/landing/ReadySection";
import Testimonials from "../../components/landing/Testimonials";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <section
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      >
        <Hero />
      </section>

      <section>
        <LearningPath />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <Pricing />
      </section>

      <section>
        <Faqs />
      </section>

      <section>
        <ReadySection />
      </section>
    </div>
  );
}
