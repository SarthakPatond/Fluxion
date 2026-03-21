import { motion } from "framer-motion";
import { clientLogos } from "../../data/siteData";
import Reveal from "../ui/Reveal";

export default function ClientLogos() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        <Reveal className="mb-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Trusted by growing brands and emerging teams
          </p>
        </Reveal>

        <div className="relative overflow-hidden">

          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#020617] to-transparent z-10"/>
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#020617] to-transparent z-10"/>

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              flex gap-6 w-max
              perspective-[1000px]
              rotate-x-[15deg]
            "
          >
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="
                min-w-[200px]
                rounded-[1.6rem]
                border border-white/10
                bg-white/[0.03]
                px-6 py-5
                text-center text-sm font-medium uppercase tracking-[0.25em]
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