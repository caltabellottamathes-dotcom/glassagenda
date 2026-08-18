import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", URG = "#d5e24a";
const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const EVENTS = [
  { id: 1, day: 4, date: "21", title: "Diner met Anna", time: "19:00", status: "pending" },
  { id: 2, day: 5, date: "22", title: "Borrel Centrum West", time: "16:00", status: "confirmed" },
  { id: 3, day: 6, date: "23", title: "Brunch met Mo", time: "11:00", status: "pending" },
  { id: 4, day: 1, date: "25", title: "Bellen T. Bakker", time: "10:00", status: "pending" },
  { id: 5, day: 3, date: "27", title: "Koffie S. Kaya", time: "15:00", status: "confirmed" },
];
const label = { confirmed: "BEVESTIGD", pending: "OPEN", declined: "AFGEGEZEGD" };
const W = 340;

export default function SocialPlannerPreview() {
  const [events, setEvents] = useState(EVENTS);
  const set = (id, status) => setEvents(e => e.map(x => x.id === id ? { ...x, status } : x));
  const confirmed = events.filter(e => e.status === "confirmed").length;
  const pct = Math.round((confirmed / events.length) * 100);
  return (
    <ModuleShell index="04" section="SOCIAL PLANNER" statement={`${events.length} AFSPRAKEN`} kicker="LIFE · WEEKBOOG"
      context={[
        { label: "BOOG", text: "Events hangen als knooppunten op de weekboog; bevestig en ze verstralen." },
        { label: "BEVESTIGD", text: `${confirmed}/${events.length}.` },
        { label: "ACTIE", text: "Klik ✓ of ✕ per afspraak." },
      ]}
      actions={[{ label: "Add Event", primary: true }, { label: "Sync Cal" }, { label: "Open Planner" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <div className="relative flex-1 min-h-0">
            <svg viewBox={`0 0 ${W} 170`} className="w-full h-full">
              <path d={`M 20 150 Q ${W / 2} -30 ${W - 20} 150`} fill="none" stroke="#ffffff18" strokeWidth="1.5" strokeDasharray="2 4" />
              {DAYS.map((d, i) => {
                const x = 20 + (i / 6) * (W - 40);
                const t = i / 6;
                const y = 150 - 4 * t * (1 - t) * 180;
                return <g key={d}><circle cx={x} cy={y} r="3" fill="#ffffff30" /><text x={x} y={y + 16} textAnchor="middle" fontSize="8" fill="#ffffff60">{d}</text></g>;
              })}
              {events.map((e, i) => {
                const x = 20 + (e.day / 6) * (W - 40);
                const t = e.day / 6;
                const y = 150 - 4 * t * (1 - t) * 180;
                const c = e.status === "confirmed" ? URG : e.status === "declined" ? "#ffffff20" : SAND;
                return (
                  <g key={e.id}>
                    {e.status !== "declined" && <circle cx={x} cy={y} r="10" fill="none" stroke={c} strokeOpacity="0.5"><animate attributeName="r" values="8;14;8" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" /><animate attributeName="stroke-opacity" values="0.6;0;0.6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" /></circle>}
                    <circle cx={x} cy={y} r="7" fill={c} opacity={e.status === "declined" ? 0.3 : 0.95} />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-3">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">BEVESTIGD · {pct}%</p>
            <div className="h-2 rounded-full bg-marble/10 overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct === 100 ? URG : SAND }} /></div>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">AFSPRAKEN · BEVESTIG OF ZEG AF</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            <AnimatePresence>
              {events.map(e => (
                <motion.div key={e.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-marble/20 bg-marble/5 px-3 py-2.5">
                  <div className="text-center shrink-0 w-10"><p className="text-[9px] text-storm/50">{DAYS[e.day]}</p><p className="text-storm text-base font-bold tabular-nums">{e.date}</p></div>
                  <div className="flex-1 min-w-0"><p className="text-sm text-storm truncate">{e.title}</p><p className="text-[10px] text-storm/50">{e.time} · <span className={e.status === "confirmed" ? "text-urgent" : ""}>{label[e.status]}</span></p></div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => set(e.id, "confirmed")} className={`w-7 h-7 rounded-full text-[11px] font-semibold transition-all ${e.status === "confirmed" ? "bg-sand text-storm" : "border border-marble/30 bg-marble/5 text-storm/60 hover:bg-marble/10"}`}>✓</button>
                    <button onClick={() => set(e.id, "declined")} className={`w-7 h-7 rounded-full text-[11px] transition-all ${e.status === "declined" ? "bg-urgent/20 text-urgent" : "border border-marble/30 bg-marble/5 text-storm/60 hover:bg-marble/10"}`}>✕</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}