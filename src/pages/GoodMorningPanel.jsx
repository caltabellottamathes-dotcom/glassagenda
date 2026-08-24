import React, { useState } from "react";
import { HelpCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import MorningTab from "@/components/goodmorning/MorningTab";
import RoutineTab from "@/components/goodmorning/RoutineTab";
import SettingsTab from "@/components/goodmorning/SettingsTab";

const TABS = [
  { id: "morning", label: "Morning", title: "Hoe ging mijn ochtend?" },
  { id: "routine", label: "Routine", title: "Hoe begeleidt Giulia mijn ochtend?" },
  { id: "settings", label: "Settings", title: "Hoe wil ik dat Giulia mijn ochtend begeleidt?" },
];

export default function GoodMorningPanel() {
  const [tab, setTab] = useState("morning");
  const active = TABS.find((t) => t.id === tab);

  return (
    <div className="h-[100dvh] w-full bg-metal flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.18) 0%, rgba(242,242,240,0.08) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 h-[calc(100dvh-1.5rem)] aspect-[2/3] max-w-[calc(100vw-1.5rem)] rounded-[28px] bg-white/[0.055] backdrop-blur-2xl shadow-[0_12px_50px_rgba(0,0,0,0.4)] border border-white/10 p-5 sm:p-6 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-storm text-lg sm:text-xl font-bold tracking-tight leading-tight">{active.title}</h1>
            <nav className="flex gap-4 mt-2.5">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className={`text-[10px] tracking-[0.18em] uppercase pb-1 transition-colors ${tab === t.id ? "text-[#d8dab3] font-semibold border-b border-[#d8dab3]" : "text-storm/40 hover:text-storm/70"}`}>{t.label}</button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="w-6 h-6 rounded-full border border-white/15 text-storm/50 flex items-center justify-center hover:text-storm"><HelpCircle className="w-3.5 h-3.5" /></button>
            <Link to="/" className="w-6 h-6 rounded-full border border-white/15 text-storm/50 flex items-center justify-center hover:text-storm"><Home className="w-3.5 h-3.5" /></Link>
          </div>
        </div>

        <div className="h-px bg-white/10 my-4" />

        {/* Body */}
        <div className="flex-1 min-h-0 flex flex-col">
          {tab === "morning" && <MorningTab />}
          {tab === "routine" && <RoutineTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}