import Faqs from "../../components/landing/Faqs";
import Hero from "../../components/landing/Hero";
import LearningPath from "../../components/landing/LearningPath";
import Pricing from "../../components/landing/Pricing";
import ReadySection from "../../components/landing/ReadySection";
import Testimonials from "../../components/landing/Testimonials";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Algonaut</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Algonaut – Master Algorithms Visually"
        />
        <meta
          property="og:description"
          content="Interactive algorithm visualizer and guided learning platform to help you understand algorithms step-by-step."
        />
        <meta property="og:image" content="/images/og.png" />
        <meta property="og:url" content="https://algonaut.app/" />
        <link rel="canonical" href="https://algonaut.app/" />
      </Helmet>

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
