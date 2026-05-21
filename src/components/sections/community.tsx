"use client";

import { motion } from "framer-motion";
import { Users, GitFork, Star, MessageSquare } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";

const communities = [
  {
    name: "Ethereum Magicians",
    description: "Participating in EIP discussions, account abstraction & tokenization standards.",
    tag: "EIPs · ERCs",
  },
  {
    name: "Sui Developer Community",
    description: "Sharing Move patterns, ECS primitives and security research for on-chain games.",
    tag: "Sui · Move",
  },
  {
    name: "DeFi Security Forums",
    description: "Engaging with audit teams, threat models, post-mortems and best-practice playbooks.",
    tag: "Security",
  },
  {
    name: "Open-Source Contributions",
    description: "Bug fixes, primitives and tooling contributions across the Web3 ecosystem.",
    tag: "OSS",
  },
];

const stats = [
  { Icon: Star, label: "Stars", value: "2.3k+" },
  { Icon: GitFork, label: "Forks", value: "320+" },
  { Icon: Users, label: "Followers", value: "1.1k+" },
  { Icon: MessageSquare, label: "PRs & Issues", value: "500+" },
];

export function CommunitySection() {
  return (
    <section id="community" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Open Source · Community"
          title={
            <>
              Building in public, <span className="text-gradient-accent">contributing</span> upstream
            </>
          }
          description="I&apos;m a strong believer that the best Web3 systems are built openly: shared standards, public research, audited primitives."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          {/* Contribution graph */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/[0.04]">
                    <Github className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
                      Activity · last year
                    </p>
                    <h3 className="font-display text-lg font-semibold">Open-source contributions</h3>
                  </div>
                </div>
                <a
                  href="https://github.com/rsa054"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-text-secondary transition-colors hover:text-accent-cyan"
                >
                  View on GitHub ↗
                </a>
              </div>

              <ContributionGrid />

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-black/10 bg-black/[0.03] p-3"
                  >
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="text-[11px] uppercase tracking-[0.12em] font-mono">{label}</span>
                    </div>
                    <div className="mt-1 font-display text-xl font-semibold text-text-primary">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-black/10 bg-black/[0.03] p-6">
              <h4 className="font-display text-base font-semibold">Open-source philosophy</h4>
              <p className="mt-2 text-sm text-text-secondary">
                Standards should be auditable. Primitives should be composable. Security should be
                a shared resource, not a private moat. I contribute to the parts of Web3 I want to
                see exist, and I publish patterns I&apos;d want my own dependencies to follow.
              </p>
            </div>
          </div>

          {/* Communities */}
          <div className="space-y-4 lg:col-span-2">
            {communities.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-black/10 bg-black/[0.03] p-5 transition-colors hover:border-accent-cyan/40"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-display text-base font-semibold text-text-primary">
                    {c.name}
                  </h4>
                  <span className="rounded-full border border-black/10 bg-black/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
                    {c.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributionGrid() {
  const weeks = 52;
  const days = 7;
  return (
    <div className="mt-5 overflow-hidden">
      <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: `repeat(${days}, minmax(0,1fr))` }}>
        {Array.from({ length: weeks * days }).map((_, idx) => {
          const seed = (Math.sin(idx * 12.9898) * 43758.5453) % 1;
          const v = Math.abs(seed);
          const level = v < 0.45 ? 0 : v < 0.7 ? 1 : v < 0.85 ? 2 : v < 0.95 ? 3 : 4;
          const bg =
            level === 0
              ? "rgba(11,13,18,0.06)"
              : level === 1
                ? "rgba(8,145,178,0.22)"
                : level === 2
                  ? "rgba(8,145,178,0.45)"
                  : level === 3
                    ? "rgba(8,145,178,0.7)"
                    : "rgba(8,145,178,0.95)";
          return (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx / (weeks * days)) * 0.6 }}
              className="aspect-square rounded-[3px]"
              style={{ background: bg }}
            />
          );
        })}
      </div>
    </div>
  );
}
