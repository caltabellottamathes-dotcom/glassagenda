import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", URG = "#d5e24a";
const TRANSCRIPT = [
  { who: "g", t: "Goedemorgen. Hoe wil je vandaag beginnen?" },
  { who: "u", t: "Eerst de marktanalyse afronden." },
  { who: "g", t: "Begrepen. Ik houd je agenda om 11 vrij." },
  { who: "u", t: "Perfect, dank je." },
];
const BARS = 36;

export default function ChatVoiceCall() {
  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [lines, setLines] = useState(TRANSCRIPT.slice(0, 2));
  const endRef = useRef(null);
  useEffect(() => { const id = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(id); }, []);
  useEffect(() => { if (lines.length >= TRANSCRIPT.length) return; const id = setTimeout(() => setLines(l => [...l, TRANSCRIPT[l.length]]), 2400); return () => clearTimeout(id); }, [lines]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return (
    <ModuleShell index="09" section="VOICE CALL" statement="GIULIA" kicker={`VERBONDEN · ${fmt(secs)}`}
      context={[
        { label: "RADIOPULS", text: "Concentrische ringen ademen; de radiale equalizer reageert op je stem." },
        { label: "STATUS", text: muted ? "Gedempt." : "Actief gesprek." },
        { label: "TRANSCRIPT", text: "Verschijnt live tijdens het bellen." },
      ]}
      actions={[{ label: "Speaker", primary: true }, { label: "Transcript" }, { label: "Open Call" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-6">
          <svg viewBox="-160 -160 320 320" className="w-full max-w-[420px] aspect-square">
            {[0, 1, 2].map(i => (
              <circle key={i} r="40" fill="none" stroke={URG} strokeWidth="1.5" strokeOpacity="0.4">
                <animate attributeName="r" values="40;150;40" dur={`${3 + i}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur={`${3 + i}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {Array.from({ length: BARS }).map((_, i) => {
              const a = (i / BARS) * 2 * Math.PI;
              const x1 = Math.cos(a) * 92, y1 = Math.sin(a) * 92;
              const x2 = Math.cos(a) * (92 + (muted ? 6 : 28)), y2 = Math.sin(a) * (92 + (muted ? 6 : 28));
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 3 === 0 ? URG : SAND} strokeWidth="3" strokeLinecap="round">
                <animate attributeName="opacity" values={muted ? "0.3;0.3" : "1;0.3;1"} dur={`${0.8 + (i % 5) * 0.1}s`} repeatCount="indefinite" />
              </line>;
            })}
            <circle r="74" fill="#301728" stroke={URG} strokeWidth="2" />
            <text x="0" y="8" textAnchor="middle" fontSize="40" fontWeight="700" fill={URG}>G</text>
          </svg>
          <p className="text-storm text-3xl font-bold tabular-nums">{fmt(secs)}</p>
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
                <span className="block text-[8px] text-storm/50 mb-0.5">{l.who === "g" ? "GIULIA" : "JIJ"}</span>{l.t}
              </motion.div>
            ))}
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}