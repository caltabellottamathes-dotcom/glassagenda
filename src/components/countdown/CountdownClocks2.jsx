import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pad } from "./CountdownClocks";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564";

const hex = (cx, cy, r) => `${cx + r},${cy} ${cx + r / 2},${cy + r * 0.866} ${cx - r / 2},${cy + r * 0.866} ${cx - r},${cy} ${cx - r / 2},${cy - r * 0.866} ${cx + r / 2},${cy - r * 0.866}`;

export function HexTiles({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG, l: "DAG" }, { v: h, max: 24, c: SAND, l: "UUR" }, { v: m, max: 60, c: OLIVE, l: "MIN" }, { v: s, max: 60, c: SKY, l: "SEC" }];
  return (
    <svg viewBox="0 0 200 76" className="w-full" style={{ height: 80 }}>
      {u.map((x, i) => { const cx = 26 + i * 49, cy = 38, rem = x.v / x.max; return (
        <g key={i}>
          <polygon points={hex(cx, cy, 28)} fill="none" stroke="#ffffff12" strokeWidth="2" />
          <polygon points={hex(cx, cy, 28 * rem)} fill={x.c} fillOpacity="0.55" />
          <text x={cx} y={36} textAnchor="middle" className="fill-storm" style={{ fontSize: 15, fontWeight: 800 }}>{pad(x.v)}</text>
          <text x={cx} y={48} textAnchor="middle" className="fill-storm/40" style={{ fontSize: 6, letterSpacing: 1 }}>{x.l}</text>
        </g>
      ); })}
    </svg>
  );
}

export function WaveBars({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG }, { v: h, max: 24, c: SAND }, { v: m, max: 60, c: OLIVE }, { v: s, max: 60, c: SKY }];
  return (
    <div className="flex items-end gap-3 h-32">
      {u.map((x, i) => { const base = (x.v / x.max) * 90; return (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="relative w-8 h-24 rounded-md bg-marble/10 overflow-hidden">
            {[0, 1, 2].map((k) => <motion.div key={k} className="absolute bottom-0 w-full rounded-md" style={{ background: x.c, opacity: 0.5 }} animate={{ height: [base * 0.5, base, base * 0.5] }} transition={{ duration: 1 + k * 0.4, repeat: Infinity, delay: i * 0.2 + k * 0.1, ease: "easeInOut" }} />)}
          </div>
          <span className="text-storm text-sm font-bold tabular-nums">{pad(x.v)}</span>
        </div>
      ); })}
    </div>
  );
}

export function RadarSweep({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG }, { v: h, max: 24, c: SAND }, { v: m, max: 60, c: OLIVE }, { v: s, max: 60, c: SKY }];
  return (
    <svg viewBox="-55 -55 110 110" className="w-40 h-40">
      <defs><linearGradient id="rad"><stop offset="0" stopColor={URG} stopOpacity="0.5" /><stop offset="1" stopColor={URG} stopOpacity="0" /></linearGradient></defs>
      {[18, 32, 48].map((r) => <circle key={r} r={r} fill="none" stroke="#ffffff10" />)}
      <line x1="-48" y1="0" x2="48" y2="0" stroke="#ffffff10" /><line x1="0" y1="-48" x2="0" y2="48" stroke="#ffffff10" />
      <motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
        <path d="M0 0 L 48 0 A 48 48 0 0 0 24 -41 Z" fill="url(#rad)" />
      </motion.g>
      {u.map((x, i) => { const ang = (x.v / x.max) * 2 * Math.PI - Math.PI / 2; return <circle key={i} cx={Math.cos(ang) * 40} cy={Math.sin(ang) * 40} r="3" fill={x.c} style={{ filter: `drop-shadow(0 0 4px ${x.c})` }} />; })}
      <text x="0" y="3" textAnchor="middle" className="fill-storm" style={{ fontSize: 7, fontWeight: 700 }}>{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</text>
    </svg>
  );
}

export function Metronome({ d, h, m, s, maxD }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 100" className="w-32">
        <polygon points="40,90 80,90 70,30 50,30" fill="#ffffff10" stroke="#ffffff20" />
        <motion.line x1="60" y1="85" x2="60" y2="20" stroke={URG} strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: "60px 85px" }} animate={{ rotate: [-28, 28, -28] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} />
        <circle cx="60" cy="20" r="4" fill={URG} />
      </svg>
      <span className="text-storm text-lg font-bold tabular-nums">{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</span>
    </div>
  );
}

export function DiscRotate({ d, h, m, maxD }) {
  const u = [{ v: d, max: maxD, c: URG, r: 46 }, { v: h, max: 24, c: SAND, r: 34 }, { v: m, max: 60, c: OLIVE, r: 22 }];
  return (
    <svg viewBox="-55 -55 110 110" className="w-40 h-40">
      {u.map((x, i) => { const rem = x.v / x.max; const c = 2 * Math.PI * x.r; return (
        <g key={i}>
          <circle r={x.r} fill="none" stroke="#ffffff10" strokeWidth="5" />
          <g transform="rotate(-90)"><circle r={x.r} fill="none" stroke={x.c} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${rem * c} ${c}`} /></g>
          <motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear" }}><circle cx={x.r} cy="0" r="3" fill={x.c} /></motion.g>
          <text x="0" y={x.r * 0.55} textAnchor="middle" className="fill-storm" style={{ fontSize: 8, fontWeight: 700 }}>{pad(x.v)}</text>
        </g>
      ); })}
    </svg>
  );
}

export function Isotype({ d, h, m, maxD }) {
  const u = [{ v: d, max: maxD, c: URG, l: "D" }, { v: h, max: 24, c: SAND, l: "U" }, { v: m, max: 60, c: OLIVE, l: "M" }];
  return (
    <div className="flex flex-col gap-2 w-full">
      {u.map((x, i) => { const filled = Math.round((x.v / x.max) * 10); return (
        <div key={i} className="flex items-center gap-2">
          <span className="text-storm/40 text-[9px] w-3">{x.l}</span>
          <div className="flex gap-0.5 flex-1">{Array.from({ length: 10 }).map((_, k) => <div key={k} className="flex-1 h-2.5 rounded-sm" style={{ background: k < filled ? x.c : "#ffffff12" }} />)}</div>
          <span className="text-storm text-xs font-bold tabular-nums w-6 text-right">{pad(x.v)}</span>
        </div>
      ); })}
    </div>
  );
}

export function Galaxy({ d, h, m, s, maxD }) {
  const arms = 2;
  return (
    <svg viewBox="-55 -55 110 110" className="w-40 h-40">
      <motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}>
        {Array.from({ length: arms }).map((_, a) => Array.from({ length: 14 }).map((_, i) => { const t = (i / 14) * 3 * Math.PI; const r = (i / 14) * 45; const ang = t + (a * Math.PI); return <circle key={`${a}-${i}`} cx={Math.cos(ang) * r} cy={Math.sin(ang) * r} r={i < 3 ? 2.5 : 1.5} fill={i % 2 ? URG : SAND} opacity={0.4 + (i / 14) * 0.6} />; }))}
      </motion.g>
      <circle r="5" fill={URG} style={{ filter: "drop-shadow(0 0 6px #d5e24a)" }} />
      <text x="0" y="3" textAnchor="middle" className="fill-storm" style={{ fontSize: 7, fontWeight: 700 }}>{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</text>
    </svg>
  );
}

export function VuMeter({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG }, { v: h, max: 24, c: SAND }, { v: m, max: 60, c: OLIVE }, { v: s, max: 60, c: SKY }];
  return (
    <div className="flex gap-2">
      {u.map((x, i) => { const rem = x.v / x.max; const ang = -90 + rem * 180; return (
        <div key={i} className="flex flex-col items-center gap-1">
          <svg viewBox="0 0 50 30" className="w-14">
            <path d="M5 28 A 20 20 0 0 1 45 28" fill="none" stroke="#ffffff12" strokeWidth="3" />
            <path d="M5 28 A 20 20 0 0 1 45 28" fill="none" stroke={x.c} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${rem * 62.8} 62.8`} />
            <line x1="25" y1="28" x2="33" y2="10" stroke={x.c} strokeWidth="1.5" transform={`rotate(${ang} 25 28)`} />
            <circle cx="25" cy="28" r="2" fill={x.c} />
          </svg>
          <span className="text-storm text-xs font-bold tabular-nums">{pad(x.v)}</span>
        </div>
      ); })}
    </div>
  );
}

export function Constellation({ d, h, m, maxD }) {
  const stars = [[-40, -20], [-15, -30], [10, -10], [30, -25], [-25, 15], [5, 20], [35, 10], [20, 30]];
  const links = [[0, 1], [1, 2], [2, 3], [1, 4], [2, 5], [3, 6], [4, 5], [5, 7]];
  return (
    <svg viewBox="-55 -45 110 90" className="w-full" style={{ height: 90 }}>
      {links.map(([a, b], i) => <motion.line key={i} x1={stars[a][0]} y1={stars[a][1]} x2={stars[b][0]} y2={stars[b][1]} stroke={URG} strokeWidth="0.6" animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }} />)}
      {stars.map((s, i) => <motion.circle key={i} cx={s[0]} cy={s[1]} r="1.8" fill={i % 2 ? URG : SAND} animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} style={{ transformOrigin: `${s[0]}px ${s[1]}px` }} />)}
      <text x="0" y="40" textAnchor="middle" className="fill-storm" style={{ fontSize: 9, fontWeight: 800 }}>{pad(d)}:{pad(h)}:{pad(m)}</text>
    </svg>
  );
}

export function GlitchCount({ d, h, m, s, maxD }) {
  const txt = `${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`;
  return (
    <div className="relative" style={{ width: 200, height: 60 }}>
      <motion.span className="absolute inset-0 flex items-center justify-center text-sky text-2xl font-black tabular-nums" animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.7, 0, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>{txt}</motion.span>
      <motion.span className="absolute inset-0 flex items-center justify-center text-urgent text-2xl font-black tabular-nums" animate={{ x: [2, -2, 1, 0], opacity: [0, 0.7, 0, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}>{txt}</motion.span>
      <span className="relative z-10 flex items-center justify-center h-full text-storm text-2xl font-black tabular-nums">{txt}</span>
      <motion.div className="absolute left-0 right-0 h-1 bg-urgent/40" animate={{ top: ["20%", "80%", "20%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

export function SolarArc({ d, h, m, maxD }) {
  const rem = (d * 3600 + h * 60 + m) / (maxD * 24 * 60);
  const x = rem * 160, y = 55 - Math.sin(rem * Math.PI) * 40;
  return (
    <svg viewBox="0 0 170 70" className="w-full" style={{ height: 80 }}>
      <path d="M5 55 A 80 80 0 0 1 165 55" fill="none" stroke="#ffffff15" strokeWidth="1.5" strokeDasharray="3 3" />
      <motion.circle r="7" fill={URG} style={{ filter: "drop-shadow(0 0 8px #d5e24a)" }} animate={{ cx: [5, x], cy: [55, y] }} transition={{ type: "spring", stiffness: 40, damping: 20 }} />
      <line x1="5" y1="55" x2="165" y2="55" stroke="#ffffff10" />
      <text x="85" y="68" textAnchor="middle" className="fill-storm" style={{ fontSize: 10, fontWeight: 800 }}>{pad(d)}:{pad(h)}:{pad(m)}</text>
    </svg>
  );
}

export function FlameRing({ d, h, m, s, maxD }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 150, height: 150 }}>
      {[0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * 2 * Math.PI; return <motion.div key={i} className="absolute rounded-full" style={{ width: 40, height: 40, background: i % 2 ? URG : SAND, left: "50%", top: "50%", marginLeft: Math.cos(a) * 55, marginTop: Math.sin(a) * 55, filter: "blur(8px)" }} animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />; })}
      <span className="relative z-10 text-storm text-xl font-black tabular-nums text-center">{pad(d)}:{pad(h)}<br />{pad(m)}:{pad(s)}</span>
    </div>
  );
}

export function DnaLadder({ d, h, m, s, maxD }) {
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 0.05); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  const u = [d / maxD, h / 24, m / 60, s / 60];
  return (
    <svg viewBox="0 0 140 120" className="w-32 h-32">
      {Array.from({ length: 22 }).map((_, i) => { const y = i * 5 + 4; const x1 = 70 + Math.sin(i / 2 + t) * 28; const x2 = 70 - Math.sin(i / 2 + t) * 28; const segIdx = Math.min(3, Math.floor(i / 5.5)); const rem = u[segIdx] ?? 0; const lit = (i % 5.5) / 5.5 < rem; const col = [URG, SAND, OLIVE, SKY][segIdx]; return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y} stroke={lit ? col : "#ffffff10"} strokeWidth="2" /><circle cx={x1} cy={y} r="2" fill={lit ? URG : "#ffffff20"} /><circle cx={x2} cy={y} r="2" fill={lit ? SAND : "#ffffff20"} /></g>; })}
    </svg>
  );
}

export function PixelRain({ d, h, m, s, maxD }) {
  const [drops] = useState(() => Array.from({ length: 16 }, () => ({ x: Math.random() * 150, y: Math.random() * 90, sp: 0.3 + Math.random() * 0.6 })));
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 1); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  return (
    <div className="relative w-40 h-24 overflow-hidden rounded-md bg-plum/40 border border-marble/20">
      {drops.map((d2, i) => <div key={i} className="absolute w-1 h-3 rounded-sm" style={{ left: d2.x, background: i % 2 ? URG : SAND, opacity: 0.7, top: (d2.y + t * d2.sp * 2) % 96 - 3 }} />)}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-storm text-sm font-bold tabular-nums bg-plum/60 px-1 rounded">{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</span>
    </div>
  );
}

export function CubeStack({ d, h, m, maxD }) {
  const u = [{ v: d, max: maxD, c: URG }, { v: h, max: 24, c: SAND }, { v: m, max: 60, c: OLIVE }];
  return (
    <div className="flex items-end gap-4 h-32">
      {u.map((x, i) => { const filled = Math.max(1, Math.round((x.v / x.max) * 6)); return (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="flex flex-col-reverse gap-0.5">
            {Array.from({ length: 6 }).map((_, k) => <div key={k} className="w-8 h-4 rounded-sm" style={{ background: k < filled ? x.c : "#ffffff12", transform: "skewY(-12deg)" }} />)}
          </div>
          <span className="text-storm text-sm font-bold tabular-nums">{pad(x.v)}</span>
        </div>
      ); })}
    </div>
  );
}

export function LiquidPipes({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG, l: "D" }, { v: h, max: 24, c: SAND, l: "H" }, { v: m, max: 60, c: OLIVE, l: "M" }, { v: s, max: 60, c: SKY, l: "S" }];
  return (
    <div className="flex flex-col gap-2 w-full">
      {u.map((x, i) => { const rem = x.v / x.max; return (
        <div key={i} className="flex items-center gap-2">
          <span className="text-storm/40 text-[9px] w-3">{x.l}</span>
          <div className="relative flex-1 h-5 rounded-full bg-marble/10 overflow-hidden">
            <motion.div className="absolute top-0 left-0 h-full rounded-full" style={{ background: x.c, opacity: 0.7 }} animate={{ width: ["0%", `${rem * 100}%`] }} transition={{ type: "spring", stiffness: 60, damping: 20 }} />
            <motion.div className="absolute top-0 h-full rounded-full" style={{ width: 16, background: x.c, filter: "blur(4px)", opacity: 0.9 }} animate={{ left: ["0%", `${rem * 100}%`] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <span className="text-storm text-xs font-bold tabular-nums w-6 text-right">{pad(x.v)}</span>
        </div>
      ); })}
    </div>
  );
}

export function ECG({ d, h, m, s, maxD }) {
  const pts = [0, 0, 0, 0, 5, -5, 18, -22, 8, 0, 0, 0, 0, 0, 0];
  const w = 160;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 160 50" className="w-full" style={{ height: 56 }}>
        <motion.g animate={{ x: [-w, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((rep) => <polyline key={rep} points={pts.map((y, i) => `${i * (w / pts.length) + rep * w},${25 - y}`).join(" ")} fill="none" stroke={URG} strokeWidth="2" style={{ filter: "drop-shadow(0 0 4px #d5e24a)" }} />)}
        </motion.g>
      </svg>
      <span className="text-storm text-lg font-bold tabular-nums">{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</span>
    </div>
  );
}

export function MazeFill({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG }, { v: h, max: 24, c: SAND }, { v: m, max: 60, c: OLIVE }, { v: s, max: 60, c: SKY }];
  return (
    <div className="flex gap-3">
      {u.map((x, i) => { const filled = Math.round((x.v / x.max) * 25); return (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="grid grid-cols-5 gap-0.5">
            {Array.from({ length: 25 }).map((_, k) => <div key={k} className="w-2 h-2 rounded-sm" style={{ background: k < filled ? x.c : "#ffffff12" }} />)}
          </div>
          <span className="text-storm text-xs font-bold tabular-nums">{pad(x.v)}</span>
        </div>
      ); })}
    </div>
  );
}

export function Aurora({ d, h, m, maxD }) {
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 0.03); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  const wave = (off, h) => `M0 ${50 - h} ${Array.from({ length: 16 }).map((_, i) => `L${(i / 15) * 160} ${50 - h + Math.sin(i * 0.5 + t * 0.8 + off) * 14}`).join(" ")} L160 90 L0 90 Z`;
  return (
    <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-plum/40">
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <path d={wave(0, 28)} fill={URG} fillOpacity="0.5" />
        <path d={wave(1.5, 18)} fill={SAND} fillOpacity="0.45" />
        <path d={wave(3, 10)} fill={OLIVE} fillOpacity="0.4" />
      </svg>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-storm text-lg font-black tabular-nums">{pad(d)}:{pad(h)}:{pad(m)}</span>
    </div>
  );
}

export function OrbitDots({ d, h, m, s, maxD }) {
  const u = [{ v: d, max: maxD, c: URG, r: 48 }, { v: h, max: 24, c: SAND, r: 36 }, { v: m, max: 60, c: OLIVE, r: 24 }, { v: s, max: 60, c: SKY, r: 12 }];
  return (
    <svg viewBox="-55 -55 110 110" className="w-40 h-40">
      {u.map((x, i) => { const ang = (x.v / x.max) * 2 * Math.PI - Math.PI / 2; return (
        <g key={i}>
          <circle r={x.r} fill="none" stroke="#ffffff10" strokeDasharray="2 3" />
          <motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: 20 + i * 6, repeat: Infinity, ease: "linear" }}>
            <circle cx={Math.cos(ang) * x.r} cy={Math.sin(ang) * x.r} r="3.5" fill={x.c} style={{ filter: `drop-shadow(0 0 4px ${x.c})` }} />
          </motion.g>
        </g>
      ); })}
      <text x="0" y="3" textAnchor="middle" className="fill-storm" style={{ fontSize: 7, fontWeight: 700 }}>{pad(d)}:{pad(h)}:{pad(m)}:{pad(s)}</text>
    </svg>
  );
}