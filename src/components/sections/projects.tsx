"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/cn";

const accents = {
  cyan: { ring: "from-accent-cyan/40", glow: "rgba(34,211,238,0.18)", chip: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10" },
  purple: { ring: "from-accent-purple/40", glow: "rgba(168,85,247,0.18)", chip: "text-accent-purple border-accent-purple/30 bg-accent-purple/10" },
  blue: { ring: "from-accent-blue/40", glow: "rgba(96,165,250,0.18)", chip: "text-accent-blue border-accent-blue/30 bg-accent-blue/10" },
} as const;

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured · Work"
          title={
            <>
              Selected protocols, frameworks and{" "}
              <span className="text-gradient-accent">on-chain systems</span>
            </>
          }
          description="A curated look at the work I&apos;m proudest of: production-grade infrastructure, on-chain gaming frameworks and AI-powered blockchain agents."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const accent = accents[project.accent];
  const Icon = project.icon;
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [4, -4]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-4, 4]);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x);
    my.set(y);
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(project)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="group relative isolate overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] p-6 text-left transition-all duration-500 hover:border-black/15"
    >
      {/* spotlight follow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px 220px at var(--mx) var(--my), ${accent.glow}, transparent 60%)`,
        }}
      />
      {/* gradient ring on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accent.ring,
        )}
        style={{ mask: "linear-gradient(white,white) padding-box, linear-gradient(white,white)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }}
      />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/[0.04]">
              <Icon className="h-4 w-4 text-text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
                {project.category}
              </p>
              <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary">
                {project.title}
              </h3>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-primary" />
        </div>

        {project.role && (
          <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-text-secondary">
            {project.role}
          </span>
        )}

        <p className="text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em]",
                accent.chip,
              )}
            >
              {s}
            </span>
          ))}
        </div>

        {/* mini architecture lines */}
        <Diagram accent={project.accent} />
      </div>
    </motion.button>
  );
}

function Diagram({ accent }: { accent: keyof typeof accents }) {
  const stroke =
    accent === "cyan" ? "rgba(34,211,238,0.5)" : accent === "purple" ? "rgba(168,85,247,0.5)" : "rgba(96,165,250,0.5)";
  return (
    <svg
      className="mt-2 h-16 w-full opacity-70"
      viewBox="0 0 400 64"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0" />
          <stop offset="0.5" stopColor={stroke} stopOpacity="1" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 48 Q60 12 120 32 T240 16 T360 40 L400 40" stroke="url(#lg)" strokeWidth="1.2" />
      {[40, 120, 200, 280, 360].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={i % 2 === 0 ? 32 : 24} r="3" fill={stroke} />
          <circle cx={x} cy={i % 2 === 0 ? 32 : 24} r="8" fill={stroke} fillOpacity="0.18" />
        </g>
      ))}
    </svg>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const accent = accents[project.accent];
  const Icon = project.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(11,13,18,0.35)] p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-black/10 bg-bg-elevated p-8 shadow-2xl"
      >
        <div
          className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full blur-3xl"
          style={{ background: accent.glow }}
        />
        <motion.button
          type="button"
          aria-label="Close"
          onClick={onClose}
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.92, rotate: 90 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="group absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-text-secondary transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-600 focus-visible:outline-none active:bg-rose-500/15"
        >
          <X className="h-4 w-4 transition-colors" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, rgba(244,63,94,0.25), transparent 70%)",
            }}
          />
        </motion.button>

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/[0.04]">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
              {project.category}
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="relative mt-5 text-sm text-text-secondary">{project.description}</p>

        <ul className="relative mt-5 space-y-2 text-sm text-text-secondary">
          {project.details.map((d, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-cyan" />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em]",
                accent.chip,
              )}
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
