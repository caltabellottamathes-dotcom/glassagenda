import React from "react";
import Widget, { GlassStat, MiniRing, MiniLive, MiniBars, Num } from "@/components/widgets/Widget";

export function DailyStateWidget() {
  const m = [{ l: "Energie", v: 72, c: "#d5e24a" }, { l: "Capaciteit", v: 58, c: "#94925d" }, { l: "Stemming", v: 80, c: "#d8dab3" }];
  return (
    <Widget index="01" title="Daily State" to="/self/daily-state" seed="self-state" size="card">
      <div className="flex flex-col gap-1.5">
        {m.map(x => <div key={x.l} className="flex items-center gap-2"><span className="text-storm/60 text-[10px] w-16">{x.l}</span><div className="flex-1 h-1.5 rounded-full bg-marble/15 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${x.v}%`, background: x.c }} /></div><span className="text-storm text-[10px] tabular-nums w-7">{x.v}</span></div>)}
      </div>
    </Widget>
  );
}

export function RoutinesWidget() {
  const steps = [[1, 1], [1, 1], [1, 1], [1, 0], [0, 0]];
  return (
    <Widget index="02" title="Routines" to="/self/routines" seed="self-routines" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <div className="flex items-center gap-1.5">
        {steps.map(([d, a], i) => <React.Fragment key={i}><div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] ${a ? "bg-sand text-storm" : "bg-white/5 text-storm/40"}`}>{i + 1}</div>{i < steps.length - 1 && <div className="h-px flex-1" style={{ background: a ? "#94925d" : "#ffffff15" }} />}</React.Fragment>)}
      </div>
      <p className="text-storm/60 text-[10px]">3/5 · ochtend 68%</p>
    </Widget>
  );
}

export function WakeWidget() {
  return (
    <Widget index="03" title="Wake" to="/self/wake" seed="self-wake" size="card">
      <div className="flex items-center gap-2">
        {[["Op", true], ["H2O", true], ["Move", false], ["Focus", false]].map(([n, d], i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${d ? "bg-sand text-storm" : "bg-white/5 text-storm/40"}`}>{i + 1}</div>
            <span className="text-[8px] text-storm/60">{n}</span>
          </div>
        ))}
      </div>
      <p className="text-storm/60 text-[10px]">ochtend 45% · 07:30</p>
    </Widget>
  );
}

export function TherapyWidget() {
  return (
    <Widget index="04" title="Therapy" to="/self/therapy" seed="self-therapy" size="card">
      <GlassStat><div className="flex justify-between text-[10px]"><span className="text-storm/60">volgende sessie</span><span className="text-storm font-bold">vr 11:00</span></div><div className="mt-2 h-1.5 rounded-full bg-marble/15 overflow-hidden"><div className="h-full rounded-full bg-sand" style={{ width: "60%" }} /></div><p className="text-storm/50 text-[10px] mt-1">traject 60%</p></GlassStat>
    </Widget>
  );
}

export function JournalWidget() {
  return (
    <Widget index="05" title="Journal" to="/self/journal" seed="self-journal" size="tall" tint="linear-gradient(180deg, rgba(48,23,40,0.3), rgba(48,23,40,0.85))">
      <div className="flex flex-col gap-1.5">
        {[["09:14", "Ochtendkoffie, helder"], ["11:02", "Focus-piek"], ["15:30", "Energie dip"]].map(([t, n]) => <div key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-urgent" /><span className="text-storm text-[10px] tabular-nums">{t}</span><span className="text-storm/70 text-[11px] truncate">{n}</span></div>)}
      </div>
      <div className="w-full"><MiniLive color="#94925d" w={140} h={22} max={8} /></div>
    </Widget>
  );
}

export function DevelopmentWidget() {
  return (
    <Widget index="06" title="Development" to="/self/development" seed="self-dev" size="sq">
      <div className="relative flex items-center justify-center" style={{ height: 90 }}>
        <svg viewBox="-50 -50 100 100" className="w-full h-full">
          <circle r="6" fill="#d5e24a" />
          {[0, 1, 2, 3].map(i => { const a = (i / 4) * 2 * Math.PI - Math.PI / 2; const x = Math.cos(a) * 30, y = Math.sin(a) * 30; return <g key={i}><line x1="0" y1="0" x2={x} y2={y} stroke="#ffffff15" /><circle cx={x} cy={y} r="7" fill="#301728" stroke="#94925d" strokeWidth="1.5" /></g>; })}
        </svg>
      </div>
      <p className="text-storm/60 text-[10px] text-center">3 actief</p>
    </Widget>
  );
}

export function PersonalTimeWidget() {
  return (
    <Widget index="07" title="Personal Time" to="/self/personal-time" seed="self-time" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <div className="flex items-center gap-3"><Num v="2.5u" className="text-3xl" /><span className="text-storm/60 text-[10px] leading-tight">vrije tijd<br />vandaag</span><div className="ml-auto"><MiniBars data={[5, 3, 2, 4, 3]} color="#d8dab3" h={28} /></div></div>
    </Widget>
  );
}

export function SelfInsightsWidget() {
  return (
    <Widget index="08" title="Insights" to="/self/insights" seed="self-insights" size="card">
      <div className="flex items-end justify-between gap-1" style={{ height: 48 }}>
        {[3, 4, 5, 4, 6, 7, 8, 9].map((v, i) => <div key={i} className="flex-1 rounded-t" style={{ height: `${(v / 9) * 100}%`, background: i >= 6 ? "#d5e24a" : "#94925d", opacity: 0.8 }} />)}
      </div>
      <div className="flex justify-between"><span className="text-storm/60 text-[10px]">9 inzichten</span><span className="text-urgent text-[10px] font-bold">↑ trend</span></div>
    </Widget>
  );
}