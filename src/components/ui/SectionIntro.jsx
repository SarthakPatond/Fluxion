import Reveal from "./Reveal";

export default function SectionIntro({ eyebrow, title, description, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <Reveal className={`max-w-3xl ${alignClass}`}>
      <p className="eyebrow-text mb-4 text-safe">
        {eyebrow}
      </p>
      <h2 className="text-balance text-safe max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h2>
      <p className="text-safe mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
        {description}
      </p>
    </Reveal>
  );
}
