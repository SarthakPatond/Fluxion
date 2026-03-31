import { useMemo, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminDataTable,
  AdminField,
  AdminInput,
  AdminModal,
  AdminPageHeader,
  AdminSearchInput,
  AdminTextarea,
} from "./AdminUI";

function EmptyValue({ value }) {
  if (value === undefined || value === null || value === "") {
    return <span className="text-slate-500">Not set</span>;
  }

  return <span>{value}</span>;
}

export default function GenericManager({
  eyebrow = "Content Module",
  title,
  description,
  items,
  fields,
  searchKeys,
  onAdd,
  onUpdate,
  onDelete,
  createLabel = "Add New",
  emptyState = "No content matched the current search.",
  entityLabel,
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

  const columns = useMemo(
    () =>
      fields.map((field) => ({
        key: field.name,
        header: field.label,
        cellClassName: field.long ? "max-w-[24rem]" : "",
        render: (item) => (
          <div className={clsx("text-sm leading-7 text-slate-200", field.long && "max-w-[24rem]")}>
            {field.render ? field.render(item) : <EmptyValue value={item[field.name]} />}
          </div>
        ),
      })),
    [fields],
  );
  const resolvedEntityLabel = entityLabel ?? title.replace(/\s+(Manager|Portal)$/u, "").trim();

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
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        meta={
          <>
            <AdminBadge tone="cyan">{items.length} total entries</AdminBadge>
            <AdminBadge>{fields.length} editable fields</AdminBadge>
          </>
        }
        actions={
          <AdminButton onClick={openCreateModal}>
            <Plus size={16} />
            {createLabel}
          </AdminButton>
        }
      />

      <AdminCard className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <AdminSearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}`}
            wrapperClassName="max-w-xl flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <AdminBadge>{filteredItems.length} visible</AdminBadge>
            <AdminBadge tone="violet">{query.trim() ? "Filtered view" : "All records"}</AdminBadge>
          </div>
        </div>

        <AdminDataTable
          columns={columns}
          rows={filteredItems}
          mobileTitleKey={fields[0]?.name}
          emptyState={emptyState}
          renderActions={(item) => (
            <>
              <AdminButton
                variant="secondary"
                size="icon"
                onClick={() => openEditModal(item)}
                aria-label={`Edit ${title}`}
              >
                <Edit3 size={16} />
              </AdminButton>
              <AdminButton
                variant="danger"
                size="icon"
                onClick={() => onDelete(item.id)}
                aria-label={`Delete ${title}`}
              >
                <Trash2 size={16} />
              </AdminButton>
            </>
          )}
        />
      </AdminCard>

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        eyebrow={editingItem ? "Edit entry" : "Create entry"}
        title={editingItem ? `Update ${resolvedEntityLabel}` : `Create ${resolvedEntityLabel}`}
        description="Refined spacing, stronger hierarchy, and consistent controls keep content editing fast and predictable."
        className="max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <AdminField key={field.name} label={field.label} className={field.long ? "md:col-span-2" : ""}>
              {field.type === "textarea" ? (
                <AdminTextarea
                  value={draft[field.name]}
                  onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))}
                  rows={field.rows ?? 5}
                  placeholder={field.placeholder}
                />
              ) : (
                <AdminInput
                  value={draft[field.name]}
                  onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                  type={field.inputType ?? "text"}
                />
              )}
            </AdminField>
          ))}

          <div className="md:col-span-2 flex flex-wrap justify-end gap-3 pt-2">
            <AdminButton type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </AdminButton>
            <AdminButton type="submit">{editingItem ? "Save Changes" : "Create Entry"}</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

function createDraft(fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.name] = "";
    return accumulator;
  }, {});
}
