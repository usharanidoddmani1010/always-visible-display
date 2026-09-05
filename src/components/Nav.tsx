import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#customize", label: "Customize" },
  { href: "#integrations", label: "Integrations" },
  { href: "#schedule", label: "Schedule" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 24));

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-hair bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-ink">
          Async Labs
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.82rem] text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#cta"
          whileHover={{ y: -1 }}
          whileTap={{ y: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="rounded-sm border border-ink/15 px-3.5 py-1.5 text-[0.78rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          Explore
        </motion.a>
      </nav>
    </motion.header>
  );
}
