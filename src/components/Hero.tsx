import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play, FileText } from 'lucide-react';
import { easeOut, useReducedMotion } from '@/lib/motion';
import VoiceDemoModal from './VoiceDemoModal';

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  const nameX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const nameY = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const badgeX = useTransform(sx, [-0.5, 0.5], [14, -14]);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6"
    >
      {/* soft top wash for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(94,173,166,0.06), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Status badge */}
        <motion.div
          style={reduced ? undefined : { x: badgeX }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium tracking-wide text-ink-soft">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          style={reduced ? undefined : { x: nameX, y: nameY }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.45 }}
          className="font-display text-[clamp(3rem,11vw,8.5rem)] font-semibold leading-[0.92] tracking-tightest text-ink"
        >
          Zunaid Hasan
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.65 }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          AI engineer building production voice agents and Bangla-language NLP
          systems. Not demos, real products.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row flex-wrap"
        >
          {/* Primary Voice AI CTA */}
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_4px_24px_rgba(94,173,166,0.3)] transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(94,173,166,0.45)] active:scale-[0.98]"
          >
            <Play size={15} className="fill-bg" />
            Listen to Voice Demo
          </button>

          {/* View work button */}
          <MagneticButton href="#work" variant="secondary">
            View work
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </MagneticButton>

          {/* Get in touch button */}
          <MagneticButton href="#contact" variant="secondary">
            Get in touch
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          {/* Resume Quick Access Link */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft/40 px-6 py-3 text-sm font-medium text-ink-muted backdrop-blur-sm transition-colors hover:border-line-strong hover:text-ink"
          >
            <FileText size={15} className="text-ink-faint transition-colors group-hover:text-ink-muted" />
            Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Voice Demo Player Modal */}
      <VoiceDemoModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </section>
  );
}

function MagneticButton({
  href,
  children,
  variant,
}: {
  href: string;
  children: ReactNode;
  variant: 'primary' | 'secondary';
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-ink text-bg hover:shadow-[0_8px_30px_-8px_rgba(245,245,245,0.4)]'
      : 'border border-line bg-bg-soft/40 text-ink-soft backdrop-blur-sm hover:border-line-strong hover:text-ink';

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}
