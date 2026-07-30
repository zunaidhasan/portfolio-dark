import { Mail, Linkedin, Github } from 'lucide-react';
import { socials } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-16">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-bg-elevated text-xs font-bold tracking-tight text-ink">
            ZH
          </span>
          <span className="text-sm text-ink-faint">
            Zunaid Hasan · © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SocialLink href={`mailto:${socials.email}`} icon={<Mail size={16} />} label="Email" />
          <SocialLink href={socials.linkedin} icon={<Linkedin size={16} />} label="LinkedIn" />
          <SocialLink href={socials.github} icon={<Github size={16} />} label="GitHub" />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-faint transition-colors hover:border-line-strong hover:text-ink-soft"
    >
      {icon}
    </a>
  );
}

