import { BarChart3, BriefcaseBusiness, FileText, FolderKanban, Image } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

const cards = [
  { key: "services", label: "Services", icon: BriefcaseBusiness },
  { key: "blogPosts", label: "Blog Posts", icon: FileText },
  { key: "careers", label: "Open Roles", icon: FolderKanban },
  { key: "mediaItems", label: "Media Assets", icon: Image },
];

export default function DashboardOverview() {
  const { content } = useSiteContent();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(255,255,255,0.03),rgba(250,204,21,0.1))] p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/75">
            Dashboard Overview
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
            Website content is now editable from a shared React content store.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Updates made in the dashboard propagate immediately to the public homepage because both sides read the same state and persist it in local storage.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.key} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    {content[card.key].length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-cyan-300/10 text-cyan-100">
                  <Icon size={20} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-cyan-300/10 text-cyan-100">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Hero Preview</h3>
              <p className="text-sm text-slate-400">Current banner content shown on the homepage</p>
            </div>
          </div>
          <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
              {content.hero.eyebrow}
            </p>
            <h4 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
              {content.hero.title}
            </h4>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              {content.hero.description}
            </p>
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-semibold text-white">System Notes</h3>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <p>Banner Manager updates the homepage hero text and CTA labels.</p>
            <p>Services, blog posts, careers, and media all support create, edit, and delete actions.</p>
            <p>Settings updates company name, phone, email, and address used in the footer.</p>
          </div>
        </article>
      </section>
    </div>
  );
}
