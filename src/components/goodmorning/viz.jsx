import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const EARTH = "#595f34";
export const OLIVE = "#94925d";
export const PISTACHIO = "#d8dab3";
export const URG = "#d5e24a";
export const INK = "#595f34";

export function Ring({ pct, size = 150, stroke = 6, color = PISTACHIO, track = "rgba(216,218,179,0.10)", children }) {
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

export function Toggle({ checked, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="relative w-10 h-6 rounded-full transition-colors shrink-0" style={checked ? { background: URG } : { background: "rgba(216,218,179,0.18)" }}>
      <motion.span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full" style={{ background: INK }} animate={{ x: checked ? 16 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} />
    </button>
  );
}

export function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase border transition-colors" style={active ? { background: "rgba(216,218,179,0.22)", color: PISTACHIO, borderColor: "rgba(216,218,179,0.45)" } : { borderColor: "rgba(216,218,179,0.18)", color: "rgba(216,218,179,0.5)" }}>
      {children}
    </button>
  );
}

export function Stepper({ value, onChange, min = 0, max = 30, step = 1, suffix = "" }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(min, value - step))} className="w-7 h-7 rounded-full border text-sm leading-none" style={{ borderColor: "rgba(216,218,179,0.25)", color: "rgba(216,218,179,0.7)" }}>−</button>
      <span className="text-base font-bold tabular-nums w-10 text-center" style={{ color: PISTACHIO }}>{value}{suffix}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + step))} className="w-7 h-7 rounded-full border text-sm leading-none" style={{ borderColor: "rgba(216,218,179,0.25)", color: "rgba(216,218,179,0.7)" }}>+</button>
    </div>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1 p-1 rounded-full w-fit" style={{ background: "rgba(89,95,52,0.35)", border: "1px solid rgba(216,218,179,0.12)" }}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} className="px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-colors" style={value === o ? { background: PISTACHIO, color: INK } : { color: "rgba(216,218,179,0.55)" }}>{o}</button>
      ))}
    </div>
  );
}

export function Badge({ tone = "olive", children }) {
  const map = {
    olive: { c: PISTACHIO, bg: "rgba(148,146,93,0.22)", bd: "rgba(148,146,93,0.45)" },
    pistachio: { c: PISTACHIO, bg: "rgba(216,218,179,0.14)", bd: "rgba(216,218,179,0.30)" },
    urgent: { c: URG, bg: "rgba(213,226,74,0.16)", bd: "rgba(213,226,74,0.45)" },
    earth: { c: "rgba(216,218,179,0.85)", bg: "rgba(89,95,52,0.45)", bd: "rgba(89,95,52,0.60)" },
  };
  const s = map[tone] || map.olive;
  return <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase border" style={{ color: s.c, background: s.bg, borderColor: s.bd }}>{children}</span>;
}

export function PriorityBar({ label, count, max, color = PISTACHIO }) {
  const pct = max ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] tracking-[0.2em] uppercase w-20" style={{ color: "rgba(216,218,179,0.55)" }}>{label}</span>
      <span className="text-sm font-bold tabular-nums w-6" style={{ color: PISTACHIO }}>{count}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(216,218,179,0.10)" }}>
        <motion.div className="h-full rounded-full" style={{ background: color, opacity: 0.75 }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
      </div>
    </div>
  );
}

export function ContentBlock({ badge, badgeTone = "olive", label, heading, text, tags = [], children }) {
  return (
    <div className="pb-4 mb-4 last:border-0 last:mb-0 last:pb-0" style={{ borderBottom: "1px solid rgba(216,218,179,0.10)" }}>
      <div className="flex items-center gap-2.5 mb-2">
        <Badge tone={badgeTone}>{badge}</Badge>
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: OLIVE }}>{label}</span>
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-1.5" style={{ color: "#f4f4f0" }}>{heading}</h3>
      {text && <p className="text-sm leading-relaxed mb-2.5" style={{ color: "rgba(216,218,179,0.58)" }}>{text}</p>}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => <span key={t} className="px-2.5 py-1 rounded-full text-[10px]" style={{ color: "rgba(216,218,179,0.72)", background: "rgba(89,95,52,0.32)", border: "1px solid rgba(89,95,52,0.45)" }}>{t}</span>)}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatusItem({ n, label, text }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] tabular-nums" style={{ color: OLIVE }}>{String(n).padStart(2, "0")}</span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "rgba(216,218,179,0.6)" }}>{label}</span>
      </div>
      <p className="text-xs leading-snug" style={{ color: "rgba(216,218,179,0.82)" }}>{text}</p>
    </div>
  );
}

export function FooterButtons({ primary, ghost, onPrimary, onGhost }) {
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={onPrimary} className="px-6 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:brightness-110 active:scale-95 transition" style={{ background: URG, color: INK }}>{primary} →</button>
      {ghost && <button type="button" onClick={onGhost} className="px-6 py-3 rounded-full text-xs tracking-[0.15em] uppercase transition" style={{ border: "1px solid rgba(216,218,179,0.22)", color: "rgba(216,218,179,0.8)" }}>{ghost}</button>}
    </div>
  );
}

export function Headline({ kicker, title, right }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: OLIVE }}>{kicker}</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-none" style={{ color: "#f4f4f0" }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}

export function Divider({ className = "" }) {
  return <div className={`h-px ${className}`} style={{ background: "rgba(216,218,179,0.10)" }} />;
}