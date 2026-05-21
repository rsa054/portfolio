"use client";

import { ArrowLeft, Printer, Mail, MapPin } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/brand-icons";
import {
  EXPERIENCE,
  PROJECTS,
  SKILL_GROUPS,
  EXPERTISE,
  SOCIALS,
} from "@/lib/data";

const email = SOCIALS.email.replace(/^mailto:/, "");

export function ResumeView() {
  const onPrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="resume-page min-h-dvh bg-background pb-20 pt-24 sm:pt-28">
      {/* Toolbar */}
      <div className="no-print fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-[0_10px_30px_-12px_rgba(11,13,18,0.45)] transition-transform hover:-translate-y-0.5"
          >
            <Printer className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 sm:px-10">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-foreground/15 pb-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Mr. Khatri
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-text-secondary">
                Software Engineer · Backend · Blockchain · AI Systems
              </p>
            </div>
            <ul className="flex flex-col gap-1 text-xs text-text-secondary sm:items-end">
              <li className="inline-flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a href={SOCIALS.email}>{email}</a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Remote · Worldwide
              </li>
              <li className="inline-flex items-center gap-3 pt-1">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                  github.com/rsa054
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a
                  href={SOCIALS.x}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <Twitter className="h-3.5 w-3.5" /> @rsa2054
                </a>
              </li>
            </ul>
          </div>
          <p className="max-w-3xl text-[14px] leading-relaxed text-text-secondary">
            7+ years of software engineering across scalable backends (Python /
            DRF, .NET, Rust), distributed systems, blockchain protocols
            (Solidity, Sui Move) and AI-powered agentic systems. I design,
            secure and ship systems that have to hold up in production.
          </p>
        </header>

        {/* Experience */}
        <Section title="Experience">
          <div className="space-y-7">
            {EXPERIENCE.map((exp) => (
              <div key={exp.company}>
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {exp.role}{" "}
                    <span className="text-text-secondary">· {exp.company}</span>
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 text-[13.5px] text-text-secondary">
                  {exp.summary}
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-[13.5px] text-text-secondary marker:text-accent-cyan">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Selected Projects */}
        <Section title="Selected Projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <div
                key={p.slug}
                className="rounded-xl border border-foreground/15 bg-foreground/[0.03] p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-semibold">
                    {p.title}
                  </h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    {p.category}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-text-secondary">
                  {p.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="grid gap-3 sm:grid-cols-2">
            {SKILL_GROUPS.map((g) => (
              <div key={g.name}>
                <h4 className="font-display text-sm font-semibold tracking-tight">
                  {g.name}
                </h4>
                <p className="mt-1 text-[13px] text-text-secondary">
                  {g.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Technical Expertise */}
        <Section title="Technical Expertise">
          <ul className="grid gap-2 sm:grid-cols-2">
            {EXPERTISE.map((e) => (
              <li
                key={e.title}
                className="rounded-lg border border-foreground/15 bg-foreground/[0.03] p-3"
              >
                <h4 className="font-display text-sm font-semibold">
                  {e.title}
                </h4>
                <p className="mt-1 text-[12.5px] text-text-secondary">
                  {e.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <footer className="mt-10 border-t border-foreground/15 pt-4 text-center text-[11px] uppercase tracking-[0.18em] text-text-muted">
          Generated from imkhatri.me · {new Date().getFullYear()}
        </footer>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
        {title}
      </h2>
      <div className="section-line mt-2 mb-4" />
      {children}
    </section>
  );
}
