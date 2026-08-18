import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", URG = "#d5e24a";
const QS = [
  { id: 1, q: "Welke deadline heeft de hoogste prioriteit deze week?", domain: "FOCUS" },
  { id: 2, q: "Heb je nog behoefte aan rust vandaag?", domain: "SELF" },
  { id: 3, q: "Wie wil je deze week graag even spreken?", domain: "LIFE" },
  { id: 4, q: "Mag ik je agenda automatisch bijstellen?", domain: "GIULIA" },
];
const R = 84, C = 2 * Math.PI * R;
const colors = { FOCUS: SAND, LIFE: "#d8dab3", SELF: "#6b6a4a", GIULIA: URG };

export default function QuestionsPreview() {
  const [list, setList] = useState(QS.map(x => ({ ...x, answer: "", resolved: false })));
  const resolved = list.filter(q => q.resolved).length;
  const pct = Math.round((resolved / list.length) * 100);
  const setAns = (id, v) => setList(l => l.map(x => x.id === id ? { ...x, answer: v } : x));
  const submit = (id) => setList(l => l.map(x => x.id === id && x.answer.trim() ? { ...x, resolved: true } : x));
  return (
    <ModuleShell index="08" section="QUESTIONS" statement={`${list.length - resolved} OPEN`} kicker="GIULIA · VRAGENBOOG"
      context={[
        { label: "BOOG", text: "Elk antwoord laat de boog van opgeloste vragen groeien." },
        { label: "BEANTWOORD", text: `${resolved}/${list.length} opgelost.` },
        { label: "ACTIE", text: "Typ een antwoord en druk op Stuur." },
      ]}
      actions={[{ label: "Skip All", primary: true }, { label: "Snooze" }, { label: "Open Questions" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="-120 -120 240 240" className="w-full max-w-[240px] aspect-square">
            <path d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`} fill="none" stroke="#ffffff10" strokeWidth="14" strokeLinecap="round" />
            <path d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`} fill="none" stroke={URG} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${(pct / 100) * (Math.PI * R)} ${Math.PI * R}`} />
            <text x="0" y="-4" textAnchor="middle" fontSize="30" fontWeight="700" fill={URG}>{pct}%</text>
            <text x="0" y="14" textAnchor="middle" fontSize="9" fill="#ffffff80">OPGELOST</text>
          </svg>
          <div className="mt-3 space-y-1.5 w-full px-2">
            {Object.entries(colors).map(([d, c]) => {
              const n = list.filter(q => q.domain === d).length;
              return <div key={d} className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-2 text-storm/70"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />{d}</span><span className="text-storm tabular-nums">{n}</span></div>;
            })}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">BEANTWOORD EEN VRAAG</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            <AnimatePresence>
              {list.map(q => (
                <motion.div key={q.id} layout initial={{ opacity: 0, y: 8 }} animate={q.resolved ? { opacity: 0.5, x: 20 } : { opacity: 1, x: 0 }} className={`rounded-2xl border p-4 ${q.resolved ? "border-marble/15 bg-marble/5" : "border-marble/25 bg-marble/8"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${colors[q.domain]}22`, color: colors[q.domain] }}>{q.domain}</span>
                    <span className={`text-[10px] ${q.resolved ? "text-urgent" : "text-storm/40"}`}>{q.resolved ? "✓ BEANTWOORD" : "OPEN"}</span>
                  </div>
                  <p className={`text-sm ${q.resolved ? "text-storm/50" : "text-storm"}`}>{q.q}</p>
                  {q.resolved ? (
                    <p className="text-storm/60 text-xs mt-2 italic">“{q.answer}”</p>
                  ) : (
                    <div className="flex gap-2 mt-3">
                      <input value={q.answer} onChange={e => setAns(q.id, e.target.value)} onKeyDown={e => e.key === "Enter" && submit(q.id)} placeholder="Jouw antwoord..." className="flex-1 rounded-lg border border-marble/30 bg-marble/5 px-3 py-2 text-sm text-storm placeholder:text-storm/40 focus:outline-none focus:border-sand" />
                      <button onClick={() => submit(q.id)} className="px-4 py-2 rounded-lg bg-sand text-storm text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all">Stuur</button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}