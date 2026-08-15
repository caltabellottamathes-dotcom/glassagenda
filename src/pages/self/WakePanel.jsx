import React from "react";
import PanelShell from "@/components/self/PanelShell";

const PHASES = [
  { label: "WAKE", state: "DONE" },
  { label: "ORIENT", state: "NOW" },
  { label: "ROUTINE", state: "NEXT" },
  { label: "GET UP", state: "—" },
];

export default function WakePanel() {
  const r = 96, c = 2 * Math.PI * r, pct = 42;
  return (
    <PanelShell
      index="03"
      section="GOOD MORNING"
      statement="ORIENT"
      context={[
        { label: "DAILY INTENTION", text: "Begin langzaam, bescherm de eerste focus-blok." },
        { label: "FIRST COMMITMENT", text: "Marktanalyse rapport — eerste concept vandaag." },
        { label: "CURRENT STATE", text: "Orient fase loopt, 42% voltooid." },
      ]}
      actions={[
        { label: "Continue", primary: true },
        { label: "Skip Phase" },
        { label: "Extend" },
        { label: "End Wake Mode" },
        { label: "Open Wake" },
      ]}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(224,222,211,0.12)" strokeWidth="6" />
            <circle cx="100" cy="100" r={r} fill="none" stroke="#d5e24a" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-storm text-6xl font-bold tabular-nums leading-none">{pct}<span className="text-3xl">%</span></span>
            <span className="text-urgent text-[11px] tracking-[0.3em] mt-3">ORIENT</span>
          </div>
        </div>

        <div className="mt-12 w-full max-w-xl">
          <div className="relative">
            <div className="absolute top-4 left-6 right-6 h-1 rounded-full bg-marble/15" />
            <div className="absolute top-4 left-6 h-1 rounded-full bg-urgent" style={{ width: "33%" }} />
            <div className="flex justify-between relative">
              {PHASES.map((p) => {
                const done = p.state === "DONE";
                const current = p.state === "NOW";
                return (
                  <div key={p.label} className="flex flex-col items-center gap-3 z-10">
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${current ? "bg-urgent border-urgent animate-pulse shadow-[0_0_0_8px_rgba(213,226,74,0.15)]" : done ? "bg-urgent border-urgent" : "bg-metal border-marble/40"}`} />
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${current ? "text-urgent" : done ? "text-storm" : "text-marble/60"}`}>{p.label}</p>
                      <p className={`text-[9px] tracking-[0.2em] mt-1 ${current ? "text-urgent" : "text-marble/40"}`}>{p.state}</p>
                    </div>
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