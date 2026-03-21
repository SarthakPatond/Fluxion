import { useSiteContent } from "../../context/SiteContentContext";

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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    updateHero(
      fields.reduce((accumulator, field) => {
        accumulator[field.key] = formData.get(field.key);
        return accumulator;
      }, {}),
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">Banner Manager</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Manage homepage hero content</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Update banner text, CTA labels, and hero links. Changes are reflected immediately on the public homepage.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className={field.textarea ? "md:col-span-2" : ""}>
                <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                {field.textarea ? (
                  <textarea
                    name={field.key}
                    defaultValue={hero[field.key]}
                    rows={5}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                ) : (
                  <input
                    name={field.key}
                    defaultValue={hero[field.key]}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save Banner
            </button>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(255,255,255,0.03),rgba(250,204,21,0.1))] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/75">Live Preview</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">{hero.title}</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
              {hero.primaryCtaLabel}
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
              {hero.secondaryCtaLabel}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
