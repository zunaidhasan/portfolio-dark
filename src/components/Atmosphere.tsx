import { useEffect, useRef } from 'react';

/**
 * A restrained, cinematic background: slow-drifting soft light fields
 * over a fine grain layer, with subtle mouse parallax. No loud gradients.
 */
export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.4 });
  const smooth = useRef({ x: 0.5, y: 0.4 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    type Orb = {
      bx: number;
      by: number;
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      hue: number;
      alpha: number;
      depth: number;
    };

    const orbs: Orb[] = [
      { bx: 0.25, by: 0.3, x: 0, y: 0, r: 320, vx: 0.12, vy: 0.08, hue: 40, alpha: 0.05, depth: 24 },
      { bx: 0.7, by: 0.55, x: 0, y: 0, r: 380, vx: -0.09, vy: 0.11, hue: 200, alpha: 0.04, depth: 40 },
      { bx: 0.5, by: 0.8, x: 0, y: 0, r: 260, vx: 0.07, vy: -0.1, hue: 28, alpha: 0.035, depth: 18 },
    ];

    const draw = () => {
      // ease pointer toward target
      smooth.current.x += (pointer.current.x - smooth.current.x) * 0.04;
      smooth.current.y += (pointer.current.y - smooth.current.y) * 0.04;
      const px = smooth.current.x - 0.5;
      const py = smooth.current.y - 0.5;

      ctx.clearRect(0, 0, w, h);

      for (const o of orbs) {
        o.bx += o.vx / w;
        o.by += o.vy / h;
        if (o.bx < -0.3) o.bx = 1.3;
        if (o.bx > 1.3) o.bx = -0.3;
        if (o.by < -0.3) o.by = 1.3;
        if (o.by > 1.3) o.by = -0.3;

        const cx = o.bx * w + px * o.depth;
        const cy = o.by * h + py * o.depth;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        grad.addColorStop(0, `hsla(${o.hue}, 30%, 62%, ${o.alpha})`);
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, transparent 40%, rgba(10,10,10,0.6) 100%)',
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
