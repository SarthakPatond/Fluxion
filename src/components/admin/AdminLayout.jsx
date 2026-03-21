import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Image,
  LayoutDashboard,
  PanelsTopLeft,
  Settings,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Banner Manager", href: "/admin/banners", icon: PanelsTopLeft },
  { label: "Services Manager", href: "/admin/services", icon: BriefcaseBusiness },
  { label: "Blog Manager", href: "/admin/blog", icon: FileText },
  { label: "Career Portal", href: "/admin/careers", icon: FolderKanban },
  { label: "Media Manager", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#020817_100%)] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[300px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/80 p-6 backdrop-blur-xl lg:border-b-0 lg:border-r">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 text-sm font-semibold text-slate-950">
              FI
            </span>
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-white/90">
                Fluxion
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Admin Dashboard</p>
            </div>
          </Link>

          <nav className="mt-10 grid gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                location.pathname === link.href ||
                (link.href !== "/admin" && location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 text-sm font-medium transition",
                    active
                      ? "border-cyan-300/30 bg-cyan-300/10 text-white"
                      : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 px-6 py-5 backdrop-blur-2xl lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
                  Content System
                </p>
                <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                  Manage public content and homepage modules
                </h1>
              </div>
              <Link
                to="/"
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                View Website
              </Link>
            </div>
          </header>

          <main className="p-6 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
