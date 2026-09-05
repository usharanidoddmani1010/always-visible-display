import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Customize } from "@/components/sections/Customize";
import { Integrations } from "@/components/sections/Integrations";
import { Schedule } from "@/components/sections/Schedule";
import { AlwaysThere } from "@/components/sections/AlwaysThere";
import { FinalCta } from "@/components/sections/FinalCta";

const title = "Async Labs T6 — Your information. Always within sight.";
const description =
  "A quiet 7.5-inch workspace display for calendars, tasks, focus and dashboards. Up to 30 days of battery, on a desk or wall.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <Customize />
        <Integrations />
        <Schedule />
        <AlwaysThere />
        <FinalCta />
      </main>
      <footer className="border-t border-hair px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em]">Async Labs</p>
          <p className="text-[0.78rem] text-ink-soft">
            T6 — Website Interaction &amp; Motion Design
          </p>
        </div>
      </footer>
    </div>
  );
}
