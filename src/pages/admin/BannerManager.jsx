import { useEffect, useState } from "react";
import { Eye, PanelsTopLeft } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminPageHeader,
  AdminTextarea,
} from "../../components/admin/AdminUI";

const fields = [
  { key: "eyebrow", label: "Eyebrow" },
  { key: "title", label: "Headline" },
  { key: "description", label: "Description", textarea: true },
  { key: "primaryCtaLabel", label: "Primary CTA Label" },
  { key: "primaryCtaHref", label: "Primary CTA Link" },
  { key: "secondaryCtaLabel", label: "Secondary CTA Label" },
  { key: "secondaryCtaHref", label: "Secondary CTA Link" },
];

export default function BannerManager() {
  const {
    content: { hero },
    updateHero,
  } = useSiteContent();
  const [draft, setDraft] = useState(hero);

  useEffect(() => {
    setDraft(hero);
  }, [hero]);

  function handleSubmit(event) {
    event.preventDefault();
    updateHero(draft);
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Banner Manager"
        title="Shape the homepage hero with the same premium visual rhythm."
        description="Update the messaging, CTA labels, and destination links that define the first interaction on the public site."
        meta={
          <>
            <AdminBadge tone="cyan">Hero module</AdminBadge>
            <AdminBadge tone="violet">Live preview panel</AdminBadge>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <AdminCard className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-100">
              <PanelsTopLeft size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Hero content settings</h2>
              <p className="text-sm text-slate-400">Sharper spacing, stronger inputs, same underlying content model.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <AdminField key={field.key} label={field.label} className={field.textarea ? "md:col-span-2" : ""}>
                {field.textarea ? (
                  <AdminTextarea
                    name={field.key}
                    value={draft[field.key]}
                    onChange={(event) => setDraft((prev) => ({ ...prev, [field.key]: event.target.value }))}
                    rows={5}
                  />
                ) : (
                  <AdminInput
                    name={field.key}
                    value={draft[field.key]}
                    onChange={(event) => setDraft((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  />
                )}
              </AdminField>
            ))}

            <div className="md:col-span-2 flex justify-end">
              <AdminButton type="submit">Save Banner</AdminButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard tone="gradient" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-white">
              <Eye size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Live preview</h2>
              <p className="text-sm text-slate-300">Preview the hierarchy and CTA tone before switching back to the website.</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/55 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/75">{draft.eyebrow}</p>
            <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">{draft.title}</h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">{draft.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                {draft.primaryCtaLabel}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white">
                {draft.secondaryCtaLabel}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Primary Link</p>
              <p className="mt-2 text-sm font-medium text-white">{draft.primaryCtaHref}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Secondary Link</p>
              <p className="mt-2 text-sm font-medium text-white">{draft.secondaryCtaHref}</p>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
