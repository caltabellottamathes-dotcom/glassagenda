import React from "react";
import PanelShell from "@/components/self/PanelShell";

const ROUTINES = [
  { time: "08:00", label: "MORNING", done: true },
  { time: "11:30", label: "WORK", done: true },
  { time: "14:00", label: "CURRENT · MOVEMENT", current: true },
  { time: "17:00", label: "MOVEMENT", pending: true },
  { time: "22:00", label: "EVENING", pending: true },
];

export default function RoutinesPanel() {
  return (
    <PanelShell
      section="ROUTINES · 3 / 5 COMPLETE"
      statement="MOVEMENT"
      context={[
        { label: "CURRENT", text: "MOVEMENT — 14:00 → 14:30" },
        { label: "NEXT", text: "FOCUS SESSION scheduled at 17:00." },
        { label: "PROGRESS", text: "3 of 5 routines complete today." },
      ]}
      actions={[
        { label: "COMPLETE", primary: true },
        { label: "SKIP" },
        { label: "RESCHEDULE" },
        { label: "EDIT ROUTINE" },
        { label: "OPEN ROUTINES" },
      ]}
    >
      <div className="relative max-w-sm mx-auto">
        <div className="absolute left-[88px] top-4 bottom-4 w-px bg-marble/20" />
        <div className="flex flex-col">
          {ROUTINES.map((r, i) => (
            <div key={i} className="flex items-center gap-5 py-4 relative">
              <span className="w-16 text-marble/50 text-xs tabular-nums text-right">{r.time}</span>
              <span className="relative z-10">
                {r.current ? (
                  <span className="block w-5 h-5 rounded-full bg-urgent animate-pulse shadow-[0_0_0_6px_rgba(213,226,74,0.15)]" />
                ) : r.done ? (
                  <span className="block w-3.5 h-3.5 rounded-full bg-urgent border-2 border-metal" />
                ) : (
                  <span className="block w-3.5 h-3.5 rounded-full border-2 border-marble/40 bg-marble/5" />
                )}
              </span>
              <span className={`capitalize ${r.current ? "text-urgent font-semibold text-lg" : r.done ? "text-marble/60 line-through" : "text-storm"}`}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}