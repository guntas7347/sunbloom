import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import About from "../Components/About";
import Appointment from "../Components/Appointment";
import Contact from "../Components/Contact";
import FAQ from "../Components/FAQ";

const App = () => {
  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
      <Header />

      <main>
        <Hero />
        <Services />
        <About />
        <Appointment />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
