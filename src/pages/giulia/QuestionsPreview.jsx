import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing } from "@/components/modules/viz";

const SAND = "#94925d", URG = "#d5e24a";
const QS = [
  { id: 1, q: "Welke deadline heeft de hoogste prioriteit deze week?", domain: "FOCUS" },
  { id: 2, q: "Heb je nog behoefte aan rust vandaag?", domain: "SELF" },
  { id: 3, q: "Wie wil je deze week graag even spreken?", domain: "LIFE" },
  { id: 4, q: "Mag ik je agenda automatisch bijstellen na de late afspraak?", domain: "GIULIA" },
];

export default function QuestionsPreview() {
  const [list, setList] = useState(QS.map(x => ({ ...x, answer: "", resolved: false })));
  const resolved = list.filter(q => q.resolved).length;
  const pct = Math.round((resolved / list.length) * 100);
  const setAns = (id, v) => setList(l => l.map(x => x.id === id ? { ...x, answer: v } : x));
  const submit = (id) => setList(l => l.map(x => x.id === id && x.answer.trim() ? { ...x, resolved: true } : x));
  return (
    <ModuleShell index="08" section="QUESTIONS" statement={`${list.length - resolved} OPEN`} kicker="GIULIA · VRAAGT"
      context={[
        { label: "OPEN", text: `${list.length - resolved} vragen wachten op antwoord.` },
        { label: "BEANTWOORD", text: `${resolved} opgelost.` },
        { label: "WAAROM", text: "Antwoorden helpen GIULIA beter te plannen." },
      ]}
      actions={[{ label: "Skip All", primary: true }, { label: "Snooze" }, { label: "Voice Answer" }, { label: "Open Questions" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={pct} size={180} color={resolved === list.length ? URG : SAND} label={`${resolved}/${list.length}`} sub="BEANTWOORD" /></div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PER DOMEIN</p>
            {["FOCUS", "LIFE", "SELF", "GIULIA"].map(d => {
              const n = list.filter(q => q.domain === d).length;
              return <div key={d} className="flex justify-between text-xs mb-2"><span className="text-storm/70">{d}</span><span className="text-storm tabular-nums">{n}</span></div>;
            })}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">BEANTWOORD EEN VRAAG</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            <AnimatePresence>
              {list.map(q => (
                <motion.div key={q.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} className={`rounded-2xl border p-4 ${q.resolved ? "border-marble/15 bg-marble/5" : "border-marble/25 bg-marble/8"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-wider text-storm/50">{q.domain}</span>
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