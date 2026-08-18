import React, { useState } from "react";
import { Check } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing, LiveSparkline } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const PRIO = [
  { id: 1, t: "Marktanalyse rapport afronden", done: false },
  { id: 2, t: "Concept Brons review met Giulia", done: false },
  { id: 3, t: "30 min persoonlijke tijd beschermen", done: false },
];
const NEXT = [
  { t: "10:00", title: "Marktanalyse" },
  { t: "11:30", title: "Concept Brons" },
  { t: "14:30", title: "Giulia 1:1" },
];
const ENERGY = [4, 6, 8, 9, 7, 5, 3, 2, 1, 3];

export default function JeDagPreview() {
  const [prio, setPrio] = useState(PRIO);
  const toggle = (id) => setPrio(p => p.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const done = prio.filter(p => p.done).length;
  const pct = Math.round((done / prio.length) * 100);
  const today = new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
  return (
    <ModuleShell index="06" section="JE DAG" statement="GOEDENMORGEN" kicker={today.toUpperCase()}
      context={[
        { label: "PRIORITEITEN", text: `${done}/${prio.length} voltooid.` },
        { label: "ENERGIE", text: "Piekt rond 11:00 — plan belangrijk werk dan." },
        { label: "VOLGENDE", text: NEXT[0] ? `${NEXT[0].t} ${NEXT[0].title}` : "Geen afspraken." },
      ]}
      actions={[{ label: "Start Your Day", primary: true }, { label: "Briefing" }, { label: "Reschedule" }, { label: "Open Dag" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={pct} size={180} color={pct === 100 ? URG : SAND} label={`${pct}%`} sub="KLAAR VOOR DE DAG" /></div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">ENERGIECURVE · VANDAAG</p>
            <div className="flex items-end gap-1 h-20">
              {ENERGY.map((e, i) => <div key={i} className="flex-1 rounded-t" style={{ height: `${(e / 9) * 100}%`, background: e >= 7 ? URG : e >= 4 ? SAND : DARK, opacity: 0.8 }} />)}
            </div>
            <div className="flex justify-between text-[9px] text-storm/40 mt-1"><span>06</span><span>12</span><span>18</span><span>24</span></div>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">STEMMING · LIVE</p>
            <LiveSparkline color={OLIVE} max={10} intervalMs={2000} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">TOPPRIORITEITEN · KLIK OM AF TE VINKEN</p>
          <div className="space-y-1.5 mb-4">
            {prio.map(p => (
              <button key={p.id} onClick={() => toggle(p.id)} className="w-full flex items-center gap-3 rounded-xl border border-marble/20 bg-marble/5 hover:bg-marble/10 px-4 py-2.5 text-left transition-colors">
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${p.done ? "bg-sand border-sand" : "border-marble/40"}`}>{p.done && <Check className="w-3 h-3 text-storm" />}</span>
                <p className={`text-sm ${p.done ? "text-storm/40 line-through" : "text-storm"}`}>{p.t}</p>
              </button>
            ))}
          </div>
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">VOLGENDE IN AGENDA</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {NEXT.map((n, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-marble/20 bg-marble/5 px-4 py-2.5">
                <span className="text-urgent text-sm font-bold tabular-nums w-12 shrink-0">{n.t}</span>
                <p className="text-sm text-storm flex-1 truncate">{n.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}