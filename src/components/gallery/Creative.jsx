import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564";

function OrbitingText() {
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <defs><path id="circPath" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" /></defs>
      <motion.g style={{ transformOrigin: "60px 60px" }} animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>
        <text className="fill-storm/70" style={{ fontSize: 9, letterSpacing: 3 }}><textPath xlinkHref="#circPath">GIULIA OS · LIVE · CREATE · DESIGN · </textPath></text>
      </motion.g>
      <circle cx="60" cy="60" r="6" fill={URG} />
    </svg>
  );
}

function DNAHelix() {
  const [p, setP] = useState(0);
  useEffect(() => { let r; const f = () => { setP((x) => x + 0.08); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  return (
    <svg viewBox="0 0 120 160" className="w-24 h-32">
      {Array.from({ length: 24 }).map((_, i) => {
        const y = i * 6.5; const x = 60 + Math.sin(i / 2 + p) * 28; const x2 = 60 - Math.sin(i / 2 + p) * 28;
        const front = Math.cos(i / 2 + p) > 0;
        return <g key={i}><line x1={x} y1={y} x2={x2} y2={y} stroke="#ffffff12" /><circle cx={x} cy={y} r="3" fill={URG} opacity={front ? 1 : 0.45} /><circle cx={x2} cy={y} r="3" fill={SAND} opacity={front ? 0.45 : 1} /></g>;
      })}
    </svg>
  );
}

function Spirograph() {
  const pts = []; const R = 50, r = 15, d = 20;
  for (let i = 0; i < 400; i++) { const t = (i / 400) * 2 * Math.PI * 8; const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t); const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t); pts.push(`${x},${y}`); }
  return <svg viewBox="-70 -70 140 140" className="w-32 h-32"><motion.polyline points={pts.join(" ")} fill="none" stroke={URG} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "linear" }} /></svg>;
}

const SEGS = [[1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 1, 1, 0, 1], [1, 1, 1, 1, 0, 0, 1], [0, 1, 1, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1]];
const SEG_POS = [[8, 4, 34, 6], [40, 8, 6, 30], [40, 46, 6, 30], [8, 78, 34, 6], [4, 46, 6, 30], [4, 8, 6, 30], [8, 40, 34, 6]];
function SevenSeg() {
  const [v, setV] = useState(0);
  useEffect(() => { const id = setInterval(() => setV((x) => (x + 1) % 10), 700); return () => clearInterval(id); }, []);
  const on = SEGS[v];
  return (
    <svg viewBox="0 0 50 88" className="h-28">
      {SEG_POS.map((p, i) => <rect key={i} x={p[0]} y={p[1]} width={p[2]} height={p[3]} rx="2" fill={on[i] ? URG : "#ffffff0d"} />)}
    </svg>
  );
}

function FlipCounter() {
  const [v, setV] = useState(3);
  useEffect(() => { const id = setInterval(() => setV((x) => (x + 1) % 10), 900); return () => clearInterval(id); }, []);
  return (
    <div className="flex items-center gap-1.5">
      {[5, v].map((d, i) => (
        <div key={i} className="w-10 h-14 rounded-md bg-plum border border-marble/30 overflow-hidden flex items-center justify-center">
          <motion.span key={d} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ transformOrigin: "center" }} className="text-storm text-3xl font-bold tabular-nums">{d}</motion.span>
        </div>
      ))}
    </div>
  );
}

function IsoCubes() {
  const C = (cx, cy, s, top, left, right) => (
    <g>
      <path d={`M${cx} ${cy - s} L${cx + s * 1.3} ${cy} L${cx} ${cy + s} L${cx - s * 1.3} ${cy} Z`} fill={top} />
      <path d={`M${cx - s * 1.3} ${cy} L${cx} ${cy + s} L${cx} ${cy + s * 2} L${cx - s * 1.3} ${cy + s} Z`} fill={left} />
      <path d={`M${cx + s * 1.3} ${cy} L${cx} ${cy + s} L${cx} ${cy + s * 2} L${cx + s * 1.3} ${cy + s} Z`} fill={right} />
    </g>
  );
  return <svg viewBox="0 0 120 120" className="w-32 h-32">{C(60, 35, 16, URG, SAND, "#6b4d5d")}{C(38, 68, 16, SAND, OLIVE, "#94925d")}{C(82, 68, 16, SKY, CLAY, "#868564")}</svg>;
}

function Honeycomb() {
  const hex = (cx, cy, r) => `${cx + r},${cy} ${cx + r / 2},${cy + r * 0.866} ${cx - r / 2},${cy + r * 0.866} ${cx - r},${cy} ${cx - r / 2},${cy - r * 0.866} ${cx + r / 2},${cy - r * 0.866}`;
  const cells = [{ cx: 40, cy: 35 }, { cx: 75, cy: 35 }, { cx: 22, cy: 66 }, { cx: 58, cy: 66 }, { cx: 93, cy: 66 }, { cx: 40, cy: 97 }, { cx: 75, cy: 97 }];
  return (
    <svg viewBox="0 0 115 120" className="w-32 h-32">
      {cells.map((c, i) => <motion.polygon key={i} points={hex(c.cx, c.cy, 16)} fill={i % 3 === 0 ? URG : SAND} animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />)}
    </svg>
  );
}

function FlowField() {
  const [dots, setDots] = useState(() => Array.from({ length: 44 }, () => ({ x: Math.random() * 120, y: Math.random() * 120 })));
  useEffect(() => { let r; const f = () => { setDots((ds) => ds.map((d) => { const ang = Math.sin(d.x * 0.05) + Math.cos(d.y * 0.05); const nx = d.x + Math.cos(ang) * 1.3; const ny = d.y + Math.sin(ang) * 1.3; return { x: nx > 120 ? 0 : nx, y: ny > 120 ? 0 : ny }; })); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  return <svg viewBox="0 0 120 120" className="w-32 h-32">{dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="1.5" fill={i % 2 ? URG : SAND} />)}</svg>;
}

function FractalTree({ x, y, angle, len, depth }) {
  if (depth === 0 || len < 1.5) return null;
  const x2 = x + Math.cos(angle) * len, y2 = y + Math.sin(angle) * len;
  return <g><line x1={x} y1={y} x2={x2} y2={y2} stroke={depth > 3 ? SAND : URG} strokeWidth={depth / 2} /><FractalTree x={x2} y={y2} angle={angle - 0.4} len={len * 0.75} depth={depth - 1} /><FractalTree x={x2} y={y2} angle={angle + 0.4} len={len * 0.75} depth={depth - 1} /></g>;
}
function Tree() { return <svg viewBox="0 0 120 120" className="w-32 h-32"><FractalTree x={60} y={115} angle={-Math.PI / 2} len={30} depth={7} /></svg>; }

function Kaleidoscope() {
  return (
    <svg viewBox="-60 -60 120 120" className="w-32 h-32">
      <motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <g key={a} transform={`rotate(${a})`}><path d="M0 0 L 42 -10 L 52 0 Z" fill={URG} opacity="0.5" /><circle cx="32" cy="0" r="4" fill={SAND} /><circle cx="48" cy="-4" r="2.5" fill={OLIVE} /></g>
        ))}
      </motion.g>
    </svg>
  );
}

function PendulumWave() {
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 0.03); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  return (
    <svg viewBox="0 0 150 110" className="w-full">
      {Array.from({ length: 10 }).map((_, i) => { const px = 12 + i * 14, py = 10; const len = 26 + i * 5; const ang = Math.sin(t * (2 + i * 0.18)) * 0.5; const ex = px + Math.sin(ang) * len, ey = py + Math.cos(ang) * len; return <g key={i}><line x1={px} y1={py} x2={ex} y2={ey} stroke="#ffffff20" /><circle cx={ex} cy={ey} r="3.5" fill={i % 2 ? URG : SAND} /></g>; })}
    </svg>
  );
}

function SolarSystem() {
  const planets = [{ r: 16, p: 3, c: SAND, s: 2 }, { r: 26, p: 4.5, c: OLIVE, s: 3 }, { r: 38, p: 6, c: SKY, s: 2.5 }, { r: 52, p: 8, c: CLAY, s: 2 }];
  return (
    <svg viewBox="-65 -65 130 130" className="w-32 h-32">
      <circle r="6" fill={URG} />
      {planets.map((p, i) => (
        <g key={i}><circle r={p.r} fill="none" stroke="#ffffff10" /><motion.g style={{ transformOrigin: "0 0" }} animate={{ rotate: 360 }} transition={{ duration: p.p, repeat: Infinity, ease: "linear" }}><circle cx={p.r} cy="0" r={p.s} fill={p.c} /></motion.g></g>
      ))}
    </svg>
  );
}

function NewtonCradle() {
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 0.03); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  const swing = Math.max(0, Math.sin(t * 2)) * 0.7;
  const ang = -swing;
  const px = 60 + Math.sin(ang) * 50, py = 12 + Math.cos(ang) * 50;
  return (
    <svg viewBox="0 0 150 80" className="w-full">
      <line x1="10" y1="12" x2="140" y2="12" stroke="#ffffff20" />
      <line x1="60" y1="12" x2={px} y2={py} stroke="#ffffff20" /><circle cx={px} cy={py} r="6" fill={URG} />
      {[1, 2, 3, 4].map((i) => { const x = 60 + i * 12; return <g key={i}><line x1={x} y1={12} x2={x} y2={62} stroke="#ffffff20" /><circle cx={x} cy={66} r="6" fill={i % 2 ? SAND : OLIVE} /></g>; })}
    </svg>
  );
}

function LiquidBlob() {
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 0.04); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="6" /><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" /></filter></defs>
      <g filter="url(#goo)">
        <circle cx="60" cy="60" r="18" fill={URG} />
        <circle cx={60 + Math.sin(t) * 30} cy={60 + Math.cos(t) * 30} r="14" fill={URG} />
        <circle cx={60 + Math.sin(t + 2) * 30} cy={60 + Math.cos(t + 2) * 30} r="12" fill={URG} />
      </g>
    </svg>
  );
}

function ConicDisc() { return <motion.div className="w-24 h-24 rounded-full" style={{ background: `conic-gradient(${URG}, ${SAND}, ${OLIVE}, ${SKY}, ${URG})` }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />; }

function PolarClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const rings = [{ pct: (now.getHours() % 12) / 12, r: 44, c: URG }, { pct: now.getMinutes() / 60, r: 34, c: SAND }, { pct: now.getSeconds() / 60, r: 24, c: OLIVE }];
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32 -rotate-90">
      {rings.map((a, i) => <g key={i}><circle r={a.r} fill="none" stroke="#ffffff10" strokeWidth="6" /><circle r={a.r} fill="none" stroke={a.c} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${a.pct * 2 * Math.PI * a.r} ${2 * Math.PI * a.r}`} /></g>)}
    </svg>
  );
}

function GlitchText() {
  return (
    <div className="relative">
      <span className="text-storm text-2xl font-black tracking-tight">GLITCH</span>
      <motion.span className="absolute inset-0 text-urgent" animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.8, 0, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>GLITCH</motion.span>
      <motion.span className="absolute inset-0 text-sky" animate={{ x: [2, -2, 1, 0], opacity: [0, 0.8, 0, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.1 }}>GLITCH</motion.span>
    </div>
  );
}

function NeonCard() {
  return (
    <motion.div className="rounded-xl border-2 border-urgent bg-plum/40 px-5 py-4 text-center" animate={{ boxShadow: ["0 0 8px #d5e24a, inset 0 0 8px #d5e24a44", "0 0 22px #d5e24a, inset 0 0 16px #d5e24a66", "0 0 8px #d5e24a, inset 0 0 8px #d5e24a44"] }} transition={{ duration: 1.6, repeat: Infinity }}>
      <span className="text-urgent text-sm font-bold tracking-[0.3em]">NEON</span>
    </motion.div>
  );
}

function BlobCard() {
  return <div className="w-40 h-28 p-4 flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${URG}, ${SAND})`, clipPath: "polygon(15% 0,100% 0,100% 70%,85% 100%,0 100%,0 25%)" }}><span className="text-plum text-[9px] tracking-[0.2em] uppercase font-semibold">Bento blob</span><span className="text-plum text-xl font-black">Organic</span></div>;
}

function Ripple() {
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      {[0, 1, 2, 3].map((i) => <motion.div key={i} className="absolute rounded-full border border-urgent" animate={{ scale: [0.2, 1.4], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }} style={{ width: 90, height: 90 }} />)}
      <div className="w-6 h-6 rounded-full bg-urgent" />
    </div>
  );
}

export default function Creative() {
  return (
    <Section id="creative" index="11" title="Crazy & Cool" desc="Onconventionele elementen met gekke vormen of coole functies: DNA-helix, spirograph, metaballen, fractal-boom, pendulum-golf, zonnestelsel, neon en glitch." cols="lg:grid-cols-3">
      <GalleryItem n={133} title="Orbiting Text" desc="Tekst op cirkelpad."><OrbitingText /></GalleryItem>
      <GalleryItem n={134} title="DNA Helix" desc="Draaiende dubbele helix."><DNAHelix /></GalleryItem>
      <GalleryItem n={135} title="Spirograph" desc="Getekende hypo-cycloïde."><Spirograph /></GalleryItem>
      <GalleryItem n={136} title="7-Segment Display" desc="Live digitale teller."><SevenSeg /></GalleryItem>
      <GalleryItem n={137} title="Flip Counter" desc="Klap-teller."><FlipCounter /></GalleryItem>
      <GalleryItem n={138} title="Isometric Cubes" desc="Iso-stapel kubussen."><IsoCubes /></GalleryItem>
      <GalleryItem n={139} title="Honeycomb" desc="Pulsend hex-raster."><Honeycomb /></GalleryItem>
      <GalleryItem n={140} title="Flow Field" desc="Generatief deeltjesveld."><FlowField /></GalleryItem>
      <GalleryItem n={141} title="Fractal Tree" desc="Recursieve vertakking."><Tree /></GalleryItem>
      <GalleryItem n={142} title="Kaleidoscope" desc="Gespiegelde rotatie."><Kaleidoscope /></GalleryItem>
      <GalleryItem n={143} title="Pendulum Wave" desc="Fase-verschoven slingers."><PendulumWave /></GalleryItem>
      <GalleryItem n={144} title="Solar System" desc="Banende planeten."><SolarSystem /></GalleryItem>
      <GalleryItem n={145} title="Newton's Cradle" desc="Kogel-slingering."><NewtonCradle /></GalleryItem>
      <GalleryItem n={146} title="Liquid Metaball" desc="Goo-filter druppel."><LiquidBlob /></GalleryItem>
      <GalleryItem n={147} title="Conic Disc" desc="Draaiende kleurschijf."><ConicDisc /></GalleryItem>
      <GalleryItem n={148} title="Polar Clock" desc="Concentrische tijd-arcs."><PolarClock /></GalleryItem>
      <GalleryItem n={149} title="Glitch Text" desc="RGB-split glitch."><GlitchText /></GalleryItem>
      <GalleryItem n={150} title="Neon Card" desc="Pulsende neon-glow."><NeonCard /></GalleryItem>
      <GalleryItem n={151} title="Bento Blob Card" desc="Organische clip-vorm."><BlobCard /></GalleryItem>
      <GalleryItem n={152} title="Ripple Tank" desc="Uitwaaierende rimpels."><Ripple /></GalleryItem>
    </Section>
  );
}