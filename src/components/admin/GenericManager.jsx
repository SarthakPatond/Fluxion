import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2, X } from "lucide-react";
import clsx from "clsx";

function EmptyValue({ value }) {
  if (value === undefined || value === null || value === "") {
    return <span className="text-slate-500">Not set</span>;
  }

  return <span>{value}</span>;
}

export default function GenericManager({
  title,
  description,
  items,
  fields,
  searchKeys,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [draft, setDraft] = useState(() => createDraft(fields));

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const lowered = query.toLowerCase();
    return items.filter((item) =>
      searchKeys.some((key) => String(item[key] ?? "").toLowerCase().includes(lowered)),
    );
  }, [items, query, searchKeys]);

  function openCreateModal() {
    setIsModalOpen(true);
    setEditingItem(null);
    setDraft(createDraft(fields));
  }

  function openEditModal(item) {
    setIsModalOpen(true);
    setEditingItem(item);
    setDraft(
      fields.reduce((accumulator, field) => {
        accumulator[field.name] = item[field.name] ?? "";
        return accumulator;
      }, {}),
    );
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
    setDraft(createDraft(fields));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingItem) {
      onUpdate(editingItem.id, draft);
    } else {
      onAdd(draft);
    }

    closeModal();
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
            Content Module
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${title.toLowerCase()}`}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/40"
            />
          </div>
          <p className="text-sm text-slate-500">{filteredItems.length} items</p>
        </div>

        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-[1fr_auto]"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {field.label}
                    </p>
                    <div className={clsx("mt-2 text-sm leading-7 text-slate-100", field.long && "max-w-xl")}>
                      <EmptyValue value={item[field.name]} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-red-400/40 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}

          {filteredItems.length === 0 && (
            <div className="rounded-[1.6rem] border border-dashed border-white/10 px-6 py-12 text-center text-sm text-slate-500">
              No content matched the current search.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-[0_30px_120px_rgba(2,8,23,0.5)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                  {editingItem ? "Edit item" : "Create item"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.name} className={clsx("block", field.long && "md:col-span-2")}>
                  <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      value={draft[field.name]}
                      onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))}
                      rows={5}
                      className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40"
                    />
                  ) : (
                    <input
                      value={draft[field.name]}
                      onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))}
                      className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40"
                    />
                  )}
                </label>
              ))}

              <div className="md:col-span-2 mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  {editingItem ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function createDraft(fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.name] = "";
    return accumulator;
  }, {});
}
