import React from "react";
import LifeCard, { VBar, Row } from "@/components/widgets/LifeCard";

export function SocialPulseWidget() {
  return (
    <LifeCard index="01" title="Social Pulse" kicker="687 wacht" statement="A lot happening" sub="Je sociale leven beweegt" seed="life-pulse" to="/life/social-pulse"
      stats={[{ v: "0", l: "plannen" }, { v: "687", l: "aandacht" }]}>
      <div className="flex items-end gap-4">
        <span className="text-storm text-5xl font-bold tabular-nums leading-none">232</span>
        <span className="text-storm/55 text-[10px] tracking-[0.18em] uppercase pb-2 leading-tight">Meaningful<br />interactions</span>
      </div>
    </LifeCard>
  );
}

export function SocialPlannerWidget() {
  return (
    <LifeCard index="02" title="Social Planner" kicker="open" kickerTone="muted" statement="Jouw weekend is open" sub="Twee lege dagen wachten" seed="life-social" to="/life/social-planner"
      note="Geen plan deze week" stats={[{ v: "0", l: "plannen" }, { v: "0", l: "open" }, { v: "3", l: "vrij" }]}>
      <div className="flex gap-1.5">
        {["MA", "DI", "WO", "DO", "VR", "ZA", "ZO"].map((d) => (
          <div key={d} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full aspect-square rounded-md border border-storm/20 bg-white/5" />
            <span className="text-storm/40 text-[8px] tracking-wider">{d}</span>
          </div>
        ))}
      </div>
    </LifeCard>
  );
}

export function HouseholdWidget() {
  return (
    <LifeCard index="03" title="Household" kicker="3 aandacht" statement="Een paar dingen" sub="Een paar dingen deze week" seed="life-household" to="/life/household"
      stats={[{ v: "0", l: "taak" }, { v: "2", l: "boodschap" }, { v: "0", l: "onderhoud" }]}>
      <div className="flex items-end justify-center gap-4 h-20">
        <VBar v={0.6} color="#6b4d5d" />
        <VBar v={1} color="#d5e24a" />
        <VBar v={0.4} color="#6b4d5d" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {[["Schoonmaak", "Rustig"], ["Boodschappen", "Aandacht"], ["Onderhoud", "Rustig"], ["Routines", "Aandacht"]].map(([n, s]) => (
          <div key={n} className="flex items-center justify-between text-[9px]">
            <span className="text-storm/55 tracking-wider uppercase">{n}</span>
            <span className={s === "Aandacht" ? "text-urgent" : "text-storm/40"}>{s}</span>
          </div>
        ))}
      </div>
    </LifeCard>
  );
}

export function PersonalAdminWidget() {
  return (
    <LifeCard index="04" title="Personal Admin" kicker="6 op komst" statement="6 things are circling" sub="Het wordt drukker." seed="life-admin" to="/life/admin"
      stats={[{ v: "6", l: "aandacht" }, { v: "€697", l: "op komst", tone: "urgent" }, { v: "0", l: "te laat" }]}>
      <div className="flex flex-col gap-2">
        {[["Telefoon", "12d", 45], ["Streaming", "3d", 18], ["Huur", "8d", 60], ["Belastingaangifte", "30d", 90]].map(([n, m, v]) => (
          <Row key={n} label={n} meta={m} value={v} tone={v >= 80 ? "urgent" : "default"} />
        ))}
      </div>
    </LifeCard>
  );
}

export function HobbiesWidget() {
  const pills = ["Fusion vocal group", "Ceramics", "Choir", "Film", "Drawing"];
  return (
    <LifeCard index="05" title="Hobby's" kicker="3 levend" statement="3 things are alive" seed="life-hobbies" to="/life/hobbies"
      stats={[{ v: "3", l: "actief" }, { v: "4", l: "stil" }, { v: "1", l: "nieuw" }]}>
      <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-storm/55">
        <span>Music</span><span className="text-storm/30">·</span><span>Photography</span><span className="text-storm/30">·</span><span>Reading</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {pills.map((p) => (
          <span key={p} className={`text-[10px] px-2.5 py-1 rounded-full border tracking-wide ${p === "Ceramics" ? "bg-urgent text-plum border-urgent font-semibold" : "border-storm/20 text-storm/70"}`}>{p}</span>
        ))}
      </div>
    </LifeCard>
  );
}

export function FoodWidget() {
  return (
    <LifeCard index="06" title="Food" kicker="vanavond" statement="Pasta al limone" sub="Een rustig diner" seed="life-food" to="/self/food"
      stats={[{ v: "19:00", l: "diner" }, { v: "2", l: "personen" }]}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-storm/55 text-[10px] tracking-[0.18em] uppercase">Gepland</span>
          <span className="text-storm text-lg font-semibold">Diner · thuis</span>
        </div>
        <div className="flex -space-x-2">
          {["f1", "f2"].map((s) => (
            <span key={s} className="relative w-9 h-9 rounded-full border-2 border-plum overflow-hidden">
              <img src={`https://picsum.photos/seed/${s}/80/80`} className="w-full h-full object-cover" alt="" />
            </span>
          ))}
        </div>
      </div>
    </LifeCard>
  );
}