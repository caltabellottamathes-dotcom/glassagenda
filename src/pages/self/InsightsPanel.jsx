import React from "react";
import PanelShell from "@/components/self/PanelShell";

export default function InsightsPanel() {
  return (
    <PanelShell
      index="08"
      section="INSIGHTS"
      statement="CAPACITY HAS SHIFTED"
      kicker="LAST 10 DAYS"
      context={[
        { label: "OBSERVED", text: "Beschikbare capacity daalt na dagen met late afspraken." },
        { label: "POSSIBLE CONNECTION", text: "Mogelijk verband met slaapritme aan het eind van de week." },
        { label: "CONFIDENCE", text: "Matig — patroon steunt op 10 dagen, niet op een seizoen." },
      ]}
      actions={[
        { label: "View Pattern", primary: true },
        { label: "Compare Period" },
        { label: "Dismiss" },
        { label: "Save Insight" },
        { label: "Open Insights" },
      ]}
    >
      <div className="rounded-2xl border border-marble/15 bg-marble/5 p-8">
        <div className="flex">
          <div className="flex flex-col justify-between py-1 pr-4 text-marble/40 text-[10px] tabular-nums">
            {[100, 80, 60, 40, 20].map((y) => <span key={y}>{y}</span>)}
          </div>
          <div className="flex-1 relative">
            <svg viewBox="0 0 400 220" className="w-full h-72" preserveAspectRatio="none">
              {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="0" y1={i * 50 + 10} x2="400" y2={i * 50 + 10} stroke="rgba(224,222,211,0.08)" strokeWidth="1" />)}
              <defs>
                <linearGradient id="insArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d5e24a" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#d5e24a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,165 C40,165 60,75 110,75 C150,75 170,120 220,120 C260,120 280,165 400,175 L400,220 L0,220 Z" fill="url(#insArea)" />
              <path d="M0,165 C40,165 60,75 110,75 C150,75 170,120 220,120 C260,120 280,165 400,175" fill="none" stroke="#E0DED3" strokeWidth="2.5" />
              <line x1="110" y1="75" x2="110" y2="20" stroke="#d5e24a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <circle cx="110" cy="75" r="9" fill="#d5e24a" />
              <circle cx="110" cy="75" r="16" fill="none" stroke="#d5e24a" strokeWidth="1.5" opacity="0.5" />
            </svg>
            <div className="flex justify-between text-marble/40 text-[10px] tracking-wider mt-2">
              {["06", "08", "10", "12", "14", "16"].map((d) => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-marble/15 flex items-center gap-3">
          <span className="text-urgent text-2xl">●</span>
          <p className="text-storm text-sm"><span className="text-marble/50">Marked · dag 08 —</span> piek in beschikbare capacity.</p>
        </div>
      </div>
    </PanelShell>
  );
}