import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564", PLUM = "#301728";
export const pad = (n) => String(n).padStart(2, "0");

export function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

const SEGS = [[1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 1, 1, 0, 1], [1, 1, 1, 1, 0, 0, 1], [0, 1, 1, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1]];
const SP = [[8, 4, 34, 6], [40, 8, 6, 30], [40, 46, 6, 30], [8, 78, 34, 6], [4, 46, 6, 30], [4, 8, 6, 30], [8, 40, 34, 6]];
function SegDigit({ v, x = 0 }) {
  const on = SEGS[v];
  return <g transform={`translate(${x} 0)`}>{SP.map((p, i) => <rect key={i} x={p[0]} y={p[1]} width={p[2]} height={p[3]} rx="2" fill={on[i] ? URG : "#ffffff0a"} style={{ filter: on[i] ? "drop-shadow(0 0 4px #d5e24a)" : "none" }} />)}</g>;
}

export function OrbitRings({ d, h, m, s, maxD }) {
  const units = [{ v: d, max: maxD, c: URG, r: 46 }, { v: h, max: 24, c: SAND, r: 34 }, { v: m, max: 60, c: OLIVE, r: 22 }, { v: s, max: 60, c: SKY, r: 10 }];
  return (
    <svg viewBox="-55 -55 110 110" className="w-40 h-40">
      {units.map((u, i) => { const c = 2 * Math.PI * u.r; const rem = 1 - u.v / u.max; return (
        <g key={i}>
          <circle r={u.r} fill="none" stroke="#ffffff10" strokeWidth="3" />
          <g transform="rotate(-90)"><circle r={u.r} fill="none" stroke={u.c} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${rem * c} ${c}`} /></g>
          <motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}><circle cx={u.r} cy="0" r="2.5" fill={u.c} /></motion.g>
        </g>
      ); })}
      <text x="0" y="2" textAnchor="middle" className="fill-storm" style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1 }}>{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</text>
    </svg>
  );
}

export function LiquidDigits({ d, h, m, maxD }) {
  const units = [[d, maxD, "D"], [h, 24, "H"], [m, 60, "M"]];
  return (
    <div className="flex items-end gap-3">
      {units.map(([v, mx, l], i) => {
        const lvl = v / mx;
        return (
          <div key={i} className="relative w-16 h-24 rounded-lg border border-marble/30 overflow-hidden bg-plum/40">
            <div className="absolute bottom-0 left-0 w-full" style={{ height: `${lvl * 100}%` }}>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full" style={{ height: 12, position: "absolute", top: -8 }}><motion.path d="M0 10 Q 25 0 50 10 T 100 10 V 20 H 0 Z" fill={i === 0 ? URG : i === 1 ? SAND : OLIVE} fillOpacity="0.6" animate={{ x: [0, -50, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} /></svg>
              <div className="w-full h-full" style={{ background: i === 0 ? URG : i === 1 ? SAND : OLIVE, opacity: 0.35 }} />
            </div>
            <span className="relative z-10 flex items-center justify-center h-full text-storm text-3xl font-black tabular-nums">{pad(v)}</span>
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-storm/40 text-[9px] tracking-widest">{l}</span>
          </div>
        );
      })}
    </div>
  );
}

export function FlipClock({ d, h, m, s }) {
  const units = [pad(d), pad(h), pad(m), pad(s)];
  const labels = ["DAG", "UUR", "MIN", "SEC"];
  return (
    <div className="flex items-center gap-2">
      {units.map((str, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {[...str].map((ch, j) => (
                <div key={j} className="w-8 h-12 rounded-md bg-metal border border-marble/30 overflow-hidden">
                  <motion.span key={ch} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.35 }} style={{ transformOrigin: "center" }} className="flex items-center justify-center w-full h-full text-storm text-2xl font-bold tabular-nums">{ch}</motion.span>
                </div>
              ))}
            </div>
            <span className="text-storm/40 text-[8px] tracking-widest">{labels[i]}</span>
          </div>
          {i < 3 && <span className="text-storm/30 text-xl pb-4">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export function NeonSeven({ d, h, m }) {
  const digits = [[...pad(d)], [...pad(h)], [...pad(m)]];
  return (
    <svg viewBox="0 0 170 88" className="w-full" style={{ height: 96, maxWidth: 260 }}>
      {digits.map((dd, gi) => dd.map((ch, i) => <SegDigit key={`${gi}-${i}`} v={+ch} x={gi * 58 + i * 50} />))}
      <text x="114" y="52" className="fill-urgent" style={{ fontSize: 24, fontWeight: 800 }}>:</text>
    </svg>
  );
}

export function PolarArc({ d, h, m, s, maxD }) {
  const units = [{ v: d, max: maxD, c: URG, r: 48, l: "D" }, { v: h, max: 24, c: SAND, r: 37, l: "H" }, { v: m, max: 60, c: OLIVE, r: 26, l: "M" }, { v: s, max: 60, c: SKY, r: 15, l: "S" }];
  return (
    <svg viewBox="-60 -60 120 120" className="w-40 h-40">
      {units.map((u, i) => { const c = 2 * Math.PI * u.r; const rem = u.v / u.max; return (
        <g key={i}>
          <circle r={u.r} fill="none" stroke="#ffffff10" strokeWidth="5" />
          <g transform="rotate(-90)"><circle r={u.r} fill="none" stroke={u.c} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${rem * c} ${c}`} /></g>
          <text x="0" y={u.r - 5} textAnchor="middle" className="fill-storm/40" style={{ fontSize: 6, letterSpacing: 1 }}>{u.l} {pad(u.v)}</text>
        </g>
      ); })}
      <text x="0" y="3" textAnchor="middle" className="fill-storm" style={{ fontSize: 7, fontWeight: 700 }}>{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</text>
    </svg>
  );
}

export function ParticleDigits({ d, h, m }) {
  const txt = `${pad(d)}:${pad(h)}:${pad(m)}`;
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 90 }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const ang = (i / 18) * 2 * Math.PI;
        return <motion.span key={i} className="absolute rounded-full" style={{ width: 4, height: 4, background: i % 2 ? URG : SAND, left: "50%", top: "50%" }} animate={{ x: [0, Math.cos(ang) * 90, 0], y: [0, Math.sin(ang) * 40, 0], opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }} />;
      })}
      <span className="relative z-10 text-storm text-4xl font-black tracking-tight tabular-nums">{txt}</span>
    </div>
  );
}

export function BarStack({ d, h, m, s, maxD }) {
  const units = [{ v: d, max: maxD, c: URG, l: "D" }, { v: h, max: 24, c: SAND, l: "H" }, { v: m, max: 60, c: OLIVE, l: "M" }, { v: s, max: 60, c: SKY, l: "S" }];
  return (
    <div className="flex items-end gap-3 h-36">
      {units.map((u, i) => { const rem = u.v / u.max; return (
        <div key={i} className="flex flex-col items-center gap-1">
          <span className="text-storm text-xl font-bold tabular-nums">{pad(u.v)}</span>
          <div className="relative w-8 h-24 rounded-md bg-marble/10 overflow-hidden">
            <motion.div className="absolute bottom-0 w-full rounded-md" style={{ background: u.c, opacity: 0.7 }} initial={{ height: 0 }} animate={{ height: `${rem * 100}%` }} transition={{ type: "spring", stiffness: 80, damping: 18 }} />
          </div>
          <span className="text-storm/40 text-[9px] tracking-widest">{u.l}</span>
        </div>
      ); })}
    </div>
  );
}

export function SpiralClock({ d, h, m, maxD }) {
  const pts = []; for (let i = 0; i <= 240; i++) { const t = (i / 240) * 8 * Math.PI; const r = (i / 240) * 48; pts.push(`${Math.cos(t) * r},${Math.sin(t) * r}`); }
  const rem = (d * 3600 + h * 60 + m) / (maxD * 24 * 60);
  return (
    <svg viewBox="-55 -55 110 110" className="w-40 h-40">
      <polyline points={pts.join(" ")} fill="none" stroke="#ffffff10" strokeWidth="2" />
      <polyline points={pts.join(" ")} fill="none" stroke={URG} strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - rem} />
      <circle r="5" fill={URG} />
      <text x="0" y="-30" textAnchor="middle" className="fill-storm" style={{ fontSize: 7, fontWeight: 700 }}>{pad(d)}:{pad(h)}:{pad(m)}</text>
    </svg>
  );
}

export function RingPulse({ d, h, m, s, maxD }) {
  const units = [{ v: d, c: URG }, { v: h, c: SAND }, { v: m, c: OLIVE }, { v: s, c: SKY }];
  const vals = [d, h, m, s];
  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      {[0, 1, 2, 3].map((i) => <motion.div key={i} className="absolute rounded-full border" style={{ borderColor: units[i].c, width: 150, height: 150 }} animate={{ scale: [1, 1.4], opacity: [0.5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.75, ease: "easeOut" }} />)}
      <div className="relative z-10 text-center">
        <span className="text-storm text-2xl font-black tabular-nums block">{pad(d)}:{pad(h)}</span>
        <span className="text-storm text-2xl font-black tabular-nums block">{pad(m)}:{pad(s)}</span>
      </div>
    </div>
  );
}

function Roll({ v }) {
  return (
    <div className="w-9 h-16 overflow-hidden rounded-md bg-plum border border-marble/30">
      <motion.div className="flex flex-col" animate={{ y: -v * 16 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} style={{ y: 0 }}>
        {Array.from({ length: 10 }).map((_, i) => <span key={i} className="h-16 flex items-center justify-center text-storm text-2xl font-bold tabular-nums">{i}</span>)}
      </motion.div>
    </div>
  );
}
export function Odometer({ d, h, m }) {
  const units = [[...pad(d), "DAG"], [...pad(h), "UUR"], [...pad(m), "MIN"]];
  return (
    <div className="flex items-end gap-3">
      {units.map(([a, b, l], i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="flex gap-1"><Roll v={+a} /><Roll v={+b} /></div>
          <span className="text-storm/40 text-[8px] tracking-widest">{l}</span>
        </div>
      ))}
    </div>
  );
}