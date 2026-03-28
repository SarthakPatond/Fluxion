import { MapPin, Send } from "lucide-react";
import PublicLayout from "../../components/public/PublicLayout";
import PageHero from "../../components/public/PageHero";
import PageCTA from "../../components/public/PageCTA";
import SectionIntro from "../../components/ui/SectionIntro";
import Reveal from "../../components/ui/Reveal";
import { useSiteContent } from "../../context/SiteContentContext";
import {
  careerBenefits,
  cultureValues,
  employeeTestimonials,
} from "../../data/publicPageContent";

export default function CareersPage() {
  const {
    content: { careers, settings },
  } = useSiteContent();

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Careers"
        title="Join a team that cares about thoughtful execution, modern craft, and real ownership."
        description="We are building a calm, high-trust environment for people who want to ship premium digital work across product, web, AI, and growth."
        primaryAction={{ label: "View openings", href: "#open-roles" }}
        secondaryAction={{ label: "Contact us", href: "/contact" }}
        stats={[
          { value: `${careers.length}`, label: "Active roles right now" },
          { value: "Remote-friendly", label: "Flexible collaboration model" },
          { value: "Cross-functional", label: "Design, engineering, and growth together" },
        ]}
      />

      <section className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="Culture"
            title="A company culture built around care in craft and clarity in communication."
            description="We like small teams, direct feedback, and enough structure that people can do deep work without chaos."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(34,211,238,0.12),rgba(255,255,255,0.03),rgba(168,85,247,0.1))] p-5 sm:p-6">
                <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl sm:grid-cols-2">
                  {cultureValues.map((value) => (
                    <div key={value} className="text-safe rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-200">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {careerBenefits.map((benefit, index) => (
                <Reveal key={benefit} delay={index * 0.05}>
                  <div className="text-safe rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300">
                    {benefit}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="open-roles" className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="Open Roles"
            title="Current opportunities across design, engineering, and growth."
            description="Each role is designed for people who are comfortable thinking independently and collaborating tightly."
          />

          <div className="mt-16 grid gap-5">
            {careers.map((career, index) => (
              <Reveal key={career.id} delay={index * 0.05}>
                <article className="grid gap-6 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.28em]">
                      <span>{career.type}</span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={14} />
                        {career.location}
                      </span>
                    </div>
                    <h2 className="text-balance text-safe mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {career.title}
                    </h2>
                    <p className="text-safe mt-4 max-w-3xl text-sm leading-7 text-slate-300">{career.summary}</p>
                  </div>
                  <a
                    href={`mailto:${settings.email}?subject=${encodeURIComponent(`Application for ${career.title}`)}`}
                    className="text-safe inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] sm:px-6 sm:py-3.5"
                  >
                    Apply now
                    <Send size={16} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="Team Voices"
            title="A few notes from people inside the work."
            description="The strongest signal of culture is how the team describes the pace, trust, and ownership day to day."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {employeeTestimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.05}>
                <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-safe text-sm leading-7 text-slate-300">"{item.quote}"</p>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-safe text-lg font-semibold text-white">{item.name}</p>
                    <p className="text-safe text-sm text-slate-400">{item.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Don't see your role?"
        title="We still want to hear from thoughtful people who care about the kind of work we do."
        description="If your background overlaps with strategy, design, engineering, or growth, send a note and tell us where you could create the most leverage."
        buttonLabel="Reach out"
        buttonHref="/contact"
      />
    </PublicLayout>
  );
}
