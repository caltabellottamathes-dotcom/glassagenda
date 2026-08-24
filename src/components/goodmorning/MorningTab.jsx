import React from "react";
import { Check, SkipForward, Sunrise, BellRing, ChevronRight } from "lucide-react";
import { Ring, BarRow, Divider, FooterAction, Label, PISTACHIO, OLIVE, EARTH, URGENT } from "./viz";

const LAST = { wakeStart: "07:00", readyTime: "07:42", totalMin: 42, target: 35, snoozes: 3, snoozeMin: 12 };
const PHASES = [
  { name: "Wake", min: 8, color: PISTACHIO },
  { name: "Get Up", min: 4, color: OLIVE },
  { name: "Routine", min: 24, color: EARTH },
  { name: "Ready", min: 6, color: "rgba(255,255,255,0.6)" },
];
const STEPS = [
  { name: "Opstaan", done: true },
  { name: "Water drinken", done: true },
  { name: "Lichttherapie", done: true },
  { name: "Stretching", skipped: true },
  { name: "Wandelen", done: true },
  { name: "Douche", done: true },
  { name: "Ontbijt", done: true },
  { name: "Reflectie", skipped: true },
];
const HISTORY = [38, 41, 45, 36, 40, 42, 44];

export default function MorningTab() {
  const total = PHASES.reduce((s, p) => s + p.min, 0);
  const avg = Math.round(HISTORY.slice(0, -1).reduce((s, v) => s + v, 0) / (HISTORY.length - 1));
  const delta = LAST.totalMin - avg;
  const over = delta > 0;
  const pct = Math.round((LAST.totalMin / LAST.target) * 100);
  const doneCount = STEPS.filter((s) => s.done).length;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Ring + stats */}
      <div className="flex items-center gap-5">
        <Ring pct={pct} size={104} color={over ? URGENT : PISTACHIO}>
          <span className="text-storm text-2xl font-bold tabular-nums leading-none">{LAST.totalMin}</span>
          <span className="text-storm/40 text-[8px] tracking-widest mt-1">MIN</span>
        </Ring>
        <div className="flex-1 grid grid-cols-2 gap-y-2.5">
          <Mini label="Wake" value={LAST.wakeStart} />
          <Mini label="Ready" value={LAST.readyTime} color={URGENT} />
          <Mini label="Doel" value={`${LAST.target}m`} />
          <Mini label="vs avg" value={`${over ? "+" : ""}${delta}m`} color={over ? URGENT : PISTACHIO} />
        </div>
      </div>

      <Divider className="my-4" />

      {/* Fases */}
      <Label n={1}>Fases</Label>
      <div className="space-y-2">
        {PHASES.map((p) => <BarRow key={p.name} label={p.name} value={p.min} max={total} color={p.color} />)}
      </div>

      <Divider className="my-4" />

      {/* Routine stappen */}
      <Label n={2} right={<span className="text-storm/40 text-[9px] tabular-nums">{doneCount}/{STEPS.length} uitgevoerd</span>}>Routine</Label>
      <div className="flex-1 min-h-0 space-y-1.5 overflow-hidden">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${s.done ? "bg-[#d8dab3]" : "bg-white/8"}`}>
              {s.done ? <Check className="w-2.5 h-2.5 text-[#595f34]" /> : <SkipForward className="w-2.5 h-2.5 text-storm/30" />}
            </span>
            <span className={`text-[11px] flex-1 truncate ${s.done ? "text-storm/85" : "text-storm/35 line-through"}`}>{s.name}</span>
            {s.skipped && <span className="text-[8px] tracking-widest uppercase text-storm/30">skip</span>}
          </div>
        ))}
      </div>

      <Divider className="my-3" />

      {/* Pattern note */}
      <div className="flex items-start gap-2 mb-3">
        <BellRing className="w-3.5 h-3.5 text-[#d5e24a] mt-0.5 shrink-0" />
        <p className="text-storm/55 text-[11px] leading-snug">Je snoozt gemiddeld 3× — {LAST.snoozeMin} min verspild. Ready-tijd schuift later op doordeweekse dagen.</p>
      </div>

      {/* Summary 3 cols */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <Sum n="01" label="Snooze" value={`${LAST.snoozes}×`} />
        <Sum n="02" label="Vertraging" value={`${over ? "+" : ""}${delta}m`} color={over ? URGENT : PISTACHIO} />
        <Sum n="03" label="Stappen" value={`${doneCount}/${STEPS.length}`} />
      </div>

      <FooterAction label="Open Morning Briefing" secondaryLabel="Geschiedenis" />
    </div>
  );
}

function Mini({ label, value, color }) {
  return (
    <div>
      <p className="text-storm/35 text-[8px] tracking-widest uppercase">{label}</p>
      <p className="text-sm font-bold tabular-nums" style={{ color: color || "#F2F2F0" }}>{value}</p>
    </div>
  );
}

function Sum({ n, label, value, color }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span className="text-storm/25 text-[8px] tabular-nums">{n}</span>
        <span className="text-storm/45 text-[8px] tracking-widest uppercase">{label}</span>
      </div>
      <p className="text-storm text-lg font-bold tabular-nums leading-tight mt-0.5" style={color ? { color } : {}}>{value}</p>
    </div>
  );
}