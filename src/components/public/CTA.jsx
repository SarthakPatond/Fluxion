import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function CTA() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(255,255,255,0.05),rgba(250,204,21,0.12))] p-8 shadow-[0_30px_120px_rgba(2,8,23,0.35)] sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/70">
                Start a Project
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Let&apos;s build something amazing together.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-300 sm:text-lg">
                Tell us what you are building, where the friction is, and what a strong outcome looks like.
              </p>
              <a
                href="#footer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Start a Project
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
