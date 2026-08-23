import React from "react";
import { LiveSparkline, PulseWave } from "@/components/modules/viz";
import { MiniLive, MiniBars, MiniPulse } from "@/components/widgets/Widget";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar, RadialBarChart, RadialBar, PolarGrid, PolarAngleAxis, ResponsiveContainer, XAxis, Tooltip, Cell } from "recharts";
import { GalleryItem, Section } from "./Gallery";

const SAND = "#94925d", URG = "#d5e24a", OLIVE = "#d8dab3", SKY = "#B1BEC6", PLUM = "#301728";

const lineData = [
  { d: "ma", v: 30 }, { d: "di", v: 52 }, { d: "wo", v: 41 }, { d: "do", v: 67 }, { d: "vr", v: 58 }, { d: "za", v: 78 }, { d: "zo", v: 64 },
];
const barData = [{ d: "ma", v: 40 }, { d: "di", v: 65 }, { d: "wo", v: 50 }, { d: "do", v: 88 }, { d: "vr", v: 72 }];
const radarData = [{ a: "Focus", v: 80 }, { a: "Energie", v: 65 }, { a: "Rust", v: 48 }, { a: "Sociaal", v: 72 }, { a: "Groei", v: 58 }];
const radialData = [{ v: 72 }, { v: 48 }, { v: 90 }];

function Heatmap() {
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 50 }).map((_, i) => {
        const r = Math.random();
        return <div key={i} className="aspect-square rounded-sm" style={{ background: r > 0.75 ? URG : r > 0.5 ? SAND : r > 0.25 ? "#6b6a4a" : "#ffffff10" }} />;
      })}
    </div>
  );
}

function AreaSpark() {
  const pts = [4, 6, 5, 8, 7, 9, 8, 11, 10, 12];
  const w = 160, h = 60, step = w / (pts.length - 1);
  const d = pts.map((v, i) => `${i * step},${h - (v / 12) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 70 }}>
      <defs><linearGradient id="asp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={URG} stopOpacity="0.5" /><stop offset="100%" stopColor={URG} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${d} ${w},${h}`} fill="url(#asp)" />
      <polyline points={d} fill="none" stroke={URG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Charts() {
  return (
    <Section id="charts" index="03" title="Charts, Sparklines & Waves" desc="Live data-lijnen, puls-golven, Recharts-grafieken en heatmaps.">
      <GalleryItem n={25} title="LiveSparkline" desc="Realtime schuifende lijn."><LiveSparkline color={URG} max={20} height={70} /></GalleryItem>
      <GalleryItem n={26} title="MiniLive" desc="Mini schuiflijn met pulsepunt."><MiniLive color={SAND} w={150} h={40} max={10} /></GalleryItem>
      <GalleryItem n={27} title="MiniBars" desc="Statische staafjesreeks."><div className="w-full"><MiniBars data={[3, 6, 4, 8, 5, 9, 7, 4]} color={URG} h={50} /></div></GalleryItem>
      <GalleryItem n={28} title="MiniPulse" desc="Geanimeerde puls-staven."><div className="w-full"><MiniPulse color={SAND} bars={16} h={50} /></div></GalleryItem>
      <GalleryItem n={29} title="PulseWave" desc="EQ-stijle golfanimatie."><PulseWave color={URG} bars={24} height={60} /></GalleryItem>
      <GalleryItem n={30} title="LineChart (Recharts)" desc="Lijndiagram weektrend.">
        <div style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer><LineChart data={lineData}><XAxis dataKey="d" tick={{ fill: "#E0DED3", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: PLUM, border: "1px solid #ffffff20", borderRadius: 8, fontSize: 11 }} /><Line type="monotone" dataKey="v" stroke={URG} strokeWidth={2.5} dot={{ fill: URG, r: 3 }} /></LineChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={31} title="AreaChart (Recharts)" desc="Gegradeerd gebied.">
        <div style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer><AreaChart data={lineData}><defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SAND} stopOpacity="0.6" /><stop offset="100%" stopColor={SAND} stopOpacity="0" /></linearGradient></defs><Area type="monotone" dataKey="v" stroke={SAND} strokeWidth={2} fill="url(#ar)" /><XAxis dataKey="d" tick={{ fill: "#E0DED3", fontSize: 10 }} axisLine={false} tickLine={false} /></AreaChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={32} title="BarChart (Recharts)" desc="Verticale staven, gekleurd.">
        <div style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer><BarChart data={barData}><Bar dataKey="v" radius={[4, 4, 0, 0]}>{barData.map((b, i) => <Cell key={i} fill={i === 3 ? URG : SAND} />)}</Bar><XAxis dataKey="d" tick={{ fill: "#E0DED3", fontSize: 10 }} axisLine={false} tickLine={false} /></BarChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={33} title="RadarChart (Recharts)" desc="Spinnenweb-profiel.">
        <div style={{ width: "100%", height: 160 }}>
          <ResponsiveContainer><RadarChart data={radarData}><PolarGrid stroke="#ffffff15" /><PolarAngleAxis dataKey="a" tick={{ fill: "#E0DED3", fontSize: 9 }} /><Radar dataKey="v" stroke={URG} fill={URG} fillOpacity={0.25} strokeWidth={2} /></RadarChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={34} title="RadialBar (Recharts)" desc="Radiale staafdiagram.">
        <div style={{ width: "100%", height: 150 }}>
          <ResponsiveContainer><RadialBarChart innerRadius="20%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}><RadialBar dataKey="v" cornerRadius={6} background={{ fill: "#ffffff10" }}>{radialData.map((_, i) => <Cell key={i} fill={[URG, SAND, OLIVE][i]} />)}</RadialBar></RadialBarChart></ResponsiveContainer>
        </div>
      </GalleryItem>
      <GalleryItem n={35} title="Heatmap Grid" desc="Intensiteitsmatrix 10×5."><Heatmap /></GalleryItem>
      <GalleryItem n={36} title="Area Sparkline" desc="Gegradeerde mini-lijn."><AreaSpark /></GalleryItem>
    </Section>
  );
}