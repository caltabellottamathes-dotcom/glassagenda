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
    <div className={`absolute ${cls} w-40 text-center`}>
      <div className="rounded-2xl border border-marble/25 bg-marble/8 px-4 py-3">
        <p className="text-storm text-base font-semibold">{n.label}</p>
        <p className={`text-[10px] tracking-[0.2em] mt-1 ${tone[n.status]}`}>{n.status}</p>
      </div>
    </div>
  );
}

export default function DevelopmentPanel() {
  return (
    <PanelShell
      index="06"
      section="DEVELOPMENT · 04 ACTIVE AREAS"
      statement="04 ACTIVE AREAS"
      context={[
        { label: "MOVING", text: "Learning en Practice tonen zichtbare voortgang." },
        { label: "STALLED", text: "Personal al enkele weken zonder beweging." },
        { label: "NEXT", text: "Volgende stap: afronding leerblok typografie." },
      ]}
      actions={[
        { label: "Add Goal", primary: true },
        { label: "Record Progress" },
        { label: "Add Learning" },
        { label: "Open Development" },
      ]}
    >
      <div className="relative w-full max-w-2xl mx-auto h-96">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 384" preserveAspectRatio="none">
          <line x1="240" y1="48" x2="240" y2="192" stroke="rgba(224,222,211,0.25)" strokeWidth="2" />
          <line x1="240" y1="192" x2="240" y2="336" stroke="rgba(224,222,211,0.25)" strokeWidth="2" />
          <line x1="48" y1="192" x2="240" y2="192" stroke="rgba(224,222,211,0.25)" strokeWidth="2" />
          <line x1="240" y1="192" x2="432" y2="192" stroke="rgba(224,222,211,0.25)" strokeWidth="2" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="block w-6 h-6 rounded-full bg-urgent shadow-[0_0_0_10px_rgba(213,226,74,0.15)]" />
          <span className="text-marble/40 text-[9px] tracking-[0.2em] mt-3">NOW</span>
        </div>
        {NODES.map((n) => <Node key={n.label} n={n} />)}
      </div>

      <div className="flex justify-center gap-6 mt-4">
        {Object.entries(tone).map(([k, v]) => (
          <span key={k} className="flex items-center gap-2 text-[10px] tracking-wider uppercase">
            <span className={`w-2.5 h-2.5 rounded-full ${k === "MOVING" ? "bg-urgent" : k === "ACTIVE" ? "bg-sky" : "bg-marble/40"}`} />
            <span className={v}>{k}</span>
          </span>
        ))}
      </div>
    </PanelShell>
  );
}