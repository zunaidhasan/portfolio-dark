import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Github, Code, CheckCircle, Database, Server, Smartphone, MessageSquare } from 'lucide-react';
import { type Project } from '@/data/portfolio';
import { easeOut } from '@/lib/motion';

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  const hasMetrics = project.metrics && project.metrics.length > 0;
  const hasArchitecture = project.architecture && project.architecture.length > 0;
  const isMaatiGyan = project.id === 'maatigyan';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-md"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative h-full w-full max-w-xl overflow-y-auto border-l border-line bg-bg-card p-6 shadow-lift md:p-10"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between border-b border-line pb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent">
                {project.status}
              </span>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title / Hero */}
            <div className="mt-8">
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                Project {project.index}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 text-lg font-medium leading-relaxed text-ink-soft">
                {project.tagline}
              </p>
            </div>

            {/* Action Buttons (Links) */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-bg shadow-sm transition-all hover:scale-[1.02] hover:bg-[#73cbc2]"
                >
                  Try Live Demo
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg-soft px-5 py-2.5 text-xs font-semibold text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Github size={14} />
                  Codebase
                </a>
              )}
            </div>

            {/* Overview Section */}
            <div className="mt-10">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                Overview &amp; Scope
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {project.details}
              </p>
            </div>

            {/* Impact Metrics Badges */}
            {hasMetrics && (
              <div className="mt-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Performance &amp; Business Impact
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-1">
                  {project.metrics?.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-line bg-bg-soft/40 p-4"
                    >
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span className="text-sm font-medium text-ink-soft">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MaatiGyan WhatsApp Live Chat Mockup */}
            {isMaatiGyan && project.whatsappMock && (
              <div className="mt-10">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                  WhatsApp Report UI Preview
                </h4>
                <div className="overflow-hidden rounded-2xl border border-[#25d366]/20 bg-[#0b141a] text-xs font-sans shadow-soft">
                  {/* WhatsApp Header */}
                  <div className="flex items-center gap-3 bg-[#075e54] p-3 text-white">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#128c7e] font-bold">
                      MG
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#075e54] bg-[#25d366]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">MaatiGyan AI Agent</p>
                      <p className="text-[10px] text-[#25d366] font-medium">online</p>
                    </div>
                  </div>

                  {/* WhatsApp Chat Area */}
                  <div className="flex flex-col gap-4 p-4 min-h-[220px] bg-slate-950/20 bg-cover">
                    {project.whatsappMock.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[85%] rounded-lg p-2.5 shadow-sm leading-relaxed ${
                          msg.sender === 'farmer'
                            ? 'self-end bg-[#056162] text-white rounded-tr-none'
                            : 'self-start bg-[#262d31] text-[#e9edef] rounded-tl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line text-[11px]">{msg.text}</p>
                        <span className="self-end mt-1 text-[9px] text-white/50">{msg.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Technical Pipeline / Architecture Highlights */}
            {hasArchitecture && (
              <div className="mt-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Technical Architecture Highlights
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.architecture?.map((arch, idx) => {
                    // Pick icons matching indices dynamically
                    const icons = [
                      <Server size={14} className="text-accent" />,
                      <Code size={14} className="text-accent" />,
                      <Database size={14} className="text-accent" />,
                      <Smartphone size={14} className="text-accent" />,
                    ];
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                      >
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft">
                          {icons[idx % icons.length]}
                        </div>
                        <span className="mt-0.5 text-ink-soft">{arch}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="mt-10 border-t border-line pt-8">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                Development Stack
              </h4>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-line bg-bg-soft px-3 py-1 text-xs font-medium text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
