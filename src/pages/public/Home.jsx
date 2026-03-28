import Hero from "../../components/public/Hero";
import ClientLogos from "../../components/public/ClientLogos";
import Services from "../../components/public/Services";
import About from "../../components/public/About";
import Portfolio from "../../components/public/Portfolio";
import Process from "../../components/public/Process";
import Testimonials from "../../components/public/Testimonials";
import CTA from "../../components/public/CTA";
import PublicLayout from "../../components/public/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <ClientLogos />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Process />
      <CTA />
    </PublicLayout>
  );
}
