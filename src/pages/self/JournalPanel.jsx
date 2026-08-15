import React from "react";
import PanelShell from "@/components/self/PanelShell";

const MOMENTS = [
  { time: "09:10", label: "Wake", weight: "sm" },
  { time: "11:30", label: "Meeting", weight: "sm" },
  { time: "14:20", label: "Check-in", weight: "sm" },
  { time: "16:40", label: "Meaningful moment", weight: "lg", open: true },
];

const weight = { sm: "text-base text-storm", lg: "text-2xl text-storm font-semibold" };

export default function JournalPanel() {
  return (
    <PanelShell
      section="TODAY · 07 MOMENTS"
      statement="MEANINGFUL MOMENT"
      context={[
        { label: "TODAY'S HIGHLIGHT", text: "Een rustig gesprek dat richting gaf aan de middag." },
        { label: "EMERGING", text: "Slaapritme kwam vandaag meerdere keren terug." },
        { label: "OPEN", text: "Eén draad nog niet afgerond — terugkomend punt." },
      ]}
      actions={[
        { label: "ADD MOMENT", primary: true },
        { label: "EDIT JOURNAL" },
        { label: "REFLECT" },
        { label: "OPEN JOURNAL" },
      ]}
    >
      <div className="relative max-w-md mx-auto">
        <div className="absolute left-[72px] top-2 bottom-2 w-px bg-marble/20" />
        {MOMENTS.map((m, i) => (
          <div key={i} className="flex items-start gap-5 py-4 relative">
            <span className="w-14 text-marble/50 text-xs tabular-nums text-right pt-1">{m.time}</span>
            <span className={`z-10 mt-1.5 w-3 h-3 rounded-full ${m.open ? "bg-urgent animate-pulse" : "bg-marble/50"}`} />
            <div className="flex-1">
              <p className={weight[m.weight]}>{m.label}</p>
              {m.open && <div className="mt-1 h-px bg-marble/20 w-24" />}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}