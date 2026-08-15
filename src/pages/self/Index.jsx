import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageShell, Divider } from "@/components/glass";

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
    <PageShell>
      <div className="flex items-center justify-between mb-8">
        <span className="text-marble/50 text-[11px] uppercase tracking-[0.25em]">SELF — PANELS</span>
        <Link to="/" className="text-marble/70 hover:text-storm text-sm">← Terug</Link>
      </div>
      <h1 className="text-storm text-4xl sm:text-6xl font-bold tracking-tight leading-[1.02]">SELF</h1>
      <p className="text-marble/60 text-sm mt-4 max-w-md">Acht panelen. Eén per SELF-widget. Help me understand and act.</p>

      <Divider className="my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PANELS.map((p) => (
          <Link key={p.to} to={p.to} className="group rounded-2xl border border-marble/20 bg-marble/5 p-6 hover:bg-marble/12 hover:border-urgent/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-marble/40 text-xs tabular-nums">{p.n}</span>
              <ArrowRight className="w-4 h-4 text-marble/40 group-hover:text-urgent transition-colors" />
            </div>
            <h3 className="text-storm text-lg font-semibold mt-4">{p.title}</h3>
            <p className="text-marble/60 text-xs mt-1 leading-relaxed">{p.desc}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}