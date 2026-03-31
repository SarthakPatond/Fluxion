import { motion as Motion } from "framer-motion";
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
import PublicLayout from "../../components/public/PublicLayout";
import PageHero from "../../components/public/PageHero";
import PageCTA from "../../components/public/PageCTA";
import SectionIntro from "../../components/ui/SectionIntro";
import Reveal from "../../components/ui/Reveal";
import { useSiteContent } from "../../context/SiteContentContext";
import { serviceDetails } from "../../data/publicPageContent";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function ServiceIcon({ icon }) {
  const Icon = iconMap[icon] || Sparkles;
  return <Icon size={22} className="text-cyan-100" />;
}

function ServiceVisual({ service, detail }) {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/70">
      <div className={`absolute inset-0 bg-gradient-to-br ${detail.accent} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_35%),linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.72))]" />
      <div className="relative flex min-h-60 flex-col justify-between gap-8 p-4 sm:min-h-64 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-safe rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:tracking-[0.28em]">
            {detail.label}
          </span>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60">
            <ServiceIcon icon={service.icon} />
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-3 backdrop-blur-xl sm:grid-cols-3 sm:p-4">
          {detail.metrics.map((metric) => (
            <div key={metric} className="text-safe rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100">
              {metric}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const {
    content: { services },
  } = useSiteContent();

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Services"
        title="Integrated delivery across strategy, design, engineering, and growth."
        description="Every engagement is designed to move a business forward with clearer positioning, stronger product surfaces, and launch systems that hold up after the handoff."
        primaryAction={{ label: "Start a project", href: "/contact" }}
        secondaryAction={{ label: "Meet the team", href: "/about" }}
        stats={[
          { value: `${services.length}`, label: "Core service lanes" },
          { value: "2-8 weeks", label: "Typical sprint windows" },
          { value: "One team", label: "Strategy to launch continuity" },
        ]}
      />

      <section className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="Capabilities"
            title="A modular service stack that still feels like one connected system."
            description="We keep the delivery model flexible, but the quality bar, motion language, and strategic intent stay consistent across every engagement."
          />

          <Motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-16 grid gap-8 lg:grid-cols-2"
          >
            {services.map((service) => {
              const detail = serviceDetails[service.id] ?? {
                label: service.category,
                headline: service.description,
                features: ["Strategy alignment", "Execution support", "Launch handoff"],
                metrics: ["Premium UI", "Measured outcomes", "Dedicated ownership"],
                accent: "from-cyan-400/30 via-sky-500/10 to-violet-500/20",
              };

              return (
                <Motion.article
                  key={service.id}
                  id={service.id}
                  variants={itemVariants}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(2,8,23,0.3)] backdrop-blur-xl sm:p-5"
                >
                  <ServiceVisual service={service} detail={detail} />

                  <div className="px-2 pb-2 pt-6">
                    <p className="eyebrow-text text-safe">
                      {service.category}
                    </p>
                    <h2 className="text-balance text-safe mt-4 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-[2rem]">
                      {service.title}
                    </h2>
                    <p className="text-safe mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                      {detail.headline}
                    </p>
                    <p className="text-safe mt-5 text-sm leading-7 text-slate-400">{service.description}</p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {detail.features.map((feature) => (
                        <div
                          key={feature}
                          className="text-safe rounded-[1.2rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </Motion.article>
              );
            })}
          </Motion.div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-shell">
          <Reveal>
            <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(34,211,238,0.08),rgba(255,255,255,0.02),rgba(168,85,247,0.08))] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="eyebrow-text text-safe">
                  Delivery Model
                </p>
                <h2 className="text-balance text-safe mt-5 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                  Strategy sets the direction. Design sharpens the story. Engineering makes it real.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Discovery and prioritization before production",
                  "Tight collaboration between design, motion, and frontend",
                  "Launch support with measurement and iteration in mind",
                ].map((item) => (
                  <div key={item} className="text-safe rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-5 text-sm leading-7 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCTA
        eyebrow="Next Step"
        title="Need a sharper scope before you commit to production?"
        description="We can turn a rough brief into a clear plan, recommend the right service mix, and outline the fastest path to launch."
        buttonLabel="Talk with Fluxion"
        buttonHref="/contact"
      />
    </PublicLayout>
  );
}
