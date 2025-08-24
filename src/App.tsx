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
