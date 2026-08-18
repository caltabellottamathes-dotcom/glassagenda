import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const CAL = Array.from({ length: 28 }, (_, i) => i + 1);
const DOTS = { 16: "urgent", 18: "soon", 21: "soon", 24: "normal", 27: "normal" };
const ITEMS = [
  { id: 1, t: "Energieafrekening betalen", due: "16 aug", days: 0, urgent: true, handled: false },
  { id: 2, t: "Belastingaangifte Q3", due: "21 aug", days: 3, urgent: true, handled: false },
  { id: 3, t: "Verzekering vernieuwen", due: "27 aug", days: 9, urgent: false, handled: false },
  { id: 4, t: "Paspoort verlengen", due: "sep", days: 20, urgent: false, handled: false },
  { id: 5, t: "Abonnement opzeggen", due: "14 aug", days: -2, urgent: false, handled: true },
];
const cFor = (it) => it.urgent ? URG : it.days < 7 ? OLIVE : SAND;

export default function PersonalAdminPreview() {
  const [items, setItems] = useState(ITEMS);
  const toggle = (id) => setItems(i => i.map(x => x.id === id ? { ...x, handled: !x.handled } : x));
  const open = items.filter(i => !i.handled);
  const urgent = open.filter(i => i.urgent).length;
  const sorted = [...items].sort((a, b) => (a.handled ? 99 : 0) - (b.handled ? 99 : 0) || a.days - b.days);
  return (
    <ModuleShell index="03" section="PERSONAL ADMIN" statement={`${open.length} OPEN`} kicker="LIFE · PAPIERSTAPEL"
      context={[
        { label: "STAPEL", text: "Documenten vallen van de stapel naarmate je ze afhandelt; urgent bovenaan." },
        { label: "URGENT", text: `${urgent} vereist nu aandacht.` },
        { label: "KALENDER", text: "Punten tonen deadlines deze maand." },
      ]}
      actions={[{ label: "Add Task", primary: true }, { label: "Scan" }, { label: "Open Admin" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-4 overflow-auto pr-1">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">DEZE MAAND</p>
            <div className="grid grid-cols-7 gap-1">
              {CAL.map(d => {
                const dot = DOTS[d];
                const col = dot === "urgent" ? URG : dot === "soon" ? OLIVE : dot ? SAND : null;
                return <div key={d} className="aspect-square rounded-md flex items-center justify-center text-[9px] text-storm/50 relative" style={{ background: d === 16 ? "#ffffff10" : "transparent" }}>{d}{col && <span className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ background: col }} />}</div>;
              })}
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-[9px] text-storm/60">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: URG }} />urgent</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: OLIVE }} />spoedig</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: SAND }} />normaal</span>
            </div>
          </div>
          <div className="rounded-2xl border border-urgent/30 bg-urgent/5 p-4 text-center">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">VOLGENDE DEADLINE</p>
            <p className="text-urgent text-2xl font-bold mt-1">16 aug</p>
            <p className="text-storm/50 text-[10px]">vandaag</p>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PAPIERSTAPEL · KLIK OM AF TE HANDELEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            <AnimatePresence>
              {sorted.map((it, i) => (
                <motion.button key={it.id} layout initial={{ opacity: 0, y: 10 }} animate={it.handled ? { opacity: 0.35, x: 24 } : { opacity: 1, x: 0 }} exit={{ opacity: 0 }} onClick={() => toggle(it.id)} className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${it.handled ? "border-marble/15 bg-marble/5" : it.urgent ? "border-urgent/40 bg-urgent/5" : "border-marble/25 bg-marble/8 hover:bg-marble/15"}`} style={{ marginLeft: it.handled ? 24 : 0 }}>
                  <span className="w-1.5 h-10 rounded-full shrink-0" style={{ background: cFor(it) }} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${it.handled ? "text-storm/40 line-through" : "text-storm"}`}>{it.t}</p>
                    <p className="text-[10px] text-storm/50">{it.due}</p>
                  </div>
                  <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${it.handled ? "bg-sand border-sand" : "border-marble/40"}`}>{it.handled && <Check className="w-3.5 h-3.5 text-storm" />}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}