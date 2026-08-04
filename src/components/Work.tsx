import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  PhoneCall,
  Scale,
  Leaf,
  Briefcase,
  Pill,
  type LucideIcon,
} from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ProjectDetailsModal from './ProjectDetailsModal';
import { easeOut, useReducedMotion } from '@/lib/motion';
import { hexToRgba } from '@/lib/color';
 
const projectIcons: Record<string, LucideIcon> = {
  deshvox: PhoneCall,
  legalmate: Scale,
  maatigyan: Leaf,
  'fiverr-assistant': Briefcase,
  pharmacare: Pill,
};
 
const waveformBars = [6, 14, 22, 10, 18, 26, 12, 20, 8, 16];
 
export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
 
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
            <ProjectCard
              key={p.id}
              project={p}
              delay={i * 0.06}
              onClick={() => setSelectedProject(p)}
            />
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
 
      {/* Slide-over details drawer */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
 
function ProjectCard({
  project,
  delay,
  onClick,
}: {
  project: Project;
  delay: number;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const accent = project.accent;
  const accentAlt = project.accentAlt ?? accent;
  const Icon = projectIcons[project.id] ?? Sparkles;
 
  // Expose the project accent as a CSS variable for hover utilities
  const cardStyle = { '--card-accent': accent } as CSSProperties;
 
  return (
    <motion.button
      onClick={onClick}
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group relative block w-full text-left overflow-hidden rounded-2xl border border-line bg-bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-line-strong"
    >
      {/* hover wash tinted with the project accent */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(80% 120% at 50% 0%, ${hexToRgba(accent, 0.09)}, transparent 70%)`,
          }}
        />
      </div>
 
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-stretch sm:p-8">
        <div className="min-w-0 flex-1">
          {/* meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
              style={{
                color: accent,
                borderColor: hexToRgba(accent, 0.32),
                background: hexToRgba(accent, 0.1),
              }}
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: accent }}
              />
              {project.status}
            </span>
 
            {/* Performance Metric Quick Preview */}
            {project.metrics && project.metrics[0] && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-medium"
                style={{ color: accent }}
              >
                <Sparkles size={10} />
                {project.metrics[0]}
              </span>
            )}
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
                className="rounded-md border border-line bg-bg-soft/50 px-2.5 py-1 text-[11px] font-medium text-ink-muted transition-colors group-hover:border-[color:var(--card-accent)]/40 group-hover:text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
 
        {/* Visual cover */}
        <div className="relative shrink-0 overflow-hidden rounded-xl border border-line bg-bg-soft/40 sm:ml-6 sm:w-64">
          {/* accent gradient wash */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 100% at 20% 0%, ${hexToRgba(accent, 0.2)}, transparent 60%)`,
            }}
          />
          {/* big index numeral */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-4 select-none font-display text-[7rem] font-semibold leading-none tracking-tighter"
            style={{
              color: 'transparent',
              WebkitTextStroke: `1.5px ${hexToRgba(accent, 0.3)}`,
            }}
          >
            {project.index}
          </span>
 
          {/* icon tile + bars */}
          <div className="relative flex h-32 w-full flex-col items-center justify-center gap-3 sm:h-full sm:min-h-[11rem]">
            <span
              className="grid h-12 w-12 place-items-center rounded-xl border backdrop-blur-sm"
              style={{
                borderColor: hexToRgba(accent, 0.35),
                background: hexToRgba(accent, 0.14),
                color: accent,
              }}
            >
              <Icon size={22} strokeWidth={1.8} />
            </span>
 
            <div className="flex h-9 items-end gap-1" aria-hidden>
              {waveformBars.map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${h * 2}px`,
                    background: `linear-gradient(180deg, ${accentAlt}, ${hexToRgba(accent, 0.15)})`,
                  }}
                />
              ))}
            </div>
          </div>
 
          {/* arrow action cue */}
          <div className="pointer-events-none absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-bg"
            style={
              { '--card-accent': accent } as CSSProperties
            }
          >
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
 
