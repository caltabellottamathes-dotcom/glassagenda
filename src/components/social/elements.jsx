import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Plus, ArrowRight } from "lucide-react";
import { BarGrow, LiveSparkline, CountUp } from "@/components/modules/viz";

const PLUM = "#301728", URG = "#d5e24a", OLIVE = "#d8dab3", STORM = "#F2F2F0";
const TRACK = "rgba(255,255,255,0.08)";

function Badge({ tone, children }) {
  const map = {
    confirmed: { c: OLIVE, bg: "rgba(216,218,179,0.12)", bd: "rgba(216,218,179,0.30)" },
    planned: { c: STORM, bg: "rgba(255,255,255,0.06)", bd: "rgba(255,255,255,0.15)" },
    proposed: { c: "rgba(242,242,240,0.75)", bg: "rgba(89,95,52,0.30)", bd: "rgba(89,95,52,0.50)" },
    urgent: { c: URG, bg: "rgba(213,226,74,0.14)", bd: "rgba(213,226,74,0.40)" },
  };
  const s = map[tone] || map.planned;
  return <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase border" style={{ color: s.c, background: s.bg, borderColor: s.bd }}>{children}</span>;
}

export function StateField({ arcs, state, sub }) {
  const circ = (r) => 2 * Math.PI * r;
  return (
    <div className="relative w-56 h-56 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
        {arcs.map((a) => (
          <g key={a.label}>
            <circle cx="120" cy="120" r={a.r} fill="none" stroke={TRACK} strokeWidth="10" />
            <motion.circle cx="120" cy="120" r={a.r} fill="none" stroke={a.c} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circ(a.r)} initial={{ strokeDashoffset: circ(a.r) }}
              animate={{ strokeDashoffset: circ(a.r) - (a.pct / 100) * circ(a.r) }} transition={{ duration: 1.2, ease: "easeOut" }} />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-storm text-3xl font-bold">{state}</motion.span>
        <span className="text-storm/50 text-[10px] tracking-[0.25em] mt-1.5">{sub}</span>
        <motion.span className="mt-3 w-2 h-2 rounded-full" style={{ background: URG }} animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
    </div>
  );
}

export function MetricTile({ value, label, color }) {
  return (
    <div className="py-5 px-5">
      <p className="text-storm text-5xl font-bold tabular-nums leading-none"><CountUp to={value} /></p>
      <p className="text-[10px] tracking-[0.3em] mt-2.5" style={{ color }}>{label}</p>
      <div className="mt-3"><LiveSparkline color={color} max={10} points={18} height={32} intervalMs={2200} /></div>
    </div>
  );
}

export function ActivityChart({ data }) {
  const [view, setView] = useState("WEEK");
  const [hover, setHover] = useState(null);
  const max = Math.max(...data.map((d) => d.v));
  const today = (new Date().getDay() + 6) % 7;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-storm/50 text-[10px] tracking-[0.25em]">SOCIAL ACTIVITY</p>
        <div className="flex gap-1 p-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {["WEEK", "TREND"].map((o) => (
            <button key={o} onClick={() => setView(o)} className="px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold transition-colors" style={view === o ? { background: PLUM, color: STORM } : { color: "rgba(242,242,240,0.5)" }}>{o}</button>
          ))}
        </div>
      </div>
      {view === "WEEK" ? (
        <div className="flex items-end gap-2 h-36">
          {data.map((d, i) => (
            <div key={d.d} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end relative" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {hover === i && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[10px] z-10" style={{ background: PLUM, color: STORM, border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span className="font-bold">{d.d}</span> · {d.v} acts · {d.m} meaningful
                </div>
              )}
              {d.m > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ background: URG }} />}
              <motion.div className="w-full rounded-md" style={{ background: i === today ? URG : PLUM }}
                initial={{ height: 0 }}
                animate={{ height: `${(d.v / max) * 100}%`, opacity: hover === null || hover === i ? (i === today ? 1 : 0.85) : 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.04 }} />
              <span className="text-[9px] tracking-widest" style={{ color: i === today ? URG : "rgba(242,242,240,0.4)" }}>{d.d}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-36 flex items-center"><LiveSparkline color={URG} max={10} points={28} height={130} intervalMs={1400} /></div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: URG }} /><span className="text-storm/50 text-[10px] tracking-widest">MEANINGFUL</span></span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: PLUM }} /><span className="text-storm/50 text-[10px] tracking-widest">ACTIVITY</span></span>
      </div>
    </div>
  );
}

export function BaselineBlock({ current, baseline, label, up }) {
  return (
    <div>
      <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PERSONAL BASELINE</p>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[10px] tracking-widest mb-1.5"><span className="text-storm/60">CURRENT</span><span className="text-storm font-bold tabular-nums"><CountUp to={current} /></span></div>
          <BarGrow value={current} color={PLUM} height={10} />
        </div>
        <div>
          <div className="flex justify-between text-[10px] tracking-widest mb-1.5"><span className="text-storm/60">BASELINE</span><span className="text-storm font-bold tabular-nums">{baseline}</span></div>
          <BarGrow value={baseline} color={OLIVE} height={10} delay={0.15} />
        </div>
      </div>
      <p className="text-[10px] tracking-[0.2em] mt-3 font-semibold" style={{ color: up ? URG : OLIVE }}>{label}</p>
    </div>
  );
}

export function SpaceTimeline({ blocks }) {
  return (
    <div>
      <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">SOCIAL SPACE · TODAY</p>
      <div className="flex h-10 rounded-full overflow-hidden">
        {blocks.map((b, i) => (
          <motion.div key={i} className="flex items-center justify-center" style={{ flex: b.s, background: b.c }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05, duration: 0.4 }} />
        ))}
      </div>
      <div className="flex mt-1.5">
        {blocks.map((b, i) => (
          <div key={i} style={{ flex: b.s }} className="text-center">
            <span className="text-[8px] tabular-nums" style={{ color: "rgba(242,242,240,0.4)" }}>{b.t}</span>
            <p className="text-[8px] tracking-widest" style={{ color: b.c === "rgba(216,218,179,0.18)" ? OLIVE : b.c }}>{b.l}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        {[["WORK", PLUM], ["SOCIAL", URG], ["FREE", OLIVE], ["RECOVERY", OLIVE]].map(([l, c]) => (
          <span key={l} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm" style={{ background: c }} /><span className="text-storm/50 text-[10px] tracking-widest">{l}</span></span>
        ))}
      </div>
    </div>
  );
}

export function PeopleCard({ n, s, c, days, change }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="shrink-0 w-52 p-4 rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: PLUM, color: STORM }}>{n[0]}</span>
        <div className="min-w-0">
          <p className="text-storm text-sm font-semibold">{n}</p>
          <p className="text-[9px] tracking-widest" style={{ color: c }}>{s} · {days}</p>
        </div>
      </div>
      <div className="mb-2"><LiveSparkline color={c} max={8} points={14} height={24} intervalMs={2400} /></div>
      {change && <p className="text-[10px]" style={{ color: c }}>{change}</p>}
    </motion.div>
  );
}

export function UpcomingItem({ date, time, type, person, status }) {
  const toneMap = { confirmed: "confirmed", planned: "planned", proposed: "proposed", cancelled: "urgent" };
  return (
    <div className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-14 shrink-0">
        <p className="text-xs font-bold text-storm">{date}</p>
        <p className="text-[10px] tabular-nums text-storm/50">{time}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-storm">{type}</p>
        <p className="text-[11px] text-storm/55 truncate">{person}</p>
      </div>
      <Badge tone={toneMap[status]}>{status}</Badge>
    </div>
  );
}

export function OpportunityCard({ title, text, action }) {
  return (
    <div className="p-5 rounded-2xl" style={{ border: "1px dashed rgba(213,226,74,0.4)", background: "rgba(213,226,74,0.05)" }}>
      <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: URG }}>OPEN OPPORTUNITY</p>
      <h4 className="text-base font-semibold text-storm mb-1.5">{title}</h4>
      <p className="text-sm mb-4 leading-relaxed text-storm/60">{text}</p>
      <button className="px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-bold transition-all hover:brightness-110 active:scale-95" style={{ background: URG, color: PLUM }}>{action} →</button>
    </div>
  );
}

export function ChangeRow({ dir, name, text }) {
  const Icon = { up: ArrowUp, down: ArrowDown, plus: Plus, right: ArrowRight }[dir];
  const color = { up: URG, down: PLUM, plus: OLIVE, right: URG }[dir];
  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}><Icon className="w-3.5 h-3.5" style={{ color }} /></span>
      <p className="text-sm font-semibold w-28 shrink-0 text-storm">{name}</p>
      <p className="text-[11px] flex-1 text-storm/60">{text}</p>
    </div>
  );
}