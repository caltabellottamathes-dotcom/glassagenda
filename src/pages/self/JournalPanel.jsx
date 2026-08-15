import React from "react";
import PanelShell from "@/components/self/PanelShell";

const MOMENTS = [
  { time: "09:10", label: "Wake", weight: "sm" },
  { time: "11:30", label: "Meeting", weight: "sm" },
  { time: "14:20", label: "Check-in", weight: "sm" },
  { time: "16:40", label: "Meaningful moment", weight: "lg", open: true },
];

const size = { sm: "text-2xl text-storm font-normal", lg: "text-4xl sm:text-5xl text-storm font-bold tracking-tight" };

export default function JournalPanel() {
  return (
    <PanelShell
      index="05"
      section="TODAY · 07 MOMENTS"
      statement="MEANINGFUL MOMENT"
      context={[
        { label: "TODAY'S HIGHLIGHT", text: "Een rustig gesprek dat richting gaf aan de middag." },
        { label: "EMERGING", text: "Slaapritme kwam vandaag meerdere keren terug." },
        { label: "OPEN", text: "Eén draad nog niet afgerond — terugkomend punt." },
      ]}
      actions={[
        { label: "Add Moment", primary: true },
        { label: "Edit Journal" },
        { label: "Reflect" },
        { label: "Open Journal" },
      ]}
    >
      <div className="relative max-w-xl mx-auto">
        <div className="absolute left-[124px] top-6 bottom-6 w-px bg-marble/20" />
        {MOMENTS.map((m, i) => (
          <div key={i} className="flex items-start gap-6 py-6 relative">
            <span className="w-24 text-storm text-xl font-semibold tabular-nums text-right pt-1">{m.time}</span>
            <span className={`z-10 mt-2.5 w-4 h-4 rounded-full ${m.open ? "bg-urgent animate-pulse shadow-[0_0_0_6px_rgba(213,226,74,0.15)]" : "bg-marble/50"}`} />
            <div className="flex-1">
              <p className={size[m.weight]}>{m.label}</p>
              {m.open && <div className="mt-3 h-px bg-urgent/40 w-40" />}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}