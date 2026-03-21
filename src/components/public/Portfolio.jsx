import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioItems } from "../../data/siteData";
import SectionIntro from "../ui/SectionIntro";

export default function Portfolio() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Case Studies"
          title="Selected work shaped around strong visual systems and clear business outcomes."
          description="A preview of the type of digital products, marketing platforms, and conversion-first experiences we help teams bring to market."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80 transition duration-500 group-hover:scale-110`} />
              <div className="relative h-[22rem] rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(2,6,23,0.9))] p-6">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                      {item.category}
                    </span>
                    <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition group-hover:bg-white group-hover:text-slate-950">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-400">View Project</p>
                    <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
