import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564", PLUM = "#301728";

const grouped = [
  { d: "ma", a: 30, b: 20 }, { d: "di", a: 45, b: 30 }, { d: "wo", a: 38, b: 25 }, { d: "do", a: 60, b: 40 }, { d: "vr", a: 52, b: 35 },
];
const stacked = [
  { d: "Q1", x: 30, y: 20, z: 10 }, { d: "Q2", x: 40, y: 30, z: 15 }, { d: "Q3", x: 50, y: 25, z: 20 }, { d: "Q4", x: 45, y: 35, z: 18 },
];

function Diverging() {
  const data = [["Doel", 80], ["A", 64], ["B", 58], ["C", -40], ["D", -25]];
  const m = 80;
  return (
    <div className="w-full flex flex-col gap-1.5">
      {data.map(([l, v]) => (
        <div key={l} className="flex items-center gap-2">
          <span className="text-storm/60 text-[10px] w-8">{l}</span>
          <div className="flex-1 h-3 flex relative bg-white/5 rounded-full overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
            <div className="absolute top-0 bottom-0" style={{ left: v >= 0 ? "50%" : `${50 + (v / m) * 50}%`, width: `${Math.abs(v / m) * 50}%`, background: v >= 0 ? URG : SAND }} />
          </div>
          <span className="text-storm/60 text-[9px] tabular-nums w-8 text-right">{v}</span>
        </div>
      ))}
    </div>
  );
}

function Waterfall() {
  const steps = [["Start", 40], ["+A", 25], ["+B", 15], ["-C", -20], ["Eind", 60]];
  let acc = 40;
  const m = 100;
  return (
    <div className="w-full flex items-end gap-1 h-28">
      {steps.map(([l, v], i) => {
        const base = i === 0 ? 0 : acc - Math.max(0, v);
        if (i > 0) acc += v;
        const h = Math.abs(v);
        return (
          <div key={l} className="flex-1 flex flex-col items-center justify-end h-full relative">
            <div className="w-full rounded-t-sm absolute bottom-0" style={{ height: `${(acc / m) * 100}%`, background: "#ffffff08" }} />
            <div className="w-full rounded-sm absolute" style={{ bottom: `${(base / m) * 100}%`, height: `${(h / m) * 100}%`, background: v < 0 ? SAND : URG }} />
            <span className="absolute -bottom-4 text-storm/40 text-[8px]">{l}</span>
          </div>
        );
      })}
    </div>
  );
}

function HBars() {
  const data = [["Onderzoek", 86], ["Concept", 72], ["Brand", 54], ["Tech", 90]].map(([l, v]) => ({ l, v }));
  return (
    <div style={{ width: "100%", height: 130 }}>
      <ResponsiveContainer><BarChart data={data} layout="vertical"><XAxis type="number" hide /><YAxis type="category" dataKey="l" tick={{ fill: "#E0DED3", fontSize: 10 }} axisLine={false} tickLine={false} width={70} /><Bar dataKey="v" radius={[0, 4, 4, 0]}>{data.map((_, i) => <Cell key={i} fill={[URG, SAND, OLIVE, SKY][i]} />)}</Bar></BarChart></ResponsiveContainer>
    </div>
  );
}

function Pyramid() {
  const rows = [["Top", 10, URG], ["Upper", 25, SAND], ["Mid", 40, OLIVE], ["Lower", 60, SKY], ["Base", 80, CLAY]];
  return (
    <div className="flex flex-col items-center gap-0.5 w-full">
      {rows.map(([l, w, c]) => (
        <div key={l} className="flex items-center gap-2">
          <span className="text-storm/60 text-[9px] w-10 text-right">{l}</span>
          <motion.div className="h-6 rounded-sm flex items-center justify-center text-plum text-[9px] font-bold" style={{ background: c }} initial={{ width: 0 }} whileInView={{ width: `${w * 1.5}px` }} transition={{ duration: 0.6 }}>{w}%</motion.div>
        </div>
      ))}
    </div>
  );
}

function Funnel() {
  const steps = [["Bezoekers", 100], ["Interesse", 64], ["Proef", 38], ["Klant", 22]];
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      {steps.map(([l, v], i) => (
        <motion.div key={l} className="rounded-md flex items-center justify-between px-3" style={{ width: `${v}%`, background: i === 0 ? URG : [SAND, OLIVE, SKY][i - 1], opacity: 0.85, height: 28 }} initial={{ width: 0 }} whileInView={{ width: `${v}%` }} transition={{ duration: 0.5 }}>
          <span className="text-plum text-[10px] font-semibold">{l}</span>
          <span className="text-plum text-[10px] tabular-nums">{v}%</span>
        </motion.div>
      ))}
    </div>
  );
}

function Venn() {
  const c1 = { x: 40, y: 45 }, c2 = { x: 75, y: 45 }, c3 = { x: 57, y: 72 };
  return (
    <svg viewBox="0 0 120 110" className="w-full max-w-[160px]">
      <circle cx={c1.x} cy={c1.y} r="32" fill={URG} fillOpacity="0.35" stroke={URG} />
      <circle cx={c2.x} cy={c2.y} r="32" fill={SAND} fillOpacity="0.35" stroke={SAND} />
      <circle cx={c3.x} cy={c3.y} r="32" fill={SKY} fillOpacity="0.35" stroke={SKY} />
    </svg>
  );
}

function Sankey() {
  return (
    <svg viewBox="0 0 160 100" className="w-full">
      {[
        { x1: 10, y1: 20, x2: 80, y2: 30, w: 12, c: URG }, { x1: 10, y1: 50, x2: 80, y2: 55, w: 8, c: SAND }, { x1: 10, y1: 80, x2: 80, y2: 75, w: 6, c: OLIVE },
        { x1: 80, y1: 30, x2: 150, y2: 35, w: 10, c: URG }, { x1: 80, y1: 55, x2: 150, y2: 60, w: 8, c: SAND }, { x1: 80, y1: 75, x2: 150, y2: 80, w: 6, c: OLIVE },
      ].map((f, i) => (
        <path key={i} d={`M${f.x1} ${f.y1} C ${(f.x1 + f.x2) / 2} ${f.y1}, ${(f.x1 + f.x2) / 2} ${f.y2}, ${f.x2} ${f.y2}`} fill="none" stroke={f.c} strokeWidth={f.w} strokeOpacity="0.4" />
      ))}
      <rect x="6" y="14" width="8" height="70" rx="2" fill={URG} /><rect x="146" y="29" width="8" height="56" rx="2" fill={SAND} />
    </svg>
  );
}

function Bubble() {
  const dots = [{ x: 20, y: 60, r: 8 }, { x: 45, y: 30, r: 14 }, { x: 70, y: 70, r: 10 }, { x: 90, y: 40, r: 6 }, { x: 55, y: 55, r: 18 }];
  return (
    <svg viewBox="0 0 110 90" className="w-full max-w-[180px]">
      <line x1="10" y1="80" x2="105" y2="80" stroke="#ffffff15" /><line x1="10" y1="5" x2="10" y2="80" stroke="#ffffff15" />
      {dots.map((d, i) => <motion.circle key={i} cx={d.x + 5} cy={d.y} r={d.r} fill={[URG, SAND, OLIVE, SKY, CLAY][i]} fillOpacity="0.6" initial={{ r: 0 }} animate={{ r: d.r }} transition={{ delay: i * 0.08 }} />)}
    </svg>
  );
}

function Bullet() {
  const rows = [["Omzet", 90, 70, 60], ["Leads", 80, 65, 45], ["CSAT", 95, 80, 70]];
  return (
    <div className="w-full flex flex-col gap-2">
      {rows.map(([l, target, actual, poor]) => (
        <div key={l}>
          <div className="flex justify-between text-[9px] text-storm/60 mb-1"><span>{l}</span><span className="tabular-nums">{actual}</span></div>
          <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-white/10" style={{ width: `${poor}%` }} />
            <div className="absolute inset-y-1 left-0 rounded-full bg-sand" style={{ width: `${actual}%` }} />
            <div className="absolute top-0 bottom-0 w-0.5 bg-urgent" style={{ left: `${target}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Marimekko() {
  const cols = [{ w: 40, seg: [50, 30, 20] }, { w: 35, seg: [30, 40, 30] }, { w: 25, seg: [60, 25, 15] }];
  const colors = [URG, SAND, OLIVE];
  return (
    <div className="flex w-full h-32 rounded-lg overflow-hidden">
      {cols.map((c, i) => (
        <div key={i} style={{ width: `${c.w}%` }} className="flex flex-col">
          {c.seg.map((s, j) => <div key={j} style={{ height: `${s}%`, background: colors[j] }} />)}
        </div>
      ))}
    </div>
  );
}

function DotPlot() {
  const rows = [["Team A", 4], ["Team B", 7], ["Team C", 5], ["Team D", 9]];
  return (
    <div className="w-full flex flex-col gap-2">
      {rows.map(([l, v]) => (
        <div key={l} className="flex items-center gap-2">
          <span className="text-storm/60 text-[10px] w-12">{l}</span>
          <div className="flex-1 flex gap-1">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: i < v ? URG : "#ffffff12" }} />)}</div>
        </div>
      ))}
    </div>
  );
}

export default function BarsDiagrams() {
  return (
    <Section id="bars" index="08" title="Staafgrafieken & Diagrammen" desc="Groep-, stacked-, divergerende en watervallen staven, plus Venn, sankey, funnel, pyramide en bubble-diagrammen." cols="lg:grid-cols-3">
      <GalleryItem n={90} title="Grouped Bars" desc="Recharts gegroepeerde staven." className="sm:col-span-2 lg:col-span-2">
        <div style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer><BarChart data={grouped}><Bar dataKey="a" fill={URG} radius={[4, 4, 0, 0]} /><Bar dataKey="b" fill={SAND} radius={[4, 4, 0, 0]} /><XAxis dataKey="d" tick={{ fill: "#E0DED3", fontSize: 10 }} axisLine={false} tickLine={false} /></BarChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={91} title="Stacked Bars" desc="Gestapelde staven.">
        <div style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer><BarChart data={stacked}><Bar dataKey="x" stackId="1" fill={URG} /><Bar dataKey="y" stackId="1" fill={SAND} /><Bar dataKey="z" stackId="1" fill={OLIVE} radius={[4, 4, 0, 0]} /><XAxis dataKey="d" tick={{ fill: "#E0DED3", fontSize: 10 }} axisLine={false} tickLine={false} /></BarChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={92} title="Horizontal Bars" desc="Horizontale categoriebalken."><HBars /></GalleryItem>
      <GalleryItem n={93} title="Diverging Bars" desc="Tweezijdige vergelijking."><Diverging /></GalleryItem>
      <GalleryItem n={94} title="Waterfall" desc="Opbouw-afloop cascade."><Waterfall /></GalleryItem>
      <GalleryItem n={95} title="Pyramid" desc="Hiërarchische trechter."><Pyramid /></GalleryItem>
      <GalleryItem n={96} title="Funnel" desc="Conversietrechter."><Funnel /></GalleryItem>
      <GalleryItem n={97} title="Venn" desc="Driehoekige overlapping."><Venn /></GalleryItem>
      <GalleryItem n={98} title="Sankey Flow" desc="Stroomdiagram."><Sankey /></GalleryItem>
      <GalleryItem n={99} title="Bubble" desc="Bubbeldiagram x/y."><Bubble /></GalleryItem>
      <GalleryItem n={100} title="Bullet Chart" desc="Doel vs werkelijk."><Bullet /></GalleryItem>
      <GalleryItem n={101} title="Marimekko" desc="Proportionele muren."><Marimekko /></GalleryItem>
      <GalleryItem n={102} title="Dot Plot" desc="Punten per categorie."><DotPlot /></GalleryItem>
    </Section>
  );
}