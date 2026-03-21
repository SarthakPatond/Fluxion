import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

const quickLinks = ["Home", "Services", "About", "Blog", "Careers", "Contact"];
const serviceLinks = [
  "AI Strategy",
  "Website Development",
  "Mobile Apps",
  "Custom Software",
  "SEO",
  "Paid Media",
];

function linkHref(label) {
  if (label === "Home") return "#hero";
  if (label === "Contact") return "#footer";
  return `#${label.toLowerCase()}`;
}

export default function Footer() {
  const {
    content: { settings },
  } = useSiteContent();

  return (
    <footer id="footer" className="px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 text-sm font-semibold text-slate-950">
                FI
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-[0.16em] text-white">
                  {settings.companyName}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Digital innovation agency</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
              We design and build premium digital experiences that combine strategy, technology, and growth execution.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#footer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a key={link} href={linkHref(link)} className="text-sm text-slate-300 transition hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Services</h3>
            <div className="mt-5 flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <p key={service} className="text-sm text-slate-300">
                  {service}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-100" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-cyan-100" />
                <span>{settings.phone}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-cyan-100" />
                <span>{settings.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          Copyright 2026 {settings.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
