import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  if (reduced) {
    return (
      <div className="fixed left-0 right-0 top-0 z-[60] h-px bg-line-strong" aria-hidden />
    );
  }

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed left-0 right-0 top-0 z-[60] h-px bg-gradient-to-r from-transparent via-ink/50 to-transparent"
      aria-hidden
    />
  );
}
