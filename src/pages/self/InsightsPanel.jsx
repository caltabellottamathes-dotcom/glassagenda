import React from "react";
import PanelShell from "@/components/self/PanelShell";

const YS = [0, 40, 80, 120, 160];

export default function InsightsPanel() {
  return (
    <PanelShell
      section="INSIGHTS"
      statement="CAPACITY HAS SHIFTED"
      kicker="LAST 10 DAYS"
      context={[
        { label: "OBSERVED", text: "Beschikbare capacity daalt na dagen met late afspraken." },
        { label: "POSSIBLE CONNECTION", text: "Mogelijk verband met slaapritme aan het eind van de week." },
        { label: "CONFIDENCE", text: "Matig — patroon steunt op 10 dagen, niet op een seizoen." },
      ]}
      actions={[
        { label: "VIEW PATTERN", primary: true },
        { label: "COMPARE PERIOD" },
        { label: "DISMISS" },
        { label: "SAVE INSIGHT" },
        { label: "OPEN INSIGHTS" },
      ]}
    >
      <div className="rounded-2xl border border-marble/15 bg-marble/5 p-6">
        <div className="flex justify-between text-marble/40 text-[10px] mb-2">
          {[100, 80, 60, 40, 20].map((y) => <span key={y}>{y}</span>)}
        </div>
        <svg viewBox="0 0 400 200" className="w-full h-56" preserveAspectRatio="none">
          {YS.map((y) => <line key={y} x1="0" y1={y + 20} x2="400" y2={y + 20} stroke="rgba(224,222,211,0.08)" strokeWidth="1" />)}
          <defs>
            <linearGradient id="insArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d5e24a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#d5e24a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,150 C40,150 60,70 110,70 C150,70 170,110 220,110 C260,110 280,150 400,160 L400,200 L0,200 Z" fill="url(#insArea)" />
          <path d="M0,150 C40,150 60,70 110,70 C150,70 170,110 220,110 C260,110 280,150 400,160" fill="none" stroke="#E0DED3" strokeWidth="2" />
          <circle cx="110" cy="70" r="6" fill="#d5e24a" />
          <circle cx="110" cy="70" r="12" fill="none" stroke="#d5e24a" strokeWidth="1.5" opacity="0.5" />
          <line x1="110" y1="70" x2="110" y2="20" stroke="#d5e24a" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        </svg>
        <div className="flex justify-between text-marble/40 text-[10px] mt-2 tracking-wider">
          {["06", "08", "10", "12", "14", "16"].map((d) => <span key={d}>{d}</span>)}
        </div>
        <p className="text-urgent text-[10px] mt-2 tracking-wide">● Marked: dag 08 — piek in beschikbare capacity.</p>
      </div>
    </PanelShell>
  );
}