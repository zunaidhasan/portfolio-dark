import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Globe } from 'lucide-react';
import { easeOut } from '@/lib/motion';

export default function VoiceDemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const src = lang === 'bn' ? '/deshvox-bangla.mp3' : '/deshvox-english.mp3';

  // Toggle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setupAudioContext();
      }).catch(err => console.log('Audio playback failed', err));
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Switch Language Track
  const handleLangChange = (selectedLang: 'bn' | 'en') => {
    setLang(selectedLang);
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = selectedLang === 'bn' ? '/deshvox-bangla.mp3' : '/deshvox-english.mp3';
      audioRef.current.load();
    }
  };

  // Setup Web Audio API Analyser
  const setupAudioContext = () => {
    if (!audioRef.current) return;
    if (audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (e) {
      console.warn('Web Audio API not fully supported or blocked by browser security policy:', e);
    }
  };

  // Animation Loop for Waveform / Bars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localRaf: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 32;
      const dataArray = new Uint8Array(bufferLength);

      if (isPlaying && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // idle state waves
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.004 + i * 0.3) * 10 + 15;
        }
      }

      const barWidth = (w / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let percent = dataArray[i] / 255;
        if (!isPlaying) percent = (Math.sin(Date.now() * 0.003 + i * 0.2) + 1) * 0.15 + 0.05;

        // scale visualizer bar heights
        const barHeight = Math.max(percent * h * 0.85, 4);

        // draw symmetrical bars from middle
        const y = (h - barHeight) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#5eada6');
        grad.addColorStop(0.5, '#73cbc2');
        grad.addColorStop(1, '#5eada6');

        ctx.fillStyle = grad;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth - 2, barHeight, 2);
        } else {
          ctx.rect(x, y, barWidth - 2, barHeight);
        }
        ctx.fill();

        x += barWidth;
      }

      localRaf = requestAnimationFrame(render);
    };

    localRaf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(localRaf);
    };
  }, [isPlaying, lang]);

  // Track Progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-accent/20 bg-bg-card p-6 shadow-lift md:p-8"
          >
            {/* Soft accent glow backdrop */}
            <div
              className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(94,173,166,0.15) 0%, transparent 70%)',
              }}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  DeshVox AI Receptionist
                </span>
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Info */}
            <div className="mt-5">
              <h3 className="font-display text-xl font-semibold text-ink">
                Bilingual Voice AI Agent
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                Experience the human-like, high-speed voice responsiveness designed for Bangladeshi businesses.
              </p>
            </div>

            {/* Language Selector Tabs */}
            <div className="mt-6 flex rounded-xl border border-line bg-bg-soft/50 p-1">
              <button
                onClick={() => handleLangChange('bn')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  lang === 'bn'
                    ? 'bg-accent/15 text-accent border border-accent/25 shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <Globe size={13} />
                Bangla Voice Receptionist
              </button>
              <button
                onClick={() => handleLangChange('en')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-accent/15 text-accent border border-accent/25 shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <Globe size={13} />
                English Voice Receptionist
              </button>
            </div>

            {/* Waveform Visualization Canvas */}
            <div className="relative mt-8 flex h-28 items-center justify-center rounded-2xl border border-line bg-bg/50 p-4">
              <canvas ref={canvasRef} width={400} height={100} className="h-full w-full opacity-90" />
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full bg-accent transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Audio Controls */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={toggleMute}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <button
                onClick={togglePlay}
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-[0_4px_20px_rgba(94,173,166,0.3)] transition-all hover:scale-[1.04] active:scale-[0.97]"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={20} className="fill-bg" />
                ) : (
                  <Play size={20} className="translate-x-0.5 fill-bg" />
                )}
              </button>

              <div className="w-10" /> {/* Spacer for symmetry */}
            </div>

            {/* Tech stats */}
            <div className="mt-8 border-t border-line pt-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Powered by FastAPI · Retell AI · ElevenLabs · Custom Bangla ASR
              </span>
            </div>

            {/* Native HTML5 Audio */}
            <audio ref={audioRef} src={src} preload="auto" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
