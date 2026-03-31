import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CircleCheckBig,
  FileText,
  FolderKanban,
  Image,
  PanelsTopLeft,
  Settings,
} from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminMetricCard,
  AdminPageHeader,
} from "../../components/admin/AdminUI";

const cards = [
  {
    key: "services",
    label: "Services",
    icon: BriefcaseBusiness,
    accent: "cyan",
    description: "Visible service offers powering the public services grid.",
  },
  {
    key: "blogPosts",
    label: "Blog Posts",
    icon: FileText,
    accent: "violet",
    description: "Articles and summaries currently available to readers.",
  },
  {
    key: "careers",
    label: "Open Roles",
    icon: FolderKanban,
    accent: "emerald",
    description: "Hiring positions surfaced across the careers experience.",
  },
  {
    key: "mediaItems",
    label: "Media Assets",
    icon: Image,
    accent: "amber",
    description: "Tracked visuals, placeholders, and supporting assets.",
  },
];

const quickActions = [
  {
    title: "Update hero banner",
    description: "Fine-tune the homepage message, CTAs, and first-impression content.",
    href: "/admin/banners",
    icon: PanelsTopLeft,
  },
  {
    title: "Publish a blog post",
    description: "Add new thought leadership content with a richer body editor.",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Refresh company settings",
    description: "Keep footer contact data and company info aligned.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function DashboardOverview() {
  const { content } = useSiteContent();

  const totalEntries =
    content.services.length + content.blogPosts.length + content.careers.length + content.mediaItems.length;

  const recentActivity = [
    {
      label: "Newest service",
      title: content.services.at(-1)?.title,
      detail: content.services.at(-1)?.category,
      href: "/admin/services",
      icon: BriefcaseBusiness,
    },
    {
      label: "Latest article",
      title: content.blogPosts.at(-1)?.title,
      detail: content.blogPosts.at(-1)?.date,
      href: "/admin/blog",
      icon: FileText,
    },
    {
      label: "Recent role",
      title: content.careers.at(-1)?.title,
      detail: content.careers.at(-1)?.location,
      href: "/admin/careers",
      icon: FolderKanban,
    },
    {
      label: "Newest asset",
      title: content.mediaItems.at(-1)?.name,
      detail: content.mediaItems.at(-1)?.usage,
      href: "/admin/media",
      icon: Image,
    },
  ].filter((item) => item.title);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Dashboard Overview"
        title="A premium command center for the public experience."
        description="Track every content module from one cohesive workspace, with stronger hierarchy, clearer summaries, and faster paths into the pages you edit most often."
        meta={
          <>
            <AdminBadge tone="cyan">{totalEntries} total records</AdminBadge>
            <AdminBadge tone="violet">{content.settings.companyName}</AdminBadge>
          </>
        }
        actions={
          <AdminButton as={Link} to="/admin/banners">
            <PanelsTopLeft size={16} />
            Edit Homepage Banner
          </AdminButton>
        }
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const value = content[card.key].length;

          return (
            <AdminMetricCard
              key={card.key}
              label={card.label}
              value={value}
              icon={card.icon}
              accent={card.accent}
              change={value > 0 ? `${value} records currently visible` : "No records created yet"}
              description={card.description}
            />
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminCard tone="gradient" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-100">
                <BarChart3 size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Dashboard snapshot</h2>
                <p className="text-sm text-slate-300">Key content signals and homepage highlights in one place.</p>
              </div>
            </div>
            <AdminBadge tone="cyan">Live preview aware</AdminBadge>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                Homepage hero
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">{content.hero.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{content.hero.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                  {content.hero.primaryCtaLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white">
                  {content.hero.secondaryCtaLabel}
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-100/70">
                System health
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="mt-1 text-cyan-200" size={18} />
                  <div>
                    <p className="text-sm font-medium text-white">Shared state is active</p>
                    <p className="text-sm leading-6 text-slate-400">
                      Dashboard edits update the public site without separate admin-specific models.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="mt-1 text-cyan-200" size={18} />
                  <div>
                    <p className="text-sm font-medium text-white">Responsive management surface</p>
                    <p className="text-sm leading-6 text-slate-400">
                      Tables collapse into stacked cards on small screens while keeping each action available.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="mt-1 text-cyan-200" size={18} />
                  <div>
                    <p className="text-sm font-medium text-white">Brand system aligned</p>
                    <p className="text-sm leading-6 text-slate-400">
                      The admin now uses the same dark gradients, glass surfaces, and rounded rhythm as the public site.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent activity</h2>
              <p className="text-sm text-slate-400">Latest entries across each content collection.</p>
            </div>
            <AdminBadge>{recentActivity.length} feeds</AdminBadge>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.07]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/65 text-cyan-100">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <p className="truncate text-sm font-medium text-white">{item.title}</p>
                    <p className="truncate text-xs text-slate-400">{item.detail}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500" />
                </Link>
              );
            })}
          </div>
        </AdminCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <AdminCard className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Quick actions</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">Jump into the pages that shape the homepage fastest.</p>
          </div>
          <div className="grid gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  to={action.href}
                  className="group rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/65 text-white">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">{action.title}</p>
                        <ArrowUpRight size={16} className="text-slate-500 transition group-hover:text-cyan-100" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Contact summary</h2>
              <p className="text-sm text-slate-400">Shared company details used across the public website.</p>
            </div>
            <AdminButton as={Link} to="/admin/settings" variant="secondary">
              <Settings size={16} />
              Open Settings
            </AdminButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Company</p>
              <p className="mt-2 text-sm font-medium text-white">{content.settings.companyName}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Email</p>
              <p className="mt-2 text-sm font-medium text-white">{content.settings.email}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Phone</p>
              <p className="mt-2 text-sm font-medium text-white">{content.settings.phone}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">WhatsApp</p>
              <p className="mt-2 text-sm font-medium text-white">{content.settings.whatsapp}</p>
            </div>
          </div>
        </AdminCard>
      </section>
    </div>
  );
}
