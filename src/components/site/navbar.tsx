"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-4 flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500",
            scrolled
              ? "border-black/10 bg-[rgba(255,255,255,0.72)] backdrop-blur-xl shadow-[0_10px_40px_-18px_rgba(11,13,18,0.18)]"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#" className="group flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-md border border-black/12 bg-gradient-to-br from-black/[0.06] to-black/[0.02]">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-accent-cyan/30 to-accent-purple/30 opacity-0 transition group-hover:opacity-100" />
              <span className="font-display text-[13px] font-bold tracking-tighter">K</span>
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-text-primary">
              Mr. Khatri
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent-cyan to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 rounded-full border border-black/12 bg-black/[0.04] px-4 py-1.5 text-[13px] font-medium text-text-primary transition-all hover:border-accent-cyan/60 hover:bg-black/[0.06]"
            >
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-accent-cyan" />
                <span className="absolute inset-0 rounded-full bg-accent-cyan pulse-dot" />
              </span>
              Available
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/[0.04] text-text-primary md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-auto mt-2 max-w-7xl px-4 sm:px-6"
          >
            <div className="glass-strong rounded-2xl p-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={link.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
                    >
                      <span>{link.label}</span>
                      <span className="text-text-muted">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
