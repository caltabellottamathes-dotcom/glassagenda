import React from "react";
import { motion } from "framer-motion";
import { AnimatedRing } from "@/components/modules/viz";

const panel = "rounded-2xl border border-marble/20 bg-plum/30 p-4 flex flex-col";
const labelCls = "text-storm/40 text-[9px] tracking-[0.2em] uppercase font-semibold";

const NODES = [
  { phase: "WAKE", time: "07:30" },
  { phase: "GET UP", time: "07:37" },
  { phase: "ROUTINE", time: "07:42" },
  { phase: "READY", time: "08:04" },
];

function WakeJourney() {
  return (
    <div className={panel + " justify-center"}>
      <p className={labelCls}>Wake Journey</p>
      <div className="relative mt-6">
        <div className="absolute top-[7px] left-2 right-2 h-px bg-marble/25" />
        <div className="relative flex justify-between">
          {NODES.map((n, i) => {
            const last = i === NODES.length - 1;
            return (
              <div key={n.phase} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`w-3.5 h-3.5 rounded-full border border-marble/40 transition-colors ${last ? "bg-urgent border-urgent" : "bg-plum"}`} />
                <div className="text-storm text-sm font-bold tabular-nums">{n.time}</div>
                <div className="text-storm/50 text-[9px] tracking-[0.15em] uppercase">{n.phase}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReadyRing() {
  return (
    <div className={panel + " items-center justify-center"}>
      <p className={labelCls + " self-start"}>Ready Ring</p>
      <div className="flex-1 flex items-center justify-center">
        <AnimatedRing pct={85} size={132} stroke={10} color="#d5e24a" label={<span className="text-storm text-2xl font-bold">34<span className="text-sm ml-1">MIN</span></span>} sub="WAKE → READY" />
      </div>
    </div>
  );
}

function WakeTimeComparison() {
  return (
    <div className={panel + " justify-center items-center text-center"}>
      <p className={labelCls + " self-start"}>Today's Wake</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div>
          <div className="text-storm text-3xl font-bold tabular-nums">07:30</div>
          <div className="text-storm/50 text-[9px] tracking-[0.2em] uppercase">Scheduled</div>
        </div>
        <div className="w-px h-5 bg-marble/30" />
        <div>
          <div className="text-storm text-3xl font-bold tabular-nums text-urgent">08:04</div>
          <div className="text-storm/50 text-[9px] tracking-[0.2em] uppercase">Ready</div>
        </div>
      </div>
    </div>
  );
}

function RoutineCompletion() {
  return (
    <div className={panel + " justify-center"}>
      <p className={labelCls}>Routine</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="text-storm text-4xl font-bold tabular-nums"><span className="text-urgent">4</span><span className="text-storm/40 text-2xl">/5</span></div>
        <div className="text-storm/50 text-[9px] tracking-[0.2em] uppercase">Steps Completed</div>
        <div className="flex gap-1.5 w-full max-w-[160px]">
          {[0, 1, 2, 3].map((i) => <div key={i} className="flex-1 h-1.5 rounded-full bg-urgent" />)}
          <div className="flex-1 h-1.5 rounded-full bg-marble/20 border border-storm/20" />
        </div>
        <div className="text-storm/40 text-[9px] tracking-widest uppercase">1 skipped</div>
      </div>
    </div>
  );
}

function MorningPace() {
  const pos = 78;
  return (
    <div className={panel + " justify-center"}>
      <p className={labelCls}>Morning Quality</p>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="relative h-2 rounded-full bg-marble/15">
          <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-storm/20 to-urgent/70" style={{ width: `${pos}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-urgent border-2 border-metal" style={{ left: `calc(${pos}% - 7px)` }} />
        </div>
        <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase">
          <span className="text-storm/40">Slow</span>
          <span className="text-urgent font-semibold">On Time</span>
        </div>
      </div>
    </div>
  );
}

function Snooze() {
  return (
    <div className={panel + " items-center justify-center text-center"}>
      <p className={labelCls + " self-start"}>Snooze</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-1">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            <motion.circle cx="40" cy="40" r="34" fill="none" stroke="#94925d" strokeWidth="4" strokeLinecap="round" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - 0.5)} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-storm text-2xl font-bold">1×</div>
        </div>
        <div className="text-storm/50 text-[9px] tracking-[0.2em] uppercase">Snooze</div>
        <div className="text-storm/70 text-xs">5 MIN</div>
      </div>
    </div>
  );
}

export default function MorningTab() {
  return (
    <div className="grid h-full gap-3" style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
      <WakeJourney />
      <ReadyRing />
      <WakeTimeComparison />
      <RoutineCompletion />
      <MorningPace />
      <Snooze />
    </div>
  );
}