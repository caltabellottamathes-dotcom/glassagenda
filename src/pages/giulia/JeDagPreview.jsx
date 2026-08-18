import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const PRIO = [
  { id: 1, t: "Marktanalyse rapport afronden", done: false },
  { id: 2, t: "Concept Brons review met Giulia", done: false },
  { id: 3, t: "30 min persoonlijke tijd beschermen", done: false },
];
const NEXT = [{ t: "10:00", title: "Marktanalyse" }, { t: "11:30", title: "Concept Brons" }, { t: "14:30", title: "Giulia 1:1" }];
const ENERGY = [4, 6, 8, 9, 7, 5, 3, 2, 1, 3];
const W = 360, H = 90;
const path = ENERGY.map((e, i) => `${i === 0 ? "M" : "L"} ${(i / (ENERGY.length - 1)) * W} ${H - (e / 9) * H}`).join(" ");

export default function JeDagPreview() {
  const [prio, setPrio] = useState(PRIO);
  const [now, setNow] = useState(() => new Date().getHours() + new Date().getMinutes() / 60);
  useEffect(() => { const id = setInterval(() => setNow(new Date().getHours() + new Date().getMinutes() / 60), 30000); return () => clearInterval(id); }, []);
  const toggle = (id) => setPrio(p => p.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const done = prio.filter(p => p.done).length;
  const pct = Math.round((done / prio.length) * 100);
  const today = new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
  const markerX = (now / 24) * W;
  return (
    <ModuleShell index="06" section="JE DAG" statement="GOEDENMORGEN" kicker={today.toUpperCase()}
      context={[
        { label: "COMPAS", text: "De dag als energiebaan — marker schuift mee met de tijd." },
        { label: "PRIORITEITEN", text: `${done}/${prio.length} voltooid.` },
        { label: "VOLGENDE", text: NEXT[0] ? `${NEXT[0].t} ${NEXT[0].title}` : "Geen afspraken." },
      ]}
      actions={[{ label: "Start Your Day", primary: true }, { label: "Briefing" }, { label: "Open Dag" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">ENERGIEBAAN · 06 → 24U</p>
            <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full">
              <defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={URG} stopOpacity="0.4" /><stop offset="100%" stopColor={URG} stopOpacity="0" /></linearGradient></defs>
              <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#eg)" />
              <motion.path d={path} fill="none" stroke={URG} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
              <line x1={markerX} y1="0" x2={markerX} y2={H} stroke={SAND} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={markerX} cy="8" r="5" fill={SAND}>
                <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PRIORITEITENPYRAMIDE · KLIK OM AF TE VINKEN</p>
            <div className="flex flex-col items-center gap-1.5">
              {prio.map((p, i) => (
                <button key={p.id} onClick={() => toggle(p.id)} style={{ width: `${100 - i * 12}%` }} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors ${p.done ? "border-marble/15 bg-marble/5" : "border-marble/25 bg-marble/8 hover:bg-marble/15"}`}>
                  <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${p.done ? "bg-sand border-sand" : "border-marble/40"}`}>{p.done && <Check className="w-3 h-3 text-storm" />}</span>
                  <p className={`text-sm truncate ${p.done ? "text-storm/40 line-through" : "text-storm"}`}>{p.t}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-auto pr-1">
          <p className="text-storm/50 text-[10px] tracking-[0.25em]">VOLGENDE</p>
          {NEXT.map((n, i) => (
            <div key={i} className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
              <p className="text-urgent text-xl font-bold tabular-nums">{n.t}</p>
              <p className="text-storm text-sm mt-1">{n.title}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-urgent/30 bg-urgent/5 p-4 mt-auto text-center">
            <p className="text-storm text-3xl font-bold tabular-nums">{pct}%</p>
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">KLAAR VOOR DE DAG</p>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}