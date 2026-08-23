import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Battery, Activity } from "lucide-react";
import { CountUp } from "@/components/modules/viz";
import { GalleryItem, Section } from "./Gallery";

const SAND = "#94925d", URG = "#d5e24a", OLIVE = "#d8dab3", SKY = "#B1BEC6", PLUM = "#301728", CLAY = "#868564";

function Thermometer({ value = 68 }) {
  const h = (value / 100) * 100;
  return (
    <div className="flex items-end gap-2">
      <div className="relative w-7 h-32 rounded-full bg-white/5 border border-marble/20 overflow-hidden flex flex-col-reverse">
        <motion.div className="w-full rounded-full" style={{ background: `linear-gradient(${URG}, ${SAND})` }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1 }} />
      </div>
      <span className="text-storm text-2xl font-bold tabular-nums">{value}°</span>
    </div>
  );
}

function LadderProgress({ steps = 6, active = 4 }) {
  return (
    <div className="flex flex-col-reverse gap-1 w-full">
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} className="h-4 rounded-sm flex items-center px-2" style={{ background: i < active ? URG : "#ffffff10", width: `${40 + i * 12}%` }}>
          <span className={`text-[9px] tabular-nums ${i < active ? "text-plum font-bold" : "text-storm/40"}`}>{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function DotMatrix({ value = 73, cols = 10 }) {
  const total = 40, lit = Math.round((value / 100) * total);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: total }).map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i < lit ? URG : "#ffffff12" }} />)}
      </div>
      <span className="text-storm text-lg font-bold tabular-nums">{value}%</span>
    </div>
  );
}

function MonthHeatmap() {
  return (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 35 }).map((_, i) => {
        const r = Math.random();
        return <div key={i} className="aspect-square rounded-sm" style={{ background: r > 0.8 ? URG : r > 0.55 ? SAND : r > 0.3 ? "#6b6a4a" : "#ffffff10" }} />;
      })}
    </div>
  );
}

function WaveFill({ pct = 64 }) {
  return (
    <div className="relative w-24 h-32 rounded-2xl border border-marble/30 bg-plum/40 overflow-hidden flex items-end">
      <div className="absolute inset-0 flex items-end" style={{ height: `${pct}%` }}>
        <motion.svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-[200%] h-6" style={{ background: URG }} animate={{ x: [0, -100] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
          <path d="M0 20 Q 25 0 50 20 T 100 20 T 150 20 T 200 20 V40 H0 Z" fill={URG} />
        </motion.svg>
      </div>
      <span className="absolute inset-0 flex items-center justify-center text-storm text-xl font-bold tabular-nums mix-blend-difference">{pct}%</span>
    </div>
  );
}

function KpiCard() {
  return (
    <div className="rounded-xl border border-marble/20 bg-marble/5 p-3 w-full">
      <div className="flex items-center justify-between"><span className="text-storm/50 text-[9px] tracking-wider uppercase">Omzet</span><span className="text-urgent text-[10px] font-bold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12%</span></div>
      <CountUp to={4820} duration={1.2} className="text-storm text-2xl font-bold tabular-nums" />
      <div className="flex gap-0.5 h-6 mt-1">{[3, 5, 4, 6, 5, 8, 7, 9].map((v, i) => <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${(v / 9) * 100}%`, background: i >= 5 ? URG : SAND }} />)}</div>
    </div>
  );
}

function Treemap() {
  const blocks = [{ v: 40, c: URG }, { v: 25, c: SAND }, { v: 18, c: OLIVE }, { v: 12, c: SKY }, { v: 5, c: CLAY }];
  return (
    <div className="flex w-full h-32 rounded-lg overflow-hidden">
      {blocks.map((b, i) => <div key={i} className="flex items-end p-1.5" style={{ width: `${b.v}%`, background: b.c, opacity: 0.85 }}><span className="text-plum text-[9px] font-bold tabular-nums">{b.v}%</span></div>)}
    </div>
  );
}

function RadialDial({ value = 76 }) {
  const r = 45, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 110 110" className="w-28 h-28 -rotate-90">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#ffffff12" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${c * 0.75} ${c}`} />
      <motion.circle cx="55" cy="55" r={r} fill="none" stroke={URG} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(value / 100) * c * 0.75} ${c}`} initial={{ strokeDashoffset: 0 }} />
    </svg>
  );
}

function SegmentedRing({ value = 60, segs = 24 }) {
  const lit = Math.round((value / 100) * segs);
  const r = 45, c = 2 * Math.PI * r, seg = c / segs;
  return (
    <svg viewBox="0 0 110 110" className="w-28 h-28 -rotate-90">
      {Array.from({ length: segs }).map((_, i) => (
        <circle key={i} cx="55" cy="55" r={r} fill="none" stroke={i < lit ? URG : "#ffffff12"} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${seg * 0.6} ${c}`} strokeDashoffset={-i * seg} />
      ))}
    </svg>
  );
}

function BatteryMeter({ value = 78 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-20 h-9 rounded-md border-2 border-storm/30 flex items-center p-0.5">
        <motion.div className="h-full rounded-sm" style={{ background: value > 25 ? SAND : URG }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1 }} />
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-storm/30 rounded-r" />
      </div>
      <Battery className="w-5 h-5 text-storm/60" />
      <span className="text-storm text-sm font-bold tabular-nums">{value}%</span>
    </div>
  );
}

function NeedleGauge180({ value = 64 }) {
  const angle = -90 + (value / 100) * 180;
  return (
    <svg viewBox="-60 -55 120 80" className="w-full max-w-[170px]">
      {[0, 25, 50, 75, 100].map((t) => { const a = -90 + (t / 100) * 180; const x1 = Math.cos((a * Math.PI) / 180) * 48, y1 = Math.sin((a * Math.PI) / 180) * 48; const x2 = Math.cos((a * Math.PI) / 180) * 54, y2 = Math.sin((a * Math.PI) / 180) * 54; return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff20" strokeWidth="2" />; })}
      <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke="#ffffff15" strokeWidth="8" strokeLinecap="round" />
      <motion.line x1="0" y1="0" x2={Math.cos((angle * Math.PI) / 180) * 44} y2={Math.sin((angle * Math.PI) / 180) * 44} stroke={URG} strokeWidth="3" strokeLinecap="round" initial={{ rotate: -90 }} animate={{ rotate: angle }} transition={{ duration: 1 }} style={{ transformOrigin: "0px 0px" }} />
      <circle r="5" fill={URG} />
      <text x="0" y="-22" textAnchor="middle" className="fill-storm" style={{ fontSize: 16, fontWeight: 700 }}>{value}</text>
    </svg>
  );
}

function PolarArea() {
  const seg = [{ v: 70, c: URG }, { v: 50, c: SAND }, { v: 85, c: OLIVE }, { v: 40, c: SKY }, { v: 60, c: CLAY }];
  return (
    <svg viewBox="-55 -55 110 110" className="w-28 h-28">
      {seg.map((s, i) => { const a0 = (i / seg.length) * 2 * Math.PI - Math.PI / 2; const a1 = ((i + 1) / seg.length) * 2 * Math.PI - Math.PI / 2; const r = (s.v / 100) * 48; const x0 = Math.cos(a0) * r, y0 = Math.sin(a0) * r; const x1 = Math.cos(a1) * r, y1 = Math.sin(a1) * r; return <path key={i} d={`M0 0 L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`} fill={s.c} fillOpacity="0.55" stroke="#301728" strokeWidth="1" />; })}
      <circle r="4" fill={PLUM} />
    </svg>
  );
}

function ComparisonBars() {
  return (
    <div className="w-full space-y-2">
      {[["Doel", 80, SAND], ["Actueel", 64, URG]].map(([l, v, c]) => (
        <div key={l} className="flex items-center gap-2">
          <span className="text-storm/60 text-[10px] w-10">{l}</span>
          <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden"><motion.div className="h-full rounded-full" style={{ background: c }} initial={{ width: 0 }} animate={{ width: `${v}%` }} /></div>
          <span className="text-storm text-[10px] tabular-nums w-7">{v}</span>
        </div>
      ))}
    </div>
  );
}

export default function NewElements() {
  return (
    <Section id="new" index="06" title="Nieuwe Sterkere Elementen" desc="Aanvullende, krachtigere visualisaties: thermometers, treemaps, vloeistofvulling, naaldmeters, polar area, batterij-indicators en meer." cols="lg:grid-cols-4">
      <GalleryItem n={49} title="Thermometer" desc="Verticale fill-meter."><Thermometer value={68} /></GalleryItem>
      <GalleryItem n={50} title="Ladder Progress" desc="Oplopende treden."><LadderProgress active={4} /></GalleryItem>
      <GalleryItem n={51} title="Dot Matrix" desc="Puntraster teller."><DotMatrix value={73} /></GalleryItem>
      <GalleryItem n={52} title="Month Heatmap" desc="Kalender-intensiteitskaart."><MonthHeatmap /></GalleryItem>
      <GalleryItem n={53} title="Wave Fill" desc="Vloeistofniveau met golf."><WaveFill pct={64} /></GalleryItem>
      <GalleryItem n={54} title="KPI Delta Card" desc="Metric met trend + sparkline."><KpiCard /></GalleryItem>
      <GalleryItem n={55} title="Treemap" desc="Proportionele blokken."><Treemap /></GalleryItem>
      <GalleryItem n={56} title="Radial Dial" desc="270° ringdial."><RadialDial value={76} /></GalleryItem>
      <GalleryItem n={57} title="Segmented Ring" desc="Punten-segmentring."><SegmentedRing value={60} /></GalleryItem>
      <GalleryItem n={58} title="Battery Meter" desc="Batterij-indicator."><BatteryMeter value={78} /></GalleryItem>
      <GalleryItem n={59} title="Needle Gauge 180°" desc="Schaal met naald."><NeedleGauge180 value={64} /></GalleryItem>
      <GalleryItem n={60} title="Polar Area" desc="Poolkaart slices."><PolarArea /></GalleryItem>
      <GalleryItem n={61} title="Comparison Bars" desc="Doel vs actueel."><ComparisonBars /></GalleryItem>
      <GalleryItem n={62} title="Stat Delta" desc="Omhoog/omlaag metric.">
        <div className="flex gap-3">
          <div className="flex flex-col items-center"><span className="text-urgent text-[10px] font-bold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+18%</span><span className="text-storm text-2xl font-bold tabular-nums">920</span></div>
          <div className="flex flex-col items-center"><span className="text-storm/50 text-[10px] font-bold flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />-4%</span><span className="text-storm text-2xl font-bold tabular-nums">312</span></div>
        </div>
      </GalleryItem>
      <GalleryItem n={63} title="Live Pulse Icon" desc="Animatie-indicator.">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-urgent animate-pulse" /><Activity className="w-5 h-5 text-urgent" /><span className="text-urgent text-[11px] font-bold tracking-wider">LIVE</span></div>
      </GalleryItem>
    </Section>
  );
}