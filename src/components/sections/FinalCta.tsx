import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EASE, reveal } from "@/lib/motion";

export function FinalCta() {
  return (
    <section id="cta" className="px-5 py-28 sm:px-8 sm:py-40">
      <motion.div {...reveal()} className="mx-auto max-w-[40rem] text-center">
        <h2 className="text-[2.1rem] font-medium leading-[1.05] tracking-[-0.03em] text-balance-tight sm:text-[3.2rem]">
          Make space for what matters.
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-[0.98rem] leading-relaxed text-ink-soft">
          One quiet surface for the information you want within reach.
        </p>
        <motion.a
          href="#product"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="group mt-10 inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-7 py-3.5 text-[0.9rem] font-medium text-paper"
        >
          Explore the display
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
