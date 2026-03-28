import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PublicLayout from "../../components/public/PublicLayout";
import Reveal from "../../components/ui/Reveal";
import { useSiteContent } from "../../context/SiteContentContext";

export default function BlogPostPage() {
  const { postId } = useParams();
  const {
    content: { blogPosts },
  } = useSiteContent();

  const postIndex = blogPosts.findIndex((item) => item.id === postId);
  const post = blogPosts[postIndex];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];

  return (
    <PublicLayout>
      <section className="relative isolate px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.18),transparent_22%),radial-gradient(circle_at_84%_14%,rgba(168,85,247,0.16),transparent_22%),linear-gradient(180deg,#050b18_0%,#020617_56%,#020617_100%)]" />
        <div className="content-shell-narrow">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <Reveal className="mt-10">
            <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(2,8,23,0.3)] sm:p-8">
              <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/70">
                <span>{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="text-balance text-safe mt-6 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="text-safe mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{post.excerpt}</p>

              <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/70">
                <div className="h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,rgba(34,211,238,0.25),rgba(15,23,42,0.9),rgba(168,85,247,0.2))]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell-tight">
        <div className="content-shell grid gap-10 lg:grid-cols-[0.72fr_0.28fr]">
          <Reveal>
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  "A sharper offer beats a busier page.",
                  "Performance and clarity shape trust before copy does.",
                  "Systems thinking compounds after launch.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-4 text-sm leading-7 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="space-y-6">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/70">
                  Continue reading
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                  Explore the next article
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{nextPost.title}</p>
                <Link
                  to={`/blog/${nextPost.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"
                >
                  Next article
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(140deg,rgba(34,211,238,0.12),rgba(255,255,255,0.03),rgba(168,85,247,0.1))] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/70">
                  Discuss the topic
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  If this article overlaps with your current project, we can turn the thinking into a practical delivery plan.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Contact the team
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  );
}
