import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564";

function Gantt() {
  const tasks = [
    { n: "Onderzoek", s: 0, e: 3, c: SAND }, { n: "Concept", s: 2, e: 5, c: URG }, { n: "Design", s: 4, e: 7, c: OLIVE }, { n: "Build", s: 6, e: 10, c: SKY }, { n: "Lancering", s: 9, e: 11, c: URG },
  ];
  return (
    <div className="w-full">
      <div className="flex text-[8px] text-storm/40 mb-1 pl-20">{Array.from({ length: 12 }).map((_, i) => <span key={i} className="flex-1 text-center">{i + 1}</span>)}</div>
      <div className="flex flex-col gap-1.5">
        {tasks.map((t) => (
          <div key={t.n} className="flex items-center gap-2">
            <span className="text-storm/70 text-[10px] w-16 truncate">{t.n}</span>
            <div className="flex-1 relative h-4 bg-white/5 rounded-sm">
              <motion.div className="absolute inset-y-0 rounded-sm flex items-center px-1.5" style={{ left: `${(t.s / 12) * 100}%`, width: `${((t.e - t.s) / 12) * 100}%`, background: t.c }} initial={{ width: 0 }} whileInView={{ width: `${((t.e - t.s) / 12) * 100}%` }} transition={{ duration: 0.6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kanban() {
  const cols = [["Te doen", SAND, 3], ["Bezig", URG, 2], ["Klaar", OLIVE, 4]];
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {cols.map(([t, c, n]) => (
        <div key={t} className="rounded-lg border border-marble/20 bg-white/5 p-2">
          <div className="flex items-center gap-1.5 mb-2"><span className="w-2 h-2 rounded-full" style={{ background: c }} /><span className="text-storm/70 text-[9px] tracking-wider uppercase">{t}</span></div>
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: n }).map((_, i) => <div key={i} className="h-6 rounded bg-white/8" />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Roadmap() {
  const miles = [["Q1", "Onderzoek", SAND], ["Q2", "Concept", URG], ["Q3", "Build", OLIVE], ["Q4", "Lancering", SKY]];
  return (
    <div className="w-full relative">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-marble/20" />
      <div className="flex justify-between relative">
        {miles.map(([q, l, c], i) => (
          <motion.div key={q} className="flex flex-col items-center gap-1" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: c, background: PLUM_BG() }} />
            <span className="text-storm text-[10px] font-semibold">{q}</span>
            <span className="text-storm/50 text-[8px]">{l}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
const PLUM_BG = () => "#301728";

function ResourceGrid() {
  const people = ["A", "B", "C"];
  return (
    <div className="w-full">
      <div className="grid grid-cols-[40px_repeat(7,1fr)] gap-1 text-[8px]">
        <span />
        {["M", "D", "W", "D", "V", "Z", "Z"].map((d, i) => <span key={i} className="text-center text-storm/40">{d}</span>)}
        {people.map((p) => (
          <React.Fragment key={p}>
            <span className="text-storm/60 text-center">{p}</span>
            {Array.from({ length: 7 }).map((_, i) => <div key={i} className="aspect-square rounded-sm" style={{ background: i < 5 ? (i % 2 ? URG : SAND) : "#ffffff08", opacity: i < 5 ? 0.8 : 1 }} />)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function MonthEvents() {
  const [pick, setPick] = useState(14);
  const events = { 8: URG, 14: SAND, 22: URG, 27: OLIVE };
  return (
    <div className="w-full grid grid-cols-7 gap-1 text-center">
      {Array.from({ length: 31 }).map((_, i) => (
        <button key={i} onClick={() => setPick(i + 1)} className={`aspect-square rounded-md text-[9px] flex flex-col items-center justify-center gap-0.5 ${pick === i + 1 ? "bg-urgent text-plum font-bold" : "text-storm/70 hover:bg-white/10"}`}>
          {i + 1}{events[i + 1] && <span className="w-1 h-1 rounded-full" style={{ background: pick === i + 1 ? PLUM_BG() : events[i + 1] }} />}
        </button>
      ))}
    </div>
  );
}

function DayBlocks() {
  const blocks = [["09:00", "Standup", SAND, 1], ["10:00", "Focus", URG, 2], ["12:00", "Lunch", OLIVE, 1], ["13:00", "Concept", URG, 3], ["16:00", "Review", SKY, 1]];
  return (
    <div className="w-full flex flex-col gap-1">
      {blocks.map(([t, n, c, h]) => (
        <div key={t} className="flex items-center gap-2">
          <span className="text-storm/50 text-[9px] tabular-nums w-9">{t}</span>
          <div className="flex-1 rounded-md px-2 flex items-center text-plum text-[10px] font-semibold" style={{ background: c, height: 14 * h }}>{n}</div>
        </div>
      ))}
    </div>
  );
}

function Milestones() {
  const ms = [["Kickoff", true], ["Onderzoek", true], ["Concept", true], ["Build", false], ["Lancering", false]];
  return (
    <div className="w-full flex flex-col gap-2">
      {ms.map(([l, d], i) => (
        <div key={l} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${d ? "bg-urgent" : "bg-white/15"} ring-4 ring-white/5`} />
          <span className={`text-[11px] ${d ? "text-storm" : "text-storm/40"}`}>{l}</span>
          {i < ms.length - 1 && <div className="ml-3 h-px w-3 bg-marble/20" />}
        </div>
      ))}
    </div>
  );
}

function Burndown() {
  const ideal = Array.from({ length: 8 }, (_, i) => ({ d: i, v: 80 - i * 10 }));
  const actual = [{ d: 0, v: 80 }, { d: 1, v: 75 }, { d: 2, v: 70 }, { d: 3, v: 55 }, { d: 4, v: 48 }, { d: 5, v: 30 }];
  return (
    <div style={{ width: "100%", height: 130 }}>
      <ResponsiveContainer><LineChart data={ideal}><Line type="monotone" dataKey="v" stroke="#ffffff20" strokeWidth={1.5} strokeDasharray="4 4" dot={false} /></LineChart></ResponsiveContainer>
      <div className="-mt-[130px] h-[130px]">
        <ResponsiveContainer><LineChart data={actual}><XAxis dataKey="d" hide /><Line type="monotone" dataKey="v" stroke={URG} strokeWidth={2.5} dot={{ fill: URG, r: 3 }} /></LineChart></ResponsiveContainer>
      </div>
    </div>
  );
}

function Capacity() {
  const rows = [["A", 80], ["B", 55], ["C", 92], ["D", 40]];
  return (
    <div className="w-full flex flex-col gap-2">
      {rows.map(([l, v]) => (
        <div key={l} className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-plum/60 text-storm text-[9px] font-bold flex items-center justify-center">{l}</span>
          <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${v}%`, background: v > 85 ? URG : SAND }} /></div>
          <span className="text-storm/60 text-[9px] tabular-nums w-7">{v}%</span>
        </div>
      ))}
    </div>
  );
}

function Dependencies() {
  const nodes = [{ x: 15, y: 20, l: "A" }, { x: 15, y: 70, l: "B" }, { x: 60, y: 45, l: "C" }, { x: 100, y: 30, l: "D" }, { x: 100, y: 70, l: "E" }];
  const links = [[0, 2], [1, 2], [2, 3], [2, 4]];
  return (
    <svg viewBox="0 0 115 90" className="w-full max-w-[200px]">
      {links.map(([a, b], i) => <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#ffffff15" />)}
      {nodes.map((n) => <g key={n.l}><circle cx={n.x} cy={n.y} r="9" fill="#301728" stroke={URG} strokeWidth="1.5" /><text x={n.x} y={n.y + 3} textAnchor="middle" className="fill-storm" style={{ fontSize: 9, fontWeight: 700 }}>{n.l}</text></g>)}
    </svg>
  );
}

function PhaseTimeline() {
  const phases = [["Ontdek", 25, SAND], ["Definitie", 20, OLIVE], ["Ontwerp", 30, URG], ["Lancering", 25, SKY]];
  return (
    <div className="w-full">
      <div className="flex h-6 rounded-lg overflow-hidden">
        {phases.map(([l, w, c], i) => <motion.div key={l} className="flex items-center justify-center text-plum text-[9px] font-semibold" style={{ background: c }} initial={{ width: 0 }} whileInView={{ width: `${w}%` }} transition={{ delay: i * 0.1 }}>{l}</motion.div>)}
      </div>
    </div>
  );
}

function ResourceHeatmap() {
  return (
    <div className="w-full flex flex-col gap-1">
      {["A", "B", "C"].map((p) => (
        <div key={p} className="flex items-center gap-2">
          <span className="text-storm/60 text-[9px] w-3">{p}</span>
          <div className="flex-1 grid grid-cols-8 gap-0.5">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-4 rounded-sm" style={{ background: Math.random() > 0.7 ? URG : Math.random() > 0.4 ? SAND : "#ffffff10" }} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Deadlines() {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {[["Concept review", "2d", URG], ["Pitch deck", "5d", SAND], ["Onboarding", "9d", OLIVE]].map(([n, t, c]) => (
        <div key={n} className="flex items-center justify-between rounded-lg border border-marble/20 bg-white/5 px-3 py-2">
          <span className="text-storm text-[11px]">{n}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full text-plum font-semibold" style={{ background: c }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

export default function Planning() {
  return (
    <Section id="planning" index="09" title="Planning & Tijd" desc="Gantt, kanban, roadmap, resource-grid, agenda's, burndown en afhankelijkheidsgrafieken." cols="lg:grid-cols-3">
      <GalleryItem n={103} title="Gantt" desc="Taakbalken over tijd." className="sm:col-span-2 lg:col-span-2"><Gantt /></GalleryItem>
      <GalleryItem n={104} title="Kanban" desc="Drie-koloms bord."><Kanban /></GalleryItem>
      <GalleryItem n={105} title="Roadmap" desc="Mijlpaal-tijdlijn."><Roadmap /></GalleryItem>
      <GalleryItem n={106} title="Resource Grid" desc="Persoon × dag allocatie."><ResourceGrid /></GalleryItem>
      <GalleryItem n={107} title="Month Calendar" desc="Agenda met events."><MonthEvents /></GalleryItem>
      <GalleryItem n={108} title="Day Time Blocks" desc="Dagagenda met blokken."><DayBlocks /></GalleryItem>
      <GalleryItem n={109} title="Milestones" desc="Verticale mijlpalen."><Milestones /></GalleryItem>
      <GalleryItem n={110} title="Burndown" desc="Ideal vs actueel."><Burndown /></GalleryItem>
      <GalleryItem n={111} title="Capacity Bars" desc="Belasting per persoon."><Capacity /></GalleryItem>
      <GalleryItem n={112} title="Dependencies" desc="Taak-afhankelijkheden."><Dependencies /></GalleryItem>
      <GalleryItem n={113} title="Phase Timeline" desc="Fase-banden."><PhaseTimeline /></GalleryItem>
      <GalleryItem n={114} title="Resource Heatmap" desc="Belasting-matrix."><ResourceHeatmap /></GalleryItem>
      <GalleryItem n={115} title="Deadline Cards" desc="Aftel-kaarten."><Deadlines /></GalleryItem>
    </Section>
  );
}