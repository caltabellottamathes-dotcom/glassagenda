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
      index="01"
      section="DAILY STATE"
      statement="STEADY"
      context={[
        { label: "WHAT CHANGED", text: "Capacity has decreased since this morning." },
        { label: "WHAT MATTERS NOW", text: "Your afternoon is relatively full while available capacity is lower." },
        { label: "NOW", text: "Steady state — no sharp shifts across the three signals." },
      ]}
      actions={[
        { label: "Check In", primary: true },
        { label: "Adjust Day" },
        { label: "Add Personal Time" },
        { label: "Open Daily State" },
      ]}
    >
      <div className="grid grid-cols-3 divide-x divide-marble/20 border-y border-marble/20">
        {VALUES.map((x) => (
          <div key={x.l} className="py-10 text-center">
            <p className="text-storm text-7xl sm:text-8xl font-bold tabular-nums leading-none">{x.v}</p>
            <p className="text-urgent text-[11px] mt-5 tracking-[0.3em]">{x.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-end justify-between mb-5">
          <p className="text-marble/50 text-[10px] uppercase tracking-[0.25em]">Change · today</p>
          <p className="text-marble/40 text-[10px] tracking-[0.25em]">MORNING → NOW</p>
        </div>
        <svg viewBox="0 0 400 160" className="w-full h-40" preserveAspectRatio="none">
          {[0, 1, 2, 3].map((i) => <line key={i} x1="0" y1={i * 40 + 10} x2="400" y2={i * 40 + 10} stroke="rgba(224,222,211,0.08)" strokeWidth="1" />)}
          <defs>
            <linearGradient id="dsArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d5e24a" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#d5e24a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,125 C60,105 90,45 150,60 C200,72 230,28 290,45 C340,58 370,30 400,38 L400,160 L0,160 Z" fill="url(#dsArea)" />
          <path d="M0,125 C60,105 90,45 150,60 C200,72 230,28 290,45 C340,58 370,30 400,38" fill="none" stroke="#E0DED3" strokeWidth="2.5" />
          <circle cx="400" cy="38" r="7" fill="#d5e24a" />
          <circle cx="400" cy="38" r="14" fill="none" stroke="#d5e24a" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
    </PanelShell>
  );
}