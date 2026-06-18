import Hero from "../Components/Hero";
import Guide from "../Components/Guide";
import Services from "../Components/Services";
import Stats from "../Components/Stats";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";
import PolicyFeed from "../Components/PolicyFeed";
import Appointment from "../Components/Appointment";
import FAQ from "../Components/FAQ";
import Contact from "../Components/Contact";
import CallToAction from "../Components/CallToAction";
import { getAllFaqs } from "@/lib/firebase/faq";
import { getActiveServices } from "@/lib/firebase/services";

const App = async () => {
  const faqs = await getAllFaqs();
  const services = await getActiveServices();
  return (
    <main>
      <Hero />
      <Guide />
      <Services services={services} />
      <Stats />
      <About />
      <Testimonials />
      <PolicyFeed />
      <Appointment />
      <FAQ faqs={faqs} />
      <Contact />
      <CallToAction />
    </main>
  );
};

export default App;
