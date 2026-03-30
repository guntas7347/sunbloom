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
    <main>
      <Hero />
      <Services />
      <About />
      <Appointment />
      <FAQ />
      <Contact />
    </main>
  );
};

export default App;
