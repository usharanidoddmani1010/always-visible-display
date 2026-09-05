import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProductDisplay, type ScreenState } from "@/components/ProductDisplay";
import { EASE, reveal, useCalmMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type IntegrationId = Extract<ScreenState, "google-calendar" | "slack" | "outlook" | "teams">;

const INTEGRATIONS: {
  id: IntegrationId;
  name: string;
  mark: string;
  source: string;
  title: string;
  detail: string;
}[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    mark: "GC",
    source: "Calendar event",
    title: "Design Review",
    detail: "3:30 PM — Conference Room",
  },
  {
    id: "slack",
    name: "Slack",
    mark: "SL",
    source: "Sarah",
    title: "Design review moved to 3:30 PM",
    detail: "#design-team · just now",
  },
  {
    id: "outlook",
    name: "Outlook",
    mark: "OL",
    source: "Invitation",
    title: "Team Meeting",
    detail: "Tomorrow — 10:00 AM",
  },
  {
    id: "teams",
    name: "Teams",
    mark: "TM",
    source: "Daily call",
    title: "Stand-up",
    detail: "9 participants",
  },
];

export function Integrations() {
  const [active, setActive] = useState<IntegrationId>("slack");
  const calm = useCalmMotion();
  const current = INTEGRATIONS.find((i) => i.id === active)!;

  return (
    <section id="integrations" className="border-b border-hair px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <motion.div {...reveal()} className="max-w-[42rem]">
          <p className="eyebrow">Connect your tools</p>
          <h2 className="mt-4 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[3rem]">
            Your tools, one glance.
          </h2>
          <p className="mt-5 max-w-[50ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Bring information from the tools you already use into the physical workspace.
          </p>
        </motion.div>

        <motion.ul
          {...reveal(0.05)}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-hair bg-hair sm:grid-cols-4"
        >
          {INTEGRATIONS.map((i) => {
            const on = i.id === active;
            return (
              <li key={i.id} className="bg-paper">
                <motion.button
                  type="button"
                  onClick={() => setActive(i.id)}
                  aria-pressed={on}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={cn(
                    "flex w-full flex-col gap-3 px-4 py-5 text-left transition-colors duration-300 sm:px-5",
                    on ? "bg-ink text-paper" : "hover:bg-ink/[0.035]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono flex h-8 w-8 items-center justify-center rounded-sm border text-[0.65rem] tracking-[0.08em]",
                      on ? "border-paper/30" : "border-hair text-ink-soft",
                    )}
                    aria-hidden
                  >
                    {i.mark}
                  </span>
                  <span className="text-[0.88rem] font-medium tracking-tight">{i.name}</span>
                </motion.button>
              </li>
            );
          })}
        </motion.ul>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_auto_1.2fr]">
          {/* source card */}
          <motion.div {...reveal(0.05)} className="rounded-sm border border-hair bg-card p-6 shadow-soft">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="eyebrow">{current.name}</p>
                <p className="font-mono mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-ink-soft">
                  {current.source}
                </p>
                <p className="mt-1.5 text-[1.05rem] font-medium leading-snug tracking-tight">
                  {current.title}
                </p>
                <p className="mt-1 text-[0.82rem] text-ink-soft">{current.detail}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* connection line */}
          <motion.div
            {...reveal(0.1)}
            className="relative mx-auto flex h-14 w-full max-w-[220px] items-center lg:h-40 lg:w-14"
            aria-hidden
          >
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-hair lg:left-1/2 lg:top-0 lg:h-full lg:w-px lg:-translate-x-1/2 lg:translate-y-0" />
            {!calm && (
              <motion.span
                key={current.id}
                className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:translate-y-0"
                initial={{ offsetDistance: "0%" }}
                animate={{ x: ["0%", "0%"] }}
              />
            )}
            <motion.span
              key={`dot-${current.id}`}
              className="absolute h-1.5 w-1.5 rounded-full bg-signal"
              initial={{ left: "0%", top: "50%", opacity: 0 }}
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: calm ? 0 : 1.6,
                ease: "linear",
                repeat: calm ? 0 : Infinity,
                repeatDelay: 0.5,
              }}
              style={{ translateY: "-50%" }}
            />
          </motion.div>

          <motion.div
            {...reveal(0.15)}
            className="mx-auto w-full max-w-[300px] sm:max-w-[430px]"
            style={{ ["--screen-unit" as string]: "clamp(10px, 3vw, 18px)" }}
          >
            <ProductDisplay state={current.id} />
          </motion.div>
        </div>

        <motion.p {...reveal(0.1)} className="eyebrow mt-10">
          Information arrives on the display, not in another notification.
        </motion.p>
      </div>
    </section>
  );
}
