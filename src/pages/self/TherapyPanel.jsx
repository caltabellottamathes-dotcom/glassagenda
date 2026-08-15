import React from "react";
import PanelShell from "@/components/self/PanelShell";

function Trajectory({ name, nodes, currentIdx }) {
  return (
    <div>
      <p className="text-urgent text-[10px] uppercase tracking-[0.25em] mb-5">{name}</p>
      <div className="relative flex items-center justify-between px-4">
        <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-marble/20 -translate-y-1/2" />
        {nodes.map((n, i) => {
          const done = i < currentIdx;
          const current = i === currentIdx;
          return (
            <div key={i} className="flex flex-col items-center gap-3 z-10">
              <span className={`w-5 h-5 rounded-full border-2 ${current ? "bg-urgent border-urgent animate-pulse shadow-[0_0_0_7px_rgba(213,226,74,0.15)]" : done ? "bg-urgent border-urgent" : "bg-metal border-marble/40"}`} />
              <span className={`text-[10px] tracking-wide ${current ? "text-urgent" : done ? "text-marble/70" : "text-marble/40"}`}>{n}</span>
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
      index="04"
      section="THERAPY · 02 ACTIVE TRAJECTORIES"
      statement="IN PROGRESS"
      context={[
        { label: "CURRENT", text: "Trajectory A — wekelijkse sessies lopen." },
        { label: "RECENT", text: "Laatste sessie verschoof focus naar slaapritme." },
        { label: "NEXT", text: "Donderdag 14:00, gekoppeld aan Trajectory A." },
      ]}
      actions={[
        { label: "Add Note" },
        { label: "Add Appointment", primary: true },
        { label: "Update Progress" },
        { label: "Open Therapy" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <Trajectory name="TRAJECTORY A" nodes={["START", "MID", "NOW", "NEXT"]} currentIdx={2} />
        <Trajectory name="TRAJECTORY B" nodes={["START", "NOW", "NEXT"]} currentIdx={1} />
      </div>

      <div className="rounded-2xl border-l-4 border-urgent bg-urgent/5 px-8 py-8 flex items-center gap-8">
        <div className="text-center">
          <p className="text-urgent text-6xl font-bold leading-none">THU</p>
          <p className="text-storm text-3xl font-semibold tabular-nums mt-2">14:00</p>
        </div>
        <div className="h-20 w-px bg-marble/20" />
        <div>
          <p className="text-urgent text-[10px] uppercase tracking-[0.25em]">Next appointment</p>
          <p className="text-storm text-lg font-medium mt-2">Drs. F. Visser · Trajectory A</p>
          <p className="text-marble/50 text-sm mt-1">Praktijk Centrum West</p>
        </div>
      </div>
    </PanelShell>
  );
}