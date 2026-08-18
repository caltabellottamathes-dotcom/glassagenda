import React, { useState, useEffect } from "react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const DAYS = [{ d: "Ma", v: 4 }, { d: "Di", v: 6 }, { d: "Wo", v: 3 }, { d: "Do", v: 7 }, { d: "Vr", v: 5 }, { d: "Za", v: 1 }, { d: "Zo", v: 0 }];
const APPTS = [
  { id: 1, t: "09:00", dur: 60, title: "Standup", cat: "A" },
  { id: 2, t: "11:00", dur: 90, title: "Concept Brons", cat: "U" },
  { id: 3, t: "13:00", dur: 45, title: "Lunch", cat: "B" },
  { id: 4, t: "14:30", dur: 60, title: "Giulia 1:1", cat: "B" },
  { id: 5, t: "16:30", dur: 60, title: "Onderzoek", cat: "C" },
];
const COLOR = { A: SAND, B: OLIVE, C: DARK, U: URG };
const START = 8, END = 19;
const tToY = (t) => { const [h, m] = t.split(":").map(Number); const frac = (h + m / 60 - START) / (END - START); return 12 + frac * 320; };

export default function AgendaPreview() {
  const [sel, setSel] = useState(null);
  const [now, setNow] = useState(() => new Date().getHours() + new Date().getMinutes() / 60);
  useEffect(() => { const id = setInterval(() => setNow(new Date().getHours() + new Date().getMinutes() / 60), 30000); return () => clearInterval(id); }, []);
  const nowY = tToY(`${String(Math.floor(now)).padStart(2, "0")}:${String(Math.round((now % 1) * 60)).padStart(2, "0")}`);
  return (
    <ModuleShell index="02" section="AGENDA" statement={`${APPTS.length} AFSPRAKEN`} kicker="FOCUS · TIJDSRUGGRAAT"
      context={[
        { label: "RUGGRAAT", text: "Afspraken takken links/rechts af de dag-ruggengraat; de 'nu'-dot schuift mee." },
        { label: "VANDAAG", text: `${APPTS.length} afspraken, ${APPTS.reduce((s, a) => s + a.dur, 0)} min.` },
        { label: "DRUKSTE", text: "Donderdag is drukst deze week." },
      ]}
      actions={[{ label: "New Appointment", primary: true }, { label: "Today" }, { label: "Open Agenda" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 h-full overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <div className="mb-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">WEEKDICHTHEID</p>
            <div className="flex items-end gap-1.5 h-12">
              {DAYS.map((d, i) => <div key={d.d} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t" style={{ height: `${(d.v / 7) * 100}%`, background: i === 3 ? URG : SAND, opacity: 0.85 }} /><span className="text-[9px] text-storm/50">{d.d}</span></div>)}
            </div>
          </div>
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <svg viewBox="0 0 400 344" className="w-full h-full">
              <line x1="200" y1="12" x2="200" y2="332" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="2 4" />
              {Array.from({ length: END - START + 1 }).filter((_, i) => i % 2 === 0).map((_, i) => {
                const h = START + i * 2; const y = tToY(`${h}:00`);
                return <g key={i}><text x="196" y={y + 3} textAnchor="end" fontSize="8" fill="#ffffff55">{String(h).padStart(2, "0")}</text><line x1="198" y1={y} x2="202" y2={y} stroke="#ffffff20" /></g>;
              })}
              {APPTS.map((a, i) => {
                const y = tToY(a.t); const h = (a.dur / 60) / (END - START) * 320; const left = i % 2 === 0;
                const bx = left ? 200 : 200; const x = left ? 60 : 210; const w = 120;
                const isSel = sel && sel.id === a.id;
                return (
                  <g key={a.id} onClick={() => setSel(a)} style={{ cursor: "pointer" }}>
                    <path d={`M ${left ? x + w : x} ${y} L ${left ? 200 : 200} ${y}`} fill="none" stroke={COLOR[a.cat]} strokeWidth="1" strokeOpacity="0.5" />
                    <rect x={x} y={y} width={w} height={Math.max(16, h - 4)} rx="8" fill={`${COLOR[a.cat]}22`} stroke={COLOR[a.cat]} strokeWidth={isSel ? 2 : 1} strokeOpacity={isSel ? 1 : 0.5} />
                    <text x={x + 8} y={y + 14} fontSize="9" fill="#ffffffcc">{a.title}</text>
                    <text x={x + 8} y={y + 26} fontSize="7.5" fill="#ffffff80">{a.t}</text>
                  </g>
                );
              })}
              {now > START && now < END && (
                <g>
                  <line x1="120" y1={nowY} x2="280" y2={nowY} stroke={URG} strokeWidth="1.5" />
                  <circle cx="200" cy={nowY} r="5" fill={URG}><animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" /></circle>
                </g>
              )}
            </svg>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">VANDAAG · KLIK VOOR DETAIL</p>
          <div className="flex-1 overflow-auto pr-1 space-y-1.5">
            {APPTS.map(a => (
              <button key={a.id} onClick={() => setSel(a)} className={`w-full flex items-stretch gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${sel && sel.id === a.id ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                <span className="w-1 rounded-full shrink-0" style={{ background: COLOR[a.cat] }} />
                <div className="flex-1 min-w-0"><div className="flex items-center justify-between"><p className="text-sm text-storm truncate">{a.title}</p><span className="text-[10px] text-storm/40 tabular-nums shrink-0">{a.t}</span></div><p className="text-[10px] text-storm/50 mt-0.5">{a.dur} min</p></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}