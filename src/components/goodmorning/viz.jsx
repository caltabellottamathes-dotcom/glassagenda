import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const URG = "#d5e24a";
export const SAND = "#94925d";
export const OLIVE = "#d8dab3";
export const SKY = "#B1BEC6";
export const PLUM = "#301728";

export const CARD = "rounded-2xl border border-marble/20 bg-plum/30 p-4 flex flex-col";

export function Ring({ pct, size = 120, stroke = 10, color = OLIVE, track = "rgba(255,255,255,0.10)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [off, setOff] = useState(c);
  useEffect(() => {
    const t = setTimeout(() => setOff(c - (Math.min(100, pct) / 100) * c), 60);
    return () => clearTimeout(t);
  }, [pct, c]);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} animate={{ strokeDashoffset: off }} transition={{ duration: 1, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function CountUp({ to, duration = 0.8, className, suffix = "" }) {
  const [n, setN] = useState(to);
  const fromRef = useRef(to);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setN(Math.round(from + (to - from) * p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span className={className}>{n}{suffix}</span>;
}

export function Toggle({ checked, onChange, color = URG }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${checked ? "" : "bg-marble/20"}`} style={checked ? { background: color } : {}}>
      <motion.span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-plum shadow" animate={{ x: checked ? 16 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} />
    </button>
  );
}

export function Chip({ active, onClick, children, className = "" }) {
  return (
    <button type="button" onClick={onClick} className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase border transition-colors ${active ? "bg-urgent text-plum border-urgent" : "border-marble/25 text-storm/60 hover:bg-marble/10"} ${className}`}>
      {children}
    </button>
  );
}

export function Stepper({ value, onChange, min = 0, max = 30, step = 1, suffix = "" }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(min, value - step))} className="w-7 h-7 rounded-full border border-marble/25 text-storm/70 hover:bg-marble/10 text-sm leading-none">−</button>
      <span className="text-storm text-base font-bold tabular-nums w-10 text-center">{value}{suffix}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + step))} className="w-7 h-7 rounded-full border border-marble/25 text-storm/70 hover:bg-marble/10 text-sm leading-none">+</button>
    </div>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1 p-1 rounded-full bg-plum/50 border border-marble/20 w-fit">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-colors ${value === o ? "bg-urgent text-plum" : "text-storm/60 hover:text-storm"}`}>{o}</button>
      ))}
    </div>
  );
}

export function MiniBars({ data, highlight, color = OLIVE }) {
  const max = Math.max(...data) || 1;
  return (
    <div className="flex items-end gap-1.5 h-16 w-full">
      {data.map((v, i) => (
        <motion.div key={i} className="flex-1 rounded-t-sm" initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.04 }} style={{ background: i === highlight ? URG : color, opacity: i === highlight ? 1 : 0.45 }} />
      ))}
    </div>
  );
}

export function FooterAction({ label, primary = true, onClick }) {
  return (
    <div className="flex justify-end pt-1">
      <button type="button" onClick={onClick} className={`px-6 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all active:scale-95 ${primary ? "bg-urgent text-plum hover:brightness-110" : "border border-storm/15 bg-marble/5 text-storm/80 hover:bg-marble/10"}`}>{label} →</button>
    </div>
  );
}

export function Label({ children, n }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {n != null && <span className="text-storm/30 text-[10px] tabular-nums">{String(n).padStart(2, "0")}</span>}
      <span className="text-storm/70 text-[10px] uppercase tracking-[0.2em] font-semibold">{children}</span>
    </div>
  );
}