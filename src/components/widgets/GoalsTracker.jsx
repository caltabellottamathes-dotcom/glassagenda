import React from "react";
import { SectionHeader } from "@/components/glass";

const GOALS = [
  { name: "Marktanalyse Q3", progress: 72, tone: "bg-urgent" },
  { name: "Identiteit pakket", progress: 45, tone: "bg-sky" },
  { name: "Concept Brons pitch", progress: 30, tone: "bg-sand" },
  { name: "Onderzoek doelgroep", progress: 90, tone: "bg-clay" },
];

export default function GoalsTracker() {
  return (
    <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4 flex flex-col">
      <SectionHeader number={6} title="Doelen" />
      <div className="mt-3 space-y-3 flex-1">
        {GOALS.map((g) => (
          <div key={g.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-storm">{g.name}</span>
              <span className="text-marble/60 tabular-nums">{g.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-marble/10 overflow-hidden">
              <div className={`h-full rounded-full ${g.tone}`} style={{ width: `${g.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}