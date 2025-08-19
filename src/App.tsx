import "./App.css";
import Feature from "./components/Feature";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <Navbar />

      <section>
        <Hero />
      </section>

      <section>
        <Feature />
      </section>
    </main>
  );
}

export default App;
