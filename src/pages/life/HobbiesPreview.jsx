import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const HOBBIES = [
  { id: 1, name: "Lezen", weekly: 4.5, goal: 6, c: SAND, streak: 5 },
  { id: 2, name: "Hardlopen", weekly: 2, goal: 3, c: URG, streak: 3 },
  { id: 3, name: "Schilderen", weekly: 1.5, goal: 4, c: OLIVE, streak: 0 },
  { id: 4, name: "Koken", weekly: 3, goal: 3, c: DARK, streak: 8 },
];
const R = 70, C = 2 * Math.PI * R;

export default function HobbiesPreview() {
  const [hobbies, setHobbies] = useState(HOBBIES);
  const log = (id) => setHobbies(h => h.map(x => x.id === id ? { ...x, weekly: +(x.weekly + 0.5).toFixed(1), streak: x.streak + 1 } : x));
  const total = hobbies.reduce((s, h) => s + h.weekly, 0);
  const goalTotal = hobbies.reduce((s, h) => s + h.goal, 0);
  const pct = Math.round((total / goalTotal) * 100);
  return (
    <ModuleShell index="01" section="HOBBIES" statement={`${total.toFixed(1)}U DEZE WEEK`} kicker="LIFE · TIJNDEPLAATS"
      context={[
        { label: "PLAATS", text: "Elke hobby groeit als een organische vorm naarmate je er tijd in steekt." },
        { label: "WEEKDOEL", text: `${pct}% van je gezamenlijke doel.` },
        { label: "ACTIE", text: "Klik 'Log' om 30 min toe te voegen — de vorm groeit." },
      ]}
      actions={[{ label: "Add Hobby", primary: true }, { label: "Set Goals" }, { label: "Open Hobbies" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="-100 -100 200 200" className="w-full max-w-[200px] aspect-square">
            <circle r={R} fill="none" stroke="#ffffff10" strokeWidth="12" />
            <circle r={R} fill="none" stroke={pct >= 100 ? URG : SAND} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(pct / 100) * C} ${C}`} transform="rotate(-90 0 0)" />
            <text x="0" y="2" textAnchor="middle" fontSize="26" fontWeight="700" fill={pct >= 100 ? URG : SAND}>{pct}%</text>
            <text x="0" y="16" textAnchor="middle" fontSize="8" fill="#ffffff80">WEEKDOEL</text>
          </svg>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">HOBBY-TUIN · KLIK LOG OM TE LATEN GROEIEN</p>
          <div className="flex-1 overflow-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {hobbies.map(h => {
              const ratio = Math.min(1.4, h.weekly / h.goal);
              return (
                <div key={h.id} className="rounded-2xl border border-marble/20 bg-marble/5 p-4 flex items-center gap-4">
                  <svg viewBox="-50 -50 100 100" className="w-20 h-20 shrink-0">
                    <motion.circle r={20 * ratio} fill={`${h.c}33`} stroke={h.c} strokeWidth="2" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3 + h.id, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "center", transformBox: "fill-box" }} />
                    <motion.circle r={14 * ratio} fill={`${h.c}55`} animate={{ scale: [1, 0.94, 1] }} transition={{ duration: 2.5 + h.id, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "center", transformBox: "fill-box" }} />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-storm truncate">{h.name}</p>
                      {h.streak > 0 && <span className="flex items-center gap-0.5 text-[10px] text-urgent"><Flame className="w-3 h-3" />{h.streak}</span>}
                    </div>
                    <p className="text-[10px] text-storm/50 tabular-nums">{h.weekly}/{h.goal}u</p>
                    <button onClick={() => log(h.id)} className="mt-2 px-3 py-1 rounded-full bg-sand text-storm text-[10px] font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all">+ Log 30 min</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}