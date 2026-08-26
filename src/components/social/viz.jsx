import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Plus, ArrowRight } from "lucide-react";
import { PISTACHIO, OLIVE, EARTH, URG, INK, Badge } from "@/components/goodmorning/viz";
import { initials, grad } from "@/lib/whatsapp";

const TYPE = {
  work: OLIVE,
  social: PISTACHIO,
  free: "rgba(216,218,179,0.22)",
  recovery: EARTH,
  protected: URG,
};
const STATE_COLOR = { CLOSE: PISTACHIO, ACTIVE: PISTACHIO, QUIETER: OLIVE, NEW: URG, OVERLOADED: URG };

function Legend({ color, label }) {
  return <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} /><span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(216,218,179,0.55)" }}>{label}</span></div>;
}

export function StateIndicator({ state, moments, plans, invitations }) {
  return (
    <div className="flex flex-col items-center text-center py-2">
      <div className="relative">
        <div className="absolute inset-0 -z-10 blur-3xl rounded-full" style={{ background: "rgba(216,218,179,0.10)" }} />
        <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#f4f4f0" }}>{state}</motion.h2>
      </div>
      <div className="flex items-center gap-3 my-5 w-full max-w-sm">
        <div className="h-px flex-1" style={{ background: "rgba(216,218,179,0.2)" }} />
        <div className="flex items-center gap-2.5">
          {Array.from({ length: Math.min(moments, 6) }).map((_, i) => (
            <motion.span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: PISTACHIO }} animate={{ scale: [1, 1.3, 1], opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.22 }} />
          ))}
        </div>
        <div className="h-px flex-1" style={{ background: "rgba(216,218,179,0.2)" }} />
      </div>
      <p className="text-sm" style={{ color: PISTACHIO }}>{moments} meaningful moments</p>
      <p className="text-xs mt-1" style={{ color: "rgba(216,218,179,0.55)" }}>{plans} plans · {invitations} invitation</p>
    </div>
  );
}

export function ActivityWeek({ data }) {
  const max = Math.max(...data.map((d) => d.intensity));
  const today = (new Date().getDay() + 6) % 7;
  return (
    <div>
      <div className="flex items-end gap-2.5" style={{ height: 168 }}>
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <div className="flex-1 w-full flex flex-col justify-end items-center gap-0.5">
              {d.meaningful > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 + 0.2 }} className="w-2 h-2 rounded-full mb-1" style={{ background: URG }} />}
              <motion.div className="w-full rounded-md" style={{ background: PISTACHIO, opacity: 0.85 }} initial={{ height: 0 }} animate={{ height: `${(d.planned / max) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.05 }} />
              <motion.div className="w-full rounded-md" style={{ background: OLIVE }} initial={{ height: 0 }} animate={{ height: `${(d.spontaneous / max) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.05 + 0.1 }} />
            </div>
            <span className="text-[9px] tracking-widest" style={{ color: i === today ? PISTACHIO : "rgba(216,218,179,0.4)" }}>{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][i]}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 mt-4 flex-wrap">
        <Legend color={URG} label="Meaningful" />
        <Legend color={PISTACHIO} label="Planned" />
        <Legend color={OLIVE} label="Spontaneous" />
      </div>
    </div>
  );
}

function Bar({ label, value, color }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[10px] tracking-[0.2em] uppercase w-20" style={{ color: "rgba(216,218,179,0.55)" }}>{label}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color: PISTACHIO }}>{value}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(216,218,179,0.10)" }}>
        <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, ease: "easeOut" }} />
      </div>
    </div>
  );
}

export function BaselineCompare({ current, baseline, label }) {
  const up = current >= baseline;
  return (
    <div>
      <div className="space-y-5">
        <Bar label="CURRENT" value={current} color={PISTACHIO} />
        <Bar label="BASELINE" value={baseline} color={OLIVE} />
      </div>
      <div className="mt-5"><Badge tone={up ? "pistachio" : "earth"}>{label}</Badge></div>
    </div>
  );
}

export function SpaceTimeline({ blocks }) {
  return (
    <div>
      <div className="flex h-12 rounded-full overflow-hidden">
        {blocks.map((b, i) => (
          <motion.div key={i} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="flex items-center justify-center" style={{ flex: b.span, background: b.type === "protected" ? "transparent" : TYPE[b.type], border: b.type === "protected" ? `1px dashed ${URG}` : "none" }}>
            {b.type === "protected" && <span className="text-[8px] tracking-widest" style={{ color: URG }}>PROTECTED</span>}
          </motion.div>
        ))}
      </div>
      <div className="flex mt-2.5">
        {blocks.map((b, i) => (
          <div key={i} style={{ flex: b.span }} className="text-center">
            <span className="text-[9px] tracking-widest tabular-nums" style={{ color: "rgba(216,218,179,0.5)" }}>{b.time}</span>
            <p className="text-[9px] tracking-widest uppercase" style={{ color: b.type === "protected" ? URG : PISTACHIO }}>{b.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        {Object.entries({ work: "Work", social: "Social", free: "Free", recovery: "Recovery", protected: "Protected" }).map(([k, l]) => (
          <Legend key={k} color={TYPE[k]} label={l} />
        ))}
      </div>
    </div>
  );
}

export function PeopleCard({ id, name, state, lastContact, change, onClick }) {
  return (
    <button onClick={onClick} className="shrink-0 w-48 text-left p-4 rounded-2xl transition-colors hover:brightness-110" style={{ border: "1px solid rgba(216,218,179,0.12)", background: "rgba(89,95,52,0.20)" }}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-11 h-11 rounded-full bg-gradient-to-br ${grad(id)} flex items-center justify-center text-sm font-bold`} style={{ color: "#f4f4f0" }}>{initials(name)}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "#f4f4f0" }}>{name}</p>
          <p className="text-[10px] tracking-widest uppercase" style={{ color: STATE_COLOR[state] || PISTACHIO }}>{state}</p>
        </div>
      </div>
      <p className="text-[11px] mb-1" style={{ color: "rgba(216,218,179,0.55)" }}>Last contact · {lastContact}</p>
      {change && <p className="text-[11px] mb-2" style={{ color: PISTACHIO }}>{change}</p>}
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < (id % 5) + 1 ? PISTACHIO : "rgba(216,218,179,0.18)" }} />)}
      </div>
    </button>
  );
}

export function UpcomingItem({ date, time, type, person, status }) {
  const tone = { proposed: "earth", planned: "olive", confirmed: "pistachio", completed: "olive", cancelled: "urgent" }[status];
  return (
    <div className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(216,218,179,0.08)" }}>
      <div className="w-16 shrink-0">
        <p className="text-xs font-bold" style={{ color: "#f4f4f0" }}>{date}</p>
        <p className="text-[10px] tabular-nums" style={{ color: "rgba(216,218,179,0.5)" }}>{time}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "#f4f4f0" }}>{type}</p>
        <p className="text-[11px] truncate" style={{ color: "rgba(216,218,179,0.55)" }}>{person}</p>
      </div>
      <Badge tone={tone}>{status}</Badge>
    </div>
  );
}

export function OpportunityCard({ title, text, action }) {
  return (
    <div className="p-5 rounded-2xl" style={{ border: `1px dashed ${"rgba(213,226,74,0.4)"}`, background: "rgba(213,226,74,0.05)" }}>
      <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: URG }}>OPEN OPPORTUNITY</p>
      <h4 className="text-base font-semibold mb-1.5" style={{ color: "#f4f4f0" }}>{title}</h4>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(216,218,179,0.6)" }}>{text}</p>
      <button className="px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-bold transition-all hover:brightness-110 active:scale-95" style={{ background: URG, color: INK }}>{action} →</button>
    </div>
  );
}

export function ChangeRow({ dir, name, text }) {
  const Icon = { up: ArrowUp, down: ArrowDown, plus: Plus, right: ArrowRight }[dir];
  const color = { up: PISTACHIO, down: OLIVE, plus: PISTACHIO, right: URG }[dir];
  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(216,218,179,0.08)" }}>
      <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(216,218,179,0.08)" }}><Icon className="w-3.5 h-3.5" style={{ color }} /></span>
      <p className="text-sm font-semibold w-28 shrink-0" style={{ color: "#f4f4f0" }}>{name}</p>
      <p className="text-[11px] flex-1" style={{ color: "rgba(216,218,179,0.6)" }}>{text}</p>
    </div>
  );
}