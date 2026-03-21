import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2, X } from "lucide-react";
import RichTextEditor from "../../components/admin/RichTextEditor";
import { useSiteContent } from "../../context/SiteContentContext";

const emptyDraft = {
  title: "",
  category: "",
  date: "",
  readTime: "",
  excerpt: "",
  body: "",
};

export default function BlogManager() {
  const { content, addItem, updateItem, deleteItem } = useSiteContent();
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(emptyDraft);

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

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft);
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
    setDraft(emptyDraft);
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">Blog Manager</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Manage blog content</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Create blog cards for the homepage and edit article body content with a lightweight rich text editor.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
        >
          <Plus size={16} />
          Add Post
        </button>
      </div>

      <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search blog posts"
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/40"
            />
          </div>
          <p className="text-sm text-slate-500">{filteredPosts.length} posts</p>
        </div>

        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-[1fr_auto]"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Title</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">{post.title}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Meta</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">
                    {post.category} · {post.date} · {post.readTime}
                  </p>
                </div>
                <div className="xl:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Excerpt</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">{post.excerpt}</p>
                </div>
              </div>

              <div className="flex items-start justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(post)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem("blogPosts", post.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-red-400/40 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-[0_30px_120px_rgba(2,8,23,0.5)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                  {editingId ? "Edit post" : "Create post"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Blog Post</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-medium text-slate-200">Post Title</span>
                  <input
                    value={draft.title}
                    onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-slate-200">Category</span>
                  <input
                    value={draft.category}
                    onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-slate-200">Publish Date</span>
                  <input
                    value={draft.date}
                    onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-slate-200">Read Time</span>
                  <input
                    value={draft.readTime}
                    onChange={(event) => setDraft((prev) => ({ ...prev, readTime: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                  />
                </label>
              </div>

              <label>
                <span className="mb-2 block text-sm font-medium text-slate-200">Excerpt</span>
                <textarea
                  value={draft.excerpt}
                  onChange={(event) => setDraft((prev) => ({ ...prev, excerpt: event.target.value }))}
                  rows={4}
                  className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                />
              </label>

              <div>
                <span className="mb-2 block text-sm font-medium text-slate-200">Body</span>
                <RichTextEditor
                  value={draft.body}
                  onChange={(body) => setDraft((prev) => ({ ...prev, body }))}
                />
              </div>

              <div className="flex justify-end gap-3">
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
                  {editingId ? "Save Changes" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
