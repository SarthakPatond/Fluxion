import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ActionButton({ action, secondary = false }) {
  const className = secondary
    ? "inline-flex min-h-12 max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-white/10 sm:px-6 sm:py-3.5"
    : "inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] sm:px-6 sm:py-3.5";

  if (!action) {
    return null;
  }

  if (action.href?.startsWith("/")) {
    return (
      <Link to={action.href} className={`${className} text-safe`}>
        {action.label}
        {!secondary && <ArrowRight size={18} />}
      </Link>
    );
  }

  return (
    <a href={action.href} className={`${className} text-safe`}>
      {action.label}
      {!secondary && <ArrowRight size={18} />}
    </a>
  );
}

const floatingVariants = {
  animate: (i) => ({
    y: [0, -6, 0],
    transition: {
      duration: 5 + i * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.4,
    },
  }),
};

function RightSideVisuals({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="relative flex h-full min-h-[400px] w-full items-center justify-center lg:min-h-[460px]">
      {/* Background Glow Orbs */}
      <Motion.div
        className="absolute -left-[5%] top-[10%] -z-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[80px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute -right-[5%] bottom-[10%] -z-10 h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Glass Panel */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-6 shadow-[0_0_80px_rgba(34,211,238,0.05)] backdrop-blur-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_50%)]"></div>

        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => {
            const isLarge = index === 0;

            return (
              <Motion.div
                key={stat.label}
                custom={index}
                variants={floatingVariants}
                animate="animate"
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-slate-900/80 sm:p-7 ${
                  isLarge ? "sm:col-span-2" : "col-span-1"
                }`}
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-violet-500/0 to-cyan-500/0 transition-all duration-500 group-hover:from-cyan-400/[0.03] group-hover:via-violet-500/[0.03] group-hover:to-cyan-500/[0.03]"></div>

                <p
                  className={`text-safe mt-1 font-bold tracking-[-0.04em] text-white ${
                    isLarge ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-safe mt-3 text-sm font-medium leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
                  {stat.label}
                </p>

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-500 group-hover:via-cyan-400/30"></div>
              </Motion.div>
            );
          })}
        </div>
      </Motion.div>
    </div>
  );
}

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
}) {
  return (
    <section className="relative isolate px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.18),transparent_20%),radial-gradient(circle_at_84%_14%,rgba(168,85,247,0.16),transparent_22%),linear-gradient(180deg,#050b18_0%,#020617_56%,#020617_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
      <Motion.div
        className="absolute left-[8%] top-40 -z-10 h-52 w-52 rounded-full bg-cyan-400/18 blur-[110px]"
        animate={{ y: [0, -16, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute right-[10%] top-36 -z-10 h-56 w-56 rounded-full bg-violet-500/14 blur-[120px]"
        animate={{ y: [0, 20, 0], opacity: [0.28, 0.55, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="content-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
        <div className="max-w-4xl min-w-0">
          <Motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="eyebrow-text inline-flex max-w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-safe"
          >
            {eyebrow}
          </Motion.p>

          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="text-balance text-safe mt-6 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl xl:text-[5.15rem] xl:leading-[0.96]"
          >
            {title}
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="text-safe mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-xl"
          >
            {description}
          </Motion.p>

          {(primaryAction || secondaryAction) && (
            <Motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ActionButton action={primaryAction} />
              <ActionButton action={secondaryAction} secondary />
            </Motion.div>
          )}
        </div>

        <RightSideVisuals stats={stats} />
      </div>
    </section>
  );
}
