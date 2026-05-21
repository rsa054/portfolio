"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, BookOpen, CheckCircle2 } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { SOCIALS } from "@/lib/data";
import { MagneticButton } from "@/components/ui/magnetic-button";

const socials = [
  { href: SOCIALS.github, label: "GitHub", Icon: Github },
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIALS.x, label: "X/Twitter", Icon: Twitter },
  { href: SOCIALS.medium, label: "Medium", Icon: BookOpen },
];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `From: ${name} <${email}>%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:thisismrkhatri@gmail.com?subject=Project%20inquiry&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s make something{" "}
              <span className="text-gradient-accent">worth shipping</span>
            </>
          }
          description="Have an idea, a system to build, or a project that needs a careful hand? Drop a line. I read everything."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-md sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Your name"
                  value={name}
                  onChange={setName}
                  placeholder="Satoshi Nakamoto"
                  required
                />
                <Field
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mt-5">
                <Field
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  as="textarea"
                  placeholder="Tell me about your protocol, audit needs, or what you're trying to build…"
                  rows={6}
                  required
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-text-muted">
                  Or email{" "}
                  <a href={SOCIALS.email} className="text-text-secondary underline-offset-4 hover:underline">
                    thisismrkhatri@gmail.com
                  </a>
                </p>
                <MagneticButton href="#" onClick={onSubmit as never} variant="primary">
                  {sent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Opening mail client
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>
          </motion.form>

          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-bg-elevated">
              <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  ~/khatri.dev
                </span>
              </div>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-text-secondary">
{`> whoami
mr.khatri

> stack --primary
python .net rust typescript solidity sui-move

> status
{
  available: true,
  focus: [
    "backend systems (DRF / .NET / Rust)",
    "smart contracts & DeFi",
    "AI agentic systems",
  ],
  open_to: [
    "lead engineering roles",
    "backend & protocol design",
    "audits & remediation",
  ]
}

> ping me
`}<span className="text-accent-cyan">thisismrkhatri@gmail.com</span>
              </pre>
            </div>

            <div className="mt-4 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Find me elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs text-text-secondary transition-all hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:text-text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                ))}
                <a
                  href={SOCIALS.email}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1.5 text-xs text-accent-cyan transition-all hover:-translate-y-0.5"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Direct email
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-3xl text-center font-display text-2xl tracking-tight text-text-secondary sm:text-3xl"
        >
          <span className="text-text-primary">Let&apos;s make something </span>
          <span className="text-gradient-accent">worth shipping.</span>
        </motion.p>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  as?: "input" | "textarea";
};

function Field({ label, value, onChange, type = "text", placeholder, required, rows = 4, as = "input" }: FieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const inputCls =
    "w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-cyan/60 focus:bg-foreground/5";
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`${inputCls} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputCls}
        />
      )}
    </label>
  );
}
