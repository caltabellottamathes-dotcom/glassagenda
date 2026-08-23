import { useState, useEffect, useRef } from "react";

export function useAudio(useMic) {
  const [bands, setBands] = useState(() => Array.from({ length: 40 }, () => 0));
  const raf = useRef(0);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    let alive = true;
    const BANDS = 40;

    const sim = () => {
      let t = 0;
      const tick = () => {
        if (!alive) return;
        t += 0.06;
        const arr = Array.from({ length: BANDS }, (_, i) => {
          const f = i / BANDS;
          const env = Math.exp(-f * 2.2);
          const wave = 0.5 + 0.5 * Math.sin(t * (0.8 + f * 4) + i * 0.4);
          const beat = Math.pow(Math.sin(t * 0.5), 2);
          return Math.min(1, (wave * 0.6 + beat * 0.4) * (0.35 + env * 0.85));
        });
        setBands(arr);
        raf.current = requestAnimationFrame(tick);
      };
      tick();
    };

    const mic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!alive) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        const AC = window.AudioContext || window.webkitAudioContext;
        const ctx = new AC(); ctxRef.current = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const an = ctx.createAnalyser(); an.fftSize = 128;
        src.connect(an);
        const buf = new Uint8Array(an.frequencyBinCount);
        const tick = () => {
          if (!alive) return;
          an.getByteFrequencyData(buf);
          const arr = Array.from(buf, (v) => v / 255);
          while (arr.length < BANDS) arr.push(0);
          setBands(arr.slice(0, BANDS));
          raf.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) { sim(); }
    };

    if (useMic) mic(); else sim();
    return () => {
      alive = false;
      cancelAnimationFrame(raf.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (ctxRef.current) ctxRef.current.close?.();
    };
  }, [useMic]);

  const level = bands.reduce((s, v) => s + v, 0) / (bands.length || 1);
  return { bands, level };
}