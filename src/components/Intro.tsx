import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* ── Branded launch screen — plays on every load, no persistence, no gate on
   the real page (it renders underneath from the very first paint; this is
   purely an overlay). Total runtime including the fade is ~1.5s so it reads
   as a flourish in front of a conversion page, never a wait. Any interaction
   skips it instantly. Reduced motion drops the choreography entirely and
   just shows the static mark briefly before fading. ── */

const RUN_MS = 1150; // when the exit fade starts
const EXIT_MS = 350; // fade duration — total ≈ 1.5s
const REDUCED_HOLD_MS = 400;
const REDUCED_EXIT_MS = 250;

const sparkleTransition = (delay: number) => ({
  delay,
  type: 'spring' as const,
  stiffness: 420,
  damping: 12,
});

const AnimatedMark: React.FC = () => (
  <div className="flex flex-col items-center gap-4">
    <motion.svg
      viewBox="0 0 40 40"
      className="h-16 w-16 sm:h-20 sm:w-20"
      style={{ filter: 'drop-shadow(0 18px 40px rgba(4,32,31,0.35))' }}
      initial={{ scale: 0.35, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 15, mass: 0.7 }}
    >
      <defs>
        <linearGradient id="introGrad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#17D6AC" />
          <stop offset="50%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        fill="url(#introGrad)"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1"
      />
      <path
        d="M12 8.5v23M12 20 26 8.5M12 20l14 11.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M26.5 3.4 Q27.3 7.6 31.5 8.4 Q27.3 9.2 26.5 13.4 Q25.7 9.2 21.5 8.4 Q25.7 7.6 26.5 3.4Z"
        fill="#ffffff"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={sparkleTransition(0.5)}
      />
      <motion.path
        d="M26.5 28 Q27 30.2 29.2 30.7 Q27 31.2 26.5 33.4 Q26 31.2 23.8 30.7 Q26 30.2 26.5 28Z"
        fill="#ffffff"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={sparkleTransition(0.66)}
      />
    </motion.svg>

    <motion.div
      className="flex items-baseline gap-[3px] text-[22px] font-extrabold tracking-tight text-white sm:text-[26px]"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42, duration: 0.4, ease: 'easeOut' }}
    >
      <span>Kijk</span>
      <span className="font-semibold text-white/80">IPTV</span>
    </motion.div>
  </div>
);

const StaticMark: React.FC = () => (
  <div className="flex flex-col items-center gap-4">
    <svg viewBox="0 0 40 40" className="h-16 w-16 sm:h-20 sm:w-20">
      <defs>
        <linearGradient id="introGradStatic" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#17D6AC" />
          <stop offset="50%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#introGradStatic)" />
      <path
        d="M12 8.5v23M12 20 26 8.5M12 20l14 11.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 3.4 Q27.3 7.6 31.5 8.4 Q27.3 9.2 26.5 13.4 Q25.7 9.2 21.5 8.4 Q25.7 7.6 26.5 3.4Z"
        fill="#ffffff"
      />
      <path
        d="M26.5 28 Q27 30.2 29.2 30.7 Q27 31.2 26.5 33.4 Q26 31.2 23.8 30.7 Q26 30.2 26.5 28Z"
        fill="#ffffff"
      />
    </svg>
    <div className="flex items-baseline gap-[3px] text-[22px] font-extrabold tracking-tight text-white sm:text-[26px]">
      <span>Kijk</span>
      <span className="font-semibold text-white/80">IPTV</span>
    </div>
  </div>
);

export const Intro: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => setVisible(false);
    const holdMs = reduceMotion ? REDUCED_HOLD_MS : RUN_MS;
    const timer = window.setTimeout(dismiss, holdMs);

    window.addEventListener('pointerdown', dismiss);
    window.addEventListener('click', dismiss);
    window.addEventListener('keydown', dismiss);
    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchstart', dismiss, { passive: true });
    window.addEventListener('scroll', dismiss, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('click', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
      window.removeEventListener('scroll', dismiss);
    };
  }, [visible, reduceMotion]);

  /* Drop the overlay from the DOM a fixed `exitMs` after dismiss fires, via
   * a plain `setTimeout` — never via an animation library's exit-complete
   * callback. `AnimatePresence` previously kept this mounted (full-screen,
   * `position:fixed`, covering the whole page) until its own rAF-driven
   * completion callback declared the exit animation finished. Real browsers
   * settle that within a frame or two; anything driving the page under a
   * throttled/virtual timeline (headless capture with a time budget, some
   * embedders) can starve those rAF ticks, so the callback never fires and
   * the intro never unmounts — it just silently blocks every screenshot
   * taken after it. A timer keyed on `visible` has no such dependency: it
   * fires on the JS timer queue alone, independent of whether animation
   * frames are being serviced.
   */
  useEffect(() => {
    if (visible) return;
    const exitMs = reduceMotion ? REDUCED_EXIT_MS : EXIT_MS;
    const timer = window.setTimeout(() => setMounted(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [visible, reduceMotion]);

  // Lock background scroll only while the overlay is the active thing on
  // screen — released the instant dismiss fires, not only once the fade
  // finishes, so the page underneath is interactive right away.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`band-teal fixed inset-0 z-[100] flex items-center justify-center transition-opacity ease-out ${
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ transitionDuration: `${reduceMotion ? REDUCED_EXIT_MS : EXIT_MS}ms` }}
    >
      {reduceMotion ? <StaticMark /> : <AnimatedMark />}
    </div>
  );
};
