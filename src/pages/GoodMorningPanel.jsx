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
    <div className="h-[100dvh] w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.22) 0%, rgba(242,242,240,0.10) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-4 sm:py-6 h-full">
        <div className="rounded-[28px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-4 sm:p-6 h-full flex flex-col overflow-hidden">
          {/* Tab bar — geen header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 p-1 rounded-full bg-plum/40 border border-marble/20">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className={`px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors ${tab === t.id ? "bg-urgent text-plum" : "text-storm/60 hover:text-storm"}`}>{t.label}</button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-storm/50 text-[10px] tracking-[0.2em] uppercase">
                <Sunrise className="w-4 h-4 text-urgent" /> Good Morning System
              </div>
              <Link to="/" className="text-storm/40 hover:text-storm"><Home className="w-4 h-4" /></Link>
            </div>
          </div>

          <div className="relative my-4">
            <div className="h-px bg-marble/20" />
            <div className="absolute left-0 top-0 h-px w-16 bg-plum" />
          </div>

          {/* Tab content */}
          <div className="flex-1 min-h-0 flex flex-col">
            {tab === "morning" && <MorningTab />}
            {tab === "routine" && <RoutineTab />}
            {tab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}