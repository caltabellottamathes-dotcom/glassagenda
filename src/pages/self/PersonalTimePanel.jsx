import React from "react";
import PanelShell from "@/components/self/PanelShell";

const ROWS = [
  { label: "WORK", cells: 14, tone: "bg-marble/30" },
  { label: "PERSONAL", cells: 4, tone: "bg-urgent/50" },
  { label: "APPOINTMENT", cells: 3, tone: "bg-sky/50" },
  { label: "FREE", cells: 0, tone: "bg-marble/20" },
  { label: "REST", cells: 0, tone: "bg-marble/20" },
];

export default function PersonalTimePanel() {
  return (
    <PanelShell
      section="PERSONAL TIME · 02:10 AVAILABLE TODAY"
      statement="AVAILABLE"
      context={[
        { label: "PROTECTED", text: "Persoonlijke tijd bewust gereserveerd vandaag." },
        { label: "AVAILABLE", text: "Nog vrije ruimte in de late middag en avond." },
        { label: "AT RISK", text: "Persoonlijke tijd mogelijk onder druk door late afspraak." },
      ]}
      actions={[
        { label: "PROTECT TIME", primary: true },
        { label: "ADD REST" },
        { label: "ADD FREE TIME" },
        { label: "ADJUST DAY" },
        { label: "OPEN PERSONAL TIME" },
      ]}
    >
      <div className="flex flex-col gap-5 max-w-2xl mx-auto">
        {ROWS.map((r) => (
          <div key={r.label} className="flex items-center gap-4">
            <span className="w-28 text-marble/60 text-xs tracking-wider">{r.label}</span>
            <div className="flex-1 flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`h-7 flex-1 rounded-sm ${i < r.cells ? r.tone : "bg-marble/6 border border-marble/10"}`} />
              ))}
            </div>
            <span className="w-12 text-right text-marble/50 text-xs tabular-nums">{Math.round((r.cells / 20) * 100)}%</span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}