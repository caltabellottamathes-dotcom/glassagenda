import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", URG = "#d5e24a";
const BARS = Array.from({ length: 28 });
const TRANSCRIPT = [
  { who: "g", t: "Goedemorgen. Hoe wil je vandaag beginnen?" },
  { who: "u", t: "Eerst de marktanalyse afronden." },
  { who: "g", t: "Begrepen. Ik houd je agenda rond 11 vrij." },
  { who: "u", t: "Perfect, dank je." },
];

export default function ChatVoiceCall() {
  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [lines, setLines] = useState(TRANSCRIPT.slice(0, 2));
  const endRef = useRef(null);
  useEffect(() => { const id = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(id); }, []);
  useEffect(() => { if (lines.length >= TRANSCRIPT.length) return; const id = setTimeout(() => setLines(l => [...l, TRANSCRIPT[l.length]]), 2200); return () => clearTimeout(id); }, [lines]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return (
    <ModuleShell index="09" section="VOICE CALL" statement="GIULIA" kicker={`VERBONDEN · ${fmt(secs)}`}
      context={[
        { label: "STATUS", text: muted ? "Gedempt — GIULIA luistert niet." : "Actief gesprek met GIULIA." },
        { label: "TRANSCRIPT", text: "Wordt live opgebouwd tijdens het bellen." },
        { label: "TIP", text: "Druk op dempen om de microfoon uit te zetten." },
      ]}
      actions={[{ label: "Speaker", primary: true }, { label: "Transcript" }, { label: "Hold" }, { label: "Open Call" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative w-40 h-40 rounded-full bg-plum/40 flex items-center justify-center">
            <motion.span className="absolute inset-0 rounded-full border-2 border-urgent" animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-storm text-2xl font-bold tracking-widest">G</span>
          </div>
          <div className="flex items-end gap-1 h-24">
            {BARS.map((_, i) => (
              <motion.span key={i} className="w-1.5 rounded-full" style={{ background: i % 3 === 0 ? URG : SAND }} animate={{ scaleY: muted ? 0.15 : [0.3, 1, 0.3] }} transition={{ duration: 0.8 + (i % 5) * 0.12, repeat: Infinity, delay: i * 0.04 }} />
            ))}
          </div>
          <p className="text-storm text-2xl font-bold tabular-nums">{fmt(secs)}</p>
          <div className="flex gap-4">
            <button onClick={() => setMuted(m => !m)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 ${muted ? "bg-marble/10 text-storm/50" : "bg-sand text-storm"}`}>{muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}</button>
            <button className="w-14 h-14 rounded-full bg-urgent text-plum flex items-center justify-center active:scale-95 transition-all"><PhoneOff className="w-6 h-6" /></button>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-2xl border border-marble/20 bg-marble/5">
          <div className="px-4 py-3 border-b border-marble/15"><p className="text-storm/50 text-[10px] tracking-[0.25em]">LIVE TRANSCRIPT</p></div>
          <div className="flex-1 overflow-auto p-4 space-y-2">
            {lines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${l.who === "g" ? "bg-plum/50 text-storm rounded-bl-sm" : "bg-sand text-storm ml-auto rounded-br-sm"}`}>
                <span className="block text-[8px] text-storm/50 mb-0.5">{l.who === "g" ? "GIULIA" : "JIJ"}</span>
                {l.t}
              </motion.div>
            ))}
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}