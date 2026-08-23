import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564", PLUM = "#301728";

const streamData = Array.from({ length: 14 }, (_, i) => ({ x: i, a: 20 + Math.sin(i) * 10, b: 14 + Math.cos(i / 1.3) * 7, c: 10 + Math.sin(i / 2) * 5 }));

function Streamgraph() {
  return (
    <div style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer><AreaChart data={streamData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <Area stackId="s" dataKey="a" type="monotone" stroke="none" fill={URG} fillOpacity={0.75} />
        <Area stackId="s" dataKey="b" type="monotone" stroke="none" fill={SAND} fillOpacity={0.75} />
        <Area stackId="s" dataKey="c" type="monotone" stroke="none" fill={OLIVE} fillOpacity={0.75} />
      </AreaChart></ResponsiveContainer>
    </div>
  );
}

function gaussian(mu, sig, w) {
  const pts = [];
  for (let x = 0; x <= 100; x += 2) { const y = Math.exp(-((x - mu) ** 2) / (2 * sig * sig)); pts.push(`${(x / 100) * w},${(1 - y) * 60}`); }
  return pts.join(" ");
}
function Ridgeline() {
  const ridges = [[30, 12, URG], [50, 14, SAND], [45, 10, OLIVE], [60, 13, SKY], [40, 16, CLAY]];
  return (
    <svg viewBox="0 0 200 140" className="w-full" style={{ height: 140 }}>
      {ridges.map(([mu, sig, c], i) => (
        <g key={i} transform={`translate(0,${i * 18 + 50})`}>
          <polyline points={`0,60 ${gaussian(mu, sig, 200)} 200,60`} fill={c} fillOpacity={0.55} stroke={c} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function BumpChart() {
  const data = [{ t: 0, A: 1, B: 3, C: 2 }, { t: 1, A: 2, B: 1, C: 3 }, { t: 2, A: 3, B: 2, C: 1 }, { t: 3, A: 2, B: 3, C: 1 }, { t: 4, A: 1, B: 2, C: 3 }];
  const cols = ["A", "B", "C"];
  const colors = { A: URG, B: SAND, C: OLIVE };
  const W = 180, H = 90;
  const px = (t) => (t / 4) * W, py = (r) => ((r - 1) / 2) * H;
  return (
    <svg viewBox="0 0 200 100" className="w-full" style={{ height: 120 }}>
      {cols.map((c) => (
        <g key={c}>
          <motion.polyline points={data.map((d) => `${px(d.t) + 10},${py(d[c]) + 5}`).join(" ")} fill="none" stroke={colors[c]} strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} />
          {data.map((d, i) => <circle key={i} cx={px(d.t) + 10} cy={py(d[c]) + 5} r="3" fill={colors[c]} />)}
        </g>
      ))}
    </svg>
  );
}

function SlopeChart() {
  const rows = [["Doel A", 80, 55], ["Doel B", 40, 70], ["Doel C", 60, 30]];
  const H = 90;
  return (
    <svg viewBox="0 0 200 100" className="w-full" style={{ height: 110 }}>
      <line x1="20" y1="5" x2="20" y2="95" stroke="#ffffff15" /><line x1="180" y1="5" x2="180" y2="95" stroke="#ffffff15" />
      {rows.map(([l, a, b], i) => {
        const y1 = 5 + (1 - a / 100) * 90, y2 = 5 + (1 - b / 100) * 90, up = b > a, c = up ? URG : SAND;
        return <g key={l}><line x1="20" y1={y1} x2="180" y2={y2} stroke={c} strokeWidth="2" /><circle cx="20" cy={y1} r="3" fill={c} /><circle cx="180" cy={y2} r="3" fill={c} /><text x="14" y={y1 + 3} textAnchor="end" className="fill-storm/70" style={{ fontSize: 8 }}>{l}</text></g>;
      })}
    </svg>
  );
}

function Heatmap() {
  const [grid] = useState(() => Array.from({ length: 5 }, () => Array.from({ length: 9 }, () => Math.random())));
  return (
    <div className="w-full grid grid-cols-9 gap-1">
      {grid.flat().map((v, i) => <div key={i} className="aspect-square rounded-sm" style={{ background: URG, opacity: 0.15 + v * 0.85 }} />)}
    </div>
  );
}

function CalendarHeatmap() {
  const [grid] = useState(() => Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))));
  const sc = ["#ffffff10", SAND, OLIVE, URG];
  return (
    <div className="w-full flex flex-col gap-1">
      {grid.map((row, r) => <div key={r} className="flex gap-1">{row.map((v, c) => <div key={c} className="flex-1 aspect-square rounded-sm" style={{ background: sc[v] }} />)}</div>)}
    </div>
  );
}

function Waffle() {
  const pct = 67;
  return (
    <div className="flex items-center gap-4">
      <div className="grid grid-cols-10 gap-0.5 w-24 h-24">
        {Array.from({ length: 100 }).map((_, i) => <div key={i} className="rounded-[2px]" style={{ background: i < pct ? URG : "#ffffff12" }} />)}
      </div>
      <div><span className="text-storm text-3xl font-bold">{pct}%</span><p className="text-storm/50 text-[9px] tracking-widest uppercase">waffle</p></div>
    </div>
  );
}

function Lollipop() {
  const data = [["A", 70], ["B", 40], ["C", 85], ["D", 55], ["E", 90]];
  return (
    <div className="flex items-end gap-3 h-28 w-full justify-center">
      {data.map(([l, v], i) => (
        <div key={l} className="flex flex-col items-center gap-1">
          <div className="w-1 bg-marble/20 relative" style={{ height: v }}><span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: [URG, SAND, OLIVE, SKY, CLAY][i] }} /></div>
          <span className="text-storm/50 text-[9px]">{l}</span>
        </div>
      ))}
    </div>
  );
}

function Dumbbell() {
  const rows = [["Team A", 30, 70], ["Team B", 45, 60], ["Team C", 20, 55]];
  return (
    <div className="w-full flex flex-col gap-3">
      {rows.map(([l, a, b]) => (
        <div key={l} className="flex items-center gap-2">
          <span className="text-storm/60 text-[10px] w-12">{l}</span>
          <div className="flex-1 relative h-3">
            <div className="absolute top-1/2 h-px w-full bg-marble/20 -translate-y-1/2" />
            <div className="absolute top-1/2 h-px -translate-y-1/2" style={{ left: `${a}%`, width: `${b - a}%`, background: URG }} />
            <div className="absolute w-3 h-3 rounded-full bg-sand -translate-x-1/2 top-1/2 -translate-y-1/2" style={{ left: `${a}%` }} />
            <div className="absolute w-3 h-3 rounded-full bg-urgent -translate-x-1/2 top-1/2 -translate-y-1/2" style={{ left: `${b}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Nightingale() {
  const vals = [60, 40, 80, 55, 70, 35, 50, 65];
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      {vals.map((v, i) => { const a1 = (i / vals.length) * 2 * Math.PI, a2 = ((i + 1) / vals.length) * 2 * Math.PI; const r = v * 0.5; const x1 = Math.cos(a1) * r, y1 = Math.sin(a1) * r, x2 = Math.cos(a2) * r, y2 = Math.sin(a2) * r; return <path key={i} d={`M0 0 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`} fill={[URG, SAND, OLIVE, SKY][i % 4]} fillOpacity={0.7} stroke="#301728" strokeWidth="0.5" />; })}
    </svg>
  );
}

function Sunburst() {
  const inner = [[60, URG], [40, SAND]], outer = [[30, OLIVE], [45, SKY], [25, CLAY], [60, URG]];
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      <path d="M0 0 L50 0 A50 50 0 0 1 0 50 Z" fill={inner[0][0] > 50 ? URG : SAND} fillOpacity={0.7} />
      <path d="M0 0 L0 50 A50 50 0 0 1 -50 0 Z" fill={OLIVE} fillOpacity={0.7} />
      <path d="M0 0 L-50 0 A50 50 0 0 1 0 -50 Z" fill={SKY} fillOpacity={0.7} />
      <path d="M0 0 L0 -50 A50 50 0 0 1 50 0 Z" fill={CLAY} fillOpacity={0.7} />
      <circle r="22" fill="#301728" />
      {outer.map((s, i) => { const a1 = (i / 4) * 2 * Math.PI, a2 = ((i + 1) / 4) * 2 * Math.PI; const r = 22 + s[0] * 0.45; const x1 = Math.cos(a1) * r, y1 = Math.sin(a1) * r, x2 = Math.cos(a2) * r, y2 = Math.sin(a2) * r, ix1 = Math.cos(a1) * 22, iy1 = Math.sin(a1) * 22, ix2 = Math.cos(a2) * 22, iy2 = Math.sin(a2) * 22; return <path key={i} d={`M${ix1} ${iy1} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} L${ix2} ${iy2} A22 22 0 0 0 ${ix1} ${iy1} Z`} fill={s[1]} fillOpacity={0.55} />; })}
    </svg>
  );
}

function Chord() {
  const nodes = 6; const links = [[0, 2], [1, 4], [3, 5], [0, 3], [2, 4]];
  const R = 42;
  const pt = (i) => [Math.cos((i / nodes) * 2 * Math.PI - Math.PI / 2) * R, Math.sin((i / nodes) * 2 * Math.PI - Math.PI / 2) * R];
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      <circle r={R} fill="none" stroke="#ffffff10" />
      {links.map(([a, b], i) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); return <path key={i} d={`M${x1} ${y1} Q 0 0 ${x2} ${y2}`} fill="none" stroke={[URG, SAND, OLIVE, SKY, CLAY][i % 5]} strokeWidth="2" opacity="0.6" />; })}
      {Array.from({ length: nodes }).map((_, i) => { const [x, y] = pt(i); return <circle key={i} cx={x} cy={y} r="4" fill={URG} />; })}
    </svg>
  );
}

function CirclePacking() {
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      <circle r="50" fill="none" stroke="#ffffff10" />
      <circle cx="-18" cy="-10" r="22" fill={URG} fillOpacity="0.5" />
      <circle cx="20" cy="14" r="18" fill={SAND} fillOpacity="0.5" />
      <circle cx="-18" cy="-10" r="8" fill={OLIVE} />
      <circle cx="20" cy="14" r="6" fill={SKY} />
      <circle cx="8" cy="-22" r="10" fill={CLAY} fillOpacity="0.5" />
    </svg>
  );
}

function BoxPlot() {
  const cats = [["A", 20, 40, 55, 70, 85], ["B", 15, 35, 50, 60, 75], ["C", 25, 45, 60, 72, 90]];
  return (
    <svg viewBox="0 0 150 100" className="w-full" style={{ height: 110 }}>
      {cats.map((c, i) => {
        const x = 30 + i * 45, [mn, q1, med, q3, mx] = c, y = (v) => 95 - v * 0.9;
        return <g key={i} stroke={SAND} strokeWidth="1.5" fill="none">
          <line x1={x} y1={y(mn)} x2={x} y2={y(q1)} /><line x1={x} y1={y(q3)} x2={x} y2={y(mx)} />
          <line x1={x - 5} y1={y(mn)} x2={x + 5} y2={y(mn)} /><line x1={x - 5} y1={y(mx)} x2={x + 5} y2={y(mx)} />
          <rect x={x - 8} y={y(q3)} width="16" height={y(q1) - y(q3)} fill={URG} fillOpacity="0.4" />
          <line x1={x - 8} y1={y(med)} x2={x + 8} y2={y(med)} stroke={URG} strokeWidth="2" />
        </g>;
      })}
    </svg>
  );
}

function Violin() {
  const cats = [["A", 0.2, 0.6, 0.9, 0.5, 0.15], ["B", 0.1, 0.4, 0.7, 0.85, 0.3], ["C", 0.05, 0.3, 0.95, 0.4, 0.1]];
  return (
    <svg viewBox="0 0 150 100" className="w-full" style={{ height: 110 }}>
      {cats.map(([l, ...d], i) => {
        const cx = 30 + i * 45, y = (j) => 10 + j * 16;
        const half = d.map((w) => w * 12);
        const top = d.map((w, j) => `${cx + w * 12},${y(j)}`).join(" ");
        const bot = d.map((w, j) => `${cx - w * 12},${y(d.length - 1 - j)}`).join(" ");
        return <g key={i}><polygon points={`${top} ${cx + half[0]},${y(0)} ${cx - half[0]},${y(0)} ${bot} ${cx - half[0]},${y(d.length - 1)}`} fill={[URG, SAND, OLIVE][i]} fillOpacity="0.5" /></g>;
      })}
    </svg>
  );
}

function Candlestick() {
  const bars = [[40, 50, 35, 45], [45, 60, 42, 52], [52, 55, 38, 48], [48, 62, 46, 60], [60, 64, 50, 55]];
  return (
    <svg viewBox="0 0 150 100" className="w-full" style={{ height: 110 }}>
      {bars.map((b, i) => { const x = 18 + i * 28, [o, h, l, c] = b, up = c >= o, col = up ? URG : SAND, y = (v) => 95 - v * 1.2; return <g key={i}><line x1={x} y1={y(h)} x2={x} y2={y(l)} stroke={col} /><rect x={x - 5} y={y(Math.max(o, c))} width="10" height={Math.abs(y(o) - y(c)) || 2} fill={col} fillOpacity={0.85} /></g>; })}
    </svg>
  );
}

function StepChart() {
  const vals = [20, 35, 35, 55, 40, 70, 60, 80];
  return (
    <svg viewBox="0 0 160 90" className="w-full" style={{ height: 100 }}>
      <motion.polyline points={vals.map((v, i) => `${(i / (vals.length - 1)) * 150},${80 - v}`).join(" ")} fill="none" stroke={URG} strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} />
    </svg>
  );
}

function RadialBar() {
  const vals = [70, 50, 85, 60];
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32 -rotate-90">
      {vals.map((v, i) => { const r = 12 + i * 10, c = 2 * Math.PI * r; return <g key={i}><circle r={r} fill="none" stroke="#ffffff10" strokeWidth="6" /><circle r={r} fill="none" stroke={[URG, SAND, OLIVE, SKY][i]} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(v / 100) * c} ${c}`} /></g>; })}
    </svg>
  );
}

function LiquidFill() {
  const [t, setT] = useState(0);
  useEffect(() => { let r; const f = () => { setT((x) => x + 0.05); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => cancelAnimationFrame(r); }, []);
  const level = 65;
  const wave = Array.from({ length: 41 }).map((_, i) => `${(i / 40) * 100},${50 - level * 0.4 + Math.sin(i * 0.5 + t) * 3}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      <defs><clipPath id="lf"><rect x="10" y="10" width="80" height="80" rx="8" /></clipPath></defs>
      <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="#ffffff20" strokeWidth="2" />
      <g clipPath="url(#lf)"><motion.polygon points={`0,100 ${wave} 100,100`} fill={URG} fillOpacity="0.7" animate={{ x: [-50, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} /></g>
      <text x="50" y="55" textAnchor="middle" className="fill-storm" style={{ fontSize: 20, fontWeight: 700 }}>{level}%</text>
    </svg>
  );
}

function DotMatrix() {
  const pct = 73;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 100 }).map((_, i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < pct ? URG : "#ffffff12" }} />)}
      </div>
      <span className="text-storm/50 text-[9px] tracking-widest uppercase mt-1">{pct}%</span>
    </div>
  );
}

export default function ChartVariations() {
  return (
    <Section id="charts-variations" index="12" title="Chart Variaties" desc="Ongebruikelijke en visueel andere grafieksoorten: streamgraph, ridgeline, bump, slope, sunburst, chord, boxplot, violin, candlestick en liquid-fill." cols="lg:grid-cols-3">
      <GalleryItem n={153} title="Streamgraph" desc="Stromende stacked gebieden." className="sm:col-span-2 lg:col-span-2"><Streamgraph /></GalleryItem>
      <GalleryItem n={154} title="Ridgeline" desc="Overlappende dichtheidsruggen."><Ridgeline /></GalleryItem>
      <GalleryItem n={155} title="Bump Chart" desc="Rangschikking over tijd."><BumpChart /></GalleryItem>
      <GalleryItem n={156} title="Slope Chart" desc="Helling-vergelijking."><SlopeChart /></GalleryItem>
      <GalleryItem n={157} title="Heatmap Matrix" desc="Kleur-intensiteits grid."><Heatmap /></GalleryItem>
      <GalleryItem n={158} title="Calendar Heatmap" desc="Jaar-activiteit grid."><CalendarHeatmap /></GalleryItem>
      <GalleryItem n={159} title="Waffle Chart" desc="10×10 eenheden."><Waffle /></GalleryItem>
      <GalleryItem n={160} title="Lollipop Chart" desc="Stengel + dot."><Lollipop /></GalleryItem>
      <GalleryItem n={161} title="Dumbbell Chart" desc="Verbindingsverschil."><Dumbbell /></GalleryItem>
      <GalleryItem n={162} title="Nightingale Rose" desc="Polar area wigges."><Nightingale /></GalleryItem>
      <GalleryItem n={163} title="Sunburst" desc="Geneste ring-segmenten."><Sunburst /></GalleryItem>
      <GalleryItem n={164} title="Chord Diagram" desc="Verbindingsbogen." className="sm:col-span-2 lg:col-span-2"><Chord /></GalleryItem>
      <GalleryItem n={165} title="Circle Packing" desc="Ingepakte bellen."><CirclePacking /></GalleryItem>
      <GalleryItem n={166} title="Box Plot" desc="Whiskers & kwartielen."><BoxPlot /></GalleryItem>
      <GalleryItem n={167} title="Violin Plot" desc="Symmetrische dichtheid."><Violin /></GalleryItem>
      <GalleryItem n={168} title="Candlestick" desc="OHLC financiële bars."><Candlestick /></GalleryItem>
      <GalleryItem n={169} title="Step Chart" desc="Getrapte lijn."><StepChart /></GalleryItem>
      <GalleryItem n={170} title="Radial Bar" desc="Concentrische booglengtes."><RadialBar /></GalleryItem>
      <GalleryItem n={171} title="Liquid Fill Gauge" desc="Golf-peil meter."><LiquidFill /></GalleryItem>
      <GalleryItem n={172} title="Dot Matrix" desc="Punten-percentage."><DotMatrix /></GalleryItem>
    </Section>
  );
}