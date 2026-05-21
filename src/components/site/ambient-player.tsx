"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Volume2 } from "lucide-react";

type AudioGraph = {
  ctx: AudioContext;
  master: GainNode;
  cleanup: () => void;
};

function buildAmbientGraph(): AudioGraph {
  const ctx = new (window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext)();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Short feedback-delay reverb so chirps sound outdoors, not pasted in
  const reverb = ctx.createDelay();
  reverb.delayTime.value = 0.14;
  const reverbFeedback = ctx.createGain();
  reverbFeedback.gain.value = 0.32;
  const reverbWet = ctx.createGain();
  reverbWet.gain.value = 0.55;
  reverb.connect(reverbFeedback);
  reverbFeedback.connect(reverb);
  reverb.connect(reverbWet);
  reverbWet.connect(master);

  // =============== MORNING BIRDS ===============
  // Several voice profiles so chirps don't sound repetitive.
  type ChirpVoice = {
    baseFreq: number;
    range: number;
    duration: number;
    direction: 1 | -1 | 0;
    sweeps: number;
  };

  const voices: ChirpVoice[] = [
    { baseFreq: 3100, range: 800, duration: 0.13, direction: -1, sweeps: 1 },
    { baseFreq: 2600, range: 600, duration: 0.18, direction: 1, sweeps: 1 },
    { baseFreq: 4200, range: 1100, duration: 0.09, direction: -1, sweeps: 1 },
    { baseFreq: 3400, range: 350, duration: 0.06, direction: 0, sweeps: 4 },
    { baseFreq: 2300, range: 700, duration: 0.22, direction: 1, sweeps: 1 },
    { baseFreq: 3800, range: 250, duration: 0.05, direction: 0, sweeps: 6 },
  ];

  const birdTimers: number[] = [];
  const birdNodes: AudioScheduledSourceNode[] = [];

  const chirp = (v: ChirpVoice) => {
    const now = ctx.currentTime;
    const trillCount =
      v.sweeps > 1 ? v.sweeps + Math.floor(Math.random() * 3) : 1;
    const gap = v.duration * 0.6;
    for (let i = 0; i < trillCount; i++) {
      const start = now + i * (v.duration + gap);
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = v.baseFreq;
      bandpass.Q.value = 9;

      osc.type = "sine";

      const startF =
        v.direction === -1
          ? v.baseFreq + v.range * 0.5
          : v.direction === 1
            ? v.baseFreq - v.range * 0.5
            : v.baseFreq + (Math.random() - 0.5) * v.range * 0.3;
      const endF =
        v.direction === -1
          ? v.baseFreq - v.range * 0.5
          : v.direction === 1
            ? v.baseFreq + v.range * 0.5
            : v.baseFreq + (Math.random() - 0.5) * v.range * 0.3;

      osc.frequency.setValueAtTime(startF, start);
      osc.frequency.exponentialRampToValueAtTime(endF, start + v.duration);

      const peak = 0.18 + Math.random() * 0.08;
      oscGain.gain.setValueAtTime(0, start);
      oscGain.gain.linearRampToValueAtTime(peak, start + 0.008);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, start + v.duration);

      osc.connect(bandpass);
      bandpass.connect(oscGain);
      oscGain.connect(master);
      oscGain.connect(reverb);

      osc.start(start);
      osc.stop(start + v.duration + 0.05);
      birdNodes.push(osc);
    }
  };

  const scheduleNextChirp = () => {
    // Morning chorus: bursts of activity with quiet pauses between.
    const delay =
      Math.random() < 0.4
        ? 250 + Math.random() * 700 // bird answering another bird
        : 1500 + Math.random() * 3500; // gap before next chorus
    const t = window.setTimeout(() => {
      const v = voices[Math.floor(Math.random() * voices.length)];
      chirp(v);
      scheduleNextChirp();
    }, delay);
    birdTimers.push(t);
  };

  // Kick off a few chirps immediately so it feels alive on first play
  for (let i = 0; i < 2; i++) {
    setTimeout(() => chirp(voices[Math.floor(Math.random() * voices.length)]), i * 350);
  }
  scheduleNextChirp();

  const cleanup = () => {
    try {
      birdNodes.forEach((n) => {
        try {
          n.stop();
        } catch {}
      });
    } catch {}
    birdTimers.forEach((t) => clearTimeout(t));
    ctx.close().catch(() => {});
  };

  return { ctx, master, cleanup };
}

const STORAGE_KEY = "ambient-paused-v2";

export function AmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const graphRef = useRef<AudioGraph | null>(null);
  const startingRef = useRef(false);

  const start = useCallback(async () => {
    if (startingRef.current || graphRef.current) return;
    startingRef.current = true;
    try {
      const g = buildAmbientGraph();
      graphRef.current = g;
      if (g.ctx.state === "suspended") await g.ctx.resume();
      const now = g.ctx.currentTime;
      g.master.gain.setValueAtTime(0, now);
      g.master.gain.linearRampToValueAtTime(0.55, now + 1.6);
      setPlaying(true);
    } catch {
      // ignore
    } finally {
      startingRef.current = false;
    }
  }, []);

  const stop = useCallback(() => {
    const g = graphRef.current;
    if (!g) return;
    const now = g.ctx.currentTime;
    g.master.gain.cancelScheduledValues(now);
    g.master.gain.setValueAtTime(g.master.gain.value, now);
    g.master.gain.linearRampToValueAtTime(0, now + 0.8);
    setTimeout(() => {
      g.cleanup();
      if (graphRef.current === g) graphRef.current = null;
    }, 900);
    setPlaying(false);
  }, []);

  // Default: try to play on first user interaction unless the user has paused before
  useEffect(() => {
    const pausedByUser = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        return false;
      }
    })();
    if (pausedByUser) return;

    const trigger = () => {
      cleanup();
      start();
    };
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    const cleanup = () => {
      events.forEach((ev) =>
        window.removeEventListener(ev, trigger, { capture: true } as never),
      );
    };
    events.forEach((ev) =>
      window.addEventListener(ev, trigger, {
        once: true,
        passive: true,
        capture: true,
      } as never),
    );
    return cleanup;
  }, [start]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      graphRef.current?.cleanup();
      graphRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (playing) {
      stop();
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      await start();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55] flex items-center gap-2 no-print">
      <AnimatePresence>
        {(playing || expanded) && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="hidden items-center gap-2 rounded-full border border-foreground/10 bg-background/80 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary backdrop-blur sm:inline-flex"
          >
            <Volume2 className="h-3.5 w-3.5 text-accent-cyan" />
            {playing ? "morning birds · on" : "morning birds · off"}
            {playing && <Bars />}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={playing ? "Pause ambient sound" : "Play ambient sound"}
        onClick={toggle}
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-background/80 text-text-primary backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(11,13,18,0.35)] transition-colors hover:border-accent-cyan/60"
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at center, var(--accent-cyan-soft), transparent 70%)",
          }}
        />
        <AnimatePresence mode="wait" initial={false}>
          {playing ? (
            <motion.span
              key="pause"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Pause className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="play"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Music className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function Bars() {
  return (
    <span className="ml-1 inline-flex items-end gap-[2px]">
      {[0.7, 1, 0.55, 0.85].map((scale, i) => (
        <motion.span
          key={i}
          className="block w-[2px] rounded-full bg-accent-cyan"
          animate={{ scaleY: [0.3, scale, 0.3] }}
          transition={{
            duration: 0.9 + i * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
          style={{ height: 10, originY: 1 }}
        />
      ))}
    </span>
  );
}
