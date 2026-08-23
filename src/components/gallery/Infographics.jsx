import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { GalleryItem, Section } from "./Gallery";

const SAND = "#94925d", URG = "#d5e24a", OLIVE = "#d8dab3", SKY = "#B1BEC6";

function RoutineTimeline() {
  const steps = [[1, 1], [1, 1], [1, 1], [1, 0], [0, 0]];
  return (
    <div className="w-full flex items-center gap-1.5">
      {steps.map(([d, a], i) => (
        <React.Fragment key={i}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ${a ? "bg-sand text-storm" : "bg-white/5 text-storm/40"}`}>{i + 1}</div>
          {i < steps.length - 1 && <div className="h-px flex-1" style={{ background: a ? SAND : "#ffffff15" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function JournalTimeline() {
  return (
    <div className="w-full flex flex-col gap-2">
      {[["09:14", "Ochtendkoffie", 0.5], ["11:02", "Focus-piek", 1], ["15:30", "Energie dip", 0.3]].map(([t, n, m]) => (
        <div key={t} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-urgent" />
          <span className="text-storm text-[10px] tabular-nums w-10">{t}</span>
          <span className="text-storm/70 text-[11px] flex-1 truncate">{n}</span>
          <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-sand" style={{ width: `${m * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function WakePhases() {
  return (
    <div className="w-full flex items-center justify-between gap-1">
      {[["Op", true], ["H2O", true], ["Move", false], ["Focus", false]].map(([n, d], i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ${d ? "bg-sand text-storm" : "bg-white/5 text-storm/40"}`}>{i + 1}</div>
          <span className="text-[9px] text-storm/60">{n}</span>
        </div>
      ))}
    </div>
  );
}

function WeekAgenda() {
  const days = ["MA", "DI", "WO", "DO", "VR", "ZA", "ZO"];
  return (
    <div className="w-full flex gap-1.5">
      {days.map((d, i) => (
        <div key={d} className="flex-1 flex flex-col gap-1">
          <span className="text-storm/40 text-[8px] text-center">{d}</span>
          <div className="flex-1 rounded-md border border-storm/15 bg-white/5 p-1 space-y-1">
            {[1, 2, 3].map((b) => (i < 5 && b <= (i % 3) + 1 ? <div key={b} className="h-3 rounded-sm" style={{ background: b === 2 ? URG : SAND, opacity: 0.8 }} /> : null))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniCalendar() {
  const [pick, setPick] = useState(14);
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1 text-center">
        {["M", "D", "W", "D", "V", "Z", "Z"].map((d, i) => <span key={i} className="text-storm/30 text-[8px]">{d}</span>)}
        {Array.from({ length: 31 }).map((_, i) => (
          <button key={i} onClick={() => setPick(i + 1)} className={`aspect-square rounded-md text-[9px] flex items-center justify-center ${pick === i + 1 ? "bg-urgent text-plum font-bold" : "text-storm/70 hover:bg-white/10"}`}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

function Constellation() {
  const nodes = [{ x: 50, y: 20 }, { x: 80, y: 50 }, { x: 60, y: 80 }, { x: 25, y: 70 }, { x: 20, y: 35 }];
  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-[160px]">
      {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="#ffffff12" />))}
      {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 5 : 3.5} fill={i === 0 ? URG : SAND} />)}
    </svg>
  );
}

function Orbit() {
  return (
    <svg viewBox="-50 -50 100 100" className="w-full max-w-[150px]">
      <circle r="7" fill={URG}><animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite" /></circle>
      {[0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * 2 * Math.PI - Math.PI / 2; const x = Math.cos(a) * 32, y = Math.sin(a) * 32; const on = i < 3; return (<g key={i}><line x1="0" y1="0" x2={x} y2={y} stroke={on ? SAND : "#ffffff15"} /><circle cx={x} cy={y} r="6" fill="#301728" stroke={on ? SAND : "#ffffff20"} strokeWidth="1.5" /></g>); })}
    </svg>
  );
}

function Clock24() {
  return (
    <svg viewBox="-50 -50 100 100" className="w-full max-w-[150px]">
      <circle r="40" fill="none" stroke="#ffffff15" strokeWidth="8" />
      <circle r="40" fill="none" stroke={SAND} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(58 / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`} transform="rotate(-90 0 0)" />
      <line x1="0" y1="0" x2="0" y2="-32" stroke={URG} strokeWidth="2.5" strokeLinecap="round" transform="rotate(150)" />
      <circle r="3" fill={URG} />
    </svg>
  );
}

function HubSpoke() {
  return (
    <svg viewBox="-50 -50 100 100" className="w-full max-w-[150px]">
      <circle r="6" fill={URG} />
      {[0, 1, 2, 3].map((i) => { const a = (i / 4) * 2 * Math.PI - Math.PI / 2; const x = Math.cos(a) * 30, y = Math.sin(a) * 30; return <g key={i}><line x1="0" y1="0" x2={x} y2={y} stroke="#ffffff15" /><circle cx={x} cy={y} r="7" fill="#301728" stroke={SAND} strokeWidth="1.5" /></g>; })}
    </svg>
  );
}

function MemorySpiral() {
  return (
    <div className="relative w-full max-w-[150px] aspect-square">
      <svg viewBox="-50 -50 100 100" className="w-full h-full">
        {Array.from({ length: 26 }).map((_, i) => { const a = (i * 137.5) * Math.PI / 180; const r = 6 + (i % 5) * 8; return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={i % 4 === 0 ? 2 : 1} fill={[SAND, OLIVE, URG, SKY][i % 4]}><animate attributeName="opacity" values="1;0.3;1" dur={`${2 + (i % 4)}s`} repeatCount="indefinite" /></circle>; })}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-storm text-xl font-bold tabular-nums">135</span>
    </div>
  );
}

function HourBars() {
  return (
    <div className="w-full">
      <div className="flex items-end gap-0.5 h-20">
        {[0, 0, 2, 3, 1.5, 0, 1, 2.5, 0, 1, 0, 3, 2].map((v, i) => <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${v ? (v / 3) * 100 : 8}%`, background: v ? SAND : "#ffffff10" }} />)}
      </div>
      <div className="flex justify-between text-[8px] text-storm/40 mt-1"><span>08</span><span>12</span><span>16</span><span>20</span></div>
    </div>
  );
}

function RadarSweep() {
  return (
    <svg viewBox="-50 -50 100 100" className="w-full max-w-[150px]">
      {[20, 30, 40].map((r) => <circle key={r} r={r} fill="none" stroke="#ffffff12" />)}
      <line x1="-45" y1="0" x2="45" y2="0" stroke="#ffffff12" /><line x1="0" y1="-45" x2="0" y2="45" stroke="#ffffff12" />
      <motion.line x1="0" y1="0" x2="45" y2="0" stroke={URG} strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "0px 0px" }} />
      <circle r="3" fill={URG} />
    </svg>
  );
}

export default function Infographics() {
  return (
    <Section id="infographics" index="05" title="Infographics & Tijdlijnen" desc="Aangepaste SVG-visualisaties: netwerken, banen, klokken, radar, tijdlijnen, agenda's en kalenders." cols="lg:grid-cols-4">
      <GalleryItem n={37} title="Routine Timeline" desc="Horizontale stappenreeks."><RoutineTimeline /></GalleryItem>
      <GalleryItem n={38} title="Journal Timeline" desc="Verticale tijdlijn met magnitude."><JournalTimeline /></GalleryItem>
      <GalleryItem n={39} title="Wake Phases" desc="Ochtendfasen."><WakePhases /></GalleryItem>
      <GalleryItem n={40} title="Week Agenda" desc="7-daagse strip met blokken."><WeekAgenda /></GalleryItem>
      <GalleryItem n={41} title="Mini Calendar" desc="Klikbare maandweergave."><MiniCalendar /></GalleryItem>
      <GalleryItem n={42} title="Constellation" desc="Netwerk van verbonden nodes."><Constellation /></GalleryItem>
      <GalleryItem n={43} title="Orbit" desc="Hub met satellieten."><Orbit /></GalleryItem>
      <GalleryItem n={44} title="24h Clock" desc="Ringklok met wijzer."><Clock24 /></GalleryItem>
      <GalleryItem n={45} title="Hub & Spoke" desc="Centrale knoop met armen."><HubSpoke /></GalleryItem>
      <GalleryItem n={46} title="Memory Spiral" desc="Phyllotaxis puntenwolk."><MemorySpiral /></GalleryItem>
      <GalleryItem n={47} title="Hour Bars" desc="Uursoverzicht staafjes."><HourBars /></GalleryItem>
      <GalleryItem n={48} title="Radar Sweep" desc="Draaiende radar."><RadarSweep /></GalleryItem>
    </Section>
  );
}