"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Mail, Download, Sparkles } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/brand-icons";
import { NodeGraph } from "@/components/effects/node-graph";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HERO_TITLES, SOCIALS } from "@/lib/data";

const socials = [
  { href: SOCIALS.github, label: "GitHub", Icon: Github },
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIALS.x, label: "X/Twitter", Icon: Twitter },
  { href: SOCIALS.medium, label: "Medium", Icon: BookOpen },
  { href: SOCIALS.email, label: "Email", Icon: Mail },
];

export function HeroSection() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_TITLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.15),transparent_60%)]" />
      </div>
      <NodeGraph className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8">
          {/* Availability badge */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur transition-colors hover:border-accent-cyan/50 hover:text-text-primary"
          >
            <span className="relative h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-cyan" />
              <span className="absolute inset-0 rounded-full bg-accent-cyan pulse-dot" />
            </span>
            <span className="font-mono uppercase tracking-[0.18em]">
              Available for Web3 & Blockchain Projects
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-text-muted">
              Portfolio · v2026
            </span>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[88px]">
              <span className="text-gradient">Mr.</span>{" "}
              <span className="text-gradient">Khatri</span>
            </h1>
          </motion.div>

          {/* Rotating title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex w-full max-w-3xl flex-col gap-1 text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl"
          >
            <span className="text-text-secondary">I&apos;m a</span>
            <span
              className="relative block w-full overflow-y-hidden"
              style={{ height: "1.25em" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={HERO_TITLES[i]}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 whitespace-nowrap text-gradient-accent"
                >
                  {HERO_TITLES[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-2xl text-base text-text-secondary sm:text-lg"
          >
            Building production-grade systems across the stack: scalable backends
            in Python, .NET and Rust, secure smart contracts on EVM and Sui Move,
            and AI-powered agents that tie them together.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              <Sparkles className="h-4 w-4" />
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="/resume.pdf" variant="outline">
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me
              <ArrowRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-4 flex items-center gap-2"
          >
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-text-secondary backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:text-text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] mask-fade-x">
        <div className="flex gap-12 whitespace-nowrap py-6 text-[11px] uppercase tracking-[0.32em] text-text-muted marquee-track">
          {[...Array(2)].flatMap((_, k) =>
            [
              "Python",
              "Django",
              ".NET",
              "Rust",
              "PostgreSQL",
              "Redis",
              "AWS",
              "Solidity",
              "Sui Move",
              "Foundry",
              "ERC-4337",
              "ERC-4626",
              "LLM Agents",
              "MCP",
              "The Graph",
              "Viem",
            ].map((s, idx) => (
              <span key={`${k}-${idx}`} className="inline-flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-black/30" />
                {s}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
