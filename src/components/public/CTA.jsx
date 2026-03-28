import { useState } from "react";
import { ArrowRight, Mail, MessageCircle, PhoneCall } from "lucide-react";
import Reveal from "../ui/Reveal";
import { useSiteContent } from "../../context/SiteContentContext";

const projectOptions = [
  "New website",
  "Website redesign",
  "Custom software",
  "AI workflow",
  "Growth or marketing support",
];

export default function CTA() {
  const {
    content: { settings },
  } = useSiteContent();
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    projectType: projectOptions[0],
    timeline: "Within 30 days",
    details: "",
  });

  const whatsappNumber = settings.whatsapp.replace(/\D/g, "");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = `${formState.projectType} inquiry from ${formState.name || "Website visitor"}`;
    const body = [
      `Name: ${formState.name}`,
      `Company: ${formState.company}`,
      `Email: ${formState.email}`,
      `Project type: ${formState.projectType}`,
      `Timeline: ${formState.timeline}`,
      "",
      "Project details:",
      formState.details,
    ].join("\n");

    window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="section-shell">
      <div className="content-shell">
        <Reveal>
          <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(255,255,255,0.05),rgba(250,204,21,0.12))] p-6 shadow-[0_30px_120px_rgba(2,8,23,0.35)] sm:p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
              <div>
                <p className="eyebrow-text text-safe">
                  Start a Project
                </p>
                <h2 className="text-balance text-safe mt-5 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  Turn the next conversation into a concrete plan.
                </h2>
                <p className="text-safe mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Share what you are building, where the funnel or product is underperforming, and what outcome matters most. We will reply with the right next step, not a generic sales sequence.
                </p>

                <div className="mt-8 grid gap-4">
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/50 px-5 py-4 text-left transition hover:border-cyan-300/40"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Mail size={18} className="text-cyan-100" />
                      <span className="min-w-0">
                        <span className="block text-sm text-slate-400">Email us</span>
                        <span className="text-safe block text-base font-semibold text-white">{settings.email}</span>
                      </span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-white" />
                  </a>

                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/50 px-5 py-4 text-left transition hover:border-cyan-300/40"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <PhoneCall size={18} className="text-cyan-100" />
                      <span className="min-w-0">
                        <span className="block text-sm text-slate-400">Call us</span>
                        <span className="text-safe block text-base font-semibold text-white">{settings.phone}</span>
                      </span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-white" />
                  </a>

                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/50 px-5 py-4 text-left transition hover:border-cyan-300/40"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <MessageCircle size={18} className="text-cyan-100" />
                      <span className="min-w-0">
                        <span className="block text-sm text-slate-400">WhatsApp</span>
                        <span className="text-safe block text-base font-semibold text-white">{settings.whatsapp}</span>
                      </span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-white" />
                  </a>
                </div>

                <p className="mt-5 text-sm text-slate-400">
                  Typical reply time: within one business day.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl sm:p-6 lg:p-7"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-200">Work email</span>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
                      placeholder="you@company.com"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-slate-200">Company</span>
                    <input
                      type="text"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
                      placeholder="Company or brand"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-200">Project type</span>
                    <select
                      name="projectType"
                      value={formState.projectType}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                    >
                      {projectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-200">Desired timeline</span>
                    <select
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                    >
                      {["Within 30 days", "30-60 days", "60-90 days", "Just exploring"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-slate-200">Project details</span>
                    <textarea
                      name="details"
                      value={formState.details}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
                      placeholder="What are you building, where is the friction, and what outcome matters most?"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="text-safe mt-6 inline-flex min-h-12 max-w-full items-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] sm:px-7 sm:py-4"
                >
                  Send Project Brief
                  <ArrowRight size={18} />
                </button>

                <p className="mt-4 text-sm text-slate-400">
                  This opens your mail app with the project brief prefilled so you can send it in one step.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
