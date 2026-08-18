import React, { useState } from "react";
import { Check } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const ROOMS = [
  { n: "Keuken", c: SAND, grid: "1/1/2/2" },
  { n: "Woonkamer", c: OLIVE, grid: "2/1/3/2" },
  { n: "Badkamer", c: DARK, grid: "1/2/2/3" },
  { n: "Slaapkamer", c: URG, grid: "2/2/3/3" },
];
const CHORES = [
  { id: 1, t: "Afwas", room: "Keuken", due: "vandaag", done: false },
  { id: 2, t: "Stofzuigen woonkamer", room: "Woonkamer", due: "morgen", done: false },
  { id: 3, t: "Was sorteren", room: "Slaapkamer", due: "vandaag", done: true },
  { id: 4, t: "Badkamer schoonmaken", room: "Badkamer", due: "vr", done: false },
  { id: 5, t: "Koelkast legen", room: "Keuken", due: "vandaag", done: false },
  { id: 6, t: "Planten water", room: "Woonkamer", due: "morgen", done: true },
];
const roomC = (r) => (ROOMS.find(x => x.n === r) || {}).c || SAND;

export default function HouseholdPreview() {
  const [chores, setChores] = useState(CHORES);
  const [room, setRoom] = useState(null);
  const toggle = (id) => setChores(c => c.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const done = chores.filter(c => c.done).length;
  const pct = Math.round((done / chores.length) * 100);
  const list = room ? chores.filter(c => c.room === room) : chores;
  return (
    <ModuleShell index="02" section="HOUSEHOLD" statement={`${chores.length - done} TE DOEN`} kicker="LIFE · VLOERPLAN"
      context={[
        { label: "VLOERPLAN", text: "Klik een kamer om zijn klusjes te filteren; vink ze af en de kamer vult zich." },
        { label: "VOLTOOID", text: `${done}/${chores.length} klaar.` },
        { label: "ACTIE", text: "Klik een klusje om af te vinken." },
      ]}
      actions={[{ label: "Add Chore", primary: true }, { label: "Assign" }, { label: "Open Household" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <div className="mb-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">HUIS · VOLTOOIING {pct}%</p>
            <div className="h-3 rounded-full bg-marble/10 overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct === 100 ? URG : SAND }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {ROOMS.map(r => {
              const roomChores = chores.filter(c => c.room === r.n);
              const rDone = roomChores.filter(c => c.done).length;
              const rPct = Math.round((rDone / roomChores.length) * 100);
              const active = room === r.n;
              return (
                <button key={r.n} onClick={() => setRoom(active ? null : r.n)} className={`relative rounded-2xl border p-4 flex flex-col justify-between text-left transition-colors overflow-hidden ${active ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                  <div className="absolute inset-0 transition-all duration-700" style={{ background: `${r.c}22`, opacity: rPct / 100 * 0.6 }} />
                  <div className="relative">
                    <p className="text-sm text-storm font-medium">{r.n}</p>
                    <p className="text-[10px] text-storm/50 mt-0.5">{rDone}/{roomChores.length} klaar</p>
                  </div>
                  <div className="relative flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1.5 rounded-full bg-marble/15 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${rPct}%`, background: r.c }} /></div>
                    <span className="text-[10px] text-storm/60 tabular-nums">{rPct}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">{room ? room.toUpperCase() : "ALLE KAMERS"}</p>
            {room && <button onClick={() => setRoom(null)} className="text-[10px] text-storm/50 hover:text-storm">reset</button>}
          </div>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {list.map(c => (
              <button key={c.id} onClick={() => toggle(c.id)} className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors ${c.done ? "border-marble/15 bg-marble/5" : "border-marble/25 bg-marble/8 hover:bg-marble/15"}`}>
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${c.done ? "bg-sand border-sand" : "border-marble/40"}`}>{c.done && <Check className="w-3 h-3 text-storm" />}</span>
                <p className={`text-sm truncate flex-1 ${c.done ? "text-storm/40 line-through" : "text-storm"}`}>{c.t}</p>
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