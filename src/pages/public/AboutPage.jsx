import { motion as Motion } from "framer-motion";
import PublicLayout from "../../components/public/PublicLayout";
import PageHero from "../../components/public/PageHero";
import PageCTA from "../../components/public/PageCTA";
import Testimonials from "../../components/public/Testimonials";
import Reveal from "../../components/ui/Reveal";
import SectionIntro from "../../components/ui/SectionIntro";
import {
  aboutStoryPoints,
  missionVisionValues,
  teamMembers,
} from "../../data/publicPageContent";

const stats = [
  { value: "30+", label: "Projects shipped across web, product, and growth" },
  { value: "20+", label: "Client teams supported with repeat partnerships" },
  { value: "5+", label: "Years of combined delivery experience" },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="About"
        title="A compact digital agency built for teams that want clarity, pace, and polish."
        description="We combine strategic thinking, premium design, and dependable execution so modern brands can launch work that feels intentional from the first click to the final conversion step."
        primaryAction={{ label: "See services", href: "/services" }}
        secondaryAction={{ label: "Start a project", href: "/contact" }}
        stats={[
          { value: "Multi-disciplinary", label: "Strategy, design, engineering, growth" },
          { value: "Senior-led", label: "Direct collaboration from kickoff to launch" },
          { value: "Outcome-focused", label: "Built around growth, retention, and clarity" },
        ]}
      />

      <section className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="Story"
            title="We built Fluxion to close the gap between ambitious ideas and launch-quality execution."
            description="The agency was shaped around the needs of founders and operators who wanted one accountable partner instead of disconnected specialists."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {aboutStoryPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.06}>
                <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-7">
                  <p className="eyebrow-text text-safe">
                    0{index + 1}
                  </p>
                  <h2 className="text-balance text-safe mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {point.title}
                  </h2>
                  <p className="text-safe mt-4 text-sm leading-7 text-slate-300">{point.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(34,211,238,0.14),rgba(255,255,255,0.03),rgba(168,85,247,0.12))] p-5 sm:p-6">
                <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl">
                  {missionVisionValues.map((item) => (
                    <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                      <p className="eyebrow-text text-safe">
                        {item.title}
                      </p>
                      <p className="text-safe mt-3 text-base leading-7 text-slate-200">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div>
              <SectionIntro
                eyebrow="Why teams hire us"
                title="The process stays calm and structured, even when the goals are ambitious."
                description="We keep the collaboration lightweight, but we take systems, documentation, and execution quality seriously enough that the work keeps paying off after launch."
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <Motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.6 }}
                    className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <p className="text-safe text-4xl font-semibold tracking-[-0.06em] text-white">{stat.value}</p>
                    <p className="text-safe mt-3 text-sm leading-6 text-slate-400">{stat.label}</p>
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="Team"
            title="A small team with range across strategy, motion, frontend, and growth."
            description="The structure stays intentionally lean so communication stays direct and the work keeps moving."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.05}>
                <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04]">
                  <div className="relative h-72 overflow-hidden bg-slate-900">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.accent}`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),linear-gradient(180deg,rgba(2,6,23,0.05),rgba(2,6,23,0.85))]" />
                    <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5">
                      <p className="text-safe text-4xl font-semibold tracking-[-0.08em] text-white sm:text-5xl">{member.initials}</p>
                      <p className="text-safe mt-2 text-[11px] uppercase tracking-[0.24em] text-cyan-100/70 sm:text-sm sm:tracking-[0.3em]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h2 className="text-safe text-2xl font-semibold tracking-[-0.04em] text-white">{member.name}</h2>
                    <p className="text-safe mt-4 text-sm leading-7 text-slate-300">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <PageCTA
        eyebrow="Build With Us"
        title="If you want a partner that can think strategically and ship cleanly, let's talk."
        description="We work best with teams that value clarity, momentum, and digital work that performs after the launch announcement fades."
        buttonLabel="Contact Fluxion"
        buttonHref="/contact"
      />
    </PublicLayout>
  );
}
