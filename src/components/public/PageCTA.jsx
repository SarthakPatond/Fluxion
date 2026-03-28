import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function PageCTA({ eyebrow, title, description, buttonLabel, buttonHref }) {
  return (
    <section className="section-shell">
      <div className="content-shell">
        <Reveal>
          <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(255,255,255,0.04),rgba(168,85,247,0.14))] p-6 shadow-[0_30px_120px_rgba(2,8,23,0.35)] sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow-text text-safe">
                  {eyebrow}
                </p>
                <h2 className="text-balance text-safe mt-5 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  {title}
                </h2>
                <p className="text-safe mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{description}</p>
              </div>

              <div>
                <Link
                  to={buttonHref}
                  className="text-safe inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] sm:px-7 sm:py-4"
                >
                  {buttonLabel}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
