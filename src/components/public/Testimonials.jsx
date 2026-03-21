import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../../data/siteData";
import SectionIntro from "../ui/SectionIntro";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Testimonials"
          title="Clients stay because the work feels thoughtful, clear, and commercially useful."
          description="A few voices from teams we have supported across branding, product, web, and growth engagements."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(255,255,255,0.04),rgba(250,204,21,0.12))] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                  <Quote size={22} />
                </div>
                <p className="mt-8 max-w-3xl text-2xl font-medium leading-10 text-white sm:text-3xl sm:leading-[3rem]">
                  “{testimonials[activeIndex].quote}”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-cyan-100">
                    {testimonials[activeIndex].name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[activeIndex].name}</p>
                    <p className="text-sm text-slate-400">{testimonials[activeIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-4">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-[1.6rem] border p-5 text-left transition ${
                  activeIndex === index
                    ? "border-cyan-300/40 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {item.company}
                </p>
                <p className="mt-3 text-lg font-medium text-white">{item.name}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.quote}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
