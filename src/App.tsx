import "./App.css";
import Footer from "./components/Footer";
import Faqs from "./components/landing/Faqs";
import Feature from "./components/landing/Feature";
import Hero from "./components/landing/Hero";
import LearningPath from "./components/landing/LearningPath";
import ReadySection from "./components/landing/ReadySection";
import Testimonials from "./components/landing/Testimonials";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <Navbar />

      <section>
        <Hero />
      </section>

      <section>
        <main className="relative max-w-4xl mx-auto pb-16">
          <img
            src="/images/demo-screenshot.png"
            className="w-full h-auto shadow-xl relative z-10"
          />
          <div
            className="absolute bottom-0 left-0 w-full h-80 
                 bg-gradient-to-t from-[#000000] from-20% to-transparent 
                 z-20"
          />
        </main>
      </section>

      <section>
        <LearningPath />
      </section>

      <section>
        <Feature />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <Faqs />
      </section>

      <section>
        <ReadySection />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}

export default App;
