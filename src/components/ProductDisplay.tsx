import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE, useCalmMotion } from "@/lib/motion";

export type ScreenState =
  | "calendar"
  | "tasks"
  | "focus"
  | "dashboard"
  | "slack"
  | "google-calendar"
  | "outlook"
  | "teams"
  | "morning"
  | "meeting"
  | "focus-time"
  | "evening";

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.58em] uppercase tracking-[0.28em] text-ink-soft">{children}</p>
  );
}

function Row({ time, label }: { time: string; label: string }) {
  return (
    <div className="flex items-baseline gap-[1em] border-t border-screen-line pt-[0.5em]">
      <span className="font-mono text-[0.72em] tabular-nums text-ink-soft">{time}</span>
      <span className="text-[0.9em] font-medium tracking-tight">{label}</span>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-[0.8em]">
      <span className="font-mono w-[5.2em] text-[0.66em] uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </span>
      <span className="relative h-[0.42em] flex-1 overflow-hidden bg-screen-line">
        <motion.span
          layout
          className="absolute inset-y-0 left-0 bg-ink"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          style={{ originX: 0, width: "100%" }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </span>
      <span className="font-mono text-[0.66em] tabular-nums">{value}%</span>
    </div>
  );
}

function ScreenBody({ state }: { state: ScreenState }) {
  switch (state) {
    case "calendar":
      return (
        <>
          <Kicker>Monday</Kicker>
          <div className="mt-auto space-y-[0.55em]">
            <Row time="10:00" label="Team Sync" />
            <Row time="12:30" label="Lunch" />
            <Row time="15:00" label="Design Review" />
          </div>
        </>
      );
    case "tasks":
      return (
        <>
          <Kicker>Today</Kicker>
          <div className="mt-auto space-y-[0.55em]">
            {["Finish presentation", "Review pull requests", "Prepare meeting notes"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-[0.8em] border-t border-screen-line pt-[0.5em]"
              >
                <span className="h-[0.72em] w-[0.72em] shrink-0 border border-ink-soft" />
                <span className="text-[0.9em] font-medium tracking-tight">{t}</span>
              </div>
            ))}
          </div>
        </>
      );
    case "focus":
      return (
        <>
          <Kicker>Focus Mode</Kicker>
          <div className="mt-auto">
            <p className="font-mono text-[2.6em] leading-none tabular-nums tracking-tight">42:18</p>
            <p className="mt-[0.5em] text-[0.95em] font-medium tracking-tight">Deep Work</p>
            <p className="font-mono text-[0.62em] uppercase tracking-[0.24em] text-ink-soft">
              Do not disturb
            </p>
          </div>
        </>
      );
    case "dashboard":
      return (
        <>
          <Kicker>System</Kicker>
          <div className="mt-auto space-y-[0.7em]">
            <Bar label="CPU" value={38} />
            <Bar label="Memory" value={64} />
            <div className="flex items-center gap-[0.8em] border-t border-screen-line pt-[0.6em]">
              <span className="font-mono w-[5.2em] text-[0.66em] uppercase tracking-[0.16em] text-ink-soft">
                Status
              </span>
              <span className="font-mono text-[0.72em] uppercase tracking-[0.2em]">Online</span>
            </div>
          </div>
        </>
      );
    case "slack":
      return (
        <>
          <Kicker>Slack · Message</Kicker>
          <div className="mt-auto">
            <p className="font-mono text-[0.68em] uppercase tracking-[0.2em] text-ink-soft">
              Sarah
            </p>
            <p className="mt-[0.3em] text-[1.05em] font-medium leading-snug tracking-tight">
              Design review moved to 3:30 PM
            </p>
          </div>
        </>
      );
    case "google-calendar":
      return (
        <>
          <Kicker>Google Calendar</Kicker>
          <div className="mt-auto">
            <p className="text-[1.15em] font-medium tracking-tight">Design Review</p>
            <p className="font-mono mt-[0.3em] text-[0.7em] uppercase tracking-[0.18em] text-ink-soft">
              3:30 PM — Conference Room
            </p>
          </div>
        </>
      );
    case "outlook":
      return (
        <>
          <Kicker>Outlook</Kicker>
          <div className="mt-auto">
            <p className="text-[1.15em] font-medium tracking-tight">Team Meeting</p>
            <p className="font-mono mt-[0.3em] text-[0.7em] uppercase tracking-[0.18em] text-ink-soft">
              Tomorrow — 10:00 AM
            </p>
          </div>
        </>
      );
    case "teams":
      return (
        <>
          <Kicker>Teams</Kicker>
          <div className="mt-auto">
            <p className="text-[1.15em] font-medium tracking-tight">Stand-up</p>
            <p className="font-mono mt-[0.3em] text-[0.7em] uppercase tracking-[0.18em] text-ink-soft">
              9 participants
            </p>
          </div>
        </>
      );
    case "morning":
      return (
        <>
          <Kicker>08:00</Kicker>
          <div className="mt-auto">
            <p className="text-[1.5em] font-medium leading-none tracking-tight">Good morning</p>
            <p className="font-mono mt-[0.5em] text-[0.7em] uppercase tracking-[0.2em] text-ink-soft">
              Today’s schedule
            </p>
          </div>
        </>
      );
    case "meeting":
      return (
        <>
          <Kicker>Next meeting</Kicker>
          <div className="mt-auto">
            <p className="text-[1.35em] font-medium leading-none tracking-tight">Design Review</p>
            <p className="font-mono mt-[0.45em] text-[0.8em] tabular-nums tracking-[0.14em] text-ink-soft">
              2:30 PM
            </p>
          </div>
        </>
      );
    case "focus-time":
      return (
        <>
          <Kicker>Focus mode</Kicker>
          <div className="mt-auto">
            <p className="text-[1.4em] font-medium leading-none tracking-tight">Do not disturb</p>
            <p className="font-mono mt-[0.5em] text-[0.68em] uppercase tracking-[0.22em] text-ink-soft">
              Notifications paused
            </p>
          </div>
        </>
      );
    case "evening":
      return (
        <>
          <Kicker>21:00</Kicker>
          <div className="mt-auto">
            <p className="text-[1.5em] font-medium leading-none tracking-tight">Wind down</p>
            <p className="font-mono mt-[0.5em] text-[0.7em] uppercase tracking-[0.2em] text-ink-soft">
              Tomorrow starts here
            </p>
          </div>
        </>
      );
  }
}

const LABELS: Record<ScreenState, string> = {
  calendar: "Calendar view: Monday, Team Sync 10:00, Lunch 12:30, Design Review 15:00",
  tasks: "Task list: Finish presentation, Review pull requests, Prepare meeting notes",
  focus: "Focus mode, 42 minutes 18 seconds remaining, deep work, do not disturb",
  dashboard: "System dashboard: CPU 38 percent, memory 64 percent, status online",
  slack: "Slack message from Sarah: Design review moved to 3:30 PM",
  "google-calendar": "Google Calendar: Design Review, 3:30 PM, Conference Room",
  outlook: "Outlook: Team Meeting, tomorrow 10:00 AM",
  teams: "Teams: Stand-up, 9 participants",
  morning: "8 AM: Good morning, today's schedule",
  meeting: "Next meeting: Design Review at 2:30 PM",
  "focus-time": "Focus mode, do not disturb",
  evening: "9 PM: Wind down, tomorrow starts here",
};

export function ProductDisplay({
  state,
  className,
  stand = true,
  screenScale = 1,
}: {
  state: ScreenState;
  className?: string;
  stand?: boolean;
  screenScale?: number;
}) {
  const calm = useCalmMotion();

  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* device body */}
      <div className="relative rounded-[1.4%/2.2%] bg-device p-[3.4%] shadow-device ring-1 ring-device-edge">
        <div className="rounded-[0.8%/1.3%] bg-device-inner p-[1.6%] ring-1 ring-device-edge/70">
          <div className="relative aspect-[5/3] overflow-hidden bg-screen text-ink shadow-screen">
            <div
              className="absolute inset-0 flex flex-col p-[6%]"
              style={{ fontSize: `calc(var(--screen-unit, 1.6vw) * ${screenScale})` }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={state}
                  className="flex h-full flex-col"
                  initial={calm ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={calm ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(2px)" }}
                  transition={{ duration: calm ? 0.2 : 0.45, ease: EASE }}
                >
                  <ScreenBody state={state} />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* e-ink surface sheen */}
            <div className="pointer-events-none absolute inset-0 bg-screen-sheen" />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[1.1%] left-1/2 h-[1px] w-[7%] -translate-x-1/2 bg-device-edge" />
      </div>

      {stand && (
        <div className="relative mx-auto -mt-[0.5%] h-0 w-[26%]">
          <div className="mx-auto h-3 w-full rounded-b-[3px] bg-device-inner ring-1 ring-device-edge sm:h-4" />
          <div className="mx-auto mt-[2px] h-[6px] w-[150%] rounded-full bg-device ring-1 ring-device-edge sm:h-2" />
        </div>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {LABELS[state]}
      </span>
    </div>
  );
}
