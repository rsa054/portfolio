"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { EXPERTISE } from "@/lib/data";
import { cn } from "@/lib/cn";

const accent = {
  cyan: { color: "var(--accent-cyan)", soft: "var(--accent-cyan-soft)", text: "text-accent-cyan" },
  purple: { color: "var(--accent-purple)", soft: "var(--accent-purple-soft)", text: "text-accent-purple" },
  blue: { color: "var(--accent-blue)", soft: "var(--accent-blue-soft)", text: "text-accent-blue" },
} as const;

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Expertise"
          title={
            <>
              Architecture, security and the{" "}
              <span className="text-gradient-accent">deep systems work</span>
            </>
          }
          description="Areas where I&apos;ve gone deepest, and where I do my best work."
        />

        <div className="relative mt-16">
          {/* Central diagram */}
          <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-80 w-80">
                <div className="absolute inset-0 rounded-full border border-foreground/10 spin-slow" />
                <div className="absolute inset-6 rounded-full border border-dashed border-foreground/10" />
                <div className="absolute inset-12 rounded-full border border-foreground/10" />
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: "var(--accent-cyan)", boxShadow: "0 0 20px var(--accent-cyan)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE.map((e, i) => {
              const a = accent[e.accent];
              const Icon = e.icon;
              return (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-bg-base/40 p-6 backdrop-blur-md transition-all duration-500 hover:border-foreground/20"
                >
                  <div
                    className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                    style={{ background: a.soft }}
                  />

                  <div className="relative flex items-center justify-between">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5",
                        a.text,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-display text-lg font-semibold tracking-tight text-text-primary">
                    {e.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-text-secondary">{e.description}</p>

                  <ul className="relative mt-4 flex flex-wrap gap-1.5">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[11px] text-text-secondary"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* connector lines */}
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute bottom-2 right-2 h-12 w-24 opacity-40"
                    viewBox="0 0 96 48"
                    fill="none"
                  >
                    <path d="M0 40 Q24 8 48 24 T96 8" stroke={a.color} strokeWidth="1" />
                    <circle cx="48" cy="24" r="2" fill={a.color} />
                    <circle cx="96" cy="8" r="2" fill={a.color} />
                  </svg>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
