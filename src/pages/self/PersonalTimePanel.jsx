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
      index="07"
      section="PERSONAL TIME"
      statement="AVAILABLE"
      context={[
        { label: "PROTECTED", text: "Persoonlijke tijd bewust gereserveerd vandaag." },
        { label: "AVAILABLE", text: "Nog vrije ruimte in de late middag en avond." },
        { label: "AT RISK", text: "Persoonlijke tijd mogelijk onder druk door late afspraak." },
      ]}
      actions={[
        { label: "Protect Time", primary: true },
        { label: "Add Rest" },
        { label: "Add Free Time" },
        { label: "Adjust Day" },
        { label: "Open Personal Time" },
      ]}
    >
      <div className="flex items-end gap-6 mb-10">
        <div>
          <p className="text-storm text-7xl sm:text-8xl font-bold tabular-nums leading-none">02:10</p>
          <p className="text-urgent text-[11px] mt-3 tracking-[0.25em]">AVAILABLE TODAY</p>
        </div>
        <p className="text-marble/55 text-sm pb-3 max-w-xs leading-relaxed">De dag als één ruimtelijke structuur. Open ruimtes zijn visueel dominant.</p>
      </div>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center gap-5">
            <span className="w-32 text-storm text-sm font-medium tracking-wide">{row.label}</span>
            <div className="flex-1 flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`h-12 flex-1 rounded-md ${i < row.cells ? row.tone : "bg-marble/6 border border-marble/10"}`} />
              ))}
            </div>
            <span className="w-12 text-right text-marble/50 text-sm tabular-nums">{Math.round((row.cells / 20) * 100)}%</span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}