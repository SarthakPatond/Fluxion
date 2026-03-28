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

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(2,8,23,0.34)] backdrop-blur-xl sm:p-5"
        >
          <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(140deg,rgba(34,211,238,0.16),rgba(255,255,255,0.03),rgba(168,85,247,0.14))] p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4 sm:p-5">
                  <p className="text-safe text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl xl:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-safe mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
