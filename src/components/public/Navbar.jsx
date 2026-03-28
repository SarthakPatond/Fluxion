import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { publicNavItems } from "../../data/navigation";

function isActivePath(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floatingPanelClass = clsx(
    "border border-white/10 transition-all duration-300",
    isScrolled
      ? "bg-slate-950/80 shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur-2xl"
      : "bg-white/5 backdrop-blur-xl",
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="content-shell">
          <div className="hidden items-center gap-6 lg:flex">
            <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3 text-white" onClick={() => setMobileOpen(false)}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(14,165,233,0.28)]">
                FI
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold tracking-[0.18em] text-white/90">
                  FLUXION
                </p>
                <p className="truncate text-[11px] uppercase tracking-[0.22em] text-white/45">Innovation Agency</p>
              </div>
            </Link>

            <div className="flex flex-1 justify-center">
              <nav
                className={clsx(
                  "flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[2rem] px-3 py-3",
                  floatingPanelClass,
                )}
              >
                {publicNavItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={({ isActive }) =>
                      clsx(
                        "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:text-white xl:px-5",
                        isActive || isActivePath(location.pathname, item.href)
                          ? "bg-white/8 text-white"
                          : "text-slate-300",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Book Discovery Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div
            className={clsx(
              "flex items-center justify-between rounded-full border px-4 py-3 sm:px-6 lg:hidden",
              floatingPanelClass,
            )}
          >
            <Link to="/" className="flex min-w-0 items-center gap-3 text-white" onClick={() => setMobileOpen(false)}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 text-sm font-semibold text-slate-950">
                FI
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold tracking-[0.18em] text-white/90">
                  FLUXION
                </p>
                <p className="truncate text-[11px] uppercase tracking-[0.2em] text-white/45">Innovation Agency</p>
              </div>
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-4 top-24 z-40 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-[0_32px_80px_rgba(2,8,23,0.5)] backdrop-blur-2xl sm:p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {publicNavItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      "rounded-2xl border px-4 py-3 text-base font-medium transition",
                      isActive || isActivePath(location.pathname, item.href)
                        ? "border-cyan-300/30 bg-cyan-300/10 text-white"
                        : "border-transparent text-slate-200 hover:border-white/10 hover:bg-white/5",
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-semibold text-slate-950"
                onClick={() => setMobileOpen(false)}
              >
                Book Discovery Call
                <ArrowRight size={18} />
              </Link>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
