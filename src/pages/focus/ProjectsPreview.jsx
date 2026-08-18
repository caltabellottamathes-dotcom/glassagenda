import React, { useState } from "react";
import { motion } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const PROJ = [
  { id: 1, name: "Concept Brons", status: "lopend", pct: 72, hours: 42, c: SAND, ms: ["Onderzoek", "Concept", "Identiteit", "Lancering"] },
  { id: 2, name: "Marktanalyse Q3", status: "lopend", pct: 45, hours: 28, c: DARK, ms: ["Data", "Analyses", "Concept", "Review"] },
  { id: 3, name: "Identiteitsherbranding", status: "gepland", pct: 12, hours: 6, c: OLIVE, ms: ["Workshop", "Moodboard", "Logo", "Richtlijnen"] },
  { id: 4, name: "Pitch Centrum West", status: "voltooid", pct: 100, hours: 18, c: URG, ms: ["Voorstel", "Ontwerp", "Pitch", "Bevestigd"] },
];
const label = { lopend: "LOPEND", gepland: "GEPLAND", voltooid: "VOLTOOID" };
const W = 340, H = 220;
const xOf = (pct) => 24 + (pct / 100) * (W - 48);
const yOf = (h) => H - 24 - (h / 50) * (H - 48);
const rOf = (h) => 8 + (h / 50) * 22;

export default function ProjectsPreview() {
  const [sel, setSel] = useState(1);
  const cur = PROJ.find(p => p.id === sel);
  return (
    <ModuleShell index="07" section="PROJECTS" statement={`${PROJ.length} PROJECTEN`} kicker="FOCUS · PORTFOLIOBUBBELS"
      context={[
        { label: "BUBBELKAART", text: "X = voortang, grootte = uren. Klik een bubbel voor milestones." },
        { label: "UREN", text: `${PROJ.reduce((s, p) => s + p.hours, 0)}u gelogd.` },
        { label: "ACTIEF", text: `${PROJ.filter(p => p.status === "lopend").length} lopend.` },
      ]}
      actions={[{ label: "New Project", primary: true }, { label: "Report" }, { label: "Open Projecten" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <div className="relative flex-1 min-h-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              <line x1="24" y1={H - 24} x2={W - 24} y2={H - 24} stroke="#ffffff20" />
              <line x1="24" y1="24" x2="24" y2={H - 24} stroke="#ffffff20" />
              {[0, 25, 50, 75, 100].map(v => <text key={v} x={xOf(v)} y={H - 10} textAnchor="middle" fontSize="8" fill="#ffffff55">{v}%</text>)}
              {[0, 25, 50].map(v => <text key={v} x="16" y={yOf(v) + 3} textAnchor="end" fontSize="8" fill="#ffffff55">{v}u</text>)}
              {PROJ.map(p => {
                const cx = xOf(p.pct), cy = yOf(p.hours), r = rOf(p.hours);
                const isSel = sel === p.id;
                return (
                  <g key={p.id} onClick={() => setSel(p.id)} style={{ cursor: "pointer" }}>
                    <motion.circle cx={cx} cy={cy} r={r} fill={`${p.c}33`} stroke={p.c} strokeWidth={isSel ? 2.5 : 1.5} animate={{ y: [cy - 2, cy + 2, cy - 2] }} transition={{ duration: 3 + p.id, repeat: Infinity, ease: "easeInOut" }} />
                    <text x={cx} y={cy + r + 11} textAnchor="middle" fontSize="8" fill={isSel ? p.c : "#ffffff80"}>{p.name.split(" ")[0]}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          {cur && (
            <div className="mt-3 rounded-2xl border border-marble/20 bg-marble/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-storm">{cur.name}</p>
                <span className="text-urgent text-sm font-bold tabular-nums">{cur.pct}%</span>
              </div>
              <div className="flex items-center justify-between">
                {cur.ms.map((m, i) => {
                  const done = cur.pct >= ((i + 1) / cur.ms.length) * 100 - 1;
                  return (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${done ? "text-storm" : "text-storm/50"}`} style={{ background: done ? cur.c : "#ffffff10", border: `1.5px solid ${done ? cur.c : "#ffffff30"}` }}>{done ? "✓" : i + 1}</div>
                        <span className="text-[8px] text-storm/50 text-center w-14">{m}</span>
                      </div>
                      {i < cur.ms.length - 1 && <div className="h-0.5 flex-1 mx-1" style={{ background: done ? cur.c : "#ffffff15" }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PROJECTEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {PROJ.map(p => (
              <button key={p.id} onClick={() => setSel(p.id)} className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${sel === p.id ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.c }} />
                <div className="flex-1 min-w-0"><p className="text-sm text-storm truncate">{p.name}</p><p className="text-[10px] text-storm/50">{p.hours}u · {label[p.status]}</p></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}