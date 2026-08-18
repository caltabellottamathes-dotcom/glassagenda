import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing } from "@/components/modules/viz";

const SAND = "#94925d", URG = "#d5e24a";
const EVENTS = [
  { id: 1, day: "Vr", date: "21", title: "Diner met Anna", time: "19:00", status: "pending" },
  { id: 2, day: "Za", date: "22", title: "Borrel Centrum West", time: "16:00", status: "confirmed" },
  { id: 3, day: "Zo", date: "23", title: "Brunch met Mo", time: "11:00", status: "pending" },
  { id: 4, day: "Di", date: "25", title: "Bellen met T. Bakker", time: "10:00", status: "pending" },
  { id: 5, day: "Do", date: "27", title: "Koffie met S. Kaya", time: "15:00", status: "confirmed" },
];
const label = { confirmed: "BEVESTIGD", pending: "OPEN", declined: "AFGEGEZEGD" };

export default function SocialPlannerPreview() {
  const [events, setEvents] = useState(EVENTS);
  const set = (id, status) => setEvents(e => e.map(x => x.id === id ? { ...x, status } : x));
  const confirmed = events.filter(e => e.status === "confirmed").length;
  const pct = Math.round((confirmed / events.length) * 100);
  return (
    <ModuleShell index="04" section="SOCIAL PLANNER" statement={`${events.length} AFSPRAKEN`} kicker="LIFE · SOCIAAL"
      context={[
        { label: "DEZE WEEK", text: `${events.length} sociale afspraken gepland.` },
        { label: "BEVESTIGD", text: `${confirmed} bevestigd.` },
        { label: "ACTIE", text: "Bevestig of zeg af per afspraak." },
      ]}
      actions={[{ label: "Add Event", primary: true }, { label: "Sync Cal" }, { label: "Invite" }, { label: "Open Planner" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={pct} size={180} color={pct >= 60 ? URG : SAND} label={`${pct}%`} sub="BEVESTIGD" /></div>
          <div className="flex justify-between gap-1">
            {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map(d => {
              const has = events.some(e => e.day === d);
              return <div key={d} className="flex flex-col items-center gap-1.5"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] ${has ? "bg-sand text-storm" : "bg-marble/10 text-storm/40"}`}>{d[0]}</div>{has && <span className="w-1 h-1 rounded-full bg-urgent" />}</div>;
            })}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">SOCIALE AGENDA · BEVESTIG OF ZEG AF</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            <AnimatePresence>
              {events.map(e => (
                <motion.div key={e.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} className="flex items-center gap-3 rounded-2xl border border-marble/20 bg-marble/5 px-4 py-3">
                  <div className="text-center shrink-0 w-12"><p className="text-[10px] text-storm/50">{e.day}</p><p className="text-storm text-lg font-bold tabular-nums">{e.date}</p></div>
                  <div className="w-px h-10 bg-marble/20 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-storm truncate">{e.title}</p>
                    <p className="text-[10px] text-storm/50">{e.time} · <span className={e.status === "confirmed" ? "text-urgent" : ""}>{label[e.status]}</span></p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => set(e.id, "confirmed")} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${e.status === "confirmed" ? "bg-sand text-storm" : "border border-marble/30 bg-marble/5 text-storm/60 hover:bg-marble/10"}`}>✓</button>
                    <button onClick={() => set(e.id, "declined")} className={`px-3 py-1.5 rounded-full text-[10px] transition-all ${e.status === "declined" ? "bg-urgent/20 text-urgent" : "border border-marble/30 bg-marble/5 text-storm/60 hover:bg-marble/10"}`}>✕</button>
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