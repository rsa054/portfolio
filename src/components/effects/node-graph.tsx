"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function NodeGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let active = true;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Theme-aware accent (re-read whenever theme class flips)
    let accentRgb = "8, 145, 178";
    const readAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-cyan")
        .trim();
      const m = raw.match(/^#?([0-9a-f]{6})$/i);
      if (m) {
        const n = parseInt(m[1], 16);
        accentRgb = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      }
    };
    readAccent();
    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const density = Math.min(1, (width * height) / (1920 * 1080));
      const count = Math.floor(70 * density) + 40;
      nodes = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    const onVis = () => {
      active = !document.hidden;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;

      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }

        // mouse interaction
        const mdx = n.x - mouseX;
        const mdy = n.y - mouseY;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 18000) {
          const f = (1 - md2 / 18000) * 0.4;
          n.x += (mdx / Math.sqrt(md2 + 0.01)) * f;
          n.y += (mdy / Math.sqrt(md2 + 0.01)) * f;
        }
      }

      // connections
      const maxDist = 140;
      const max2 = maxDist * maxDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < max2) {
            const alpha = (1 - d2 / max2) * 0.32;
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const md = Math.hypot(n.x - mouseX, n.y - mouseY);
        const near = md < 160 ? 1 - md / 160 : 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.4, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
        g.addColorStop(0, `rgba(${accentRgb}, ${0.55 + near * 0.25})`);
        g.addColorStop(1, `rgba(${accentRgb}, 0)`);
        ctx.fillStyle = g;
        ctx.fill();
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
