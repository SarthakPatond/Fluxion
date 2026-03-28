import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PublicLayout from "../../components/public/PublicLayout";
import PageHero from "../../components/public/PageHero";
import CTA from "../../components/public/CTA";
import Reveal from "../../components/ui/Reveal";
import SectionIntro from "../../components/ui/SectionIntro";
import { useSiteContent } from "../../context/SiteContentContext";
import { contactHighlights } from "../../data/publicPageContent";

export default function ContactPage() {
  const {
    content: { settings },
  } = useSiteContent();

  const contactMethods = [
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    {
      icon: Phone,
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.whatsapp,
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`,
    },
  ];

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's turn the brief, blocker, or rough idea into a concrete next move."
        description="Whether you need a new site, a redesign, a product sprint, or a clearer AI plan, we can help you shape the right starting point."
        primaryAction={{ label: "Jump to form", href: "#contact" }}
        secondaryAction={{ label: "See services", href: "/services" }}
        stats={[
          { value: "1 business day", label: "Typical reply time" },
          { value: "Strategy first", label: "We respond with direction, not fluff" },
          { value: "Flexible scope", label: "From contained sprints to larger builds" },
        ]}
      />

      <section className="section-shell">
        <div className="content-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Reach Out"
                title="Use the channel that feels easiest for your team."
                description="If you already know the project shape, the contact form is best. If not, a short email or WhatsApp message is enough to start."
              />

              <div className="mt-10 grid gap-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;

                  return (
                    <Reveal key={method.label} delay={index * 0.05}>
                      <a
                        href={method.href}
                        target={method.label === "WhatsApp" ? "_blank" : undefined}
                        rel={method.label === "WhatsApp" ? "noreferrer" : undefined}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                      >
                        <span className="flex min-w-0 items-center gap-4">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-cyan-300/10 text-cyan-100">
                            <Icon size={20} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm text-slate-400">{method.label}</span>
                            <span className="text-safe block text-base font-semibold text-white">{method.value}</span>
                          </span>
                        </span>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(2,8,23,0.3)] sm:p-5">
                <div className="relative h-full min-h-[24rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/80">
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,6,23,0.82),rgba(2,6,23,0.35)),linear-gradient(135deg,rgba(34,211,238,0.18),transparent_32%,rgba(168,85,247,0.14))]" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
                  <div className="absolute left-[16%] top-[22%] h-5 w-5 rounded-full bg-cyan-300 shadow-[0_0_0_10px_rgba(34,211,238,0.15)]" />
                  <div className="absolute left-[32%] top-[44%] h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_0_8px_rgba(168,85,247,0.15)]" />
                  <div className="absolute right-[22%] top-[36%] h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_0_9px_rgba(103,232,249,0.12)]" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/10 bg-slate-950/65 p-5 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-6">
                    <p className="eyebrow-text text-safe">
                      Office details
                    </p>
                    <div className="mt-5 flex items-start gap-3">
                      <MapPin size={18} className="mt-1 shrink-0 text-cyan-100" />
                      <p className="text-safe text-sm leading-7 text-slate-300">{settings.address}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {contactHighlights.map((item) => (
                        <span
                          key={item}
                          className="text-safe rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </PublicLayout>
  );
}
