import React from "react";
import { SectionHeader } from "@/components/glass";

const QUADS = [
  { title: "Doen nu", tone: "text-urgent", items: ["Marktanalyse deadline", "Klantgesprek Giulia"] },
  { title: "Plannen", tone: "text-sky", items: ["Rapport opstellen", "Identiteit uitwerken"] },
  { title: "Delegeren", tone: "text-sand", items: ["Notities opschonen"] },
  { title: "Laten", tone: "text-marble/60", items: ["Willekeurig surfen"] },
];

export default function PriorityMatrix() {
  return (
    <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4 flex flex-col">
      <SectionHeader number={4} title="Prioriteiten Matrix" />
      <div className="grid grid-cols-2 gap-2 mt-3 flex-1">
        {QUADS.map((q) => (
          <div key={q.title} className="rounded-xl border border-marble/15 bg-marble/5 p-2.5 min-h-[88px]">
            <p className={`text-[11px] font-semibold ${q.tone}`}>{q.title}</p>
            <ul className="mt-1.5 space-y-1">
              {q.items.map((it) => (
                <li key={it} className="text-marble/70 text-[10px] leading-tight">• {it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}