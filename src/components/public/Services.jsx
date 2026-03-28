import TiltedCard from '../ui/TiltedCard';
import {
  Blocks,
  Bot,
  BrainCircuit,
  Globe,
  Megaphone,
  Search,
  Share2,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import SectionIntro from "../ui/SectionIntro";

const iconMap = {
  Blocks,
  Bot,
  BrainCircuit,
  Globe,
  Megaphone,
  Search,
  Share2,
  Smartphone,
};

function ServiceIcon({ name }) {
  const Icon = iconMap[name] || Sparkles;
  return <Icon size={24} className="text-cyan-200" />;
}

export default function Services() {
  const {
    content: { services },
  } = useSiteContent();

  return (
    <section id="services" className="section-shell">
      <div className="content-shell">
        <SectionIntro
          eyebrow="Our Services"
          title="Digital systems built for visibility, growth, and product velocity."
          description="Fluxion Innovations blends design, engineering, AI, and marketing into a single delivery model so teams move faster without fragmented vendors."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              // whileHover={{ y: -8 }}
              whileHover={{
                y: -10,
                rotateX: 3,
                rotateY: -3,
                scale: 1.015,
              }}
              className="group flex h-full min-w-0 flex-col rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_70px_rgba(2,8,23,0.24)] backdrop-blur-xl sm:p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-cyan-300/10">
                <ServiceIcon name={service.icon} />
              </div>
              <p className="eyebrow-text mt-6 text-safe">
                {service.category}
              </p>
              <h3 className="text-balance text-safe mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">
                {service.title}
              </h3>
              <p className="text-safe mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
