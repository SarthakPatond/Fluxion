import Reveal from "./Reveal";

export default function SectionIntro({ eyebrow, title, description, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <Reveal className={`max-w-2xl ${alignClass}`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/70">
        {eyebrow}
      </p>
      <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
        {description}
      </p>
    </Reveal>
  );
}
