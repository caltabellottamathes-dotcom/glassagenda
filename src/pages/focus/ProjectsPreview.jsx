import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const PROJ = [
  { id: 1, name: "Concept Brons", status: "lopend", pct: 72, hours: 42, c: SAND, ms: ["Onderzoek", "Concept", "Identiteit", "Lancering"] },
  { id: 2, name: "Marktanalyse Q3", status: "lopend", pct: 45, hours: 28, c: DARK, ms: ["Data", "Analyses", "Concept", "Review"] },
  { id: 3, name: "Identiteitsherbranding", status: "gepland", pct: 12, hours: 6, c: OLIVE, ms: ["Workshop", "Moodboard", "Logo", "Richtlijnen"] },
  { id: 4, name: "Pitch Centrum West", status: "voltooid", pct: 100, hours: 18, c: URG, ms: ["Voorstel", "Ontwerp", "Pitch", "Bevestigd"] },
];
const HOURS = PROJ.map(p => ({ d: p.name.split(" ")[0], v: p.hours, c: p.c }));

export default function ProjectsPreview() {
  const [sel, setSel] = useState(1);
  const cur = PROJ.find(p => p.id === sel);
  const label = { lopend: "LOPEND", gepland: "GEPLAND", voltooid: "VOLTOOID" };
  return (
    <ModuleShell index="07" section="PROJECTS" statement={`${PROJ.length} PROJECTEN`} kicker="FOCUS · PORTFOLIO"
      context={[
        { label: "ACTIEF", text: `${PROJ.filter(p => p.status === "lopend").length} projecten lopen nu.` },
        { label: "UREN", text: `${PROJ.reduce((s, p) => s + p.hours, 0)} uur gelogd totaal.` },
        { label: "KIES", text: "Klik een project voor milestones." },
      ]}
      actions={[{ label: "New Project", primary: true }, { label: "Report" }, { label: "Archive" }, { label: "Open Projecten" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">UREN PER PROJECT</p>
            <div className="h-40 rounded-2xl border border-marble/20 bg-marble/5 p-3"><ResponsiveContainer width="100%" height="100%"><BarChart data={HOURS} layout="vertical"><XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} axisLine={false} /><Bar dataKey="v" radius={[0, 6, 6, 0]} isAnimationActive animationDuration={1000}>{HOURS.map((h, i) => <Cell key={i} fill={h.c} />)}</Bar></BarChart></ResponsiveContainer></div>
          </div>
          {cur && <div className="flex flex-col items-center"><AnimatedRing pct={cur.pct} size={160} color={cur.pct === 100 ? URG : cur.c} label={`${cur.pct}%`} sub={cur.name.toUpperCase().slice(0, 14)} /></div>}
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PROJECTEN · KLIK OM TE SELECTEREN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {PROJ.map(p => (
              <button key={p.id} onClick={() => setSel(p.id)} className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${sel === p.id ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                <span className="w-1.5 h-10 rounded-full shrink-0" style={{ background: p.c }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-storm truncate">{p.name}</p>
                  <p className="text-[10px] text-storm/50">{p.hours}u · {label[p.status]}</p>
                </div>
                <span className="text-urgent text-sm font-bold tabular-nums shrink-0">{p.pct}%</span>
              </button>
            ))}
          </div>
          {cur && (
            <div className="mt-3 rounded-2xl border border-marble/20 bg-marble/5 p-4">
              <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">MILESTONES · {cur.name}</p>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {cur.ms.map((m, i) => {
                    const done = cur.pct >= ((i + 1) / cur.ms.length) * 100 - 1;
                    return <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`px-3 py-1.5 rounded-full text-[11px] border ${done ? "bg-sand text-storm border-sand" : "border-marble/30 bg-marble/5 text-storm/60"}`}>{done ? "✓ " : ""}{m}</motion.span>;
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModuleShell>
  );
}