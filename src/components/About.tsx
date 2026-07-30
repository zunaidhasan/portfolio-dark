import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin, Quote } from 'lucide-react';
import { skillsCategory, testimonials } from '@/data/portfolio';
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

        {/* Intro Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Intro Text & Categorized Skills */}
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
              <span className="font-medium text-accent">DeshVox</span> and helping
              Bangladeshi businesses adopt intelligent voice automation.
            </p>

            {/* Categorized Skills Grid */}
            <div className="mt-14 space-y-8">
              <div>
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                  Toolkit &amp; Specializations
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                {skillsCategory.map((cat, catIdx) => (
                  <div key={cat.category} className="space-y-3">
                    <h4 className="text-xs font-semibold tracking-wide text-ink-muted border-b border-line pb-2">
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 md:flex-col md:items-start">
                      {cat.items.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, ease: easeOut, delay: reduced ? 0 : i * 0.02 + catIdx * 0.1 }}
                          className="rounded-lg border border-line bg-bg-soft/30 px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-line-strong hover:text-ink md:w-full md:px-3 md:py-1.5"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info cards on the right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            className="flex flex-col gap-4 justify-start"
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

        {/* Testimonials & Social Proof Section */}
        <div className="mt-32 border-t border-line pt-24">
          <SectionHeading
            label="Social Proof"
            title="What people say about building together."
            description="Endorsements from clients, collaborators, and international coordination roles."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: easeOut, delay: idx * 0.08 }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-line-strong"
              >
                <Quote size={24} className="text-accent/15 absolute top-4 right-4" />
                
                <p className="relative text-sm leading-relaxed text-ink-muted italic">
                  "{t.quote}"
                </p>

                <div className="mt-6 border-t border-line/50 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-ink">{t.author}</p>
                    <p className="text-[10px] text-ink-faint">
                      {t.role} · <span className="text-accent/80 font-medium">{t.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
