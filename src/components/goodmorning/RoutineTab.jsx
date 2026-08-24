import React, { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Footprints, Zap, Clock, Volume2, Mic, Check } from "lucide-react";
import { Ring, Toggle, Stepper, FooterAction, Label, CARD, URG, SAND, OLIVE } from "./viz";

const INITIAL = [
  { id: 1, name: "Opstaan", dur: 4, req: true, active: true, voice: "Tijd om op te staan" },
  { id: 2, name: "Water drinken", dur: 2, req: true, active: true, voice: "Drink een glas water" },
  { id: 3, name: "Lichttherapie", dur: 10, req: false, active: true, voice: "Ga voor de lamp zitten" },
  { id: 4, name: "Stretching", dur: 6, req: false, active: true, voice: "Rek je uit" },
  { id: 5, name: "Wandelen", dur: 12, req: false, active: true, voice: "Maak een korte wandeling" },
  { id: 6, name: "Douche", dur: 8, req: true, active: true, voice: "Neem een douche" },
  { id: 7, name: "Ontbijt", dur: 10, req: true, active: true, voice: "Eet je ontbijt" },
  { id: 8, name: "Reflectie", dur: 5, req: false, active: false, voice: "Noteer je intentie voor vandaag" },
];

export default function RoutineTab() {
  const [edit, setEdit] = useState(false);
  const [steps, setSteps] = useState(INITIAL);

  const total = steps.filter((s) => s.active).reduce((s, x) => s + x.dur, 0);
  const activeCount = steps.filter((s) => s.active).length;

  const update = (id, patch) => setSteps((arr) => arr.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const remove = (id) => setSteps((arr) => arr.filter((s) => s.id !== id));
  const move = (i, dir) => setSteps((arr) => {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return arr;
    const a = [...arr];
    [a[i], a[j]] = [a[j], a[i]];
    return a;
  });
  const add = () => setSteps((arr) => [...arr, { id: Date.now(), name: "Nieuwe stap", dur: 5, req: false, active: true, voice: "" }]);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
        {/* Left summary */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className={CARD + " flex-row items-center gap-4"}>
            <Ring pct={Math.min(100, (total / 60) * 100)} size={96} color={OLIVE}>
              <span className="text-storm text-2xl font-bold tabular-nums leading-none">{total}</span>
              <span className="text-storm/40 text-[8px] tracking-widest mt-1">MIN</span>
            </Ring>
            <div>
              <Label n={1}>Totale routine</Label>
              <p className="text-storm text-sm">{activeCount} actieve stappen</p>
              <p className="text-storm/50 text-xs mt-1">{steps.length} totaal</p>
            </div>
          </div>

          <div className={CARD + " gap-3 flex-1 min-h-0"}>
            <Label n={2}>Adaptief gedrag</Label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-urgent" /><span className="text-storm/80 text-xs">Adaptive routine</span></div>
              <Toggle checked onChange={() => {}} />
            </div>
            <div className="rounded-lg border border-marble/15 bg-metal/30 p-3">
              <p className="text-storm/70 text-[11px] leading-snug">Wanneer de agenda weinig tijd laat, slaat GIULIA optionele stappen over volgens de ingestelde regels — zodat je altijd op tijd Ready bent.</p>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <Clock className="w-4 h-4 text-urgent" />
              <span className="text-storm/70 text-[11px]">Running tight → skip optional</span>
            </div>
          </div>
        </div>

        {/* Right steps grid */}
        <div className={CARD + " col-span-2 overflow-hidden"}>
          <div className="flex items-center justify-between mb-3">
            <Label n={3}>Stappen · volgorde</Label>
            {edit && <button onClick={add} className="flex items-center gap-1 text-urgent text-[10px] tracking-widest uppercase font-semibold hover:brightness-110"><Plus className="w-3.5 h-3.5" /> Toevoegen</button>}
          </div>
          <div className="grid grid-cols-2 gap-2 overflow-hidden content-start">
            {steps.map((s, i) => (
              <div key={s.id} className="rounded-xl border border-marble/15 bg-metal/30 p-2.5 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-storm/30 text-[10px] tabular-nums w-4">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-storm text-xs font-semibold flex-1 truncate">{s.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] tracking-wider uppercase font-bold ${s.req ? "bg-urgent text-plum" : "bg-marble/15 text-storm/50"}`}>{s.req ? "Req" : "Opt"}</span>
                  {edit && (
                    <div className="flex items-center gap-0.5">
                      <button onClick={() => move(i, -1)} className="text-storm/40 hover:text-storm"><ArrowUp className="w-3 h-3" /></button>
                      <button onClick={() => move(i, 1)} className="text-storm/40 hover:text-storm"><ArrowDown className="w-3 h-3" /></button>
                      <button onClick={() => remove(s.id)} className="text-storm/40 hover:text-urgent"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-storm/50">
                  <Clock className="w-3 h-3" /><span className="text-[10px]">{s.dur} min</span>
                  <Volume2 className="w-3 h-3 ml-1" /><span className="text-[10px] truncate flex-1">{s.voice || "—"}</span>
                </div>
                {edit ? (
                  <div className="flex items-center justify-between mt-1">
                    <Stepper value={s.dur} min={1} max={30} onChange={(v) => update(s.id, { dur: v })} />
                    <div className="flex items-center gap-2">
                      <span className="text-storm/50 text-[9px] tracking-wider uppercase">Req</span>
                      <Toggle checked={s.req} onChange={(v) => update(s.id, { req: v })} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <Mic className="w-3 h-3 text-storm/40" /><span className="text-storm/40 text-[9px]">voice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-storm/40 text-[9px] tracking-wider uppercase">{s.active ? "Actief" : "Inactief"}</span>
                      <Toggle checked={s.active} onChange={(v) => update(s.id, { active: v })} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterAction label={edit ? "Opslaan" : "Edit Routine"} primary onClick={() => setEdit((e) => !e)} />
    </div>
  );
}