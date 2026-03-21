import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
        <div
          className={clsx(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6",
            isScrolled
              ? "border-white/10 bg-slate-950/80 shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur-2xl"
              : "border-white/10 bg-white/5 backdrop-blur-xl",
          )}
        >
          <a href="#hero" className="flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 text-sm font-semibold text-slate-950">
              FI
            </span>
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.22em] text-white/90">
                FLUXION
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Innovation Agency</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/admin"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-cyan-300/40 hover:text-white"
            >
              Admin
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Start Project
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-4 top-24 z-40 rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_32px_80px_rgba(2,8,23,0.5)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl border border-transparent px-4 py-3 text-base font-medium text-slate-200 transition hover:border-white/10 hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/admin"
                className="rounded-2xl border border-white/10 px-4 py-3 text-base font-medium text-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
