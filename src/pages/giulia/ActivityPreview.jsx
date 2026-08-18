import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const TYPES = [
  { n: "task", c: SAND, l: "Taak", r: 62 },
  { n: "message", c: OLIVE, l: "Bericht", r: 98 },
  { n: "calendar", c: DARK, l: "Agenda", r: 134 },
  { n: "alert", c: URG, l: "Alert", r: 170 },
];
const POOL = [
  { t: "task", m: "Nieuwe taak: Concept Brons review" }, { t: "message", m: "Giulia stuurde een bericht" },
  { t: "calendar", m: "Afspraak verzet naar 14:00" }, { t: "alert", m: "Deadline nadert: Marktanalyse" },
  { t: "task", m: "Subtaak voltooid: Data verzamelen" }, { t: "message", m: "F. de Boer reageerde" },
  { t: "calendar", m: "Vergadering toegevoegd" }, { t: "alert", m: "Capaciteit laag vandaag" },
];
const typeC = (t) => (TYPES.find(x => x.n === t) || {}).c || SAND;
const typeL = (t) => (TYPES.find(x => x.n === t) || {}).l || t;
const node = (r, i) => { const a = (i / 5) * 2 * Math.PI; return { x: Math.cos(a) * r, y: Math.sin(a) * r }; };

export default function ActivityPreview() {
  const [on, setOn] = useState({ task: true, message: true, calendar: true, alert: true });
  const [feed, setFeed] = useState(() => POOL.slice(0, 4).map((p, i) => ({ id: i, ...p })));
  const [seen, setSeen] = useState(() => new Set([0, 1, 2, 3]));
  useEffect(() => {
    const id = setInterval(() => { const p = POOL[Math.floor(Math.random() * POOL.length)]; setFeed(f => [{ id: Date.now(), ...p }, ...f].slice(0, 14)); }, 2600);
    return () => clearInterval(id);
  }, []);
  const ack = (id) => setSeen(s => new Set([...s, id]));
  const unseen = feed.length - seen.size;
  return (
    <ModuleShell index="01" section="ACTIVITY" statement={`${unseen} NIEUW`} kicker="GIULIA · ACTIVITEITSORBIT"
      context={[
        { label: "ORBIT", text: "Elk type draait op eigen ring om de GIULIA-kern." },
        { label: "VANDAAG", text: `${feed.length} events geregistreerd.` },
        { label: "ACTIE", text: "Klik een type om zijn baan aan/uit te zetten." },
      ]}
      actions={[{ label: "Mark All Read", primary: true }, { label: "Filter" }, { label: "Open Activity" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="-200 -200 400 400" className="w-full max-w-[440px] aspect-square">
            {TYPES.map(t => <circle key={t.n} cx="0" cy="0" r={t.r} fill="none" stroke={t.c} strokeOpacity={on[t.n] ? 0.18 : 0.05} strokeWidth="1" />)}
            <circle r="40" fill="#301728" stroke={URG} strokeWidth="1.5" />
            <circle r="40" fill="none" stroke={URG} strokeWidth="1.5" strokeOpacity="0.5">
              <animate attributeName="r" values="40;52;40" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="9" textAnchor="middle" fontSize="30" fontWeight="700" fill={URG}>G</text>
            {TYPES.map((t, ti) => on[t.n] && (
              <g key={t.n}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const p = node(t.r, i);
                  return <circle key={i} cx={p.x} cy={p.y} r="6" fill={t.c}>
                    <animate attributeName="r" values="5;7.5;5" dur={`${1.6 + ti * 0.3 + i * 0.1}s`} repeatCount="indefinite" />
                  </circle>;
                })}
                <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={`${26 + ti * 10}s`} repeatCount="indefinite" />
              </g>
            ))}
          </svg>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {TYPES.map(t => (
              <button key={t.n} onClick={() => setOn(o => ({ ...o, [t.n]: !o[t.n] }))} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors ${on[t.n] ? "border-marble/30 bg-marble/10 text-storm" : "border-marble/15 bg-marble/5 text-storm/40"}`}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.c }} />{t.l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">LIVE FEED · KLIK OM TE BEVESTIGEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            <AnimatePresence>
              {feed.map(it => (
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