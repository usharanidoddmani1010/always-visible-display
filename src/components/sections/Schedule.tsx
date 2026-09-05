import { motion } from "motion/react";
import { useState } from "react";
import { ProductDisplay, type ScreenState } from "@/components/ProductDisplay";
import { EASE, reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SLOTS: { time: string; state: ScreenState; note: string }[] = [
  { time: "08:00", state: "morning", note: "The day ahead, ready before you sit down." },
  { time: "12:00", state: "meeting", note: "The next commitment, always in view." },
  { time: "17:00", state: "focus-time", note: "Protected time, quietly announced." },
  { time: "21:00", state: "evening", note: "A calm close and tomorrow’s first item." },
];

export function Schedule() {
  const [index, setIndex] = useState(0);
  const current = SLOTS[index];

  return (
    <section id="schedule" className="border-b border-hair px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <motion.div {...reveal()} className="max-w-[42rem]">
          <p className="eyebrow">Schedule your day</p>
          <h2 className="mt-4 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[3rem]">
            Set it once.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Schedule what appears throughout your day, then let the display keep itself current.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <motion.div
            {...reveal(0.05)}
            className="order-2 mx-auto w-full max-w-[300px] sm:max-w-[440px] lg:order-1"
            style={{ ["--screen-unit" as string]: "clamp(10px, 3.2vw, 19px)" }}
          >
            <ProductDisplay state={current.state} />
          </motion.div>

          <motion.div {...reveal(0.1)} className="order-1 lg:order-2">
            <div
              role="group"
              aria-label="Schedule timeline"
              className="relative pt-2"
              style={{ ["--n" as string]: SLOTS.length }}
            >
              <div className="relative h-px w-full bg-hair">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-ink"
                  animate={{ width: `${(index / (SLOTS.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 180, damping: 26 }}
                />
                <motion.span
                  className="absolute top-1/2 h-3 w-3 rounded-full border border-ink bg-paper"
                  animate={{ left: `${(index / (SLOTS.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 180, damping: 26 }}
                  style={{ translateX: "-50%", translateY: "-50%" }}
                  aria-hidden
                />
              </div>

              <div className="mt-5 flex justify-between">
                {SLOTS.map((s, i) => (
                  <motion.button
                    key={s.time}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={i === index}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={cn(
                      "font-mono rounded-sm px-2 py-1 text-[0.75rem] tabular-nums tracking-[0.12em] transition-colors duration-300",
                      i === index ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {s.time}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-hair pt-6">
              <motion.p
                key={current.time}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="text-[1.05rem] font-medium tracking-tight"
              >
                {current.note}
              </motion.p>
              <p className="eyebrow mt-4">Content can be scheduled and refreshed automatically.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
