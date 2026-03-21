import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";
import ClientLogos from "../../components/public/ClientLogos";
import Services from "../../components/public/Services";
import About from "../../components/public/About";
import Portfolio from "../../components/public/Portfolio";
import Process from "../../components/public/Process";
import Testimonials from "../../components/public/Testimonials";
import CareersPreview from "../../components/public/CareersPreview";
import BlogPreview from "../../components/public/BlogPreview";
import CTA from "../../components/public/CTA";
import Footer from "../../components/public/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-300 selection:text-slate-950">
      <Navbar />
      <main className="relative flex-1 overflow-hidden">
        <Hero />
        <ClientLogos />
        <Services />
        <About />
        <Portfolio />
        <Process />
        <Testimonials />
        <CareersPreview />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
