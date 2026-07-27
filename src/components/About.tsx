import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { skills } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import { easeOut, useReducedMotion } from '@/lib/motion';

export default function About() {
  const reduced = useReducedMotion();
  return (
    <section id="about" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-content">
        <SectionHeading
          title="Engineer first. Builder always."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl" style={{ lineHeight: 1.7 }}>
              AI Engineer &amp; Full-Stack Developer based in Dhaka,
              Bangladesh. I specialize in Voice AI, LLM pipelines, and
              production SaaS products. Currently building{' '}
              <span className="font-medium text-ink">DeshVox</span> and helping
              Bangladeshi businesses adopt intelligent voice automation.
            </p>

            {/* Skill tags */}
            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
                Toolkit
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: easeOut, delay: reduced ? 0 : i * 0.03 }}
                    className="rounded-lg border border-line bg-bg-soft/50 px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <InfoCard
              icon={<Briefcase size={16} />}
              label="Current role"
              value="Foreign Communication Executive"
              sub="Sardar IT, international client communication & technical coordination"
            />
            <InfoCard
              icon={<GraduationCap size={16} />}
              label="Education"
              value="B.Sc. in Computer Science & Engineering"
              sub="Daffodil International University"
            />
            <InfoCard
              icon={<MapPin size={16} />}
              label="Location"
              value="Dhaka, Bangladesh"
              sub="Working with teams worldwide, remotely"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.25, ease: easeOut }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-line-strong"
    >
      <div className="flex items-center gap-2 text-ink-faint transition-colors group-hover:text-ink-muted">
        {icon}
        <span className="text-xs font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-base font-medium text-ink">{value}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{sub}</p>
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-ink/40 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
