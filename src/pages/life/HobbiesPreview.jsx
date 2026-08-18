import React, { useState } from "react";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing, BarGrow, PulseWave } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const HOBBIES = [
  { id: 1, name: "Lezen", weekly: 4.5, goal: 6, c: SAND },
  { id: 2, name: "Hardlopen", weekly: 2, goal: 3, c: URG },
  { id: 3, name: "Schilderen", weekly: 1.5, goal: 4, c: OLIVE },
  { id: 4, name: "Koken", weekly: 3, goal: 3, c: DARK },
];

export default function HobbiesPreview() {
  const [hobbies, setHobbies] = useState(HOBBIES);
  const log = (id) => setHobbies(h => h.map(x => x.id === id ? { ...x, weekly: +(x.weekly + 0.5).toFixed(1) } : x));
  const total = hobbies.reduce((s, h) => s + h.weekly, 0);
  const goalTotal = hobbies.reduce((s, h) => s + h.goal, 0);
  const pct = Math.round((total / goalTotal) * 100);
  return (
    <ModuleShell index="01" section="HOBBIES" statement={`${total.toFixed(1)}U DEZE WEEK`} kicker="LIFE · TIJD VOOR JOU"
      context={[
        { label: "TOTAAL", text: `${total.toFixed(1)}u van ${goalTotal}u doel deze week.` },
        { label: "HOBBIES", text: `${hobbies.length} actieve hobby's.` },
        { label: "ACTIE", text: "Klik 'Log' om een sessie toe te voegen." },
      ]}
      actions={[{ label: "Add Hobby", primary: true }, { label: "Set Goals" }, { label: "Report" }, { label: "Open Hobbies" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={pct} size={180} color={pct >= 100 ? URG : SAND} label={`${pct}%`} sub="VAN WEEKDOEL" /></div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">IN FLOW · LIVE</p>
            <PulseWave color={OLIVE} bars={22} height={40} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">HOBBY'S · KLIK LOG OM TIJD TOE TE VOEGEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {hobbies.map(h => (
              <div key={h.id} className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: h.c }} /><p className="text-sm text-storm">{h.name}</p></div>
                  <span className="text-[10px] text-storm/50 tabular-nums">{h.weekly}/{h.goal}u</span>
                </div>
                <BarGrow value={h.weekly} max={h.goal} color={h.c} height={8} />
                <button onClick={() => log(h.id)} className="mt-3 px-3 py-1.5 rounded-full bg-sand text-storm text-[10px] font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all">+ Log 30 min</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}