import React, { useState } from "react";
import GoodMorningShell from "@/components/goodmorning/GoodMorningShell";
import MorningTab from "@/components/goodmorning/MorningTab";
import RoutineTab from "@/components/goodmorning/RoutineTab";
import SettingsTab from "@/components/goodmorning/SettingsTab";

const TABS = [
  {
    C: MorningTab,
    context: [
      { label: "WAKE", text: "Started at 07:30." },
      { label: "READY", text: "Ready 6 minutes later than usual." },
      { label: "ROUTINE", text: "One optional step skipped." },
    ],
    action: "OPEN MORNING BRIEFING →",
  },
  {
    C: RoutineTab,
    context: [
      { label: "STEPS", text: "5 steps in your morning." },
      { label: "DURATION", text: "Approximately 32 minutes." },
      { label: "ADAPTIVE", text: "Optional steps can be removed when needed." },
    ],
    action: "EDIT ROUTINE →",
  },
  {
    C: SettingsTab,
    context: [
      { label: "WAKE", text: "07:30 on weekdays." },
      { label: "STYLE", text: "Gentle wake with voice guidance." },
      { label: "BRIEFING", text: "Opens automatically after ready." },
    ],
    action: "SAVE / APPLY →",
  },
];

export default function GoodMorningPanel() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Tab = tab.C;
  return (
    <GoodMorningShell active={active} onChange={setActive} context={tab.context} actionLabel={tab.action}>
      <Tab />
    </GoodMorningShell>
  );
}