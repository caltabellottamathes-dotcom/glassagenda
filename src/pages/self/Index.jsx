import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PANELS = [
  { to: "/self/daily-state", n: "01", title: "Daily State", desc: "Wat is er nu met mij aan de hand?" },
  { to: "/self/routines", n: "02", title: "Routines", desc: "Waar ben ik en wat komt hierna?" },
  { to: "/self/wake", n: "03", title: "Wake", desc: "Een frictieloze ochtend-control room." },
  { to: "/self/therapy", n: "04", title: "Therapy", desc: "Lopende trajecten en komende afspraken." },
  { to: "/self/journal", n: "05", title: "Journal", desc: "Wat verzamelde SELF vandaag?" },
  { to: "/self/development", n: "06", title: "Development", desc: "Waar beweegt momenteel iets?" },
  { to: "/self/personal-time", n: "07", title: "Personal Time", desc: "Hoeveel ruimte heb ik voor mezelf?" },
  { to: "/self/insights", n: "08", title: "Insights", desc: "Wat heeft SELF opgemerkt?" },
];

export default function SelfIndex() {
  return (
    <div className="min-h-screen w-full bg-selfbg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 85% 10%, rgba(48,23,40,0.10) 0%, rgba(48,23,40,0) 55%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-10">
        <div className="rounded-[28px] border border-plum/15 bg-selfpanel/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(48,23,40,0.12)] p-6 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-plum/50 text-[11px] uppercase tracking-[0.3em]">SELF — PANELS</span>
            <Link to="/" className="text-plum/60 hover:text-plum text-sm">← Terug</Link>
          </div>
          <h1 className="text-plum text-2xl sm:text-3xl font-bold tracking-tight">SELF</h1>
          <p className="text-plum/60 text-sm mt-3 max-w-md">Acht panelen. Eén per SELF-widget. Help me understand and act.</p>

          <div className="h-px bg-plum/15 my-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PANELS.map((p) => (
              <Link key={p.to} to={p.to} className="group rounded-2xl border border-plum/15 bg-plum/5 p-6 hover:bg-plum/10 hover:border-plum/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-plum/40 text-xs tabular-nums">{p.n}</span>
                  <ArrowRight className="w-4 h-4 text-plum/40 group-hover:text-plum transition-colors" />
                </div>
                <h3 className="text-plum text-lg font-semibold mt-4">{p.title}</h3>
                <p className="text-plum/60 text-xs mt-1 leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}