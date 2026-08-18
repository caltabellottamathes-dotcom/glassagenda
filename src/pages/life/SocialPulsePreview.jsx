import React, { useState } from "react";
import { motion } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";
import { LiveSparkline, CountUp } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const CONTACTS = [
  { id: 1, name: "Anna", strength: 72, days: 18, c: SAND, reached: false },
  { id: 2, name: "T. Bakker", strength: 55, days: 12, c: URG, reached: false },
  { id: 3, name: "Mo", strength: 88, days: 3, c: OLIVE, reached: false },
  { id: 4, name: "S. Kaya", strength: 40, days: 26, c: DARK, reached: false },
  { id: 5, name: "Giulia (zus)", strength: 95, days: 1, c: SAND, reached: true },
];
const SIZE = 240;
const xOf = (s) => 24 + (s / 100) * (SIZE - 48);
const yOf = (d) => SIZE - 24 - (1 - Math.min(d, 30) / 30) * (SIZE - 48);

export default function SocialPulsePreview() {
  const [contacts, setContacts] = useState(CONTACTS);
  const reach = (id) => setContacts(c => c.map(x => x.id === id ? { ...x, reached: true, days: 0, strength: Math.min(100, x.strength + 8) } : x));
  const reached = contacts.filter(c => c.reached).length;
  return (
    <ModuleShell index="05" section="SOCIAL PULSE" statement={`${contacts.length - reached} TE BEREIKEN`} kicker="LIFE · RELATIERADAR"
      context={[
        { label: "RADAR", text: "Sterkte (x) × recentie (y). Sterke, recente contacten zitten rechtsboven en pulseren." },
        { label: "BEREIKT", text: `${reached}/${contacts.length} deze week.` },
        { label: "ACTIE", text: "Klik 'Bereik' om een punt naar vandaag te verplaatsen." },
      ]}
      actions={[{ label: "Reach Out", primary: true }, { label: "Suggest" }, { label: "Open Pulse" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[320px] aspect-square">
            {[0.25, 0.5, 0.75, 1].map(r => <circle key={r} cx={xOf(50)} cy={yOf(15)} r={((SIZE - 48) / 2) * r} fill="none" stroke="#ffffff10" />)}
            <line x1="24" y1={SIZE - 24} x2={SIZE - 24} y2={SIZE - 24} stroke="#ffffff20" />
            <line x1="24" y1="24" x2="24" y2={SIZE - 24} stroke="#ffffff20" />
            <text x={SIZE - 20} y={SIZE - 10} fontSize="8" fill="#ffffff60" textAnchor="end">sterkte →</text>
            <text x="30" y="32" fontSize="8" fill="#ffffff60">↑ recent</text>
            {contacts.map(c => {
              const cx = xOf(c.strength), cy = yOf(c.days);
              return (
                <g key={c.id}>
                  {c.strength > 70 && c.days < 10 && <circle cx={cx} cy={cy} r="8" fill="none" stroke={c.c} strokeOpacity="0.5"><animate attributeName="r" values="6;16;6" dur="2.2s" repeatCount="indefinite" /><animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" /></circle>}
                  <motion.circle cx={cx} cy={cy} r={c.reached ? 7 : 6} fill={c.reached ? URG : c.c} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2 + c.id, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box" }} />
                  <text x={cx} y={cy - 10} textAnchor="middle" fontSize="8" fill="#ffffff99">{c.name.split(" ")[0]}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4 mb-3">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">CONNECTIES DEZE WEEK</p>
            <p className="text-storm text-4xl font-bold tabular-nums"><CountUp to={reached} /></p>
            <div className="mt-2"><LiveSparkline color={OLIVE} max={10} intervalMs={1800} /></div>
          </div>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {contacts.map(c => (
              <div key={c.id} className="rounded-2xl border border-marble/20 bg-marble/5 p-3 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.c }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-storm truncate">{c.name}</p>
                  <p className="text-[10px] text-storm/50">{c.days === 0 ? "vandaag" : `${c.days} dagen`} · {c.strength}%</p>
                </div>
                <button onClick={() => reach(c.id)} disabled={c.reached} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all shrink-0 ${c.reached ? "bg-marble/10 text-storm/40" : "bg-sand text-storm hover:brightness-110 active:scale-95"}`}>{c.reached ? "✓" : "Bereik"}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}