import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

export const SIZE = {
  sq: "aspect-square", wide: "aspect-video", tall: "aspect-[9/16]", card: "aspect-[4/3]",
  strip: "aspect-[3/1]", mid: "aspect-[5/3]", port: "aspect-[3/4]", banner: "aspect-[2/1]",
};
export const photo = (seed, w = 600, h = 450) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export default function Widget({ index, title, to, seed, size = "card", tint, badge, children }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden rounded-[24px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 ${SIZE[size]} mb-4 break-inside-avoid`}>
      {seed && <Image src={photo(seed)} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute inset-0" style={{ background: tint || "linear-gradient(155deg, rgba(48,23,40,0.25) 0%, rgba(48,23,40,0.72) 55%, rgba(45,45,35,0.92) 100%)" }} />
      <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/5" />
      <div className="relative z-10 h-full flex flex-col p-4">
        <div className="flex items-start justify-between">
          <span className="text-storm/50 text-[10px] tabular-nums tracking-wider">{index}</span>
          {badge && <span className="text-[9px] px-2 py-0.5 rounded-full bg-urgent/20 text-urgent border border-urgent/40">{badge}</span>}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2">{children}</div>
        <p className="text-storm text-sm font-semibold leading-tight mt-2">{title}</p>
      </div>
    </Link>
  );
}

export function GlassStat({ children, className = "" }) {
  return <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-1.5 ${className}`}>{children}</div>;
}

export function MiniRing({ pct, size = 56, stroke = 5, color = "#94925d", track = "#ffffff18", label }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
      </svg>
      {label != null && <span className="absolute inset-0 flex items-center justify-center text-storm text-[11px] font-bold tabular-nums">{label}</span>}
    </div>
  );
}

export function MiniLive({ color = "#94925d", w = 90, h = 28, max = 10 }) {
  const [data, setData] = useState(() => Array.from({ length: 16 }, () => Math.random() * max * 0.6 + 1));
  useEffect(() => { const id = setInterval(() => setData(d => [...d.slice(1), Math.random() * max * 0.85 + 1]), 1500); return () => clearInterval(id); }, [max]);
  const step = w / 15;
  const pts = data.map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`).join(" ");
  return <svg width={w} height={h} className="overflow-visible"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx={w} cy={h - (data[15] / max) * h} r="3" fill={color}><animate attributeName="r" values="2;4;2" dur="1.2s" repeatCount="indefinite" /></circle></svg>;
}

export function MiniPulse({ color = "#d5e24a", bars = 14, h = 28 }) {
  return <div className="flex items-end gap-1" style={{ height: h }}>{Array.from({ length: bars }).map((_, i) => <motion.span key={i} className="flex-1 rounded-sm" style={{ background: color, transformOrigin: "bottom" }} animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 0.8 + (i % 4) * 0.15, repeat: Infinity, delay: i * 0.05 }} />)}</div>;
}

export function MiniBars({ data, color = "#94925d", h = 28 }) {
  const m = Math.max(...data);
  return <div className="flex items-end gap-1" style={{ height: h }}>{data.map((v, i) => <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${(v / m) * 100}%`, background: color, opacity: 0.45 + (v / m) * 0.55 }} />)}</div>;
}

export function Num({ v, suffix = "", className = "" }) {
  return <span className={`text-storm font-bold tabular-nums ${className}`}>{v}<span className="text-storm/60 text-xs">{suffix}</span></span>;
}