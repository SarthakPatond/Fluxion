import { useMemo, useState } from "react";
import { Edit3, FilePenLine, Plus, Trash2 } from "lucide-react";
import RichTextEditor from "../../components/admin/RichTextEditor";
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
} from "../../components/admin/AdminUI";
import { useSiteContent } from "../../context/SiteContentContext";

function createEmptyDraft() {
  return {
    title: "",
    category: "",
    date: "",
    readTime: "",
    excerpt: "",
    body: "",
  };
}

export default function BlogManager() {
  const { content, addItem, updateItem, deleteItem } = useSiteContent();
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(createEmptyDraft);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return content.blogPosts;
    }

    const lowered = query.toLowerCase();
    return content.blogPosts.filter((post) =>
      [post.title, post.category, post.excerpt, post.body]
        .join(" ")
        .toLowerCase()
        .includes(lowered),
    );
  }, [content.blogPosts, query]);

  const columns = [
    {
      key: "title",
      header: "Article",
      render: (post) => (
        <div className="space-y-1">
          <p className="font-medium text-white">{post.title}</p>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">{post.category}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Publishing",
      render: (post) => (
        <div className="space-y-1 text-sm leading-6 text-slate-300">
          <p>{post.date || "No publish date"}</p>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{post.readTime || "No read time"}</p>
        </div>
      ),
    },
    {
      key: "excerpt",
      header: "Excerpt",
      cellClassName: "max-w-[28rem]",
      render: (post) => <p className="max-w-[28rem] text-sm leading-7 text-slate-200">{post.excerpt}</p>,
    },
  ];

  function openCreate() {
    setEditingId(null);
    setDraft(createEmptyDraft());
    setIsModalOpen(true);
  }

  function openEdit(post) {
    setEditingId(post.id);
    setDraft({
      title: post.title,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      excerpt: post.excerpt,
      body: post.body || "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setDraft(createEmptyDraft());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId) {
      updateItem("blogPosts", editingId, draft);
    } else {
      addItem("blogPosts", draft);
    }

    closeModal();
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Blog Manager"
        title="Publish articles with a cleaner editorial workspace."
        description="Create, revise, and review blog content inside a premium dashboard surface without changing the underlying CRUD or rich text behavior."
        meta={
          <>
            <AdminBadge tone="cyan">{content.blogPosts.length} total posts</AdminBadge>
            <AdminBadge tone="violet">Rich body editor</AdminBadge>
          </>
        }
        actions={
          <AdminButton onClick={openCreate}>
            <Plus size={16} />
            Add Post
          </AdminButton>
        }
      />

      <AdminCard className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <AdminSearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blog posts"
            wrapperClassName="max-w-xl flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <AdminBadge>{filteredPosts.length} visible</AdminBadge>
            <AdminBadge tone="violet">{query.trim() ? "Filtered articles" : "All articles"}</AdminBadge>
          </div>
        </div>

        <AdminDataTable
          columns={columns}
          rows={filteredPosts}
          mobileTitleKey="title"
          emptyState="No posts matched the current search."
          renderActions={(post) => (
            <>
              <AdminButton variant="secondary" size="icon" onClick={() => openEdit(post)} aria-label="Edit post">
                <Edit3 size={16} />
              </AdminButton>
              <AdminButton
                variant="danger"
                size="icon"
                onClick={() => deleteItem("blogPosts", post.id)}
                aria-label="Delete post"
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
        eyebrow={editingId ? "Edit post" : "Create post"}
        title={editingId ? "Update blog article" : "Create a new blog article"}
        description="Use the same premium form rhythm as the rest of the dashboard while keeping the blog editor workflow intact."
        className="max-w-6xl"
      >
        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <AdminCard className="space-y-5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-100">
                  <FilePenLine size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Post details</h3>
                  <p className="text-sm text-slate-400">Core metadata used for cards and article previews.</p>
                </div>
              </div>

              <div className="grid gap-5">
                <AdminField label="Post Title">
                  <AdminInput
                    value={draft.title}
                    onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                  />
                </AdminField>
                <div className="grid gap-5 md:grid-cols-2">
                  <AdminField label="Category">
                    <AdminInput
                      value={draft.category}
                      onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
                    />
                  </AdminField>
                  <AdminField label="Read Time">
                    <AdminInput
                      value={draft.readTime}
                      onChange={(event) => setDraft((prev) => ({ ...prev, readTime: event.target.value }))}
                    />
                  </AdminField>
                </div>
                <AdminField label="Publish Date">
                  <AdminInput
                    value={draft.date}
                    onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
                  />
                </AdminField>
                <AdminField label="Excerpt">
                  <AdminTextarea
                    value={draft.excerpt}
                    onChange={(event) => setDraft((prev) => ({ ...prev, excerpt: event.target.value }))}
                    rows={5}
                  />
                </AdminField>
              </div>
            </AdminCard>

            <AdminCard tone="gradient" className="space-y-4 p-5">
              <p className="eyebrow-text">Card Preview</p>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">{draft.category || "Category"}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {draft.title || "Untitled article"}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {draft.excerpt || "Your article excerpt will appear here as you type."}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
                  {[draft.date || "Publish date", draft.readTime || "Read time"].join(" / ")}
                </p>
              </div>
            </AdminCard>
          </div>

          <AdminCard className="space-y-5 p-5">
            <div>
              <h3 className="text-lg font-semibold text-white">Article body</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Format the article body with bold text, lists, and quotes using the existing lightweight editor.
              </p>
            </div>

            <RichTextEditor
              value={draft.body}
              onChange={(body) => setDraft((prev) => ({ ...prev, body }))}
            />

            <div className="flex flex-wrap justify-end gap-3">
              <AdminButton type="button" variant="ghost" onClick={closeModal}>
                Cancel
              </AdminButton>
              <AdminButton type="submit">{editingId ? "Save Changes" : "Create Post"}</AdminButton>
            </div>
          </AdminCard>
        </form>
      </AdminModal>
    </div>
  );
}
