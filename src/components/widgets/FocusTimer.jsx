import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { SectionHeader } from "@/components/glass";

const FULL = 25 * 60;

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(FULL);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
      return () => clearInterval(ref.current);
    }
  }, [running]);

  useEffect(() => { if (seconds === 0) setRunning(false); }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const pct = ((FULL - seconds) / FULL) * 100;
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4 flex flex-col">
      <SectionHeader number={3} title="Focus Timer" />
      <div className="flex flex-col items-center mt-3">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(224,222,211,0.15)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r={r} fill="none" stroke="#d5e24a" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-storm text-xl font-semibold tabular-nums">
            {mm}:{ss}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setRunning((r) => !r)}
            className="px-4 py-2 rounded-full bg-urgent text-metal text-xs font-semibold flex items-center gap-1.5 hover:brightness-105 active:scale-95 transition-all"
          >
            {running ? <><Pause className="w-3.5 h-3.5" /> Pauze</> : <><Play className="w-3.5 h-3.5" /> Start</>}
          </button>
          <button
            onClick={() => { setRunning(false); setSeconds(FULL); }}
            className="px-3 py-2 rounded-full border border-marble/30 bg-marble/10 text-storm text-xs flex items-center gap-1.5 hover:bg-marble/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}