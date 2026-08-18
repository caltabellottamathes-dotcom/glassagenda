import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Check } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const ROOMS = [{ n: "Keuken", v: 4, c: SAND }, { n: "Woonkamer", v: 3, c: OLIVE }, { n: "Badkamer", v: 2, c: DARK }, { n: "Slaapkamer", v: 3, c: URG }];
const CHORES = [
  { id: 1, t: "Afwas", room: "Keuken", due: "vandaag", done: false },
  { id: 2, t: "Stofzuigen woonkamer", room: "Woonkamer", due: "morgen", done: false },
  { id: 3, t: "Was sorteren", room: "Slaapkamer", due: "vandaag", done: true },
  { id: 4, t: "Badkamer schoonmaken", room: "Badkamer", due: "vr", done: false },
  { id: 5, t: "Koelkast legen", room: "Keuken", due: "vandaag", done: false },
  { id: 6, t: "Planten water", room: "Woonkamer", due: "morgen", done: true },
];

export default function HouseholdPreview() {
  const [chores, setChores] = useState(CHORES);
  const toggle = (id) => setChores(c => c.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const done = chores.filter(c => c.done).length;
  const pct = Math.round((done / chores.length) * 100);
  const roomC = (r) => (ROOMS.find(x => x.n === r) || {}).c || SAND;
  return (
    <ModuleShell index="02" section="HOUSEHOLD" statement={`${chores.length - done} TE DOEN`} kicker="LIFE · HUIS HOUDEN"
      context={[
        { label: "VANDAAG", text: `${chores.filter(c => c.due === "vandaag" && !c.done).length} klusjes vandaag.` },
        { label: "VOLTOOID", text: `${done}/${chores.length} klaar deze week.` },
        { label: "ACTIE", text: "Klik een klusje om af te vinken." },
      ]}
      actions={[{ label: "Add Chore", primary: true }, { label: "Assign" }, { label: "Schedule" }, { label: "Open Household" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={pct} size={180} color={pct === 100 ? URG : SAND} label={`${pct}%`} sub="KLAAR DEZE WEEK" /></div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">PER KAMER</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={ROOMS} dataKey="v" nameKey="n" innerRadius={36} outerRadius={60} paddingAngle={3} isAnimationActive animationDuration={1000}>
                  {ROOMS.map((c, i) => <Cell key={i} fill={c.c} stroke="transparent" />)}
                </Pie></PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {ROOMS.map(c => <span key={c.n} className="flex items-center gap-1.5 text-[10px] text-storm/70"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.c }} />{c.n}</span>)}
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">KLUUSJES · KLIK OM AF TE VINKEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {chores.map(c => (
              <button key={c.id} onClick={() => toggle(c.id)} className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors ${c.done ? "border-marble/15 bg-marble/5" : "border-marble/25 bg-marble/8 hover:bg-marble/15"}`}>
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${c.done ? "bg-sand border-sand" : "border-marble/40"}`}>{c.done && <Check className="w-3 h-3 text-storm" />}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${c.done ? "text-storm/40 line-through" : "text-storm"}`}>{c.t}</p>
                  <p className="text-[10px] text-storm/50">{c.room}</p>
                </div>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: roomC(c.room) }} />
                <span className={`text-[10px] shrink-0 ${c.due === "vandaag" ? "text-urgent" : "text-storm/40"}`}>{c.due}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}