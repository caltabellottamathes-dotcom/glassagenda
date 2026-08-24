import React, { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Zap, Clock, Volume2, Mic } from "lucide-react";
import { Ring, Toggle, Stepper, Divider, FooterAction, Label, PISTACHIO, OLIVE, EARTH, URGENT } from "./viz";

const INITIAL = [
  { id: 1, name: "Opstaan", dur: 4, req: true, active: true, voice: "Tijd om op te staan" },
  { id: 2, name: "Water drinken", dur: 2, req: true, active: true, voice: "Drink een glas water" },
  { id: 3, name: "Lichttherapie", dur: 10, req: false, active: true, voice: "Ga voor de lamp zitten" },
  { id: 4, name: "Stretching", dur: 6, req: false, active: true, voice: "Rek je uit" },
  { id: 5, name: "Wandelen", dur: 12, req: false, active: true, voice: "Maak een korte wandeling" },
  { id: 6, name: "Douche", dur: 8, req: true, active: true, voice: "Neem een douche" },
  { id: 7, name: "Ontbijt", dur: 10, req: true, active: true, voice: "Eet je ontbijt" },
  { id: 8, name: "Reflectie", dur: 5, req: false, active: false, voice: "Noteer je intentie" },
];

export default function RoutineTab() {
  const [edit, setEdit] = useState(false);
  const [steps, setSteps] = useState(INITIAL);
  const total = steps.filter((s) => s.active).reduce((s, x) => s + x.dur, 0);
  const activeCount = steps.filter((s) => s.active).length;

  const update = (id, patch) => setSteps((a) => a.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const remove = (id) => setSteps((a) => a.filter((s) => s.id !== id));
  const move = (i, dir) => setSteps((a) => {
    const j = i + dir;
    if (j < 0 || j >= a.length) return a;
    const b = [...a];
    [b[i], b[j]] = [b[j], b[i]];
    return b;
  });
  const add = () => setSteps((a) => [...a, { id: Date.now(), name: "Nieuwe stap", dur: 5, req: false, active: true, voice: "" }]);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Total + counts */}
      <div className="flex items-center gap-5">
        <Ring pct={Math.min(100, (total / 60) * 100)} size={104} color={PISTACHIO}>
          <span className="text-storm text-2xl font-bold tabular-nums leading-none">{total}</span>
          <span className="text-storm/40 text-[8px] tracking-widest mt-1">MIN</span>
        </Ring>
        <div className="flex-1">
          <p className="text-storm/35 text-[8px] tracking-widest uppercase">Actieve routine</p>
          <p className="text-storm text-lg font-bold">{activeCount} stappen</p>
          <p className="text-storm/45 text-xs mt-1">{steps.length} gedefinieerd · {steps.length - activeCount} inactief</p>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Adaptive */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-[#94925d]" /><span className="text-storm/75 text-xs">Adaptive routine</span></div>
        <Toggle checked onChange={() => {}} />
      </div>
      <p className="text-storm/45 text-[11px] leading-snug">Bij weinig tijd slaat Giulia optionele stappen over volgens de ingestelde regels — zodat je altijd op tijd Ready bent.</p>

      <Divider className="my-4" />

      {/* Steps */}
      <Label n={1} right={edit ? <button onClick={add} className="flex items-center gap-1 text-[#d8dab3] text-[9px] tracking-widest uppercase font-semibold"><Plus className="w-3 h-3" /> Toevoegen</button> : null}>Stappen</Label>
      <div className="flex-1 min-h-0 space-y-1.5 overflow-hidden">
        {steps.map((s, i) => (
          <div key={s.id} className="py-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-storm/25 text-[9px] tabular-nums w-4">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-storm text-xs font-semibold flex-1 truncate">{s.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[8px] tracking-wider uppercase font-bold ${s.req ? "bg-[#d8dab3] text-[#595f34]" : "bg-white/8 text-storm/50"}`}>{s.req ? "Req" : "Opt"}</span>
              {edit && (
                <div className="flex items-center gap-0.5">
                  <button onClick={() => move(i, -1)} className="text-storm/40 hover:text-storm"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={() => move(i, 1)} className="text-storm/40 hover:text-storm"><ArrowDown className="w-3 h-3" /></button>
                  <button onClick={() => remove(s.id)} className="text-storm/40 hover:text-[#d5e24a]"><Trash2 className="w-3 h-3" /></button>
                </div>
              )}
            </div>
            {edit ? (
              <div className="flex items-center justify-between mt-1.5 pl-6">
                <Stepper value={s.dur} min={1} max={30} onChange={(v) => update(s.id, { dur: v })} suffix="m" />
                <div className="flex items-center gap-2">
                  <span className="text-storm/45 text-[8px] tracking-wider uppercase">Req</span>
                  <Toggle checked={s.req} onChange={(v) => update(s.id, { req: v })} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-6 mt-0.5">
                <span className="flex items-center gap-1 text-storm/40 text-[10px]"><Clock className="w-2.5 h-2.5" />{s.dur}m</span>
                <span className="flex items-center gap-1 text-storm/40 text-[10px] truncate"><Volume2 className="w-2.5 h-2.5" />{s.voice || "—"}</span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-storm/40 text-[8px] tracking-wider uppercase">{s.active ? "Actief" : "Inactief"}</span>
                  <Toggle checked={s.active} onChange={(v) => update(s.id, { active: v })} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Divider className="my-3" />
      <FooterAction label={edit ? "Opslaan" : "Edit Routine"} onClick={() => setEdit((e) => !e)} />
    </div>
  );
}