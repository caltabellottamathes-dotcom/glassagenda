import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Pin } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";
import { CountUp, LiveSparkline } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const CATS = [
  { n: "Mensen", v: 42, c: SAND }, { n: "Projecten", v: 28, c: OLIVE }, { n: "Feiten", v: 51, c: DARK }, { n: "Plaatsen", v: 14, c: URG },
];
const MEMS = [
  { id: 1, text: "Giulia werkt liefst in de vroege ochtend", cat: "Mensen", pinned: true },
  { id: 2, text: "Concept Brons heeft harde deadline 24 aug", cat: "Projecten", pinned: false },
  { id: 3, text: "Centrum West vergaderruimte beschikbaar op do", cat: "Plaatsen", pinned: true },
  { id: 4, text: "F. de Boer is expert in kwalitatief onderzoek", cat: "Mensen", pinned: false },
  { id: 5, text: "Voorkeur: koffie zonder suiker", cat: "Feiten", pinned: false },
  { id: 6, text: "Marktanalyse Q3 is een vervolg op Q2", cat: "Projecten", pinned: false },
];
const catC = (c) => (CATS.find(x => x.n === c) || {}).c || SAND;

export default function MemoryPreview() {
  const [q, setQ] = useState("");
  const [mems, setMems] = useState(MEMS);
  const pin = (id) => setMems(m => m.map(x => x.id === id ? { ...x, pinned: !x.pinned } : x));
  const filtered = mems.filter(m => (m.text + m.cat).toLowerCase().includes(q.toLowerCase()));
  const pinned = mems.filter(m => m.pinned).length;
  return (
    <ModuleShell index="07" section="MEMORY" statement={`${mems.length} HERINNERINGEN`} kicker="GIULIA · ONTHOUDT"
      context={[
        { label: "TOTAAL", text: `${mems.length} herinneringen over je leven.` },
        { label: "VASTGEPINN", text: `${pinned} als belangrijk gemarkeerd.` },
        { label: "ZOEK", text: "Filter mensen, projecten of feiten." },
      ]}
      actions={[{ label: "Add Memory", primary: true }, { label: "Export" }, { label: "Forget" }, { label: "Open Memory" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-5">
            <p className="text-storm/50 text-[10px] tracking-[0.25em]">HERINNERINGEN</p>
            <p className="text-storm text-5xl font-bold mt-1 tabular-nums"><CountUp to={mems.length} /></p>
            <p className="text-urgent text-[10px] tracking-wider mt-2">{pinned} vastgepind</p>
          </div>
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">CATEGORIEËN</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={CATS} dataKey="v" nameKey="n" innerRadius={36} outerRadius={60} paddingAngle={3} isAnimationActive animationDuration={1000}>
                  {CATS.map((c, i) => <Cell key={i} fill={c.c} stroke="transparent" />)}
                </Pie></PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {CATS.map(c => <span key={c.n} className="flex items-center gap-1.5 text-[10px] text-storm/70"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.c }} />{c.n}</span>)}
            </div>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">NIEUWE HERINNERINGEN · LIVE</p>
            <LiveSparkline color={SAND} max={8} intervalMs={2200} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Zoek in geheugen..." className="w-full rounded-xl border border-marble/30 bg-marble/5 px-4 py-2.5 text-sm text-storm placeholder:text-storm/40 focus:outline-none focus:border-sand mb-3" />
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">{filtered.length} RESULTATEN · KLIK OM VAST TE PINNEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {filtered.map(m => (
              <button key={m.id} onClick={() => pin(m.id)} className="w-full flex items-center gap-3 rounded-xl border border-marble/20 bg-marble/5 hover:bg-marble/10 px-4 py-2.5 text-left transition-colors">
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: catC(m.cat) }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate text-storm">{m.text}</p>
                  <p className="text-[10px] text-storm/50">{m.cat}</p>
                </div>
                <Pin className={`w-4 h-4 shrink-0 ${m.pinned ? "text-urgent" : "text-storm/30"}`} fill={m.pinned ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}