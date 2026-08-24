import React from "react";
import { motion } from "framer-motion";
import { Check, SkipForward, Sunrise, Clock, TrendingUp, TrendingDown, Zap, BellRing, ChevronRight } from "lucide-react";
import { Ring, CountUp, MiniBars, FooterAction, Label, CARD, URG, SAND, OLIVE, SKY, PLUM } from "./viz";

const LAST = { wakeStart: "07:00", readyTime: "07:42", totalMin: 42, target: 35, snoozes: 3, snoozeMin: 12 };
const PHASES = [
  { name: "Wake", min: 8, color: URG },
  { name: "Get Up", min: 4, color: SAND },
  { name: "Routine", min: 24, color: OLIVE },
  { name: "Ready", min: 6, color: SKY },
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
const PATTERNS = [
  { icon: TrendingDown, text: "Je snoozt gemiddeld 3× — 12 min verspild per ochtend." },
  { icon: Clock, text: "Ready-tijd schuift later op doordeweekse dagen." },
  { icon: Zap, text: "Optionele stappen vaker overgeslagen bij korte ochtenden." },
];

export default function MorningTab() {
  const total = PHASES.reduce((s, p) => s + p.min, 0);
  const avg = Math.round(HISTORY.slice(0, -1).reduce((s, v) => s + v, 0) / (HISTORY.length - 1));
  const delta = LAST.totalMin - avg;
  const pct = Math.round((LAST.totalMin / LAST.target) * 100);
  const doneCount = STEPS.filter((s) => s.done).length;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3" style={{ height: 150 }}>
        {/* Opstartduur */}
        <div className={CARD + " flex-row items-center gap-4"}>
          <Ring pct={pct} size={104} color={pct > 100 ? URG : OLIVE}>
            <span className="text-storm text-2xl font-bold tabular-nums leading-none">{LAST.totalMin}</span>
            <span className="text-storm/40 text-[8px] tracking-widest mt-1">MIN</span>
          </Ring>
          <div>
            <Label n={1}>Opstartduur</Label>
            <p className="text-storm/50 text-xs">Doel {LAST.target} min</p>
            <p className="text-storm text-sm mt-1">Wake <span className="text-storm/80 font-semibold">{LAST.wakeStart}</span></p>
            <p className="text-storm text-sm">Ready <span className="text-urgent font-semibold">{LAST.readyTime}</span></p>
          </div>
        </div>

        {/* Vandaag stats */}
        <div className={CARD}>
          <Label n={2}>Vandaag</Label>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 flex-1 content-center">
            <Stat icon={Sunrise} label="Wake" value={LAST.wakeStart} />
            <Stat icon={Check} label="Ready" value={LAST.readyTime} color={URG} />
            <Stat icon={Clock} label="Duur" value={`${LAST.totalMin}m`} />
            <Stat icon={TrendingUp} label="vs avg" value={`${delta > 0 ? "+" : ""}${delta}m`} color={delta > 0 ? URG : OLIVE} />
          </div>
        </div>

        {/* Snooze */}
        <div className={CARD + " justify-center"}>
          <Label n={3}>Snooze</Label>
          <div className="flex items-center gap-3">
            <BellRing className="w-8 h-8 text-urgent" />
            <div>
              <p className="text-storm text-3xl font-bold tabular-nums leading-none">{LAST.snoozes}<span className="text-storm/40 text-sm">×</span></p>
              <p className="text-storm/50 text-xs mt-1">{LAST.snoozeMin} min verspild</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fases */}
      <div className={CARD} style={{ height: 92 }}>
        <Label n={4}>Fases · {total} min</Label>
        <div className="flex h-5 rounded-full overflow-hidden">
          {PHASES.map((p, i) => (
            <div key={p.name} className="flex items-center justify-center text-[9px] font-bold tracking-wider text-plum" style={{ width: `${(p.min / total) * 100}%`, background: p.color }}>{p.min}</div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {PHASES.map((p, i) => (
            <div key={p.name} className="flex items-center gap-1.5" style={{ width: `${(p.min / total) * 100}%` }}>
              <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-storm/60 text-[9px] uppercase tracking-wider truncate">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Routine stappen + Patronen */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-3">
        <div className={CARD + " col-span-2 overflow-hidden"}>
          <div className="flex items-center justify-between mb-3">
            <Label n={5}>Routine stappen</Label>
            <span className="text-storm/50 text-[10px] tabular-nums">{doneCount}/{STEPS.length} uitgevoerd</span>
          </div>
          <div className="grid grid-cols-2 gap-2 overflow-hidden">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-marble/15 bg-metal/30 px-2.5 py-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${s.done ? "bg-urgent text-plum" : s.skipped ? "bg-marble/10 text-storm/30" : "bg-marble/10 text-storm/30"}`}>
                  {s.done ? <Check className="w-3 h-3" /> : <SkipForward className="w-3 h-3" />}
                </span>
                <span className={`text-[11px] truncate ${s.done ? "text-storm/90" : "text-storm/40 line-through"}`}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={CARD + " overflow-hidden"}>
          <Label n={6}>Patronen</Label>
          <div className="space-y-2.5 overflow-hidden">
            {PATTERNS.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-urgent/15 flex items-center justify-center shrink-0 mt-0.5"><p.icon className="w-3.5 h-3.5 text-urgent" /></span>
                <p className="text-storm/75 text-[11px] leading-snug">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vergelijking */}
      <div className={CARD + " flex-row items-center gap-4"} style={{ height: 96 }}>
        <div className="flex-1">
          <Label n={7}>Laatste 7 ochtenden</Label>
          <MiniBars data={HISTORY} highlight={HISTORY.length - 1} />
        </div>
        <div className="text-right shrink-0 pr-1">
          <p className="text-storm/40 text-[10px] tracking-widest uppercase">Vandaag</p>
          <p className="text-urgent text-2xl font-bold tabular-nums leading-none">{LAST.totalMin}<span className="text-sm text-storm/50">m</span></p>
          <p className="text-storm/50 text-[10px] mt-1">avg {avg}m</p>
        </div>
      </div>

      <FooterAction label="Open Morning Briefing" />
    </div>
  );
}

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 shrink-0" style={{ color: color || "#d8dab3" }} />
      <div>
        <p className="text-storm/40 text-[8px] tracking-widest uppercase">{label}</p>
        <p className="text-storm text-sm font-bold tabular-nums" style={color ? { color } : {}}>{value}</p>
      </div>
    </div>
  );
}