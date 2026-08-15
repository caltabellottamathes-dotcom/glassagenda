import React from "react";
import PanelShell from "@/components/self/PanelShell";

const VALUES = [
  { v: 72, l: "ENERGY" },
  { v: 58, l: "CAPACITY" },
  { v: 64, l: "MOOD" },
];

export default function DailyStatePanel() {
  return (
    <PanelShell
      section="DAILY STATE"
      statement="STEADY"
      context={[
        { label: "WHAT CHANGED", text: "Capacity has decreased since this morning." },
        { label: "WHAT MATTERS NOW", text: "Your afternoon is relatively full while available capacity is lower." },
        { label: "NOW", text: "Steady state — no sharp shifts across the three signals." },
      ]}
      actions={[
        { label: "CHECK IN", primary: true },
        { label: "ADJUST DAY" },
        { label: "ADD PERSONAL TIME" },
        { label: "OPEN DAILY STATE" },
      ]}
    >
      <div className="grid grid-cols-3 gap-4">
        {VALUES.map((x) => (
          <div key={x.l} className="rounded-2xl border border-marble/20 bg-marble/5 p-6 text-center">
            <p className="text-storm text-5xl sm:text-6xl font-bold tabular-nums">{x.v}</p>
            <p className="text-marble/50 text-[10px] mt-3 tracking-[0.2em]">{x.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-marble/15 bg-marble/5 p-5">
        <p className="text-marble/50 text-[10px] uppercase tracking-wider mb-3">Change · today</p>
        <svg viewBox="0 0 400 110" className="w-full h-28" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dsArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d5e24a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d5e24a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,85 C60,70 90,30 150,45 C200,58 230,20 290,35 C340,46 370,22 400,28 L400,110 L0,110 Z" fill="url(#dsArea)" />
          <path d="M0,85 C60,70 90,30 150,45 C200,58 230,20 290,35 C340,46 370,22 400,28" fill="none" stroke="#E0DED3" strokeWidth="2" />
          <circle cx="400" cy="28" r="6" fill="#d5e24a" />
          <circle cx="400" cy="28" r="11" fill="none" stroke="#d5e24a" strokeWidth="1.5" opacity="0.5" />
        </svg>
        <div className="flex justify-between text-marble/40 text-[10px] mt-1 tracking-wider">
          <span>MORNING</span>
          <span className="text-urgent">NOW</span>
        </div>
      </div>
    </PanelShell>
  );
}