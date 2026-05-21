"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  ShieldCheck,
  Cpu,
  Network,
  Gamepad2,
  Wand2,
  Workflow,
  Server,
  Database,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { STATS } from "@/lib/data";

const orbitItems = [
  { icon: Server, label: "Backend", ring: 1, angle: 0 },
  { icon: Boxes, label: "Solidity", ring: 1, angle: 120 },
  { icon: ShieldCheck, label: "Security", ring: 1, angle: 240 },
  { icon: Database, label: "PostgreSQL", ring: 2, angle: 60 },
  { icon: Cpu, label: "Rust", ring: 2, angle: 180 },
  { icon: Network, label: "Distributed", ring: 2, angle: 300 },
  { icon: Workflow, label: "DeFi", ring: 3, angle: 30 },
  { icon: Wand2, label: "AI Agents", ring: 3, angle: 150 },
  { icon: Gamepad2, label: "On-chain Games", ring: 3, angle: 270 },
];

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Full-stack engineer building
              <br className="hidden sm:block" /> <span className="text-gradient-accent">production systems across the stack</span>
            </>
          }
          description="7+ years of software engineering across scalable backends, distributed systems, blockchain protocols and AI-powered agents. I design, secure and ship systems that have to hold up in production."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Story */}
          <div className="space-y-6 text-[15px] leading-relaxed text-text-secondary">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              I came up on the backend side, designing real-time food-delivery
              dispatch systems, ed-tech platforms and financial domains with
              clean architecture and explicit invariants on Python, .NET and
              Rust stacks.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Most recently I&apos;ve been building{" "}
              <em className="not-italic text-text-primary">Makara</em>, an
              open-source Entity-Component-System framework for fully on-chain
              games on Sui. Move-native ECS primitives with type-safe component
              registration, composable combat, inventory and movement modules,
              and a TypeScript SDK with PTB orchestration that keeps player
              actions gas-efficient and batched.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              And lately I&apos;m fascinated by the seam between LLM agents,
              backend orchestration and on-chain execution: autonomous systems
              that reason about, generate and ship code under verifiable
              guardrails.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 transition-colors hover:border-accent-cyan/40"
                >
                  <div className="font-display text-2xl font-semibold text-text-primary">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-text-secondary">
                    {s.label}
                  </div>
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent-cyan/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Orbit */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-foreground/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]">
            <div className="absolute inset-0 bg-grid-fine opacity-40" />
            <Orbit items={orbitItems} />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
              <span>// tech.orbit</span>
              <span>live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Orbit({ items }: { items: typeof orbitItems }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* center */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-foreground/15 bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.03] backdrop-blur-md"
      >
        <span className="font-display text-2xl font-bold tracking-tighter text-gradient">
          K
        </span>
        <span className="absolute inset-0 rounded-2xl glow-cyan opacity-50" />
      </motion.div>

      {/* rings */}
      {[1, 2, 3].map((ring) => (
        <Ring key={ring} ring={ring}>
          {items
            .filter((it) => it.ring === ring)
            .map((it) => (
              <OrbitBadge
                key={it.label}
                angle={it.angle}
                ring={ring}
                icon={it.icon}
                label={it.label}
              />
            ))}
        </Ring>
      ))}
    </div>
  );
}

function Ring({ ring, children }: { ring: number; children: React.ReactNode }) {
  const size = ring === 1 ? 200 : ring === 2 ? 320 : 440;
  const dur = ring === 1 ? 28 : ring === 2 ? 42 : 60;
  const reverse = ring === 2;
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      className="absolute rounded-full border border-dashed border-foreground/10"
      style={{ width: size, height: size }}
    >
      {children}
    </motion.div>
  );
}

function OrbitBadge({
  angle,
  ring,
  icon: Icon,
  label,
}: {
  angle: number;
  ring: number;
  icon: typeof Boxes;
  label: string;
}) {
  const size = ring === 1 ? 200 : ring === 2 ? 320 : 440;
  const radius = size / 2;
  const rad = (angle * Math.PI) / 180;
  const x = Math.round(Math.cos(rad) * radius * 1000) / 1000;
  const y = Math.round(Math.sin(rad) * radius * 1000) / 1000;
  return (
    <motion.div
      animate={{ rotate: ring === 2 ? 360 : -360 }}
      transition={{ duration: ring === 1 ? 28 : ring === 2 ? 42 : 60, repeat: Infinity, ease: "linear" }}
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      }}
    >
      <div className="group flex items-center gap-1.5 rounded-full border border-foreground/10 bg-bg-base/80 px-2.5 py-1.5 backdrop-blur-md transition-all hover:border-accent-cyan/50">
        <Icon className="h-3.5 w-3.5 text-accent-cyan" />
        <span className="text-[11px] font-medium text-text-secondary group-hover:text-text-primary">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
