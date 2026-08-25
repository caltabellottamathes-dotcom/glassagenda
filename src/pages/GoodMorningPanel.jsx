import React, { useState } from "react";
import { Sunrise, Home } from "lucide-react";
import { Link } from "react-router-dom";
import MorningTab from "@/components/goodmorning/MorningTab";
import RoutineTab from "@/components/goodmorning/RoutineTab";
import SettingsTab from "@/components/goodmorning/SettingsTab";

const TABS = [
  { id: "morning", label: "Morning" },
  { id: "routine", label: "Routine" },
  { id: "settings", label: "Settings" },
];

export default function GoodMorningPanel() {
  const [tab, setTab] = useState("morning");
  return (
    <div className="h-[100dvh] w-full overflow-hidden relative" style={{ background: "radial-gradient(circle at 20% 8%, #595f34 0%, #43471f 42%, #2D2D23 100%)" }}>
      <div className="absolute inset-0 backdrop-blur-2xl" style={{ background: "rgba(216,218,179,0.035)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 py-6 h-full">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between">
            <nav className="flex gap-7">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className="text-sm tracking-wide pb-1.5 border-b-2 transition-colors" style={tab === t.id ? { color: "#d8dab3", borderColor: "#d5e24a" } : { color: "#94925d", borderColor: "transparent" }}>
                  {t.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase" style={{ color: "#94925d" }}>
                <Sunrise className="w-4 h-4" style={{ color: "#d5e24a" }} /> Good Morning
              </div>
              <Link to="/" style={{ color: "#94925d" }}><Home className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="h-px mt-3" style={{ background: "rgba(216,218,179,0.10)" }} />
          <div className="flex-1 min-h-0 flex flex-col mt-5">
            {tab === "morning" && <MorningTab />}
            {tab === "routine" && <RoutineTab />}
            {tab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}