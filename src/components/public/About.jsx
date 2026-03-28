import { motion } from "framer-motion";
import SectionIntro from "../ui/SectionIntro";
import Reveal from "../ui/Reveal";

const stats = [
  { value: "30+", label: "Projects Completed" },
  { value: "20+", label: "Clients Served" },
  { value: "5+", label: "Years of Experience" },
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="content-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(34,211,238,0.16),rgba(15,23,42,0.92),rgba(245,158,11,0.14))] p-4 sm:p-5">
            <div className="grid gap-4 rounded-[1.7rem] border border-white/10 bg-slate-950/60 p-4 backdrop-blur-xl sm:grid-cols-2">
              {["Human-centered strategy", "Future-ready engineering", "Growth-oriented execution", "Reliable delivery systems"].map((item) => (
                <div key={item} className="text-safe rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <SectionIntro
            eyebrow="About Fluxion"
            title="A digital partner for companies that want substance, not noise."
            description="We work across product design, development, AI enablement, and digital marketing to help ambitious teams launch better experiences and scale with confidence. The focus is practical execution, clear communication, and outcomes that move revenue, retention, or operational efficiency."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-safe text-4xl font-semibold tracking-[-0.06em] text-white">{stat.value}</p>
                <p className="text-safe mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
