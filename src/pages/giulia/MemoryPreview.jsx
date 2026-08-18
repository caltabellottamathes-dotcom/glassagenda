import React, { useState } from "react";
import { Pin } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const SECTORS = [
  { n: "Mensen", c: SAND, a0: -Math.PI / 2, a1: 0 },
  { n: "Projecten", c: OLIVE, a0: 0, a1: Math.PI / 2 },
  { n: "Plaatsen", c: URG, a0: Math.PI / 2, a1: Math.PI },
  { n: "Feiten", c: DARK, a0: Math.PI, a1: 3 * Math.PI / 2 },
];
const MEMS = [
  { id: 1, text: "Giulia werkt liefst in de vroege ochtend", cat: "Mensen", pinned: true },
  { id: 2, text: "Concept Brons deadline 24 aug", cat: "Projecten", pinned: false },
  { id: 3, text: "Centrum West ruimte op do", cat: "Plaatsen", pinned: true },
  { id: 4, text: "F. de Boer expert kwalitatief", cat: "Mensen", pinned: false },
  { id: 5, text: "Koffie zonder suiker", cat: "Feiten", pinned: false },
  { id: 6, text: "Marktanalyse Q3 vervolg Q2", cat: "Projecten", pinned: false },
  { id: 7, text: "Vakantie Lissabon okt", cat: "Plaatsen", pinned: false },
  { id: 8, text: "Liever 's avonds brainstormen", cat: "Feiten", pinned: true },
];
const secC = (c) => (SECTORS.find(x => x.n === c) || {}).c || SAND;
const rand = (seed) => { const x = Math.sin(seed) * 10000; return x - Math.floor(x); };
const starPos = (m, i) => {
  const s = SECTORS.find(x => x.n === m.cat);
  const a = s.a0 + rand(m.id * 7 + i) * (s.a1 - s.a0);
  const r = 50 + rand(m.id * 13 + i) * 100;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
};

export default function MemoryPreview() {
  const [q, setQ] = useState("");
  const [mems, setMems] = useState(MEMS);
  const pin = (id) => setMems(m => m.map(x => x.id === id ? { ...x, pinned: !x.pinned } : x));
  const match = (m) => (m.text + m.cat).toLowerCase().includes(q.toLowerCase());
  return (
    <ModuleShell index="07" section="MEMORY" statement="GALAXY" kicker="GIULIA · HERINNERINGSGALAXY"
      context={[
        { label: "GALAXY", text: "Herinneringen als sterren, gegroepeerd per sector." },
        { label: "VASTGEPINN", text: `${mems.filter(m => m.pinned).length} sterren opgelicht.` },
        { label: "ZOEK", text: "Typ om sterren te filteren." },
      ]}
      actions={[{ label: "Add Memory", primary: true }, { label: "Export" }, { label: "Open Memory" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="-170 -170 340 340" className="w-full max-w-[440px] aspect-square">
            <g>
              {SECTORS.map(s => {
                const x0 = Math.cos(s.a0) * 160, y0 = Math.sin(s.a0) * 160;
                const x1 = Math.cos(s.a1) * 160, y1 = Math.sin(s.a1) * 160;
                return <path key={s.n} d={`M 0 0 L ${x0} ${y0} A 160 160 0 0 1 ${x1} ${y1} Z`} fill={s.c} opacity="0.04" stroke={s.c} strokeOpacity="0.15" />;
              })}
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="120s" repeatCount="indefinite" />
            </g>
            {mems.map((m, i) => {
              const p = starPos(m, i);
              const on = match(m);
              return (
                <g key={m.id} onClick={() => pin(m.id)} style={{ cursor: "pointer" }} opacity={on ? 1 : 0.12}>
                  <circle cx={p.x} cy={p.y} r={m.pinned ? 5 : 3} fill={secC(m.cat)}>
                    <animate attributeName="opacity" values="1;0.4;1" dur={`${2 + (i % 4)}s`} repeatCount="indefinite" />
                  </circle>
                  {m.pinned && <circle cx={p.x} cy={p.y} r="9" fill="none" stroke={secC(m.cat)} strokeWidth="1.5"><animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" /><animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" /></circle>}
                </g>
              );
            })}
            <circle r="22" fill="#301728" stroke={URG} strokeWidth="1.5" />
            <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="700" fill={URG}>{mems.length}</text>
          </svg>
          <div className="flex flex-wrap gap-3 justify-center mt-1">
            {SECTORS.map(s => <span key={s.n} className="flex items-center gap-1.5 text-[10px] text-storm/70"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.c }} />{s.n}</span>)}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Zoek in galaxy..." className="w-full rounded-xl border border-marble/30 bg-marble/5 px-4 py-2.5 text-sm text-storm placeholder:text-storm/40 focus:outline-none focus:border-sand mb-3" />
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {mems.filter(match).map(m => (
              <button key={m.id} onClick={() => pin(m.id)} className="w-full flex items-center gap-3 rounded-xl border border-marble/20 bg-marble/5 hover:bg-marble/10 px-4 py-2.5 text-left transition-colors">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: secC(m.cat) }} />
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