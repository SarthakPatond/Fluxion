import { useEffect, useState } from "react";
import { Building2, RotateCcw } from "lucide-react";
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
  { key: "companyName", label: "Company Name" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Primary Phone" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "address", label: "Address", textarea: true },
];

export default function Settings() {
  const {
    content: { settings },
    updateSettings,
    resetContent,
  } = useSiteContent();
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  function handleSubmit(event) {
    event.preventDefault();
    updateSettings(draft);
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Settings"
        title="Keep the shared company identity polished and up to date."
        description="These values power the contact details shown throughout the public website and dashboard previews."
        meta={
          <>
            <AdminBadge tone="cyan">Shared configuration</AdminBadge>
            <AdminBadge tone="violet">Footer aware</AdminBadge>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <AdminCard className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-100">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Company settings</h2>
              <p className="text-sm text-slate-400">Contact details, brand identity, and company references in one place.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <AdminField key={field.key} label={field.label} className={field.textarea ? "md:col-span-2" : ""}>
                {field.textarea ? (
                  <AdminTextarea
                    name={field.key}
                    rows={4}
                    value={draft[field.key]}
                    onChange={(event) => setDraft((prev) => ({ ...prev, [field.key]: event.target.value }))}
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

            <div className="md:col-span-2 flex flex-wrap justify-end gap-3 pt-2">
              <AdminButton type="button" variant="danger" onClick={resetContent}>
                <RotateCcw size={16} />
                Reset Demo Content
              </AdminButton>
              <AdminButton type="submit">Save Settings</AdminButton>
            </div>
          </form>
        </AdminCard>

        <div className="grid gap-5">
          <AdminCard tone="gradient" className="space-y-5">
            <div>
              <p className="eyebrow-text">Live Contact Preview</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{draft.companyName}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Review the exact company information surfaced in the website footer and contact areas.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Email</p>
                <p className="mt-2 text-sm font-medium text-white">{draft.email}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Phone</p>
                <p className="mt-2 text-sm font-medium text-white">{draft.phone}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">WhatsApp</p>
                <p className="mt-2 text-sm font-medium text-white">{draft.whatsapp}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Address</p>
                <p className="mt-2 text-sm leading-7 text-white">{draft.address}</p>
              </div>
            </div>
          </AdminCard>

          <AdminCard className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Reset behavior</h2>
            <p className="text-sm leading-7 text-slate-400">
              Resetting demo content restores the original local dataset for services, blog posts, careers, media, and settings.
            </p>
            <p className="text-sm leading-7 text-slate-400">
              This action keeps the admin logic untouched and only swaps the stored content payload back to its seeded state.
            </p>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
