import React from "react";
import PanelShell from "@/components/self/PanelShell";

const ROUTINES = [
  { time: "08:00", label: "MORNING", dur: 60, done: true },
  { time: "11:30", label: "WORK", dur: 150, done: true },
  { time: "14:00", label: "MOVEMENT", dur: 30, current: true },
  { time: "17:00", label: "FOCUS SESSION", dur: 60, pending: true },
  { time: "22:00", label: "EVENING", dur: 60, pending: true },
];

const START = 6, END = 24;
const toPct = (time) => { const [h, m] = time.split(":").map(Number); return ((h - START) + m / 60) / (END - START) * 100; };
const wPct = (dur) => (dur / 60) / (END - START) * 100;
const HOURS = [6, 9, 12, 15, 18, 21, 24];

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

      {/* Day timeline */}
      <div className="rounded-2xl border border-marble/15 bg-marble/5 p-6">
        <div className="relative h-28">
          {/* hour ruler */}
          <div className="absolute top-0 left-0 right-0 flex justify-between text-marble/40 text-[10px] tabular-nums">
            {HOURS.map((h) => <span key={h} className="-translate-x-1/2" style={{ marginLeft: h === 6 ? "0.5rem" : 0, marginRight: h === 24 ? "0.5rem" : 0 }}>{String(h).padStart(2, "0")}</span>)}
          </div>
          <div className="absolute top-5 left-0 right-0 h-px bg-marble/20" />
          {/* now line */}
          <div className="absolute top-4 bottom-0 w-px bg-urgent/60" style={{ left: `${toPct("14:00")}%` }}>
            <span className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-urgent" />
          </div>
          {/* blocks */}
          <div className="absolute top-7 bottom-2 left-0 right-0">
            {ROUTINES.map((rt) => (
              <div
                key={rt.label}
                className={`absolute h-7 rounded-lg flex items-center px-2 ${rt.current ? "bg-urgent text-metal animate-pulse shadow-[0_0_0_4px_rgba(213,226,74,0.15)]" : rt.done ? "bg-marble/25 text-marble/60" : "bg-marble/10 text-marble/50 border border-marble/20"}`}
                style={{ left: `${toPct(rt.time)}%`, width: `${wPct(rt.dur)}%`, top: `${ROUTINES.indexOf(rt) * 12}px` }}
              >
                <span className="text-[9px] font-medium tracking-wide truncate">{rt.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-2 text-[10px] tracking-wider">
          <span className="flex items-center gap-1.5 text-marble/70"><span className="w-2.5 h-2.5 rounded-sm bg-marble/25"/>DONE</span>
          <span className="flex items-center gap-1.5 text-urgent"><span className="w-2.5 h-2.5 rounded-sm bg-urgent"/>NOW</span>
          <span className="flex items-center gap-1.5 text-marble/50"><span className="w-2.5 h-2.5 rounded-sm border border-marble/30"/>UPCOMING</span>
        </div>
      </div>
    </PanelShell>
  );
}