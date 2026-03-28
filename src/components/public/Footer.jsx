import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../../context/SiteContentContext";
import { footerServiceLinks, publicNavItems } from "../../data/navigation";

export default function Footer() {
  const {
    content: { settings },
  } = useSiteContent();
  const whatsappNumber = settings.whatsapp.replace(/\D/g, "");

  return (
    <footer id="footer" className="px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      <div className="content-shell rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 text-sm font-semibold text-slate-950">
                FI
              </span>
              <div className="min-w-0">
                <p className="text-safe font-display text-base font-semibold tracking-[0.14em] text-white sm:text-lg">
                  {settings.companyName}
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">Digital innovation agency</p>
              </div>
            </div>

            <p className="text-safe mt-6 max-w-md text-sm leading-7 text-slate-300">
              We design and build premium digital experiences that combine strategy, technology, and growth execution.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                <Mail size={16} />
                Email
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {publicNavItems.map((link) => (
                <Link key={link.label} to={link.href} className="text-sm text-slate-300 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Services</h3>
            <div className="mt-5 flex flex-col gap-3">
              {footerServiceLinks.map((service) => (
                <Link key={service.label} to={service.href} className="text-sm text-slate-300 transition hover:text-white">
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-100" />
                <span className="text-safe">{settings.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-cyan-100" />
                <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="text-safe transition hover:text-white">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-cyan-100" />
                <a href={`mailto:${settings.email}`} className="text-safe transition hover:text-white">
                  {settings.email}
                </a>
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
