import React from "react";
import { motion } from "framer-motion";
import { AnimatedRing, BarGrow } from "@/components/modules/viz";
import { MiniRing } from "@/components/widgets/Widget";
import { VBar } from "@/components/widgets/LifeCard";
import { GalleryItem, Section } from "./Gallery";

const SAND = "#94925d", URG = "#d5e24a", OLIVE = "#d8dab3", PLUM = "#301728", SKY = "#B1BEC6";

function GradientRing({ pct = 72, size = 120, stroke = 12 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="gring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={URG} />
          <stop offset="100%" stopColor={SAND} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ffffff15" strokeWidth={stroke} />
      <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#gring)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (pct / 100) * c }} transition={{ duration: 1.1, ease: "easeOut" }} />
      <text x="50%" y="52%" textAnchor="middle" className="fill-storm" style={{ fontSize: 22, fontWeight: 700 }} transform="rotate(90 50 50)">{pct}%</text>
    </svg>
  );
}

function ConicGauge({ pct = 64 }) {
  return (
    <div className="relative w-28 h-28 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${URG} ${pct * 3.6}deg, #ffffff12 0deg)` }}>
      <div className="absolute inset-[14px] rounded-full bg-plum flex flex-col items-center justify-center">
        <span className="text-storm text-2xl font-bold tabular-nums">{pct}</span>
        <span className="text-storm/45 text-[8px] tracking-widest uppercase">cap</span>
      </div>
    </div>
  );
}

function HalfGauge({ value = 72 }) {
  const angle = -90 + (value / 100) * 180;
  return (
    <svg viewBox="-60 -60 120 70" className="w-full max-w-[160px]">
      <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke="#ffffff15" strokeWidth="10" strokeLinecap="round" />
      <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke={SAND} strokeWidth="10" strokeLinecap="round" strokeDasharray="157" strokeDashoffset={157 - (value / 100) * 157} />
      <line x1="0" y1="0" x2={Math.cos((angle * Math.PI) / 180) * 42} y2={Math.sin((angle * Math.PI) / 180) * 42} stroke={URG} strokeWidth="3" strokeLinecap="round" />
      <circle r="5" fill={URG} />
      <text x="0" y="-18" textAnchor="middle" className="fill-storm" style={{ fontSize: 16, fontWeight: 700 }}>{value}</text>
    </svg>
  );
}

function ActivityRings() {
  const rings = [{ pct: 78, c: URG, s: 12 }, { pct: 54, c: SAND, s: 12 }, { pct: 90, c: OLIVE, s: 12 }];
  const size = 120;
  return (
    <svg width={size} height={size} className="-rotate-90">
      {rings.map((r, i) => {
        const radius = (size - r.s) / 2 - i * 16, c = 2 * Math.PI * radius;
        return (
          <circle key={i} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ffffff12" strokeWidth={r.s} />
        );
      })}
      {rings.map((r, i) => {
        const radius = (size - r.s) / 2 - i * 16, c = 2 * Math.PI * radius;
        return (
          <motion.circle key={`f${i}`} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={r.c} strokeWidth={r.s} strokeLinecap="round"
            strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (r.pct / 100) * c }} transition={{ duration: 1, delay: i * 0.15 }} />
        );
      })}
    </svg>
  );
}

function Donut({ segments }) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  const R = 45, C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 -rotate-90">
      {segments.map((s, i) => {
        const len = (s.v / total) * C;
        const el = <circle key={i} cx="60" cy="60" r={R} fill="none" stroke={s.c} strokeWidth="16" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} />;
        acc += len;
        return el;
      })}
      <circle cx="60" cy="60" r="28" fill={PLUM} />
    </svg>
  );
}

function SegmentedProgress({ pct = 64, segs = 12 }) {
  const lit = Math.round((pct / 100) * segs);
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: segs }).map((_, i) => (
        <div key={i} className="flex-1 h-7 rounded-sm" style={{ background: i < lit ? URG : "#ffffff12" }} />
      ))}
    </div>
  );
}

function Stepper({ steps = 5, active = 3 }) {
  return (
    <div className="flex items-center gap-1.5 w-full">
      {Array.from({ length: steps }).map((_, i) => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${i < active ? "bg-sand text-storm" : "bg-white/5 text-storm/40"}`}>{i + 1}</div>
          {i < steps - 1 && <div className="h-px flex-1" style={{ background: i < active ? SAND : "#ffffff15" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Rings() {
  return (
    <Section id="rings" index="02" title="Ringen, Gauges & Progress" desc="Radiale meters, donuts, naaldgauges, activiteitsringen en lineaire voortgangsbalken.">
      <GalleryItem n={13} title="AnimatedRing" desc="Geanimeerde SVG-ring met label."><AnimatedRing pct={68} size={120} color={SAND} label="68" sub="CAP" /></GalleryItem>
      <GalleryItem n={14} title="MiniRing" desc="Compacte voortgangsring."><div className="flex gap-3"><MiniRing pct={72} label="72" /><MiniRing pct={40} color={URG} label="40" /></div></GalleryItem>
      <GalleryItem n={15} title="Gradient Ring" desc="Ring met kleurverloop."><GradientRing pct={82} /></GalleryItem>
      <GalleryItem n={16} title="Conic Gauge" desc="Conic-gradient meter."><ConicGauge pct={64} /></GalleryItem>
      <GalleryItem n={17} title="Half Gauge" desc="Halve cirkel met naald."><HalfGauge value={72} /></GalleryItem>
      <GalleryItem n={18} title="Activity Rings" desc="Drie concentrische ringen."><ActivityRings /></GalleryItem>
      <GalleryItem n={19} title="Donut" desc="Gesegmenteerde donut."><Donut segments={[{ v: 40, c: URG }, { v: 30, c: SAND }, { v: 20, c: SKY }, { v: 10, c: OLIVE }]} /></GalleryItem>
      <GalleryItem n={20} title="Segmented Progress" desc="Discrete segmentbalk."><SegmentedProgress pct={66} /></GalleryItem>
      <GalleryItem n={21} title="BarGrow" desc="Geanimeerde horizontale balk."><div className="w-full space-y-2"><BarGrow value={72} color={SAND} /><BarGrow value={40} color={URG} delay={0.2} /></div></GalleryItem>
      <GalleryItem n={22} title="VBar Set" desc="Verticale staafjes."><div className="flex items-end gap-3 h-20"><VBar v={0.6} /><VBar v={1} color={URG} /><VBar v={0.4} /><VBar v={0.8} color={OLIVE} /></div></GalleryItem>
      <GalleryItem n={23} title="Linear Progress" desc="Label-balk met value."><div className="w-full space-y-2">{[["Energie", 72, URG], ["Focus", 48, SAND]].map(([l, v, c]) => (<div key={l}><div className="flex justify-between text-[10px] text-storm/60 mb-1"><span>{l}</span><span className="tabular-nums">{v}</span></div><div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${v}%`, background: c }} /></div></div>))}</div></GalleryItem>
      <GalleryItem n={24} title="Stepper" desc="Genummerde stappenreeks."><Stepper steps={5} active={3} /></GalleryItem>
    </Section>
  );
}