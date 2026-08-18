import React, { useState, useEffect } from "react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const BLOCKS = [
  { id: 1, start: 7.5, dur: 1, title: "Ochtendroutine", cat: "B" },
  { id: 2, start: 9, dur: 2, title: "Marktanalyse", cat: "U" },
  { id: 3, start: 11.5, dur: 1, title: "Concept Brons", cat: "A" },
  { id: 4, start: 13, dur: 1, title: "Lunch", cat: "B" },
  { id: 5, start: 14.5, dur: 1.5, title: "Giulia 1:1", cat: "B" },
  { id: 6, start: 16.5, dur: 1, title: "Onderzoek", cat: "C" },
  { id: 7, start: 19, dur: 1.5, title: "Diner & rust", cat: "B" },
];
const COLOR = { A: SAND, B: OLIVE, C: DARK, U: URG };
const R = 130;
const C = 2 * Math.PI * R;

export default function DayView() {
  const [sel, setSel] = useState(null);
  const [now, setNow] = useState(() => new Date().getHours() + new Date().getMinutes() / 60);
  useEffect(() => { const id = setInterval(() => setNow(new Date().getHours() + new Date().getMinutes() / 60), 30000); return () => clearInterval(id); }, []);
  const ang = (now / 24) * 360 - 90;
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
  return (
    <ModuleShell index="04" section="DAY" statement="VANDAAG" kicker="24-UURSKLOK"
      context={[
        { label: "NU", text: `Het is ${fmt(now)}.` },
        { label: "BELASTING", text: `${BLOCKS.length} blokken gepland.` },
        { label: "VOLGENDE", text: sel ? sel.title : "Klik een boog voor detail." },
      ]}
      actions={[{ label: "Add Block", primary: true }, { label: "Jump to Now" }, { label: "Open Dag" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="-200 -200 400 400" className="w-full max-w-[460px] aspect-square">
            <circle r={R} fill="none" stroke="#ffffff10" strokeWidth="22" />
            {BLOCKS.map(b => {
              const seg = (b.dur / 24) * C;
              const off = -(b.start / 24) * C;
              const isSel = sel && sel.id === b.id;
              return <circle key={b.id} r={R} fill="none" stroke={COLOR[b.cat]} strokeWidth={isSel ? 26 : 20} strokeLinecap="round" strokeDasharray={`${seg} ${C}`} strokeDashoffset={off} transform="rotate(-90 0 0)" opacity={sel && !isSel ? 0.5 : 0.95} onClick={() => setSel(b)} style={{ cursor: "pointer" }} />;
            })}
            <g transform={`rotate(${ang} 0 0)`}>
              <line x1="0" y1="-40" x2="0" y2={-R - 14} stroke={URG} strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy={-R - 14} r="5" fill={URG} />
            </g>
            <circle r="30" fill="#301728" stroke="#ffffff20" />
            <text x="0" y="4" textAnchor="middle" fontSize="11" fill="#ffffffcc">{fmt(now)}</text>
            {Array.from({ length: 24 }).filter((_, i) => i % 3 === 0).map(i => {
              const a = (i / 24) * 2 * Math.PI - Math.PI / 2;
              return <text key={i} x={Math.cos(a) * (R + 30)} y={Math.sin(a) * (R + 30) + 3} textAnchor="middle" fontSize="8" fill="#ffffff55">{String(i).padStart(2, "0")}</text>;
            })}
          </svg>
        </div>
        <div className="flex flex-col gap-3 overflow-auto pr-1">
          <p className="text-storm/50 text-[10px] tracking-[0.25em]">BLOKKEN · KLIK OP EEN BOOG</p>
          {BLOCKS.map(b => (
            <button key={b.id} onClick={() => setSel(b)} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${sel && sel.id === b.id ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
              <span className="w-1.5 h-8 rounded-full shrink-0" style={{ background: COLOR[b.cat] }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-storm truncate">{b.title}</p>
                <p className="text-[10px] text-storm/50">{fmt(b.start)} · {b.dur}u</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ModuleShell>
  );
}