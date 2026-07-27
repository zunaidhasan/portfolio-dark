import { motion } from 'framer-motion';
import { easeOut, useReducedMotion } from '@/lib/motion';

export default function SectionHeading({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="flex flex-col gap-5"
    >
      {label && (
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-ink-muted">
          {label}
        </span>
      )}
      <h2 className="max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className="max-w-xl text-pretty text-base text-ink-muted"
          style={{ lineHeight: 1.7 }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
