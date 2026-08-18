import React, { useState } from "react";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing } from "@/components/modules/viz";

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
const START = 6, END = 23, SPAN = END - START;
const nowH = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };

export default function DayView() {
  const [sel, setSel] = useState(null);
  const now = nowH();
  const nowPct = Math.max(0, Math.min(100, ((now - START) / SPAN) * 100));
  const elapsed = Math.round(nowPct);
  const fmtT = (h) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
  return (
    <ModuleShell index="04" section="DAY" statement="VANDAAG" kicker="UUR VOOR UUR"
      context={[
        { label: "NU", text: `Het is ${fmtT(now)}.` },
        { label: "BELASTING", text: `${BLOCKS.length} blokken gepland.` },
        { label: "VOLGENDE", text: sel ? sel.title : "Klik een blok voor detail." },
      ]}
      actions={[{ label: "Add Block", primary: true }, { label: "Jump to Now" }, { label: "Reschedule" }, { label: "Open Dag" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={elapsed} size={180} color={SAND} label={`${elapsed}%`} sub="DAG VERLOPEN" /></div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">LEGENDA</p>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-[10px] text-storm/70"><span className="w-3 h-3 rounded-sm" style={{ background: SAND }} />Werk</span>
              <span className="flex items-center gap-2 text-[10px] text-storm/70"><span className="w-3 h-3 rounded-sm" style={{ background: OLIVE }} />Afspraak/Rust</span>
              <span className="flex items-center gap-2 text-[10px] text-storm/70"><span className="w-3 h-3 rounded-sm" style={{ background: DARK }} />Onderzoek</span>
              <span className="flex items-center gap-2 text-[10px] text-storm/70"><span className="w-3 h-3 rounded-sm" style={{ background: URG }} />Belangrijk</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">TIJDLIJN · KLIK EEN BLOK</p>
          <div className="relative flex-1 min-h-0 rounded-2xl border border-marble/20 bg-marble/5 overflow-hidden">
            {Array.from({ length: SPAN + 1 }).map((_, i) => {
              const h = START + i;
              const top = (i / SPAN) * 100;
              return <div key={i} className="absolute left-0 right-0 flex items-center" style={{ top: `${top}%` }}><span className="text-[9px] text-storm/30 pl-2 w-10">{`${String(h).padStart(2, "0")}:00`}</span><div className="flex-1 h-px bg-marble/8" /></div>;
            })}
            <div className="absolute left-0 right-0 z-10 flex items-center" style={{ top: `${nowPct}%` }}><span className="w-2 h-2 rounded-full bg-urgent ml-10" /><div className="flex-1 h-px bg-urgent/70" /></div>
            {BLOCKS.map(b => {
              const top = ((b.start - START) / SPAN) * 100;
              const h = (b.dur / SPAN) * 100;
              const isSel = sel && sel.id === b.id;
              return (
                <button key={b.id} onClick={() => setSel(b)} className="absolute right-3 rounded-lg px-3 py-1.5 text-left overflow-hidden transition-all" style={{ top: `${top}%`, height: `${h}%`, left: "3.5rem", background: `${COLOR[b.cat]}40`, borderLeft: `3px solid ${COLOR[b.cat]}`, outline: isSel ? "1px solid #d5e24a" : "none" }}>
                  <p className="text-[11px] text-storm leading-tight truncate">{b.title}</p>
                  <p className="text-[9px] text-storm/55">{fmtT(b.start)}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}