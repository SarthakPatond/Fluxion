import { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useSiteContent } from "../../context/SiteContentContext";
import { AdminBadge, AdminButton, AdminCard, AdminInput } from "./AdminUI";
import { adminLinks, getAdminPageMeta } from "./adminNavigation";

function isActivePath(pathname, href) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ pathname, collapsed, content, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-white" onClick={onNavigate}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-violet-500 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.22)]">
            FI
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-[0.18em] text-white/90">FLUXION</p>
              <p className="truncate text-[11px] uppercase tracking-[0.22em] text-white/45">Admin Command</p>
            </div>
          ) : null}
        </Link>
      </div>

      {!collapsed ? (
        <AdminCard tone="gradient" className="mt-8 space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-100">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Premium Control Panel</p>
              <p className="text-xs leading-6 text-slate-300">Curate the public experience without leaving the design system.</p>
            </div>
          </div>
        </AdminCard>
      ) : null}

      <nav className="mt-8 flex-1 space-y-2">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          const active = isActivePath(pathname, link.href);
          const count = link.countKey ? content[link.countKey]?.length : null;

          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={onNavigate}
              className={clsx(
                "group relative flex items-center gap-3 overflow-hidden rounded-[1.4rem] border px-4 py-3 text-sm font-medium transition duration-300",
                active
                  ? "border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(15,23,42,0.8),rgba(139,92,246,0.14))] text-white shadow-[0_18px_45px_rgba(56,189,248,0.12)]"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
                collapsed && "justify-center px-0",
              )}
              title={collapsed ? link.label : undefined}
            >
              <div className="absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b from-cyan-300 to-violet-400 opacity-0 transition group-hover:opacity-70 group-hover:translate-x-0" />
              <div
                className={clsx(
                  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition",
                  active
                    ? "border-white/10 bg-white/[0.08] text-white"
                    : "border-white/5 bg-white/[0.03] text-slate-400 group-hover:border-white/10 group-hover:text-white",
                )}
              >
                <Icon size={18} />
              </div>

              {!collapsed ? (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{link.label}</p>
                    <p className="truncate text-xs text-slate-500 group-hover:text-slate-400">{link.description}</p>
                  </div>
                  {typeof count === "number" ? (
                    <span
                      className={clsx(
                        "rounded-full border px-2.5 py-1 text-xs font-semibold",
                        active ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.05] text-slate-400",
                      )}
                    >
                      {count}
                    </span>
                  ) : null}
                </>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {!collapsed ? (
        <AdminCard className="mt-6 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Workspace</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Changes persist in local storage and update the public site immediately.
          </p>
        </AdminCard>
      ) : null}
    </div>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useSiteContent();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const pageMeta = getAdminPageMeta(location.pathname);

  const totalEntries =
    content.services.length + content.blogPosts.length + content.careers.length + content.mediaItems.length;

  const quickResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return adminLinks.filter((link) =>
      [link.label, link.description, ...(link.keywords ?? [])].join(" ").toLowerCase().includes(normalized),
    );
  }, [query]);

  function handleNavigateToResult(href) {
    navigate(href);
    setQuery("");
    setIsSidebarOpen(false);
  }

  function renderSidebar({ className = "", collapsed = isSidebarCollapsed } = {}) {
    return (
      <aside
        className={clsx(
          "relative flex h-full flex-col border-r border-white/10 bg-slate-950/75 p-4 backdrop-blur-2xl transition-all duration-300 sm:p-5",
          className,
        )}
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <SidebarContent
          pathname={location.pathname}
          collapsed={collapsed}
          content={content}
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </aside>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#020617_0%,#020817_42%,#050816_100%)] text-white selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_28%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px] bg-[position:0_0,100%_0,0_0,0_0] opacity-50" />
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1700px]">
        <div
          className={clsx(
            "hidden shrink-0 lg:block",
            isSidebarCollapsed ? "w-[104px]" : "w-[320px]",
          )}
        >
          {renderSidebar()}
        </div>

        {isSidebarOpen ? (
          <div className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <div
              className="h-full w-[88vw] max-w-[320px]"
              onClick={(event) => event.stopPropagation()}
            >
              {renderSidebar({ className: "z-50 w-full border-r", collapsed: false })}
            </div>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AdminButton
                    variant="secondary"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <Menu size={18} />
                  </AdminButton>
                  <AdminButton
                    variant="secondary"
                    size="icon"
                    className="hidden lg:inline-flex"
                    onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                    aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                  </AdminButton>
                  <div>
                    <p className="eyebrow-text">Content System</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <h1 className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">{pageMeta.label}</h1>
                      <AdminBadge tone="cyan">{totalEntries} live entries</AdminBadge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <AdminButton as={Link} to="/" variant="secondary" className="hidden sm:inline-flex">
                    <Globe size={16} />
                    View Website
                  </AdminButton>
                  <AdminCard className="min-w-[180px] p-3 sm:min-w-[220px]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-500 text-sm font-bold text-slate-950">
                        AD
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">Administrator</p>
                        <p className="truncate text-xs text-slate-400">Local CMS workspace</p>
                      </div>
                    </div>
                  </AdminCard>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="relative">
                  <AdminInput
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Jump to banners, blog, services, settings..."
                    className="rounded-full px-5 py-3.5"
                  />
                  {quickResults.length ? (
                    <div className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-40 rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-2 shadow-[0_24px_70px_rgba(2,8,23,0.5)] backdrop-blur-2xl">
                      {quickResults.map((result) => {
                        const Icon = result.icon;
                        return (
                          <button
                            key={result.href}
                            type="button"
                            onClick={() => handleNavigateToResult(result.href)}
                            className="flex w-full items-center gap-3 rounded-[1.2rem] px-4 py-3 text-left transition duration-300 hover:bg-white/[0.06]"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-200">
                              <Icon size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white">{result.label}</p>
                              <p className="truncate text-xs text-slate-400">{result.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-300 sm:text-sm">
                    {pageMeta.description}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-xs font-medium text-violet-100 sm:text-sm">
                    {content.settings.companyName}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="relative px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1400px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
