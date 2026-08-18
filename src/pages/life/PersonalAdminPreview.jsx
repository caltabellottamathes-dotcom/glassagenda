import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import { Check } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";
import { CountUp, LiveSparkline } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const WEEK = [{ d: "Ma", v: 1 }, { d: "Di", v: 3 }, { d: "Wo", v: 2 }, { d: "Do", v: 4 }, { d: "Vr", v: 2 }, { d: "Za", v: 0 }, { d: "Zo", v: 1 }];
const ITEMS = [
  { id: 1, t: "Energieafrekening betalen", due: "vandaag", urgent: true, handled: false },
  { id: 2, t: "Belastingaangifte Q3", due: "vr", urgent: true, handled: false },
  { id: 3, t: "Verzekering vernieuwen", due: "volgende wk", urgent: false, handled: false },
  { id: 4, t: "Paspoort verlengen", due: "mnd", urgent: false, handled: false },
  { id: 5, t: "Abonnement opzeggen", due: "vandaag", urgent: false, handled: true },
  { id: 6, t: "Contract ondertekenen", due: "morgen", urgent: false, handled: false },
];

export default function PersonalAdminPreview() {
  const [items, setItems] = useState(ITEMS);
  const toggle = (id) => setItems(i => i.map(x => x.id === id ? { ...x, handled: !x.handled } : x));
  const open = items.filter(i => !i.handled);
  const urgent = open.filter(i => i.urgent).length;
  return (
    <ModuleShell index="03" section="PERSONAL ADMIN" statement={`${open.length} OPEN`} kicker="LIFE · ADMINISTRATIE"
      context={[
        { label: "OPEN", text: `${open.length} administratieve taken open.` },
        { label: "URGENT", text: `${urgent} vereist directe aandacht.` },
        { label: "ACTIE", text: "Klik om af te handelen." },
      ]}
      actions={[{ label: "Add Task", primary: true }, { label: "Scan" }, { label: "Remind" }, { label: "Open Admin" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-5">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">OPEN</p>
            <p className="text-storm text-5xl font-bold mt-1 tabular-nums"><CountUp to={open.length} /></p>
            <p className="text-urgent text-[10px] tracking-wider mt-2">{urgent} urgent</p>
          </div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">DEADLINES PER DAG</p>
            <div className="h-32 rounded-2xl border border-marble/20 bg-marble/5 p-3"><ResponsiveContainer width="100%" height="100%"><BarChart data={WEEK}><XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} /><Bar dataKey="v" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1100}>{WEEK.map((w, i) => <Cell key={i} fill={w.v >= 3 ? URG : SAND} />)}</Bar></BarChart></ResponsiveContainer></div>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">HERINNERINGEN · LIVE</p>
            <LiveSparkline color={OLIVE} max={6} intervalMs={2000} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">TAKEN · KLIK OM AF TE HANDELEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {items.map(i => (
              <button key={i.id} onClick={() => toggle(i.id)} className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors ${i.handled ? "border-marble/15 bg-marble/5" : i.urgent ? "border-urgent/40 bg-urgent/5" : "border-marble/25 bg-marble/8 hover:bg-marble/15"}`}>
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${i.handled ? "bg-sand border-sand" : "border-marble/40"}`}>{i.handled && <Check className="w-3 h-3 text-storm" />}</span>
                <p className={`text-sm truncate flex-1 ${i.handled ? "text-storm/40 line-through" : "text-storm"}`}>{i.t}</p>
                <span className={`text-[10px] shrink-0 ${i.urgent && !i.handled ? "text-urgent" : "text-storm/40"}`}>{i.due}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}