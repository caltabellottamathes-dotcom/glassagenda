import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const OLIVE = "#94925d";
export const PISTACHIO = "#d8dab3";
export const URGENT = "#d5e24a";
export const EARTH = "#595f34";

export function Divider({ className = "" }) {
  return <div className={`h-px bg-white/10 ${className}`} />;
}

export function Ring({ pct, size = 110, stroke = 9, color = PISTACHIO, track = "rgba(255,255,255,0.10)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [off, setOff] = useState(c);
  useEffect(() => {
    const t = setTimeout(() => setOff(c - (Math.min(100, pct) / 100) * c), 60);
    return () => clearTimeout(t);
  }, [pct, c]);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} animate={{ strokeDashoffset: off }} transition={{ duration: 1, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function Toggle({ checked, onChange, color = PISTACHIO }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="relative w-9 h-5 rounded-full transition-colors shrink-0" style={checked ? { background: color } : { background: "rgba(255,255,255,0.15)" }}>
      <motion.span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full" style={{ background: checked ? EARTH : "rgba(255,255,255,0.5)" }} animate={{ x: checked ? 14 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} />
    </button>
  );
}

export function Chip({ active, onClick, children, className = "" }) {
  return (
    <button type="button" onClick={onClick} className={`px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase font-semibold border transition-colors ${active ? "bg-[#d8dab3] text-[#595f34] border-[#d8dab3]" : "border-white/15 text-storm/55 hover:text-storm"} ${className}`}>
      {children}
    </button>
  );
}

export function Stepper({ value, onChange, min = 0, max = 30, step = 1, suffix = "" }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(min, value - step))} className="w-6 h-6 rounded-full border border-white/15 text-storm/70 hover:bg-white/10 text-sm leading-none">−</button>
      <span className="text-storm text-sm font-bold tabular-nums w-9 text-center">{value}{suffix}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + step))} className="w-6 h-6 rounded-full border border-white/15 text-storm/70 hover:bg-white/10 text-sm leading-none">+</button>
    </div>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1 p-0.5 rounded-full bg-white/5 border border-white/10 w-fit flex-wrap">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} className={`px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase font-semibold transition-colors ${value === o ? "bg-[#d8dab3] text-[#595f34]" : "text-storm/55 hover:text-storm"}`}>{o}</button>
      ))}
    </div>
  );
}

export function MiniBars({ data, highlight, color = OLIVE, highlightColor = URGENT }) {
  const max = Math.max(...data) || 1;
  return (
    <div className="flex items-end gap-1 h-12 w-full">
      {data.map((v, i) => (
        <motion.div key={i} className="flex-1 rounded-t-sm" initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.04 }} style={{ background: i === highlight ? highlightColor : color, opacity: i === highlight ? 1 : 0.5 }} />
      ))}
    </div>
  );
}

export function BarRow({ label, value, max, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] tracking-widest uppercase w-14 text-storm/55">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${Math.min(100, (value / max) * 100)}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
      </div>
      <span className="text-storm text-xs font-bold tabular-nums w-6 text-right">{value}</span>
    </div>
  );
}

export function FooterAction({ label, primary = true, secondaryLabel, onSecondary, onClick }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      {secondaryLabel && (
        <button type="button" onClick={onSecondary} className="flex-1 px-4 py-2.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase border border-white/15 text-storm/70 hover:bg-white/5 transition-colors">{secondaryLabel}</button>
      )}
      <button type="button" onClick={onClick} className={`flex-1 px-4 py-2.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase transition-all active:scale-95 ${primary ? "bg-[#d8dab3] text-[#595f34] hover:brightness-105" : "border border-white/15 text-storm/70"}`}>{label} →</button>
    </div>
  );
}

export function Label({ children, n, right }) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-2">
        {n != null && <span className="text-storm/25 text-[9px] tabular-nums">{String(n).padStart(2, "0")}</span>}
        <span className="text-storm/60 text-[9px] uppercase tracking-[0.22em] font-semibold">{children}</span>
      </div>
      {right}
    </div>
  );
}