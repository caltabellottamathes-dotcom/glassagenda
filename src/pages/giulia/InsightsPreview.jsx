import React, { useState } from "react";
import { motion } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const INSIGHTS = [
  { id: 1, title: "Je energie daalt na 15:00", conf: 88, text: "Plan zware taken vóór de middag.", c: URG, x: 0, y: 0 },
  { id: 2, title: "Persoonlijke tijd onder druk", conf: 74, text: "12% minder vrije tijd deze week.", c: SAND, x: 1, y: 1 },
  { id: 3, title: "Concept Brons vordert snel", conf: 91, text: "2 dagen voor op schema.", c: OLIVE, x: -1, y: 0.5 },
  { id: 4, title: "Contact T. Bakker verkoelt", conf: 62, text: "18 dagen geen contact.", c: DARK, x: 0.5, y: -1 },
];
const R = 80, C = 2 * Math.PI * R;

export default function InsightsPreview() {
  const [open, setOpen] = useState(1);
  const avg = Math.round(INSIGHTS.reduce((s, i) => s + i.conf, 0) / INSIGHTS.length);
  return (
    <ModuleShell index="05" section="INSIGHTS" statement={`${INSIGHTS.length} INZICHTEN`} kicker="GIULIA · INZICHTENRIVIER"
      context={[
        { label: "RIVIER", text: "Inzichten drijven op de stroom — grootte = zekerheid." },
        { label: "GEM. ZEKERHEID", text: `${avg}% gemiddeld.` },
        { label: "ACTIE", text: "Klik een inzicht om uit te klappen." },
      ]}
      actions={[{ label: "Generate More", primary: true }, { label: "Share" }, { label: "Open Insights" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="-120 -120 240 240" className="w-full max-w-[240px] aspect-square">
            <circle r={R} fill="none" stroke="#ffffff10" strokeWidth="14" />
            <circle r={R} fill="none" stroke={URG} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${(avg / 100) * C} ${C}`} transform="rotate(-90 0 0)" />
            <text x="0" y="-2" textAnchor="middle" fontSize="34" fontWeight="700" fill={URG}>{avg}</text>
            <text x="0" y="16" textAnchor="middle" fontSize="9" fill="#ffffff80">ZEKERHEID %</text>
          </svg>
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mt-3">GEMIDDELDE</p>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">KLIK OM UIT TE KLAPPEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {INSIGHTS.map(ins => (
              <motion.div key={ins.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: [0, -4, 0] }} transition={{ y: { duration: 4 + ins.id, repeat: Infinity, ease: "easeInOut" } }} className="rounded-2xl border border-marble/20 bg-marble/5 overflow-hidden" style={{ borderLeft: `3px solid ${ins.c}` }}>
                <button onClick={() => setOpen(open === ins.id ? null : ins.id)} className="w-full flex items-center gap-3 px-4 py-3 text-left">
                  <span className="text-storm font-bold tabular-nums" style={{ fontSize: `${14 + ins.conf / 8}px` }}>{ins.conf}%</span>
                  <p className="text-sm text-storm flex-1 truncate">{ins.title}</p>
                </button>
                {open === ins.id && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 pb-4 text-storm/70 text-sm leading-relaxed">{ins.text}</motion.p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}