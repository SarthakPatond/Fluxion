import { motion } from "framer-motion";
import { clientLogos } from "../../data/siteData";
import Reveal from "../ui/Reveal";

export default function ClientLogos() {
  return (
    <section className="section-shell-tight overflow-hidden">
      <div className="content-shell">

        <Reveal className="mb-10">
          <p className="text-safe text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-xs sm:tracking-[0.35em]">
            Trusted by growing brands and emerging teams
          </p>
        </Reveal>

        <div className="relative overflow-hidden">

          {/* Fade edges */}
          <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#020617] to-transparent sm:w-24 lg:w-32"/>
          <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#020617] to-transparent sm:w-24 lg:w-32"/>

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              flex w-max gap-4 sm:gap-6
              perspective-[1000px]
              rotate-x-[10deg] sm:rotate-x-[15deg]
            "
          >
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="
                min-w-[160px] sm:min-w-[200px]
                rounded-[1.6rem]
                border border-white/10
                bg-white/[0.03]
                px-5 py-4 sm:px-6 sm:py-5
                text-safe text-center text-xs font-medium uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.25em]
                text-slate-500
                grayscale
                transition
                
                hover:border-cyan-300/30
                hover:text-white
                hover:grayscale-0
                "
              >
                {logo}
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
