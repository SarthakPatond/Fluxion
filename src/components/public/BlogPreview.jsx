import { ArrowRight } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import SectionIntro from "../ui/SectionIntro";
import Reveal from "../ui/Reveal";

export default function BlogPreview() {
  const {
    content: { blogPosts },
  } = useSiteContent();

  return (
    <section id="blog" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Latest Blog"
          title="Insights around AI, modern web systems, and digital growth strategy."
          description="Content blocks are driven from the admin dashboard, so the team can update headlines, excerpts, and categories without touching code."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Reveal key={post.id}>
              <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03]">
                <div className="h-52 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.8),rgba(250,204,21,0.14))]" />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{post.excerpt}</p>
                  <button className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                    Read more
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
