import React from "react";
import PanelShell from "@/components/self/PanelShell";

const PHASES = ["WAKE", "ORIENT", "ROUTINE", "GET UP"];

export default function WakePanel() {
  const r = 80;
  const c = 2 * Math.PI * r;
  const pct = 42;
  return (
    <PanelShell
      section="GOOD MORNING"
      statement="ORIENT"
      context={[
        { label: "DAILY INTENTION", text: "Begin langzaam, bescherm de eerste focus-blok." },
        { label: "FIRST COMMITMENT", text: "Marktanalyse rapport — eerste concept vandaag." },
        { label: "CURRENT STATE", text: "Orient fase loopt, 42% voltooid." },
      ]}
      actions={[
        { label: "CONTINUE", primary: true },
        { label: "SKIP PHASE" },
        { label: "EXTEND" },
        { label: "END WAKE MODE" },
        { label: "OPEN WAKE" },
      ]}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(224,222,211,0.12)" strokeWidth="8" />
            <circle cx="100" cy="100" r={r} fill="none" stroke="#d5e24a" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-storm text-4xl font-bold tabular-nums">{pct}%</span>
            <span className="text-marble/50 text-[10px] tracking-[0.2em] mt-1">ORIENT</span>
          </div>
        </div>

        <div className="mt-10 w-full max-w-md">
          <p className="text-marble/40 text-[10px] uppercase tracking-wider text-center mb-4">Phase progression</p>
          <div className="relative">
            <div className="absolute top-1/2 left-3 right-3 h-px bg-marble/20" />
            <div className="flex justify-between relative">
              {PHASES.map((p, i) => {
                const done = i < 1;
                const current = i === 1;
                return (
                  <div key={p} className="flex flex-col items-center gap-2 z-10">
                    <span className={`w-4 h-4 rounded-full border-2 ${current ? "bg-urgent border-urgent animate-pulse" : done ? "bg-urgent border-urgent" : "bg-metal border-marble/40"}`} />
                    <span className={`text-[10px] tracking-wider ${current ? "text-urgent" : done ? "text-marble/70" : "text-marble/40"}`}>{p}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}