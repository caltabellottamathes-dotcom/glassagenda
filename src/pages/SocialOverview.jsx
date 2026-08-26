import React from "react";
import PanelShell from "@/components/self/PanelShell";

const PLUM = "#301728", URG = "#d5e24a", OLIVE = "#d8dab3", STORM = "#F2F2F0";

const SUMMARY = [
  { v: 5, l: "MEANINGFUL", c: PLUM, pts: "0,30 20,20 40,24 60,14 80,18 100,10" },
  { v: 3, l: "PLANS", c: URG, pts: "0,34 20,30 40,32 60,26 80,30 100,22" },
  { v: 1, l: "INVITATIONS", c: OLIVE, pts: "0,38 20,36 40,38 60,34 80,36 100,32" },
];

const ARCS = [
  { pct: 80, r: 100, c: PLUM, label: "ACTIVITY" },
  { pct: 60, r: 78, c: URG, label: "BASELINE" },
  { pct: 70, r: 56, c: OLIVE, label: "SPACE" },
];
const circ = (r) => 2 * Math.PI * r;

const WEEK = [
  { d: "MON", v: 3, m: 1 }, { d: "TUE", v: 5, m: 1 }, { d: "WED", v: 2, m: 0 },
  { d: "THU", v: 7, m: 2 }, { d: "FRI", v: 3, m: 1 }, { d: "SAT", v: 9, m: 2 }, { d: "SUN", v: 1, m: 0 },
];

const SPACE = [
  { t: "09", l: "WORK", s: 3, c: PLUM },
  { t: "12", l: "FREE", s: 2, c: "rgba(216,218,179,0.18)" },
  { t: "14", l: "WORK", s: 3, c: PLUM },
  { t: "17", l: "FREE", s: 2, c: "rgba(216,218,179,0.18)" },
  { t: "19", l: "SOCIAL", s: 3, c: URG },
  { t: "22", l: "RECOVERY", s: 2, c: OLIVE },
];

const PEOPLE = [
  { n: "Sophie", s: "CLOSE", c: OLIVE, days: "4d" },
  { n: "Deb", s: "ACTIVE", c: OLIVE, days: "9d" },
  { n: "Thomas", s: "QUIETER", c: PLUM, days: "24d" },
  { n: "Lisa", s: "NEW", c: URG, days: "2d" },
];

export default function SocialOverview() {
  const max = Math.max(...WEEK.map((w) => w.v));
  const today = (new Date().getDay() + 6) % 7;

  return (
    <PanelShell
      index="01"
      section="SOCIAL OVERVIEW"
      statement="CONNECTED"
      context={[
        { label: "WHAT'S COMING UP", text: "Dinner · Sophie · Fri 18:30 (confirmed). Coffee · Deb · Sat 14:00 (planned). Sunday is open." },
        { label: "OPEN OPPORTUNITIES", text: "Saturday afternoon is open and Sophie hasn't been seen in 24 days — a low-key plan could rebuild momentum." },
        { label: "NOTABLE CHANGES", text: "Sophie more active than usual · Thomas quieter · Lisa is new activity · Saturday has more social space." },
      ]}
      actions={[
        { label: "Add Person", primary: true },
        { label: "Add Social Moment" },
        { label: "Create Intention" },
        { label: "Create SocialPlan" },
        { label: "Add Personal Time" },
        { label: "Open Relationship" },
        { label: "Open Invitation" },
      ]}
    >
      <div className="w-full flex flex-col gap-5">
        {/* 01.1 value strip */}
        <div className="grid grid-cols-3 divide-x divide-marble/20 border-y border-marble/20">
          {SUMMARY.map((x) => (
            <div key={x.l} className="py-5 px-5">
              <p className="text-storm text-5xl font-bold tabular-nums leading-none">{x.v}</p>
              <p className="text-[10px] tracking-[0.3em] mt-2.5" style={{ color: x.c }}>{x.l}</p>
              <svg viewBox="0 0 100 50" className="w-full h-8 mt-3" preserveAspectRatio="none">
                <polyline points={x.pts} fill="none" stroke={x.c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>

        {/* 01.1 state field + 01.2 activity */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="relative w-48 h-48 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
              {ARCS.map((a) => (
                <g key={a.label}>
                  <circle cx="120" cy="120" r={a.r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="120" cy="120" r={a.r} fill="none" stroke={a.c} strokeWidth="10" strokeLinecap="round" strokeDasharray={circ(a.r)} strokeDashoffset={circ(a.r) - (a.pct / 100) * circ(a.r)} />
                </g>
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-storm text-2xl font-bold">CONNECTED</span>
              <span className="text-storm/50 text-[9px] tracking-[0.25em] mt-1">SOCIAL STATE</span>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-end justify-between gap-2 h-32">
              {WEEK.map((w, i) => (
                <div key={w.d} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  {w.m > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ background: URG }} />}
                  <div className="w-full rounded-md flex flex-col justify-end" style={{ height: "100%" }}>
                    <div className="w-full rounded-md" style={{ height: `${(w.v / max) * 100}%`, background: i === today ? URG : PLUM, opacity: i === today ? 1 : 0.85 }} />
                  </div>
                  <span className="text-[9px] tracking-widest" style={{ color: i === today ? URG : "rgba(242,242,240,0.4)" }}>{w.d}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: URG }} /><span className="text-storm/50 text-[10px] tracking-widest">MEANINGFUL</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: PLUM }} /><span className="text-storm/50 text-[10px] tracking-widest">ACTIVITY</span></span>
            </div>
          </div>
        </div>

        {/* 01.3 baseline + 01.4 space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">PERSONAL BASELINE</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] tracking-widest mb-1.5"><span className="text-storm/60">CURRENT</span><span className="text-storm font-bold">80</span></div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}><div className="h-full rounded-full" style={{ width: "80%", background: PLUM }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] tracking-widest mb-1.5"><span className="text-storm/60">BASELINE</span><span className="text-storm font-bold">60</span></div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}><div className="h-full rounded-full" style={{ width: "60%", background: OLIVE }} /></div>
              </div>
            </div>
            <p className="text-[10px] tracking-[0.2em] mt-3" style={{ color: URG }}>MORE ACTIVE THAN USUAL</p>
          </div>

          <div>
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">SOCIAL SPACE · TODAY</p>
            <div className="flex h-9 rounded-full overflow-hidden">
              {SPACE.map((b, i) => <div key={i} className="flex items-center justify-center" style={{ flex: b.s, background: b.c }} />)}
            </div>
            <div className="flex mt-1.5">
              {SPACE.map((b, i) => (
                <div key={i} style={{ flex: b.s }} className="text-center">
                  <span className="text-[8px] tabular-nums" style={{ color: "rgba(242,242,240,0.4)" }}>{b.t}</span>
                  <p className="text-[8px] tracking-widest" style={{ color: b.c === "rgba(216,218,179,0.18)" ? OLIVE : b.c }}>{b.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 01.5 important people */}
        <div>
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">IMPORTANT PEOPLE</p>
          <div className="flex gap-3 overflow-x-auto">
            {PEOPLE.map((p) => (
              <div key={p.n} className="shrink-0 flex items-center gap-2.5 pr-4 pl-1 py-1 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: PLUM, color: STORM }}>{p.n[0]}</span>
                <div className="leading-tight">
                  <p className="text-storm text-xs font-semibold">{p.n}</p>
                  <p className="text-[9px] tracking-widest" style={{ color: p.c }}>{p.s} · {p.days}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}