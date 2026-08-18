import React from "react";
import Widget, { GlassStat, MiniRing, MiniLive, MiniPulse, MiniBars, Num } from "@/components/widgets/Widget";

export function HobbiesWidget() {
  return (
    <Widget index="01" title="Hobbies" to="/life/hobbies" seed="life-hobbies" size="card">
      <div className="flex items-center gap-3"><MiniRing pct={64} size={64} color="#94925d" label="64%" /><span className="text-storm/60 text-[11px] leading-tight">11u van 17u<br/>weekdoel</span></div>
    </Widget>
  );
}

export function HouseholdWidget() {
  const rooms = [{ n: "Keuken", d: 0.8 }, { n: "Woonk.", d: 0.5 }, { n: "Badk.", d: 0.3 }, { n: "Slaapk.", d: 0.6 }];
  return (
    <Widget index="02" title="Household" to="/life/household" seed="life-household" size="sq">
      <div className="grid grid-cols-2 gap-1.5">
        {rooms.map(r => <div key={r.n} className="rounded-lg border border-white/10 bg-white/5 p-1.5"><div className="text-[9px] text-storm/60">{r.n}</div><div className="h-1 rounded-full bg-marble/15 mt-1 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${r.d * 100}%`, background: r.d === 1 ? "#d5e24a" : "#94925d" }} /></div></div>)}
      </div>
      <p className="text-storm/60 text-[10px] text-center mt-1">4/6 klusjes klaar</p>
    </Widget>
  );
}

export function PersonalAdminWidget() {
  return (
    <Widget index="03" title="Personal Admin" to="/life/admin" seed="life-admin" size="tall" tint="linear-gradient(180deg, rgba(48,23,40,0.3), rgba(48,23,40,0.85))">
      <div className="flex flex-col items-center gap-1"><span className="text-urgent text-3xl font-bold tabular-nums">vandaag</span><span className="text-storm/60 text-[10px]">energieafrekening</span></div>
      <GlassStat className="mt-1"><div className="flex justify-between text-[10px]"><span className="text-storm/60">open</span><span className="text-storm font-bold">5</span></div><div className="flex justify-between text-[10px] mt-1"><span className="text-storm/60">urgent</span><span className="text-urgent font-bold">2</span></div></GlassStat>
      <MiniBars data={[1, 3, 2, 4, 2]} color="#d5e24a" h={20} />
    </Widget>
  );
}

export function SocialPlannerWidget() {
  const days = ["M", "D", "W", "D", "V", "Z", "Z"];
  const on = [0, 0, 1, 1, 1, 0, 1];
  return (
    <Widget index="04" title="Social Planner" to="/life/social-planner" seed="life-social" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <div className="flex items-end justify-between gap-1">
        {days.map((d, i) => <div key={i} className="flex flex-col items-center gap-1"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] ${on[i] ? "bg-sand text-storm" : "bg-white/5 text-storm/40"}`}>{d}</div>{on[i] && <span className="w-1 h-1 rounded-full bg-urgent" />}</div>)}
      </div>
      <p className="text-storm/60 text-[10px]">5 afspraken · 2 bevestigd</p>
    </Widget>
  );
}

export function SocialPulseWidget() {
  return (
    <Widget index="05" title="Social Pulse" to="/life/social-pulse" seed="life-pulse" size="sq">
      <div className="relative flex items-center justify-center" style={{ height: 90 }}>
        <svg viewBox="-50 -50 100 100" className="w-full h-full">
          {[0.4, 0.7, 1].map(r => <circle key={r} r={36 * r} fill="none" stroke="#ffffff10" />)}
          {[[0.7, 0.2], [-0.5, -0.3], [0.3, -0.4], [-0.3, 0.5]].map(([x, y], i) => <circle key={i} cx={x * 36} cy={y * 36} r="4" fill={["#94925d", "#d5e24a", "#d8dab3", "#6b6a4a"][i]}><animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" /></circle>)}
        </svg>
      </div>
      <p className="text-storm/60 text-[10px] text-center">3/5 bereikt</p>
    </Widget>
  );
}

export function FoodWidget() {
  return (
    <Widget index="06" title="Food" to="/self/food" seed="life-food" size="port" tint="linear-gradient(180deg, rgba(48,23,40,0.2), rgba(48,23,40,0.85))">
      <div className="flex flex-col gap-2">
        <span className="text-storm/60 text-[10px] tracking-wider">VANAVOND</span>
        <span className="text-storm text-xl font-bold">Pasta al limone</span>
        <GlassStat className="self-start"><span className="text-storm text-[10px]">Diner · 19:00</span></GlassStat>
      </div>
    </Widget>
  );
}