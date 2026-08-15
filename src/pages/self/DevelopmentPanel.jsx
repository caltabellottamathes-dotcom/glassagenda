import React from "react";
import PanelShell from "@/components/self/PanelShell";

const NODES = [
  { label: "LEARNING", pos: "top", status: "MOVING" },
  { label: "CREATIVE", pos: "left", status: "ACTIVE" },
  { label: "PERSONAL", pos: "right", status: "STALLED" },
  { label: "PRACTICE", pos: "bottom", status: "MOVING" },
];
const tone = { MOVING: "text-urgent", ACTIVE: "text-sky", STALLED: "text-marble/50" };

function Node({ n }) {
  const cls = {
    top: "top-0 left-1/2 -translate-x-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2",
    left: "left-0 top-1/2 -translate-y-1/2",
    right: "right-0 top-1/2 -translate-y-1/2",
  }[n.pos];
  return (
    <div className={`absolute ${cls} w-32 text-center`}>
      <div className="rounded-xl border border-marble/25 bg-marble/8 px-3 py-2">
        <p className="text-storm text-sm font-medium">{n.label}</p>
        <p className={`text-[9px] tracking-wider mt-0.5 ${tone[n.status]}`}>{n.status}</p>
      </div>
    </div>
  );
}

export default function DevelopmentPanel() {
  return (
    <PanelShell
      section="DEVELOPMENT · 04 ACTIVE AREAS"
      statement="04 ACTIVE AREAS"
      context={[
        { label: "MOVING", text: "Learning en Practice tonen zichtbare voortgang." },
        { label: "STALLED", text: "Personal al enkele weken zonder beweging." },
        { label: "NEXT", text: "Volgende stap: afronding leerblok typografie." },
      ]}
      actions={[
        { label: "ADD GOAL", primary: true },
        { label: "RECORD PROGRESS" },
        { label: "ADD LEARNING" },
        { label: "OPEN DEVELOPMENT" },
      ]}
    >
      <div className="relative w-full max-w-lg mx-auto h-72">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 288" preserveAspectRatio="none">
          <line x1="200" y1="40" x2="200" y2="144" stroke="rgba(224,222,211,0.25)" strokeWidth="1" />
          <line x1="200" y1="144" x2="200" y2="248" stroke="rgba(224,222,211,0.25)" strokeWidth="1" />
          <line x1="40" y1="144" x2="200" y2="144" stroke="rgba(224,222,211,0.25)" strokeWidth="1" />
          <line x1="200" y1="144" x2="360" y2="144" stroke="rgba(224,222,211,0.25)" strokeWidth="1" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block w-4 h-4 rounded-full bg-urgent shadow-[0_0_0_6px_rgba(213,226,74,0.15)]" />
        </div>
        {NODES.map((n) => <Node key={n.label} n={n} />)}
      </div>
    </PanelShell>
  );
}