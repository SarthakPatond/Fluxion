import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioItems } from "../../data/siteData";
import SectionIntro from "../ui/SectionIntro";

export default function Portfolio() {
  return (
    <section id="work" className="section-shell">
      <div className="content-shell">
        <SectionIntro
          eyebrow="Selected Work"
          title="Representative engagements focused on positioning, conversion, and launch quality."
          description="A snapshot of the kind of websites, product surfaces, and growth systems we help teams bring to market. Full case study walkthroughs are shared during discovery."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 sm:p-5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80 transition duration-500 group-hover:scale-110`} />
              <div className="relative min-h-[19rem] rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(2,6,23,0.9))] p-5 sm:min-h-[22rem] sm:p-6">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <span className="text-safe rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 sm:text-xs sm:tracking-[0.28em]">
                      {item.category}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition group-hover:bg-white group-hover:text-slate-950">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <div>
                    <p className="text-safe text-sm uppercase tracking-[0.24em] text-slate-400 sm:tracking-[0.32em]">Case study available on request</p>
                    <h3 className="text-balance text-safe mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="absolute inset-0"
                  aria-label={`Request details for ${item.title}`}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
