import React, { useState } from "react";
import { Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Ring, Headline, PriorityBar, Badge, Toggle, Stepper, StatusItem, FooterButtons, Divider, PISTACHIO, OLIVE } from "./viz";

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
  const reqCount = steps.filter((s) => s.req).length;
  const optCount = steps.length - reqCount;
  const inactCount = steps.length - activeCount;

  const update = (id, patch) => setSteps((a) => a.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const remove = (id) => setSteps((a) => a.filter((s) => s.id !== id));
  const move = (i, dir) => setSteps((a) => {
    const j = i + dir;
    if (j < 0 || j >= a.length) return a;
    const arr = [...a];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
  });
  const add = () => setSteps((a) => [...a, { id: Date.now(), name: "Nieuwe stap", dur: 5, req: false, active: true, voice: "" }]);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Headline
        kicker="ROUTINE BOUW"
        title="OCHTENDROUTINE"
        right={<span className="px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase" style={{ color: "#d8dab3", border: "1px solid rgba(216,218,179,0.25)" }}>{steps.length} STAPPEN</span>}
      />
      <Divider className="my-5" />
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-10 overflow-hidden">
        <div className="col-span-4 flex flex-col gap-7 overflow-hidden">
          <div className="flex flex-col items-center">
            <Ring pct={Math.min(100, (total / 60) * 100)} size={150} stroke={6}>
              <span className="text-4xl font-bold tabular-nums leading-none" style={{ color: "#f4f4f0" }}>{total}</span>
              <span className="text-[10px] tracking-[0.3em] mt-1.5" style={{ color: "#94925d" }}>MIN</span>
            </Ring>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: "#94925d" }}>Geschatte duur · adaptief</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#94925d" }}>Verdeling</p>
            <div className="space-y-2.5">
              <PriorityBar label="REQUIRED" count={reqCount} max={steps.length} />
              <PriorityBar label="OPTIONAL" count={optCount} max={steps.length} color="#94925d" />
              <PriorityBar label="ACTIEF" count={activeCount} max={steps.length} />
              <PriorityBar label="INACTIEF" count={inactCount} max={steps.length} color="#595f34" />
            </div>
          </div>
        </div>

        <div className="col-span-8 overflow-hidden flex flex-col">
          {edit && (
            <button onClick={add} className="self-start mb-3 flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold" style={{ color: "#d5e24a" }}>
              <Plus className="w-3.5 h-3.5" /> Stap toevoegen
            </button>
          )}
          <div className="overflow-hidden flex-1">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < steps.length - 1 ? "1px solid rgba(216,218,179,0.08)" : "none" }}>
                <span className="text-[10px] tabular-nums w-5" style={{ color: "#94925d" }}>{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate" style={{ color: "#f4f4f0" }}>{s.name}</span>
                    <Badge tone={s.req ? "pistachio" : "earth"}>{s.req ? "REQ" : "OPT"}</Badge>
                  </div>
                  <p className="text-[11px] truncate" style={{ color: "rgba(216,218,179,0.5)" }}>{s.voice || "—"}</p>
                </div>
                {edit ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <Stepper value={s.dur} min={1} max={30} onChange={(v) => update(s.id, { dur: v })} />
                    <div className="flex items-center gap-1.5"><span className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(216,218,179,0.5)" }}>Req</span><Toggle checked={s.req} onChange={(v) => update(s.id, { req: v })} /></div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => move(i, -1)} style={{ color: "rgba(216,218,179,0.4)" }}><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => move(i, 1)} style={{ color: "rgba(216,218,179,0.4)" }}><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button onClick={() => remove(s.id)} style={{ color: "rgba(216,218,179,0.4)" }}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs tabular-nums" style={{ color: "#d8dab3" }}>{s.dur}m</span>
                    <Toggle checked={s.active} onChange={(v) => update(s.id, { active: v })} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-3 gap-8">
        <StatusItem n={1} label="AANTAL" text={`${steps.length} stappen in je routine.`} />
        <StatusItem n={2} label="ACTIEF" text={`${activeCount} actief · ${inactCount} inactief.`} />
        <StatusItem n={3} label="ADAPTIEF" text="Bij running tight worden optionele stappen overgeslagen." />
      </div>
      <div className="flex justify-end mt-4">
        <FooterButtons primary={edit ? "OPSLAAN" : "EDIT ROUTINE"} ghost={edit ? "ANNULEREN" : "NIEUWE STAP"} onPrimary={() => setEdit((e) => !e)} onGhost={edit ? () => setEdit(false) : add} />
      </div>
    </div>
  );
}