import { useEffect, useState } from "react";

/** Primary easing for the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  micro: 0.25,
  content: 0.5,
  reveal: 0.8,
} as const;

/** true when the user prefers reduced motion. */
export function useCalmMotion() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCalm(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return calm;
}

/** Standard scroll reveal props. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: { duration: DUR.reveal, ease: EASE, delay },
});
