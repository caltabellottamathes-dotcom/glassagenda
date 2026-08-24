import React, { useState } from "react";
import { Plus, Minus, ChevronRight } from "lucide-react";

const panel = "rounded-2xl border border-marble/20 bg-plum/30 p-4 flex flex-col";
const labelCls = "text-storm/40 text-[9px] tracking-[0.2em] uppercase font-semibold";

function WakeTime() {
  const [days, setDays] = useState([1, 1, 1, 1, 1, 0, 0]);
  const labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  return (
    <div className={panel + " justify-center gap-2"}>
      <p className={labelCls}>Wake Time</p>
      <div className="text-storm text-4xl font-bold tabular-nums">07:30</div>
      <div className="flex gap-1.5 flex-wrap">
        {labels.map((d, i) => (
          <button key={d} onClick={() => setDays((arr) => arr.map((v, j) => (j === i ? 1 - v : v)))} className={`w-8 py-1 rounded-md text-[9px] tracking-widest font-semibold transition-colors ${days[i] ? "bg-urgent text-plum" : "bg-marble/10 text-storm/40"}`}>{d}</button>
        ))}
      </div>
    </div>
  );
}

function WakeStyle() {
  const [sel, setSel] = useState(0);
  const opts = ["GENTLE", "STANDARD", "DIRECT"];
  return (
    <div className={panel + " justify-center gap-3"}>
      <p className={labelCls}>Wake Style</p>
      <div className="flex flex-col gap-1.5">
        {opts.map((o, i) => (
          <button key={o} onClick={() => setSel(i)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${sel === i ? "bg-plum text-storm" : "bg-marble/5 text-storm/50"}`}>
            <span className={`w-3 h-3 rounded-full border ${sel === i ? "bg-urgent border-urgent" : "border-storm/30"}`} />
            <span className="text-xs font-semibold tracking-widest">{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SnoozeControl() {
  const [min, setMin] = useState(5);
  const [max, setMax] = useState(2);
  return (
    <div className={panel + " justify-center gap-2"}>
      <p className={labelCls}>Snooze</p>
      <div className="flex items-center gap-3">
        <button onClick={() => setMin((m) => Math.max(1, m - 1))} className="w-7 h-7 rounded-full bg-marble/10 flex items-center justify-center text-storm/70"><Minus className="w-3.5 h-3.5" /></button>
        <div className="text-storm text-3xl font-bold tabular-nums">{min}<span className="text-sm ml-1">MIN</span></div>
        <button onClick={() => setMin((m) => Math.min(15, m + 1))} className="w-7 h-7 rounded-full bg-marble/10 flex items-center justify-center text-storm/70"><Plus className="w-3.5 h-3.5" /></button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-storm/40 text-[9px] tracking-widest uppercase">Max</span>
        <button onClick={() => setMax((m) => Math.max(0, m - 1))} className="w-6 h-6 rounded-full bg-marble/10 flex items-center justify-center text-storm/70"><Minus className="w-3" /></button>
        <span className="text-storm text-sm font-bold">{max}</span>
        <button onClick={() => setMax((m) => Math.min(5, m + 1))} className="w-6 h-6 rounded-full bg-marble/10 flex items-center justify-center text-storm/70"><Plus className="w-3" /></button>
        <span className="text-storm/40 text-[9px] tracking-widest uppercase">Times</span>
      </div>
    </div>
  );
}

function VoiceControl() {
  const [on, setOn] = useState(true);
  return (
    <div className={panel + " justify-center gap-2"}>
      <div className="flex items-center justify-between">
        <p className={labelCls}>Voice Guidance</p>
        <button onClick={() => setOn((v) => !v)} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-urgent" : "bg-marble/20"}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-plum transition-all ${on ? "left-5" : "left-0.5"}`} />
        </button>
      </div>
      <p className="text-storm/60 text-xs leading-relaxed">Voice recognition during Wake.</p>
    </div>
  );
}

function WakeBehaviour() {
  const [sel, setSel] = useState(0);
  return (
    <div className={panel + " justify-center gap-2"}>
      <p className={labelCls}>After Wake</p>
      <div className="flex flex-col gap-1.5">
        {[["Continue automatically", 0], ["Ask before continuing", 1]].map(([o, i]) => (
          <button key={o} onClick={() => setSel(i)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${sel === i ? "bg-plum text-storm" : "bg-marble/5 text-storm/50"}`}>
            <span className={`w-3 h-3 rounded-full border ${sel === i ? "bg-urgent border-urgent" : "border-storm/30"}`} />
            <span className="text-xs font-semibold">{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdaptiveMorning() {
  const [on, setOn] = useState(true);
  return (
    <div className={panel + " justify-center gap-2"}>
      <div className="flex items-center justify-between">
        <p className={labelCls}>Adaptive Routine</p>
        <button onClick={() => setOn((v) => !v)} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-urgent" : "bg-marble/20"}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-plum transition-all ${on ? "left-5" : "left-0.5"}`} />
        </button>
      </div>
      <div className="text-urgent text-[9px] tracking-widest uppercase font-bold">Running tight</div>
      <p className="text-storm/60 text-xs leading-relaxed">Automatically skip optional routine steps when time is limited.</p>
    </div>
  );
}

function RoutineAssignment() {
  return (
    <div className={panel + " justify-center gap-2"}>
      <p className={labelCls}>Morning Routine</p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-storm text-lg font-bold">Morning Routine</div>
          <div className="text-storm/50 text-xs">5 steps · ~32 min</div>
        </div>
        <button className="flex items-center gap-1 text-urgent text-xs font-semibold tracking-widest uppercase hover:gap-2 transition-all">Edit <ChevronRight className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}

function BriefingTransition() {
  const [sel, setSel] = useState(1);
  return (
    <div className={panel + " justify-center gap-2"}>
      <p className={labelCls}>After Ready</p>
      <div className="flex flex-col gap-1.5">
        {[["Stay on dashboard", 0], ["Open Morning Briefing", 1]].map(([o, i]) => (
          <button key={o} onClick={() => setSel(i)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${sel === i ? "bg-plum text-storm" : "bg-marble/5 text-storm/50"}`}>
            <span className={`w-3 h-3 rounded-full border ${sel === i ? "bg-urgent border-urgent" : "border-storm/30"}`} />
            <span className="text-xs font-semibold">{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsTab() {
  return (
    <div className="grid h-full gap-3 grid-cols-3 auto-rows-fr">
      <WakeTime />
      <WakeStyle />
      <SnoozeControl />
      <VoiceControl />
      <WakeBehaviour />
      <AdaptiveMorning />
      <div className="col-span-2"><RoutineAssignment /></div>
      <BriefingTransition />
    </div>
  );
}