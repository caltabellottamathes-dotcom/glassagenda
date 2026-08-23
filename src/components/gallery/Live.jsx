import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3";

function LiveCounter() {
  const [n, setN] = useState(1240);
  useEffect(() => { const id = setInterval(() => setN((x) => x + Math.floor(Math.random() * 9 - 2)), 900); return () => clearInterval(id); }, []);
  return <span className="text-storm text-5xl font-bold tabular-nums">{n.toLocaleString()}</span>;
}

function DigitalClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const p = (x) => String(x).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <span className="text-storm text-4xl font-bold tabular-nums tracking-wider">{p(now.getHours())}:{p(now.getMinutes())}:{p(now.getSeconds())}</span>
      <span className="text-storm/50 text-[10px] tracking-widest uppercase mt-1">live klok</span>
    </div>
  );
}

function LiveArea() {
  const [data, setData] = useState(() => Array.from({ length: 30 }, (_, i) => ({ i, v: 20 + Math.sin(i / 3) * 10 })));
  useEffect(() => {
    const id = setInterval(() => setData((d) => [...d.slice(1), { i: d[d.length - 1].i + 1, v: Math.max(5, Math.min(45, d[d.length - 1].v + (Math.random() - 0.5) * 8)) }]), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ width: "100%", height: 130 }}>
      <ResponsiveContainer><AreaChart data={data}><defs><linearGradient id="la" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={URG} stopOpacity="0.6" /><stop offset="100%" stopColor={URG} stopOpacity="0" /></linearGradient></defs><Area isAnimationActive={false} type="monotone" dataKey="v" stroke={URG} strokeWidth={2} fill="url(#la)" /></AreaChart></ResponsiveContainer>
    </div>
  );
}

function ECG() {
  const [phase, setPhase] = useState(0);
  useEffect(() => { let raf; const tick = () => { setPhase((p) => (p + 3) % 60); raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, []);
  const pts = Array.from({ length: 60 }).map((_, i) => { const x = (i + phase) % 60; let y = 30; if (x === 20) y = 8; else if (x === 21) y = 44; else if (x === 22) y = 24; return `${(i / 59) * 200},${y}`; }).join(" ");
  return <svg viewBox="0 0 200 60" className="w-full" style={{ height: 90 }}><polyline points={pts} fill="none" stroke={URG} strokeWidth="2" /></svg>;
}

function StockTicker() {
  const items = [["AAPL", 182.4, 1.2], ["TSLA", 244.1, -0.8], ["NVDA", 480.2, 2.4], ["MSFT", 412.6, 0.4], ["GOOG", 158.3, -0.2]];
  return (
    <div className="w-full overflow-hidden">
      <motion.div className="flex gap-6 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} className="text-[11px] flex items-center gap-1.5"><span className="text-storm font-semibold">{it[0]}</span><span className="text-storm/70 tabular-nums">{it[1].toFixed(1)}</span><span className={it[2] >= 0 ? "text-urgent" : "text-storm/50"}>{it[2] >= 0 ? "▲" : "▼"}{Math.abs(it[2])}%</span></span>
        ))}
      </motion.div>
    </div>
  );
}

function LiveGauge() {
  const [v, setV] = useState(50);
  useEffect(() => { const id = setInterval(() => setV(20 + Math.random() * 60), 800); return () => clearInterval(id); }, []);
  const angle = -90 + (v / 100) * 180;
  return (
    <svg viewBox="-55 -50 110 70" className="w-full max-w-[170px]">
      <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke="#ffffff15" strokeWidth="8" strokeLinecap="round" />
      <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke={SAND} strokeWidth="8" strokeLinecap="round" strokeDasharray="157" strokeDashoffset={157 - (v / 100) * 157} />
      <motion.line x1="0" y1="0" x2={Math.cos((angle * Math.PI) / 180) * 42} y2={Math.sin((angle * Math.PI) / 180) * 42} stroke={URG} strokeWidth="3" strokeLinecap="round" animate={{ rotate: angle }} style={{ transformOrigin: "0px 0px" }} transition={{ duration: 0.6 }} />
      <circle r="4" fill={URG} />
      <text x="0" y="-20" textAnchor="middle" className="fill-storm" style={{ fontSize: 14, fontWeight: 700 }}>{Math.round(v)}</text>
    </svg>
  );
}

function BarRace() {
  const [data, setData] = useState([["A", 60], ["B", 40], ["C", 80], ["D", 30], ["E", 55]].map(([l, v]) => ({ l, v })));
  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => d.map((x) => ({ l: x.l, v: Math.max(10, Math.min(100, x.v + (Math.random() - 0.5) * 30)) })).sort((a, b) => b.v - a.v));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.max(...data.map((d) => d.v));
  return (
    <div className="w-full flex flex-col gap-1.5">
      {data.map((d) => (
        <div key={d.l} className="flex items-center gap-2">
          <span className="text-storm/60 text-[10px] w-4">{d.l}</span>
          <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden"><motion.div className="h-full rounded-full" style={{ background: URG }} animate={{ width: `${(d.v / m) * 100}%` }} transition={{ duration: 0.6 }} /></div>
        </div>
      ))}
    </div>
  );
}

function LiveSignal() {
  const [bars, setBars] = useState([2, 3, 4, 5, 4, 3]);
  useEffect(() => { const id = setInterval(() => setBars(() => [1, 2, 3, 4, 5].map(() => 1 + Math.floor(Math.random() * 5))), 600); return () => clearInterval(id); }, []);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {bars.map((v, i) => <motion.div key={i} className="w-4 rounded-sm" style={{ background: v >= 4 ? URG : SAND }} animate={{ height: `${(v / 5) * 100}%` }} transition={{ duration: 0.4 }} />)}
    </div>
  );
}

function Uptime() {
  const [s, setS] = useState(3641);
  useEffect(() => { const id = setInterval(() => setS((x) => x + 1), 1000); return () => clearInterval(id); }, []);
  const p = (x) => String(x).padStart(2, "0");
  return <div className="text-center"><p className="text-storm text-3xl font-bold tabular-nums">{p(Math.floor(s / 3600))}:{p(Math.floor((s % 3600) / 60))}:{p(s % 60)}</p><p className="text-storm/50 text-[10px] tracking-widest uppercase mt-1">uptime</p></div>;
}

function LiveMapPoints() {
  const pts = [{ x: 25, y: 40 }, { x: 55, y: 60 }, { x: 75, y: 30 }, { x: 40, y: 70 }];
  return (
    <svg viewBox="0 0 100 80" className="w-full max-w-[180px]">
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2" fill={URG} />
          <motion.circle cx={p.x} cy={p.y} r="2" fill="none" stroke={URG} animate={{ r: [2, 10], opacity: [0.8, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }} />
        </g>
      ))}
    </svg>
  );
}

function LiveStatusGrid() {
  const [cells, setCells] = useState(() => Array.from({ length: 24 }, () => (Math.random() > 0.5 ? 1 : 0)));
  useEffect(() => { const id = setInterval(() => setCells(() => Array.from({ length: 24 }, () => (Math.random() > 0.5 ? 1 : 0))), 800); return () => clearInterval(id); }, []);
  return (
    <div className="grid grid-cols-6 gap-1.5 w-full">
      {cells.map((c, i) => <motion.div key={i} className="aspect-square rounded-sm" animate={{ background: c ? URG : "#ffffff12", scale: c ? 1 : 0.85 }} transition={{ duration: 0.3 }} />)}
    </div>
  );
}

function LiveRadar() {
  const [v, setV] = useState([0.6, 0.4, 0.8, 0.5, 0.7]);
  useEffect(() => { const id = setInterval(() => setV(() => Array.from({ length: 5 }, () => 0.3 + Math.random() * 0.6)), 900); return () => clearInterval(id); }, []);
  return (
    <svg viewBox="-55 -55 110 110" className="w-28 h-28">
      {[0.33, 0.66, 1].map((r) => <circle key={r} r={r * 45} fill="none" stroke="#ffffff12" />)}
      <motion.polygon points={v.map((val, i) => { const a = (i / 5) * 2 * Math.PI - Math.PI / 2; return `${Math.cos(a) * val * 45},${Math.sin(a) * val * 45}`; }).join(" ")} fill={URG} fillOpacity="0.3" stroke={URG} strokeWidth="1.5" transition={{ duration: 0.5 }} />
    </svg>
  );
}

export default function Live() {
  return (
    <Section id="live" index="07" title="Live Elementen" desc="Realtime data: tellers, klokken, live grafieken, hartslag, stock-ticker, bar-race en signaalsterkte." cols="lg:grid-cols-3">
      <GalleryItem n={78} title="Live Counter" desc="Live oplopend getal."><LiveCounter /></GalleryItem>
      <GalleryItem n={79} title="Digital Clock" desc="Seconden-teller klok."><DigitalClock /></GalleryItem>
      <GalleryItem n={80} title="Live Area" desc="Schuivend gebiedsdiagram."><LiveArea /></GalleryItem>
      <GalleryItem n={81} title="ECG Heartbeat" desc="Hartslag-oscilloscoop."><ECG /></GalleryItem>
      <GalleryItem n={82} title="Stock Ticker" desc="Schuivende koersen."><StockTicker /></GalleryItem>
      <GalleryItem n={83} title="Live Gauge" desc="Oscillerende naaldmeter."><LiveGauge /></GalleryItem>
      <GalleryItem n={84} title="Bar Race" desc="Herschikkende staven."><BarRace /></GalleryItem>
      <GalleryItem n={85} title="Signal Bars" desc="Wisselende signaalsterkte."><LiveSignal /></GalleryItem>
      <GalleryItem n={86} title="Uptime Timer" desc="Verlopen tijd."><Uptime /></GalleryItem>
      <GalleryItem n={87} title="Live Map Points" desc="Pulsende locatiepunten."><LiveMapPoints /></GalleryItem>
      <GalleryItem n={88} title="Status Grid" desc="Flippende statuscellen."><LiveStatusGrid /></GalleryItem>
      <GalleryItem n={89} title="Live Radar" desc="Pulsend spinnenweb."><LiveRadar /></GalleryItem>
    </Section>
  );
}