import { ArrowRight } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import SectionIntro from "../ui/SectionIntro";
import Reveal from "../ui/Reveal";

export default function CareersPreview() {
  const {
    content: { careers },
  } = useSiteContent();

  return (
    <section id="careers" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Careers"
          title="Join a team that ships thoughtful digital work with range and pace."
          description="We look for people who care about clean execution, systems thinking, and building work that clients can actually grow on."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {careers.map((career) => (
            <Reveal key={career.id}>
              <article className="flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  <span>{career.type}</span>
                  <span>{career.location}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {career.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{career.summary}</p>
                <button className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                  View role
                  <ArrowRight size={16} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
