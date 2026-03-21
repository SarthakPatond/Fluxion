import { useSiteContent } from "../../context/SiteContentContext";

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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    updateSettings(
      fields.reduce((accumulator, field) => {
        accumulator[field.key] = formData.get(field.key);
        return accumulator;
      }, {}),
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Global website settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Update the shared contact information used in the footer and dashboard previews.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className={field.textarea ? "md:col-span-2" : ""}>
                <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                {field.textarea ? (
                  <textarea
                    name={field.key}
                    rows={4}
                    defaultValue={settings[field.key]}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                ) : (
                  <input
                    name={field.key}
                    defaultValue={settings[field.key]}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={resetContent}
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-300"
            >
              Reset Demo Content
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save Settings
            </button>
          </div>
        </form>

        <article className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(255,255,255,0.03),rgba(250,204,21,0.1))] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/75">Live Contact Preview</p>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
            <p>
              <span className="text-slate-400">Company:</span> {settings.companyName}
            </p>
            <p>
              <span className="text-slate-400">Email:</span> {settings.email}
            </p>
            <p>
              <span className="text-slate-400">Phone:</span> {settings.phone}
            </p>
            <p>
              <span className="text-slate-400">WhatsApp:</span> {settings.whatsapp}
            </p>
            <p>
              <span className="text-slate-400">Address:</span> {settings.address}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
