import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3", SKY = "#B1BEC6", CLAY = "#868564";

function SpectrumBars({ bands }) {
  return (
    <div className="flex items-end gap-0.5 h-24 w-full">
      {bands.map((v, i) => (
        <motion.div key={i} className="flex-1 rounded-t-sm" style={{ background: i < bands.length * 0.35 ? URG : i < bands.length * 0.7 ? SAND : OLIVE }} animate={{ height: `${Math.max(3, v * 100)}%` }} transition={{ duration: 0.05 }} />
      ))}
    </div>
  );
}

function RadialSpectrum({ bands }) {
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      <circle r="20" fill="none" stroke="#ffffff10" />
      {bands.map((v, i) => {
        const a = (i / bands.length) * 2 * Math.PI - Math.PI / 2;
        const l = 22 + v * 30;
        return <line key={i} x1={Math.cos(a) * 20} y1={Math.sin(a) * 20} x2={Math.cos(a) * l} y2={Math.sin(a) * l} stroke={i % 3 === 0 ? URG : SAND} strokeWidth="2" strokeLinecap="round" style={{ opacity: 0.4 + v * 0.6 }} />;
      })}
    </svg>
  );
}

function Oscilloscope({ bands }) {
  const pts = bands.map((v, i) => { const x = (i / (bands.length - 1)) * 200; const y = 35 - (v - 0.5) * 50; return `${x},${y}`; }).join(" ");
  return <svg viewBox="0 0 200 70" className="w-full" style={{ height: 90 }}><polyline points={pts} fill="none" stroke={URG} strokeWidth="2" /><line x1="0" y1="35" x2="200" y2="35" stroke="#ffffff10" /></svg>;
}

function ConcentricRings({ bands, level }) {
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      {[0, 1, 2, 3].map((i) => (
        <motion.circle key={i} cx="0" cy="0" fill="none" stroke={[URG, SAND, OLIVE, SKY][i]} strokeWidth="2" animate={{ r: 14 + i * 10 + level * 12, opacity: 0.8 - i * 0.18 }} transition={{ duration: 0.1 }} />
      ))}
      <circle r="10" fill={URG} />
    </svg>
  );
}

function TallEQ({ bands }) {
  return (
    <div className="flex items-end gap-1 h-28 w-full">
      {bands.slice(0, 20).map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end rounded-sm overflow-hidden" style={{ background: "#ffffff08" }}>
          <motion.div className="w-full" style={{ background: v > 0.7 ? URG : v > 0.4 ? SAND : OLIVE }} animate={{ height: `${v * 100}%` }} transition={{ duration: 0.05 }} />
        </div>
      ))}
    </div>
  );
}

function ReactiveOrb({ level }) {
  return (
    <div className="relative flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ background: URG, opacity: 0.2 - i * 0.05 }} animate={{ width: 60 + level * 80 + i * 20, height: 60 + level * 80 + i * 20 }} transition={{ duration: 0.1 }} />
      ))}
      <motion.div className="relative rounded-full bg-urgent flex items-center justify-center text-plum text-xs font-bold" animate={{ scale: 1 + level * 0.4 }} transition={{ duration: 0.1 }}>G</motion.div>
    </div>
  );
}

function BassPulse({ level }) {
  return (
    <div className="flex items-center gap-3">
      <motion.div className="rounded-full bg-urgent" animate={{ width: 30 + level * 50, height: 30 + level * 50 }} transition={{ duration: 0.08 }} />
      <div className="flex flex-col">
        <span className="text-storm text-lg font-bold tabular-nums">{Math.round(level * 100)}</span>
        <span className="text-storm/50 text-[9px] tracking-widest uppercase">bass</span>
      </div>
    </div>
  );
}

function SineLayers({ bands }) {
  return (
    <svg viewBox="0 0 200 80" className="w-full" style={{ height: 90 }}>
      {[0, 1, 2].map((j) => {
        const amp = (bands[j * 4] || 0.3) * 30 + 6;
        const pts = Array.from({ length: 40 }).map((_, i) => `${(i / 39) * 200},${40 + Math.sin(i / 3 + j) * amp}`).join(" ");
        return <polyline key={j} points={pts} fill="none" stroke={[URG, SAND, OLIVE][j]} strokeWidth="1.5" opacity="0.8" />;
      })}
    </svg>
  );
}

function ParticleBurst({ level }) {
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * 2 * Math.PI;
        const r = 12 + level * 35;
        return <motion.circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r="2" fill={i % 2 ? URG : SAND} animate={{ cx: Math.cos(a) * r, cy: Math.sin(a) * r }} transition={{ duration: 0.08 }} />;
      })}
      <circle r="8" fill={URG} />
    </svg>
  );
}

function CircularWave({ bands }) {
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      <motion.polygon points={bands.map((v, i) => { const a = (i / bands.length) * 2 * Math.PI - Math.PI / 2; const r = 12 + v * 38; return `${Math.cos(a) * r},${Math.sin(a) * r}`; }).join(" ")} fill={URG} fillOpacity="0.25" stroke={URG} strokeWidth="1.5" />
    </svg>
  );
}

function VUMeter({ bands }) {
  const level = bands.slice(0, 10).reduce((s, v) => s + v, 0) / 10;
  return (
    <div className="flex items-end gap-1 h-24">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-2 rounded-sm" style={{ height: `${((i + 1) / 16) * 100}%`, background: i / 16 < level ? (i > 12 ? URG : i > 8 ? SAND : OLIVE) : "#ffffff10" }} />
      ))}
    </div>
  );
}

function Lissajous({ bands }) {
  return (
    <svg viewBox="-55 -55 110 110" className="w-32 h-32">
      <motion.polyline points={Array.from({ length: 60 }).map((_, t) => { const a = (bands[0] || 0.3) * 3 + 3; const b = (bands[2] || 0.3) * 2 + 2; const x = Math.cos((a * t) / 10) * 40; const y = Math.sin((b * t) / 10) * 40; return `${x},${y}`; }).join(" ")} fill="none" stroke={URG} strokeWidth="1.5" />
    </svg>
  );
}

function ReactiveGrid({ bands }) {
  return (
    <div className="grid grid-cols-8 gap-1 w-full">
      {Array.from({ length: 32 }).map((_, i) => {
        const v = bands[i % bands.length] || 0;
        return <motion.div key={i} className="aspect-square rounded-sm" animate={{ background: v > 0.5 ? URG : v > 0.25 ? SAND : "#ffffff10", scale: 0.8 + v * 0.4 }} transition={{ duration: 0.05 }} />;
      })}
    </div>
  );
}

function BeatDots({ bands }) {
  const level = bands[0] || 0;
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span key={i} className="w-4 h-4 rounded-full" style={{ background: [URG, SAND, OLIVE, SKY, CLAY][i] }} animate={{ scale: level > i * 0.18 ? 1.3 : 0.6 }} transition={{ duration: 0.08 }} />
      ))}
    </div>
  );
}

function ExpandingRing({ level }) {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute rounded-full border-2 border-urgent" animate={{ width: 20 + level * 80, height: 20 + level * 80, opacity: 0.7 - i * 0.2 }} transition={{ duration: 0.1, delay: i * 0.05 }} />
      ))}
      <div className="w-6 h-6 rounded-full bg-urgent" />
    </div>
  );
}

function WaveStack({ bands }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center gap-0.5 h-4">
          {bands.slice(0, 24).map((v, i) => <div key={i} className="flex-1 rounded-sm self-end" style={{ height: `${(v * (1 - row * 0.2)) * 100}%`, background: [URG, SAND, OLIVE, SKY][row] }} />)}
        </div>
      ))}
    </div>
  );
}

function ReactiveLogo({ level }) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div className="rounded-full bg-urgent/20" animate={{ scale: 1 + level * 0.6 }} transition={{ duration: 0.08 }} />
      <span className="absolute text-urgent text-3xl font-black tracking-tighter" style={{ textShadow: `0 0 ${level * 20}px ${URG}` }}>GIULIA</span>
    </div>
  );
}

export default function AudioReactive() {
  const [mic, setMic] = useState(false);
  const { bands, level } = useAudio(mic);
  return (
    <Section id="audio" index="10" title="Audio-Reactieve Elementen" desc="Visualisaties die reageren op geluid — zet de microfoon aan voor echte reactie, anders draait een simulatie." cols="lg:grid-cols-3">
      <div className="col-span-full flex items-center justify-center mb-2 gap-3">
        <button onClick={() => setMic((m) => !m)} className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-colors ${mic ? "bg-urgent text-plum border-urgent" : "border-storm/25 text-storm/70 hover:bg-marble/10"}`}>
          {mic ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />} {mic ? "Mic live" : "Mic uit · simulatie"}
        </button>
        <span className="text-storm/50 text-[10px] tabular-nums">level {Math.round(level * 100)}</span>
      </div>
      <GalleryItem n={116} title="Spectrum Bars" desc="Frequentie-staven." className="sm:col-span-2 lg:col-span-2"><SpectrumBars bands={bands} /></GalleryItem>
      <GalleryItem n={117} title="Radial Spectrum" desc="Radiale frequentie."><RadialSpectrum bands={bands} /></GalleryItem>
      <GalleryItem n={118} title="Oscilloscope" desc="Golfvorm-oscilloscoop." className="sm:col-span-2 lg:col-span-2"><Oscilloscope bands={bands} /></GalleryItem>
      <GalleryItem n={119} title="Concentric Rings" desc="Pulsende ringen."><ConcentricRings bands={bands} level={level} /></GalleryItem>
      <GalleryItem n={120} title="Tall EQ" desc="Hoge equalizer."><TallEQ bands={bands} /></GalleryItem>
      <GalleryItem n={121} title="Reactive Orb" desc="Schalende orb."><ReactiveOrb level={level} /></GalleryItem>
      <GalleryItem n={122} title="Bass Pulse" desc="Bass-klop."><BassPulse level={level} /></GalleryItem>
      <GalleryItem n={123} title="Sine Layers" desc="Gelaagde sinus."><SineLayers bands={bands} /></GalleryItem>
      <GalleryItem n={124} title="Particle Burst" desc="Uitwaaierende punten."><ParticleBurst level={level} /></GalleryItem>
      <GalleryItem n={125} title="Circular Wave" desc="Radiale golfvorm."><CircularWave bands={bands} /></GalleryItem>
      <GalleryItem n={126} title="VU Meter" desc="Volume-unit meter."><VUMeter bands={bands} /></GalleryItem>
      <GalleryItem n={127} title="Lissajous" desc="X/Y fase-curve."><Lissajous bands={bands} /></GalleryItem>
      <GalleryItem n={128} title="Reactive Grid" desc="Amp-gedreven raster."><ReactiveGrid bands={bands} /></GalleryItem>
      <GalleryItem n={129} title="Beat Dots" desc="Beat-sequentie."><BeatDots bands={bands} /></GalleryItem>
      <GalleryItem n={130} title="Expanding Ring" desc="Uitzettende ring."><ExpandingRing level={level} /></GalleryItem>
      <GalleryItem n={131} title="Wave Stack" desc="Gestapelde banden."><WaveStack bands={bands} /></GalleryItem>
      <GalleryItem n={132} title="Reactive Logo" desc="Glow met amp." className="sm:col-span-2 lg:col-span-2"><ReactiveLogo level={level} /></GalleryItem>
    </Section>
  );
}