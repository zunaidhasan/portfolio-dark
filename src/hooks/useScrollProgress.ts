import { useEffect, useState } from 'react';

const sectionIds = ['top', 'work', 'about', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<SectionId>('top');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

      const mid = scrollTop + window.innerHeight * 0.35;
      let current: SectionId = 'top';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { progress, active };
}
