import { motion } from "framer-motion";
import { Compass, FlaskConical, Rocket, Workflow } from "lucide-react";
import { processSteps } from "../../data/siteData";
import SectionIntro from "../ui/SectionIntro";

const icons = [Compass, Workflow, FlaskConical, Rocket];

export default function Process() {
  return (
    <section id="process" className="section-shell">
      <div className="content-shell">
        <SectionIntro
          eyebrow="Our Process"
          title="A simple workflow that keeps strategy, production, and launch aligned."
          description="We structure engagements to reduce ambiguity, speed up delivery, and keep every milestone tied to business intent."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = icons[index] || Rocket;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-cyan-300/10 text-cyan-100">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="text-balance text-safe text-2xl font-semibold tracking-[-0.04em] text-white">{step.title}</h3>
                <p className="text-safe mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
