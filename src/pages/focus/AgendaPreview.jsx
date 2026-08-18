import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing, LiveSparkline } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const DAYS = [{ d: "Ma", v: 4 }, { d: "Di", v: 6 }, { d: "Wo", v: 3 }, { d: "Do", v: 7 }, { d: "Vr", v: 5 }, { d: "Za", v: 1 }, { d: "Zo", v: 0 }];
const APPTS = [
  { id: 1, t: "09:00", dur: 60, title: "Standup", cat: "A" },
  { id: 2, t: "11:00", dur: 90, title: "Concept Brons", cat: "U" },
  { id: 3, t: "13:00", dur: 45, title: "Lunch", cat: "B" },
  { id: 4, t: "14:30", dur: 60, title: "Giulia 1:1", cat: "B" },
  { id: 5, t: "16:30", dur: 60, title: "Onderzoek", cat: "C" },
];
const COLOR = { A: SAND, B: OLIVE, C: DARK, U: URG };

export default function AgendaPreview() {
  const [sel, setSel] = useState(null);
  return (
    <ModuleShell index="02" section="AGENDA" statement={`${APPTS.length} AFSPRAKEN`} kicker="FOCUS · VANDAAG"
      context={[
        { label: "VANDAAG", text: `${APPTS.length} afspraken, totaal ${APPTS.reduce((s, a) => s + a.dur, 0)} min.` },
        { label: "DRUKSTE", text: "Donderdag is de drukste dag deze week." },
        { label: "VOLGENDE", text: sel ? sel.title : "Klik een afspraak voor detail." },
      ]}
      actions={[{ label: "New Appointment", primary: true }, { label: "Today" }, { label: "Sync" }, { label: "Open Agenda" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={68} size={180} color={SAND} label="68%" sub="BEZET VANDAAG" /></div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">LADING PER DAG</p>
            <div className="h-32 rounded-2xl border border-marble/20 bg-marble/5 p-3"><ResponsiveContainer width="100%" height="100%"><BarChart data={DAYS}><XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} /><Bar dataKey="v" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1100}>{DAYS.map((w, i) => <Cell key={i} fill={i === 3 ? URG : SAND} />)}</Bar></BarChart></ResponsiveContainer></div>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">VERANDERINGEN · LIVE</p>
            <LiveSparkline color={OLIVE} max={6} intervalMs={2200} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">VANDAAG · KLIK VOOR DETAIL</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {APPTS.map(a => (
              <button key={a.id} onClick={() => setSel(a)} className={`w-full flex items-stretch gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${sel && sel.id === a.id ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                <span className="w-1 rounded-full shrink-0" style={{ background: COLOR[a.cat] }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><p className="text-sm text-storm truncate">{a.title}</p><span className="text-[10px] text-storm/40 tabular-nums shrink-0">{a.t}</span></div>
                  <p className="text-[10px] text-storm/50 mt-0.5">{a.dur} min</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}