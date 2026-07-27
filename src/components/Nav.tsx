import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollProgress, type SectionId } from '@/hooks/useScrollProgress';
import { easeOut, useReducedMotion } from '@/lib/motion';

const links: { label: string; href: string; id: SectionId }[] = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { active } = useScrollProgress();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={reduced ? { opacity: 0 } : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? 'mt-3 rounded-full border border-line bg-bg/70 py-3 shadow-soft backdrop-blur-xl'
            : 'mt-0 border-b border-transparent py-5'
        }`}
        style={
          scrolled
            ? {
                maxWidth: 'min(1000px, calc(100% - 2rem))',
                boxShadow:
                  '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
              }
            : undefined
        }
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Zunaid Hasan, home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-bg-elevated text-sm font-bold tracking-tight text-ink transition-colors group-hover:border-accent/40 group-hover:text-accent">
            ZH
          </span>
          <span className="text-sm font-medium tracking-tight text-ink-soft transition-colors group-hover:text-ink">
            Zunaid
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {isActive && !reduced && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-accent/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {isActive && reduced && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-accent/20" />
                )}
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent/50 hover:bg-accent/20"
          >
            Get in touch
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="mx-4 overflow-hidden rounded-2xl border border-line bg-bg-soft/95 shadow-soft backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col p-2" aria-label="Mobile">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`rounded-xl px-4 py-3 text-sm transition-colors hover:bg-ink/5 ${
                    active === l.id ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-center text-sm font-medium text-accent"
              >
                Get in touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
