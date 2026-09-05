import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BatteryFull, Eye, LayoutPanelTop } from "lucide-react";
import { EASE, reveal, useCalmMotion } from "@/lib/motion";

const BENEFITS = [
  { title: "Low power", body: "Minimal charging attention.", Icon: BatteryFull },
  { title: "Always visible", body: "Important information stays in sight.", Icon: Eye },
  { title: "Desk or wall", body: "Place it where it is useful.", Icon: LayoutPanelTop },
];

export function AlwaysThere() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const calm = useCalmMotion();
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (calm) {
      setDays(30);
      return;
    }
    const controls = animate(0, 30, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDays(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, calm]);

  return (
    <section className="border-b border-hair px-5 py-24 sm:px-8 sm:py-32">
      <div ref={ref} className="mx-auto max-w-[1240px]">
        <motion.div {...reveal()} className="mx-auto max-w-[46rem] text-center">
          <p className="eyebrow">Always there</p>
          <h2 className="mt-4 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-balance-tight sm:text-[3rem]">
            Always there. Rarely demanding.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Low-power operation lets useful information stay visible for long periods without
            constant charging.
          </p>
        </motion.div>

        <motion.div
          {...reveal(0.08)}
          className="mx-auto mt-16 flex max-w-[46rem] flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-14"
        >
          <div className="text-center sm:text-left">
            <p className="eyebrow">Up to</p>
            <p className="font-mono mt-2 text-[5rem] leading-[0.85] tabular-nums tracking-[-0.04em] sm:text-[7rem]">
              {days}
            </p>
            <p className="eyebrow mt-3">Days</p>
          </div>

          <div className="w-full max-w-[300px]" aria-hidden>
            <div className="relative flex h-16 items-center rounded-sm border border-ink/20 p-1.5 sm:h-20">
              <motion.div
                className="h-full rounded-[2px] bg-ink"
                initial={{ width: "0%" }}
                animate={inView ? { width: "88%" } : { width: "0%" }}
                transition={{ duration: calm ? 0.2 : 1.6, ease: EASE }}
              />
              <span className="absolute -right-[7px] top-1/2 h-6 w-[6px] -translate-y-1/2 rounded-r-sm bg-ink/20" />
            </div>
            <p className="eyebrow mt-3">Battery · e-ink display</p>
          </div>
        </motion.div>

        <ul className="mx-auto mt-20 grid max-w-[62rem] gap-px overflow-hidden rounded-sm border border-hair bg-hair sm:grid-cols-3">
          {BENEFITS.map(({ title, body, Icon }, i) => (
            <motion.li key={title} {...reveal(0.05 * i)} className="bg-paper px-6 py-8">
              <Icon className="h-[18px] w-[18px] text-ink-soft" aria-hidden />
              <p className="eyebrow mt-5">{title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed tracking-tight">{body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
