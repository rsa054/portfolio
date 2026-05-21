"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SKILL_GROUPS } from "@/lib/data";
import { cn } from "@/lib/cn";

const accentClasses = {
  cyan: {
    chip: "border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan",
    glow: "from-accent-cyan/20 via-transparent to-transparent",
    icon: "text-accent-cyan",
  },
  purple: {
    chip: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
    glow: "from-accent-purple/20 via-transparent to-transparent",
    icon: "text-accent-purple",
  },
  blue: {
    chip: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
    glow: "from-accent-blue/20 via-transparent to-transparent",
    icon: "text-accent-blue",
  },
} as const;

export function SkillsSection() {
  return (
    <section id="skills" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fine opacity-30 mask-fade-y" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills · Ecosystem"
          title={
            <>
              The stack I use to <span className="text-gradient-accent">ship</span> production protocols
            </>
          }
          description="Tooling, languages and frameworks I reach for daily; security tools sit alongside the systems they audit."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => {
            const accent = accentClasses[group.accent];
            const Icon = group.icon;
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 transition-all duration-500 hover:border-foreground/20"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90",
                    accent.glow,
                  )}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/5",
                        accent.icon,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {group.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-transform duration-300 hover:-translate-y-0.5",
                          accent.chip,
                        )}
                      >
                        <span className="h-1 w-1 rounded-full bg-current opacity-70" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
