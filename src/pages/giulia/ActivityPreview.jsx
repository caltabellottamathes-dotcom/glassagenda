import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";
import { CountUp, PulseWave } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const TYPES = [
  { n: "task", c: SAND, l: "Taak" },
  { n: "message", c: OLIVE, l: "Bericht" },
  { n: "calendar", c: DARK, l: "Agenda" },
  { n: "alert", c: URG, l: "Alert" },
];
const POOL = [
  { t: "task", m: "Nieuwe taak: Concept Brons review" },
  { t: "message", m: "Giulia stuurde een bericht" },
  { t: "calendar", m: "Afspraak verzet naar 14:00" },
  { t: "alert", m: "Deadline nadert: Marktanalyse" },
  { t: "task", m: "Subtaak voltooid: Data verzamelen" },
  { t: "message", m: "F. de Boer reageerde" },
  { t: "calendar", m: "Vergadering toegevoegd" },
  { t: "alert", m: "Capaciteit laag vandaag" },
];
const typeC = (t) => (TYPES.find(x => x.n === t) || {}).c || SAND;
const typeL = (t) => (TYPES.find(x => x.n === t) || {}).l || t;

export default function ActivityPreview() {
  const [items, setItems] = useState(() => POOL.slice(0, 5).map((p, i) => ({ id: i, ...p })));
  const [seen, setSeen] = useState(() => new Set([0, 1, 2, 3, 4]));
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const id = setInterval(() => {
      const p = POOL[Math.floor(Math.random() * POOL.length)];
      setItems(prev => [{ id: Date.now(), ...p }, ...prev].slice(0, 18));
    }, 2400);
    return () => clearInterval(id);
  }, []);
  const ack = (id) => setSeen(s => new Set([...s, id]));
  const filtered = filter === "all" ? items : items.filter(i => i.t === filter);
  const unseen = items.length - seen.size;
  return (
    <ModuleShell index="01" section="ACTIVITY" statement={`${unseen} NIEUW`} kicker="GIULIA · LIVE FEED"
      context={[
        { label: "VANDAAG", text: `${items.length} events geregistreerd door GIULIA.` },
        { label: "ONGELEZEN", text: `${unseen} wacht op je aandacht.` },
        { label: "BRON", text: "FOCUS, LIFE en SELF samengevoegd." },
      ]}
      actions={[{ label: "Mark All Read", primary: true }, { label: "Filter" }, { label: "Mute" }, { label: "Open Activity" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-5">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">EVENTS VANDAAG</p>
            <p className="text-storm text-5xl font-bold mt-1 tabular-nums"><CountUp to={items.length} /></p>
            <p className="text-urgent text-[10px] tracking-wider mt-2">{unseen} ongelezen</p>
          </div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">FILTER · TYPE</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilter("all")} className={`px-3 py-1.5 rounded-full text-[11px] border transition-colors ${filter === "all" ? "bg-sand text-storm border-sand" : "border-marble/30 bg-marble/5 text-storm/70 hover:bg-marble/10"}`}>Alles</button>
              {TYPES.map(t => (
                <button key={t.n} onClick={() => setFilter(t.n)} className={`px-3 py-1.5 rounded-full text-[11px] border transition-colors ${filter === t.n ? "bg-sand text-storm border-sand" : "border-marble/30 bg-marble/5 text-storm/70 hover:bg-marble/10"}`}>{t.l}</button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">ACTIVITEIT · LIVE</p>
            <PulseWave color={URG} bars={22} height={40} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">{filtered.length} EVENTS · KLIK OM TE BEVESTIGEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            <AnimatePresence>
              {filtered.map(it => (
                <motion.button key={it.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} onClick={() => ack(it.id)} className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors ${seen.has(it.id) ? "border-marble/15 bg-marble/5" : "border-marble/25 bg-marble/8 hover:bg-marble/15"}`}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: typeC(it.t) }} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${seen.has(it.id) ? "text-storm/45" : "text-storm"}`}>{it.m}</p>
                    <p className="text-[10px] text-storm/50">{typeL(it.t)}</p>
                  </div>
                  <span className="text-[10px] text-storm/40 shrink-0">{seen.has(it.id) ? "✓" : "●"}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}