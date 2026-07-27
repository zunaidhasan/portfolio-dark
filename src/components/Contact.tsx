import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, Check } from 'lucide-react';
import { socials } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import { easeOut, useReducedMotion } from '@/lib/motion';

export default function Contact() {
  const reduced = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const links = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: socials.email,
      href: `mailto:${socials.email}`,
    },
    {
      icon: <Linkedin size={18} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/zunaid-ishan',
      href: socials.linkedin,
    },
    {
      icon: <Github size={18} />,
      label: 'GitHub',
      value: 'github.com/zunaidhasan',
      href: socials.github,
    },
    {
      icon: <MapPin size={18} />,
      label: 'Location',
      value: socials.location,
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-content">
        <SectionHeading
          title="Let's build something that actually ships."
          description="Have a product in mind, a role to fill, or a voice-AI idea worth exploring? I read every message."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col gap-4"
          >
            {links.map((l) => {
              const content = (
                <motion.div
                  whileHover={reduced ? undefined : { y: -3 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-line-strong"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-ink-muted transition-all group-hover:border-line-strong group-hover:text-ink">
                    {l.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
                      {l.label}
                    </p>
                    <p className="mt-1 truncate text-base text-ink-soft transition-colors group-hover:text-ink">
                      {l.value}
                    </p>
                  </div>
                </motion.div>
              );
              return l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={l.label}>{content}</div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            className="rounded-2xl border border-line bg-bg-card/60 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="flex flex-col gap-6">
              <Field
                label="Name"
                id="name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Your name"
                autoComplete="name"
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <div className="group flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors group-focus-within:text-ink-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the project, role, or idea..."
                  className="resize-none rounded-xl border border-line bg-bg-soft/50 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-all focus:border-line-strong focus:bg-bg-soft focus:outline-none focus:ring-1 focus:ring-ink/10"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                aria-live="polite"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_-8px_rgba(245,245,244,0.4)] active:scale-[0.99] disabled:cursor-default disabled:opacity-80"
              >
                {sent ? (
                  <>
                    <Check size={16} className="text-emerald-500" />
                    Opening your mail app
                  </>
                ) : (
                  <>
                    Send message
                    <Send
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors group-focus-within:text-ink-muted"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-line bg-bg-soft/50 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-all focus:border-line-strong focus:bg-bg-soft focus:outline-none focus:ring-1 focus:ring-ink/10"
        />
      </div>
    </div>
  );
}
