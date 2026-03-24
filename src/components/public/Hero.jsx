import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import FloatingLines from "../backgrounds/FloatingLines";

const proofPoints = [
  "Clear scope before production starts",
  "Design, engineering, and growth in one team",
  "Senior-level execution without vendor sprawl",
];

const firstSteps = [
  "30-minute discovery call",
  "Offer and scope recommendation",
  "Delivery roadmap with next steps",
];

const outcomeStats = [
  { value: "30+", label: "Projects delivered" },
  { value: "20+", label: "Client teams supported" },
  { value: "2-6w", label: "Typical launch windows" },
];

export default function Hero() {
  const {
    content: { hero },
  } = useSiteContent();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={!prefersReducedMotion}
          parallax={!prefersReducedMotion}
        />
      </div>

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.12),transparent_24%),linear-gradient(180deg,_#07111f_0%,_#030712_48%,_#020617_100%)]" />

      <motion.div
        className="absolute left-[8%] top-40 -z-10 h-52 w-52 rounded-full bg-cyan-400/20 blur-[110px]"
        animate={prefersReducedMotion ? { opacity: 0.45 } : { y: [0, -20, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-52 -z-10 h-64 w-64 rounded-full bg-amber-300/10 blur-[120px]"
        animate={prefersReducedMotion ? { opacity: 0.35 } : { y: [0, 24, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/80"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href={hero.primaryCtaHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              {hero.primaryCtaLabel}
              <ArrowRight size={18} />
            </a>
            <a
              href={hero.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-white/10"
            >
              {hero.secondaryCtaLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {proofPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm text-slate-200"
              >
                {point}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_32px_120px_rgba(4,10,24,0.55)]">
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(255,255,255,0.04),rgba(250,204,21,0.12))] p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Best Fit</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Growth-stage teams that need clarity fast</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Strong fit for service businesses, startups, and operators who need a sharper site, a cleaner funnel, or a launch-ready product surface.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">What Happens First</p>
                  <div className="mt-4 space-y-3">
                    {firstSteps.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 sm:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {outcomeStats.map((stat) => (
                      <div key={stat.label} className="rounded-[1.2rem] border border-white/10 bg-slate-950/50 p-4">
                        <p className="text-3xl font-semibold text-white">{stat.value}</p>
                        <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        href="#services"
        className="mx-auto mt-6 flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400"
      >
        Explore services
        <ChevronDown size={16} />
      </motion.a>
    </section>
  );
}
