import React from "react";
import { motion } from "framer-motion";
import { GalleryItem, Section } from "./Gallery";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3";

function MorphBlob() {
  return <motion.div className="w-24 h-24" style={{ background: `linear-gradient(135deg, ${URG}, ${SAND})` }} animate={{ borderRadius: ["40% 60% 60% 40%", "60% 40% 50% 50%", "40% 60% 40% 60%", "50% 50% 60% 40%", "40% 60% 60% 40%"], rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />;
}

function OrbitRing() {
  return (
    <div className="relative w-28 h-28">
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
        {[0, 1, 2, 3].map((i) => { const a = (i / 4) * 2 * Math.PI; return <span key={i} className="absolute w-3 h-3 rounded-full" style={{ background: i === 0 ? URG : SAND, left: `calc(50% + ${Math.cos(a) * 44}px - 6px)`, top: `calc(50% + ${Math.sin(a) * 44}px - 6px)` }} />; })}
      </motion.div>
      <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-plum border border-urgent" />
    </div>
  );
}

function PathDraw() {
  return (
    <svg viewBox="0 0 120 70" className="w-full max-w-[200px]" style={{ height: 80 }}>
      <motion.path d="M5 60 Q 30 5 60 35 T 115 20" fill="none" stroke={URG} strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
    </svg>
  );
}

function FlipCard() {
  const [on, setOn] = React.useState(false);
  return (
    <motion.div className="w-24 h-28 cursor-pointer" style={{ perspective: 600 }} onClick={() => setOn(!on)}>
      <motion.div className="relative w-full h-full rounded-xl" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: on ? 180 : 0 }} transition={{ duration: 0.6 }}>
        <div className="absolute inset-0 rounded-xl bg-plum border border-urgent/40 flex items-center justify-center text-storm text-xs font-bold" style={{ backfaceVisibility: "hidden" }}>VOORKANT</div>
        <div className="absolute inset-0 rounded-xl bg-urgent text-plum flex items-center justify-center text-xs font-bold" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>ACHTERKANT</div>
      </motion.div>
    </motion.div>
  );
}

function Marquee() {
  return (
    <div className="w-full overflow-hidden">
      <motion.div className="flex gap-8 whitespace-nowrap text-storm/70 text-sm tracking-[0.2em] uppercase" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        <span>● LIVE DATA · STREAMING · 24/7 · </span><span>● LIVE DATA · STREAMING · 24/7 · </span>
      </motion.div>
    </div>
  );
}

function Spinners() {
  return (
    <div className="flex items-center gap-5">
      <div className="w-9 h-9 border-2 border-white/15 border-t-urgent rounded-full animate-spin" />
      <motion.div className="w-9 h-9 rounded-full border-2 border-white/15 border-b-sand" animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
      <motion.div className="w-9 h-9 rounded-full bg-sand/30" animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
    </div>
  );
}

function WaveBars() {
  return (
    <div className="flex items-end gap-1 h-20">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div key={i} className="flex-1 rounded-sm" style={{ background: i % 3 === 0 ? URG : SAND }} animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 0.9 + (i % 5) * 0.12, repeat: Infinity, delay: i * 0.04 }} />
      ))}
    </div>
  );
}

function GlowPulse() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div className="w-16 h-16 rounded-full bg-urgent/30" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
      <div className="absolute w-10 h-10 rounded-full bg-urgent flex items-center justify-center text-plum text-xs font-bold">G</div>
    </div>
  );
}

function BouncingDots() {
  return (
    <div className="flex items-center gap-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.span key={i} className="w-4 h-4 rounded-full" style={{ background: [URG, SAND, OLIVE][i % 3] }} animate={{ y: [0, -16, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

function ElasticNumber() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setN((x) => (x + 7) % 100), 1200); return () => clearInterval(id); }, []);
  return <motion.span key={n} initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="text-storm text-5xl font-bold tabular-nums">{String(n).padStart(2, "0")}</motion.span>;
}

function TiltCard() {
  return (
    <motion.div whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }} style={{ perspective: 600 }} className="rounded-xl border border-urgent/40 bg-plum p-4 w-32 h-24 flex flex-col justify-between">
      <span className="text-urgent text-[9px] tracking-widest uppercase">Hover tilt</span>
      <span className="text-storm text-lg font-bold">3D kaart</span>
    </motion.div>
  );
}

function SweepProgress() {
  return (
    <div className="w-full">
      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg,${URG},${SAND})` }} animate={{ width: ["0%", "100%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    </div>
  );
}

function StaggerList() {
  return (
    <motion.div className="flex flex-col gap-1.5" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
      {["Regel een", "Regel twee", "Regel drie"].map((t) => (
        <motion.div key={t} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-storm text-[11px]">{t}</motion.div>
      ))}
    </motion.div>
  );
}

function FadeReveal() {
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center"><p className="text-storm text-base font-semibold">Fade · Up</p><p className="text-storm/50 text-[10px]">on mount reveal</p></motion.div>;
}

export default function Animated() {
  return (
    <Section id="animated" index="06" title="Geanimeerde Elementen" desc="Framer Motion gedreven micro-interacties, morphing, orbit, path-draw en 3D-tilt." cols="lg:grid-cols-3">
      <GalleryItem n={64} title="Fade Reveal" desc="Inkomeend fade-up."><FadeReveal /></GalleryItem>
      <GalleryItem n={65} title="Stagger List" desc="Gestaggerde lijst."><StaggerList /></GalleryItem>
      <GalleryItem n={66} title="Morph Blob" desc="Morphende gradient-vorm."><MorphBlob /></GalleryItem>
      <GalleryItem n={67} title="Orbit Ring" desc="Roterende satellieten."><OrbitRing /></GalleryItem>
      <GalleryItem n={68} title="Path Draw" desc="Getekende SVG-lijn."><PathDraw /></GalleryItem>
      <GalleryItem n={69} title="Flip Card" desc="Klik om te draaien."><FlipCard /></GalleryItem>
      <GalleryItem n={70} title="Marquee" desc="Schuivende tekstband."><Marquee /></GalleryItem>
      <GalleryItem n={71} title="Spinners" desc="Drie laadvarianten."><Spinners /></GalleryItem>
      <GalleryItem n={72} title="Wave Bars" desc="Golf-animatie staven."><WaveBars /></GalleryItem>
      <GalleryItem n={73} title="Glow Pulse" desc="Pulsend glow-orb."><GlowPulse /></GalleryItem>
      <GalleryItem n={74} title="Bouncing Dots" desc="Stuiterende punten."><BouncingDots /></GalleryItem>
      <GalleryItem n={75} title="Elastic Number" desc="Spring-getal teller."><ElasticNumber /></GalleryItem>
      <GalleryItem n={76} title="Tilt Card" desc="3D hover-tilt."><TiltCard /></GalleryItem>
      <GalleryItem n={77} title="Sweep Progress" desc="Continu schuivende balk."><SweepProgress /></GalleryItem>
    </Section>
  );
}