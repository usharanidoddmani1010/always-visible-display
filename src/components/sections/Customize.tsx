import { motion } from "motion/react";
import { CalendarDays, CheckSquare, Gauge, Timer } from "lucide-react";
import { useState } from "react";
import { ProductDisplay, type ScreenState } from "@/components/ProductDisplay";
import { EASE, reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MODES: {
  id: Extract<ScreenState, "calendar" | "tasks" | "focus" | "dashboard">;
  label: string;
  hint: string;
  Icon: typeof CalendarDays;
}[] = [
  { id: "calendar", label: "Calendar", hint: "Today at a glance", Icon: CalendarDays },
  { id: "tasks", label: "Tasks", hint: "What needs doing", Icon: CheckSquare },
  { id: "focus", label: "Focus", hint: "Protected time", Icon: Timer },
  { id: "dashboard", label: "Dashboard", hint: "Live system data", Icon: Gauge },
];

export function Customize() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("calendar");

  return (
    <section id="customize" className="border-b border-hair px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <motion.div {...reveal()} className="max-w-[42rem]">
          <p className="eyebrow">Customize your workspace</p>
          <h2 className="mt-4 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[3rem]">
            Make the display yours.
          </h2>
          <p className="mt-5 max-w-[50ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Switch between the information that matters to you. The same display can adapt to
            different moments of your day.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <motion.div
            {...reveal(0.05)}
            className="mx-auto w-full max-w-[300px] sm:max-w-[480px] lg:max-w-none"
            style={{ ["--screen-unit" as string]: "clamp(10px, 3.4vw, 21px)" }}
          >
            <ProductDisplay state={mode} />
          </motion.div>

          <motion.div {...reveal(0.1)}>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-1">
              {MODES.map(({ id, label, hint, Icon }) => {
                const active = mode === id;
                return (
                  <li key={id} className="bg-paper">
                    <motion.button
                      type="button"
                      onClick={() => setMode(id)}
                      aria-pressed={active}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={cn(
                        "relative flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-300",
                        active ? "bg-ink text-paper" : "hover:bg-ink/[0.035]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          active ? "opacity-90" : "text-ink-soft",
                        )}
                        aria-hidden
                      />
                      <span className="flex-1">
                        <span className="block text-[0.95rem] font-medium tracking-tight">
                          {label}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-[0.78rem]",
                            active ? "text-paper/60" : "text-ink-soft",
                          )}
                        >
                          {hint}
                        </span>
                      </span>
                      {active && (
                        <motion.span
                          layoutId="customize-dot"
                          className="h-1.5 w-1.5 rounded-full bg-paper"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>

            <p className="eyebrow mt-6">One display. Many workflows.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
