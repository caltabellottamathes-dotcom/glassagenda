import React from "react";
import PanelShell from "@/components/self/PanelShell";

const ROUTINES = [
  { time: "08:00", label: "MORNING", done: true },
  { time: "11:30", label: "WORK", done: true },
  { time: "14:00", label: "MOVEMENT", current: true },
  { time: "17:00", label: "MOVEMENT", pending: true },
  { time: "22:00", label: "EVENING", pending: true },
];

export default function RoutinesPanel() {
  const r = 54, c = 2 * Math.PI * r, pct = 60;
  return (
    <PanelShell
      index="02"
      section="ROUTINES"
      statement="MOVEMENT"
      context={[
        { label: "CURRENT", text: "MOVEMENT — 14:00 → 14:30" },
        { label: "NEXT", text: "FOCUS SESSION scheduled at 17:00." },
        { label: "PROGRESS", text: "3 of 5 routines complete today." },
      ]}
      actions={[
        { label: "Complete", primary: true },
        { label: "Skip" },
        { label: "Reschedule" },
        { label: "Edit Routine" },
        { label: "Open Routines" },
      ]}
    >
      <div className="flex items-center gap-6 mb-10">
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(224,222,211,0.12)" strokeWidth="7" />
            <circle cx="64" cy="64" r={r} fill="none" stroke="#d5e24a" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-storm text-2xl font-bold tabular-nums leading-none">3/5</span>
            <span className="text-marble/50 text-[9px] tracking-wider mt-1">COMPLETE</span>
          </div>
        </div>
        <p className="text-marble/60 text-sm leading-relaxed max-w-sm">De dag loopt in vijf routines. Je bent aangekomen bij de middag — beweging staat klaar.</p>
      </div>

      <div className="relative max-w-lg mx-auto">
        <div className="absolute left-[120px] top-5 bottom-5 w-px bg-marble/20" />
        {ROUTINES.map((rt, i) => (
          <div key={i} className="flex items-center gap-6 py-5 relative">
            <span className="w-24 text-storm text-xl font-semibold tabular-nums text-right">{rt.time}</span>
            <span className="relative z-10">
              {rt.current ? (
                <span className="block w-7 h-7 rounded-full bg-urgent animate-pulse shadow-[0_0_0_8px_rgba(213,226,74,0.15)]" />
              ) : rt.done ? (
                <span className="block w-5 h-5 rounded-full bg-urgent border-2 border-metal" />
              ) : (
                <span className="block w-5 h-5 rounded-full border-2 border-marble/40 bg-marble/5" />
              )}
            </span>
            <span className={`uppercase tracking-wide ${rt.current ? "text-urgent text-2xl font-bold" : rt.done ? "text-marble/55 line-through text-lg" : "text-storm text-lg"}`}>
              {rt.label}
            </span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}