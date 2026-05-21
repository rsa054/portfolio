"use client";

import { BookOpen, Mail, ArrowUpRight } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/brand-icons";
import { SOCIALS } from "@/lib/data";

const socials = [
  { href: SOCIALS.github, label: "GitHub", Icon: Github },
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIALS.x, label: "X/Twitter", Icon: Twitter },
  { href: SOCIALS.medium, label: "Medium", Icon: BookOpen },
  { href: SOCIALS.email, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/8 bg-bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-black/12 bg-gradient-to-br from-black/[0.06] to-black/[0.02] font-display text-[13px] font-bold">
                K
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                Mr. Khatri
              </span>
            </a>
            <p className="mt-3 max-w-md text-sm text-text-secondary">
              Building production systems across backends, blockchains and AI agents.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-text-secondary transition-all hover:border-accent-cyan/50 hover:text-text-primary"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/8 pt-6 text-xs text-text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Mr. Khatri. Crafted on the dark side of the chain.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-accent-cyan"
          >
            Let&apos;s build the future of decentralized systems
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
