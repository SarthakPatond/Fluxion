import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PublicLayout from "../../components/public/PublicLayout";
import PageHero from "../../components/public/PageHero";
import PageCTA from "../../components/public/PageCTA";
import SectionIntro from "../../components/ui/SectionIntro";
import Reveal from "../../components/ui/Reveal";
import { useSiteContent } from "../../context/SiteContentContext";

function BlogVisual({ category }) {
  const accentMap = {
    AI: "from-cyan-400/30 via-sky-500/10 to-violet-500/20",
    Business: "from-violet-400/30 via-fuchsia-500/10 to-cyan-400/20",
    Web: "from-emerald-300/30 via-cyan-500/10 to-blue-500/20",
  };

  return (
    <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/70">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[category] ?? accentMap.AI}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.82))]" />
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-[1.2rem] border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
        <div className="min-w-0">
          <p className="text-safe text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/70 sm:tracking-[0.32em]">
            {category}
          </p>
          <p className="text-safe mt-2 text-lg font-medium text-white">Field Notes</p>
        </div>
        <div className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
          New article
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const {
    content: { blogPosts },
  } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(blogPosts.map((post) => post.category))],
    [blogPosts],
  );

  const visiblePosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts[0];

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Blog"
        title="Perspectives on AI, modern web systems, and the mechanics of better digital growth."
        description="The blog is structured for future expansion, with filterable categories, individual article pages, and a visual style that stays aligned with the wider site."
        primaryAction={{ label: "Contact the team", href: "/contact" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        stats={[
          { value: `${blogPosts.length}`, label: "Published insights" },
          { value: `${categories.length - 1}`, label: "Editorial categories" },
          { value: "Evergreen", label: "Built for future article scaling" },
        ]}
      />

      {featuredPost && (
        <section className="section-shell-tight">
          <div className="content-shell">
            <Reveal>
              <article className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <BlogVisual category={featuredPost.category} />
                <div className="p-2 sm:p-5">
                  <p className="eyebrow-text text-safe">
                    Featured insight
                  </p>
                  <h2 className="text-balance text-safe mt-5 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                    {featuredPost.title}
                  </h2>
                  <p className="text-safe mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
                    <span>{featuredPost.date}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="text-safe mt-8 inline-flex min-h-12 max-w-full items-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] sm:px-6"
                  >
                    Read article
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-shell">
        <div className="content-shell">
          <SectionIntro
            eyebrow="All Posts"
            title="A clean editorial grid ready for future categories, thumbnails, and article growth."
            description="Filtering stays intentionally simple and lightweight, while each card already points to its own route-level article template."
          />

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "border-cyan-300/40 bg-cyan-300/10 text-white"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
                  <BlogVisual category={post.category} />
                  <div className="flex flex-1 flex-col p-2 pt-6">
                    <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-balance text-safe mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {post.title}
                    </h2>
                    <p className="text-safe mt-4 flex-1 text-sm leading-7 text-slate-300">{post.excerpt}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-safe text-sm text-slate-400">{post.date}</span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-safe inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"
                      >
                        Read more
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Need a strategic partner?"
        title="The blog explains how we think. The next step is applying that thinking to your business."
        description="If a post resonates, we can turn the idea into a practical roadmap for your next launch, redesign, or growth sprint."
        buttonLabel="Start a conversation"
        buttonHref="/contact"
      />
    </PublicLayout>
  );
}
