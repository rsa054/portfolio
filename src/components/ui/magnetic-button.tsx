"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = React.ComponentProps<"a"> & {
  variant?: "primary" | "ghost" | "outline";
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "primary"
      ? "relative overflow-hidden rounded-full bg-[#0b0d12] text-white hover:bg-[#0b0d12] shadow-[0_10px_30px_-12px_rgba(11,13,18,0.45)]"
      : variant === "outline"
        ? "rounded-full border border-black/12 bg-white/70 text-text-primary backdrop-blur hover:border-accent-cyan/60 hover:bg-white"
        : "rounded-full text-text-secondary hover:text-text-primary";

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors",
        styles,
        className,
      )}
      {...(rest as React.ComponentProps<typeof motion.a>)}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 50%, rgba(34,211,238,0.6), rgba(168,85,247,0.5) 70%, transparent 100%)",
            mixBlendMode: "screen",
            filter: "blur(8px)",
          }}
        />
      )}
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
