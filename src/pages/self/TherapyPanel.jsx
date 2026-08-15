import React from "react";
import PanelShell from "@/components/self/PanelShell";

function Trajectory({ name, nodes, currentIdx }) {
  return (
    <div>
      <p className="text-marble/50 text-[10px] uppercase tracking-wider mb-3">{name}</p>
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute left-4 right-4 top-1/2 h-px bg-marble/20" />
        {nodes.map((n, i) => {
          const done = i < currentIdx;
          const current = i === currentIdx;
          return (
            <div key={i} className="flex flex-col items-center gap-2 z-10">
              <span className={`w-4 h-4 rounded-full border-2 ${current ? "bg-urgent border-urgent animate-pulse" : done ? "bg-urgent border-urgent" : "bg-metal border-marble/40"}`} />
              <span className="text-marble/40 text-[9px] tracking-wide">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TherapyPanel() {
  return (
    <PanelShell
      section="THERAPY · 02 ACTIVE TRAJECTORIES"
      statement="IN PROGRESS"
      context={[
        { label: "CURRENT", text: "Trajectory A — wekelijkse sessies lopen." },
        { label: "RECENT", text: "Laatste sessie verschoof focus naar slaapritme." },
        { label: "NEXT", text: "Donderdag 14:00, gekoppeld aan Trajectory A." },
      ]}
      actions={[
        { label: "ADD NOTE" },
        { label: "ADD APPOINTMENT", primary: true },
        { label: "UPDATE PROGRESS" },
        { label: "OPEN THERAPY" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Trajectory name="TRAJECTORY A" nodes={["START", "MID", "NOW", "NEXT"]} currentIdx={2} />
        <Trajectory name="TRAJECTORY B" nodes={["START", "NOW", "NEXT"]} currentIdx={1} />
      </div>

      <div className="rounded-2xl border border-urgent/30 bg-urgent/5 p-6 flex items-center gap-6">
        <div className="text-center">
          <p className="text-urgent text-4xl font-bold leading-none">THU</p>
          <p className="text-storm text-2xl font-semibold tabular-nums mt-1">14:00</p>
        </div>
        <div className="h-14 w-px bg-marble/20" />
        <div>
          <p className="text-marble/50 text-[10px] uppercase tracking-wider">Next appointment</p>
          <p className="text-storm text-sm font-medium mt-1">Drs. F. Visser · Trajectory A</p>
          <p className="text-marble/50 text-xs">Praktijk Centrum West</p>
        </div>
      </div>
    </PanelShell>
  );
}