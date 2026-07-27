import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import { easeOut, useReducedMotion } from '@/lib/motion';

const statusStyles: Record<string, string> = {
  Flagship: 'text-accent border-accent/30 bg-accent-soft',
  Active: 'text-ink-soft border-line-strong bg-bg-soft',
  Shipping: 'text-ink-soft border-line-strong bg-bg-soft',
  Research: 'text-ink-soft border-line-strong bg-bg-soft',
};

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-content">
        <SectionHeading
          label="Selected Work"
          title="Things I've built that ship."
          description="A focused set of production AI products, built for real users, not just screenshots."
        />

        <div className="mt-16 flex flex-col gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.06} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com/zunaidhasan"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            More on GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[number];
  delay: number;
}) {
  const reduced = useReducedMotion();
  const isFlagship = project.status === 'Flagship';

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
      whileHover={reduced ? undefined : { y: -4 }}
      className={`group relative block overflow-hidden rounded-2xl border bg-bg-card/60 p-6 backdrop-blur-sm transition-colors duration-300 sm:p-8 ${
        isFlagship
          ? 'border-accent/15 hover:border-accent/30'
          : 'border-line hover:border-line-strong'
      }`}
    >
      {/* hover wash */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background: isFlagship
              ? 'radial-gradient(80% 120% at 50% 0%, rgba(94,173,166,0.07), transparent 70%)'
              : 'radial-gradient(80% 120% at 50% 0%, rgba(245,245,245,0.04), transparent 70%)',
          }}
        />
      </div>

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {/* meta row */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[project.status]}`}
            >
              {isFlagship && (
                <span className="h-1 w-1 rounded-full bg-accent" />
              )}
              {project.status}
            </span>
          </div>

          {/* name */}
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {project.name}
          </h3>

          {/* tagline */}
          <p className="mt-2 text-base font-medium text-ink-soft">
            {project.tagline}
          </p>

          {/* description, revealed on hover (desktop), always shown (mobile) */}
          <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:transition-all sm:duration-500 sm:ease-out sm:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted sm:opacity-80 sm:transition-colors sm:group-hover:text-ink-soft">
                {project.description}
              </p>
            </div>
          </div>

          {/* stack */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-line bg-bg-soft/50 px-2.5 py-1 text-[11px] font-medium text-ink-muted transition-colors group-hover:border-line-strong group-hover:text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* arrow */}
        <div className="hidden shrink-0 sm:block">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-muted transition-all duration-300 group-hover:border-transparent group-hover:bg-ink group-hover:text-bg">
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
