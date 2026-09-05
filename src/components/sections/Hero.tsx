import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ProductDisplay } from "@/components/ProductDisplay";
import { EASE, useCalmMotion } from "@/lib/motion";

export function Hero() {
  const calm = useCalmMotion();
  const d = (s: number) => (calm ? 0 : s);

  return (
    <section
      id="product"
      className="relative overflow-hidden border-b border-hair px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-1/3 h-px bg-hair/70" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-hair/40" />
      </motion.div>

      <div className="relative mx-auto max-w-[1080px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: d(0.15) }}
          className="eyebrow text-center"
        >
          7.5-inch workspace display
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: d(0.25) }}
          className="mx-auto mt-5 max-w-[16ch] text-center text-[2.45rem] font-medium leading-[1.02] tracking-[-0.03em] text-balance-tight sm:text-6xl lg:text-[4.6rem]"
        >
          Your information. Always within sight.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: d(0.38) }}
          className="mx-auto mt-6 max-w-[52ch] text-center text-[0.98rem] leading-relaxed text-ink-soft sm:text-[1.05rem]"
        >
          A quiet workspace display for the information you want to see at a glance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: calm ? 1 : 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: calm ? 0.3 : 0.9, ease: EASE, delay: d(0.45) }}
          className="mx-auto mt-14 w-full max-w-[300px] sm:max-w-[440px] lg:max-w-[540px]"
          style={{ ["--screen-unit" as string]: "clamp(9px, 3.2vw, 19px)" }}
        >
          <ProductDisplay state="calendar" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: d(1.15) }}
          className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.a
            href="#customize"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper sm:w-auto"
          >
            Explore the display
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            href="#integrations"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-ink/15 px-6 py-3 text-[0.9rem] font-medium text-ink hover:bg-ink/[0.04] sm:w-auto"
          >
            See how it works
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
