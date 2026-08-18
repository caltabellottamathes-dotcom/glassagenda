import React, { useState } from "react";
import ModuleShell from "@/components/modules/ModuleShell";
import { BarGrow, LiveSparkline, CountUp } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const CONTACTS = [
  { id: 1, name: "Anna", last: "18 dagen", strength: 72, c: SAND, reached: false },
  { id: 2, name: "T. Bakker", last: "12 dagen", strength: 55, c: URG, reached: false },
  { id: 3, name: "Mo", last: "3 dagen", strength: 88, c: OLIVE, reached: false },
  { id: 4, name: "S. Kaya", last: "26 dagen", strength: 40, c: DARK, reached: false },
  { id: 5, name: "Giulia (zus)", last: "1 dag", strength: 95, c: SAND, reached: true },
];

export default function SocialPulsePreview() {
  const [contacts, setContacts] = useState(CONTACTS);
  const reach = (id) => setContacts(c => c.map(x => x.id === id ? { ...x, reached: true, last: "vandaag", strength: Math.min(100, x.strength + 8) } : x));
  const reached = contacts.filter(c => c.reached).length;
  return (
    <ModuleShell index="05" section="SOCIAL PULSE" statement={`${contacts.length - reached} TE BEREIKEN`} kicker="LIFE · CONNECTIE"
      context={[
        { label: "PULSE", text: `${reached}/${contacts.length} contacten deze week bereikt.` },
        { label: "VERKOELD", text: `${contacts.filter(c => c.strength < 50).length} relaties hebben aandacht nodig.` },
        { label: "ACTIE", text: "Klik 'Bereik' om contact te loggen." },
      ]}
      actions={[{ label: "Reach Out", primary: true }, { label: "Suggest" }, { label: "Schedule" }, { label: "Open Pulse" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-5">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">CONNECTIES DEZE WEEK</p>
            <p className="text-storm text-5xl font-bold mt-1 tabular-nums"><CountUp to={reached} /></p>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">RELATIE-PULSE · LIVE</p>
            <LiveSparkline color={OLIVE} max={10} intervalMs={1800} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">CONTACTEN · KLIK 'BEREIK' OM TE LOGGEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {contacts.map(c => (
              <div key={c.id} className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.c }} /><p className="text-sm text-storm">{c.name}</p></div>
                  <span className="text-[10px] text-storm/50">laatst: {c.last}</span>
                </div>
                <BarGrow value={c.strength} max={100} color={c.strength < 50 ? URG : c.c} height={6} />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-storm/50">{c.reached ? "✓ bereikt" : `${c.strength}% sterkte`}</span>
                  <button onClick={() => reach(c.id)} disabled={c.reached} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${c.reached ? "bg-marble/10 text-storm/40" : "bg-sand text-storm hover:brightness-110 active:scale-95"}`}>{c.reached ? "Gedaan" : "Bereik"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}