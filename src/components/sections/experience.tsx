"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EXPERIENCE } from "@/lib/data";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              A decade of shipping
              <br className="hidden sm:block" />
              <span className="text-gradient-accent"> systems that matter</span>
            </>
          }
          description="From real-time backend infrastructure to production blockchain protocols: a track record of designing, securing and scaling critical systems."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          {/* timeline rail */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: lineY }}
            className="absolute left-4 top-0 w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
          >
            <div className="h-full w-px bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent" />
          </motion.div>

          <ul className="space-y-12 sm:space-y-16">
            {EXPERIENCE.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <li key={exp.company} className="relative">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-8">
                    {/* Marker */}
                    <span
                      aria-hidden
                      className="absolute left-4 top-2 -translate-x-1/2 sm:left-1/2"
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inset-0 rounded-full bg-accent-cyan/30" />
                        <span className="absolute inset-[3px] rounded-full bg-accent-cyan" />
                        {exp.active && (
                          <span className="pulse-dot absolute inset-0 rounded-full" />
                        )}
                      </span>
                    </span>

                    {/* Spacer for layout on alt sides */}
                    <div className={`hidden sm:block ${left ? "" : "order-2"}`} />

                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className={`relative pl-10 sm:pl-0 ${left ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}
                    >
                      <Card exp={exp} alignRight={left} />
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({ exp, alignRight }: { exp: (typeof EXPERIENCE)[number]; alignRight: boolean }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6 transition-all duration-500 hover:border-foreground/20">
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(400px_180px_at_var(--mx,50%)_var(--my,50%),rgba(34,211,238,0.18),transparent_60%)]" />
      </div>

      <div className={`relative flex flex-col gap-3 ${alignRight ? "sm:items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
          <Building2 className="h-3.5 w-3.5" />
          {exp.period}
          {exp.location && (
            <>
              <span className="text-foreground/20">·</span>
              <span>{exp.location}</span>
            </>
          )}
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary">
          {exp.role}
        </h3>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-accent-cyan transition-colors hover:text-accent-blue"
        >
          {exp.company}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <p className={`text-sm text-text-secondary ${alignRight ? "sm:text-right" : ""}`}>
          {exp.summary}
        </p>

        <ul className={`mt-2 space-y-2 text-sm text-text-secondary ${alignRight ? "sm:text-right" : ""}`}>
          {exp.highlights.map((h, i) => (
            <li key={i} className={`flex gap-2 ${alignRight ? "sm:flex-row-reverse" : ""}`}>
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-cyan/70" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-3 flex flex-wrap gap-1.5 ${alignRight ? "sm:justify-end" : ""}`}>
          {exp.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-foreground/10 bg-foreground/5 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-secondary"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
