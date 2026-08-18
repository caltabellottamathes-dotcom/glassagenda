import React from "react";
import Widget, { GlassStat, MiniRing, MiniLive, MiniPulse, MiniBars, Num } from "@/components/widgets/Widget";
import { Image } from "@/components/ui/image";

export function FocusActivityWidget() {
  return (
    <Widget index="01" title="Activity" to="/focus/activity" seed="focus-activity" size="strip" tint="linear-gradient(90deg, rgba(48,23,40,0.9), rgba(48,23,40,0.5))">
      <div className="flex items-center gap-3">
        <Num v="18" className="text-3xl" />
        <span className="text-storm/60 text-[10px] leading-tight">work events<br />3 ongelezen</span>
        <div className="flex gap-1 ml-1">
          {["#94925d", "#d8dab3", "#6b6a4a", "#d5e24a"].map((c, i) => <span key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        </div>
        <div className="ml-auto"><MiniLive color="#d5e24a" w={90} h={26} max={8} /></div>
      </div>
    </Widget>
  );
}

export function AgendaWidget() {
  return (
    <Widget index="02" title="Agenda" to="/focus/agenda" seed="focus-agenda" size="tall" tint="linear-gradient(180deg, rgba(48,23,40,0.3), rgba(48,23,40,0.85))">
      <div className="flex flex-col gap-1.5">
        {[["09:00", "Standup", "#94925d"], ["11:00", "Concept Brons", "#d5e24a"], ["13:00", "Lunch", "#d8dab3"], ["14:30", "Giulia 1:1", "#d8dab3"]].map(([t, n, c]) => (
          <div key={t} className="flex items-center gap-2"><span className="w-1 h-4 rounded-full" style={{ background: c }} /><span className="text-storm text-[10px] tabular-nums w-9">{t}</span><span className="text-storm/70 text-[11px] truncate">{n}</span></div>
        ))}
      </div>
      <GlassStat className="mt-1"><span className="text-urgent text-[10px] font-bold">● nu · 14:00 Giulia 1:1</span></GlassStat>
    </Widget>
  );
}

export function DocumentsWidget() {
  return (
    <Widget index="03" title="Documents" to="/documents" seed="focus-docs" size="card">
      <div className="flex flex-col gap-1.5">
        {["Marktanalyse v3.pdf", "Concept Brons.pdf", "Briefing 18 aug.docx"].map(n => (
          <div key={n} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
            <span className="w-5 h-6 rounded-sm bg-sand/30 border border-sand/40 shrink-0" />
            <span className="text-storm text-[11px] truncate flex-1">{n}</span>
          </div>
        ))}
      </div>
      <p className="text-storm/60 text-[10px]">128 documenten · 12 nieuw</p>
    </Widget>
  );
}

export function EmailWidget() {
  return (
    <Widget index="04" title="Email" to="/email" seed="focus-email" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <div className="flex flex-col gap-1">
        {[["F. de Boer", "Q3 data klaar?", true], ["Giulia", "Agenda bijgewerkt", false], ["S. Kaya", "Pitch review", true]].map(([f, s, u], i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-plum/50 text-storm text-[9px] font-bold flex items-center justify-center shrink-0">{f[0]}</span>
            <span className="text-storm text-[11px] truncate w-20 shrink-0">{f}</span>
            <span className="text-storm/50 text-[10px] truncate flex-1">{s}</span>
            {u && <span className="w-1.5 h-1.5 rounded-full bg-urgent shrink-0" />}
          </div>
        ))}
      </div>
    </Widget>
  );
}

export function KnowledgeWidget() {
  return (
    <Widget index="05" title="Knowledge" to="/knowledge" seed="focus-knowledge" size="card">
      <div className="flex flex-wrap gap-1.5">
        {[["Research", 86], ["Brand", 72], ["Process", 54], ["Tech", 90]].map(([t, v]) => (
          <span key={t} className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-storm/80">{t} <span className="text-storm/50 tabular-nums">{v}%</span></span>
        ))}
      </div>
      <p className="text-storm/60 text-[10px]">42 artikelen · 86% coverage</p>
    </Widget>
  );
}

export function PeopleWidget() {
  return (
    <Widget index="06" title="People" to="/people" seed="focus-people" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.8), rgba(48,23,40,0.5))">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {["p1", "p2", "p3", "p4"].map(s => <span key={s} className="relative w-9 h-9 rounded-full border-2 border-plum overflow-hidden"><Image src={`https://picsum.photos/seed/${s}/80/80`} fittingType="fill" className="w-full h-full object-cover" /></span>)}
        </div>
        <div className="flex flex-col"><Num v="9" suffix=" online" className="text-xl" /><span className="text-storm/60 text-[10px]">van 18 teamleden</span></div>
        <div className="ml-auto flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-urgent animate-pulse" /><span className="text-urgent text-[10px] font-bold">live</span></div>
      </div>
    </Widget>
  );
}

export function ProjectsWidget() {
  return (
    <Widget index="07" title="Projects" to="/focus/projects" seed="focus-projects" size="card">
      <div className="flex items-end justify-center gap-3" style={{ height: 60 }}>
        {[["Brons", 72, 42, "#94925d"], ["Q3", 45, 28, "#6b6a4a"], ["Pitch", 100, 18, "#d5e24a"]].map(([n, p, h, c]) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <div className="rounded-full" style={{ width: 12 + h / 3, height: 12 + h / 3, background: c, opacity: 0.85 }} />
            <span className="text-storm/60 text-[8px]">{n} {p}%</span>
          </div>
        ))}
      </div>
      <p className="text-storm/60 text-[10px] text-center">4 projecten · 2 lopend</p>
    </Widget>
  );
}

export function TaskArchiveWidget() {
  return (
    <Widget index="08" title="Task Archive" to="/task-archive" seed="focus-archive" size="mid">
      <div className="flex flex-wrap gap-1.5">
        {["Markt Q2", "Pitch deck", "Onboarding", "Logo v2", "FAQ"].map(n => <span key={n} className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-storm/60 line-through">{n}</span>)}
      </div>
      <div className="flex items-center gap-2"><span className="text-storm/60 text-[10px]">214 voltooid</span><div className="ml-auto"><MiniLive color="#94925d" w={70} h={20} max={8} /></div></div>
    </Widget>
  );
}

export function TaskDetailWidget() {
  return (
    <Widget index="09" title="Task Detail" to="/task-detail" seed="focus-task" size="card">
      <GlassStat><p className="text-storm text-xs leading-tight">Concept Brons — review ronde 2</p><div className="mt-2 h-1.5 rounded-full bg-marble/15 overflow-hidden"><div className="h-full rounded-full bg-sand" style={{ width: "72%" }} /></div><p className="text-storm/50 text-[10px] mt-1">72% · due vr</p></GlassStat>
    </Widget>
  );
}

export function TasksWidget() {
  return (
    <Widget index="10" title="Tasks" to="/taken" seed="focus-tasks" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <div className="flex items-center gap-3"><Num v="18" className="text-3xl" suffix=" open" /><div className="ml-auto flex gap-1.5"><span className="px-2 py-1 rounded-md bg-sand/20 text-storm text-[10px]">6 lopend</span><span className="px-2 py-1 rounded-md bg-urgent/20 text-urgent text-[10px]">2 urgent</span></div></div>
      <MiniBars data={[3, 5, 4, 7, 6, 8, 5]} color="#94925d" h={22} />
    </Widget>
  );
}

export function TimeTrackerWidget() {
  return (
    <Widget index="11" title="Time Tracker" to="/time-tracker" seed="focus-time" size="tall" tint="linear-gradient(180deg, rgba(48,23,40,0.3), rgba(48,23,40,0.85))">
      <div className="flex flex-col gap-2">
        <span className="text-storm text-2xl font-bold tabular-nums">6.5u</span>
        <span className="text-storm/60 text-[10px] -mt-1">vandaag gelogd</span>
        <div className="flex items-end gap-0.5 h-16 mt-1">
          {[0, 0, 2, 3, 1.5, 0, 1, 2.5, 0, 1, 0].map((v, i) => <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${v ? (v / 3) * 100 : 8}%`, background: v ? "#94925d" : "#ffffff10" }} />)}
        </div>
        <div className="flex justify-between text-[8px] text-storm/40"><span>08</span><span>12</span><span>16</span><span>18</span></div>
      </div>
    </Widget>
  );
}

export function WhatsAppWidget() {
  return (
    <Widget index="12" title="WhatsApp" to="/whatsapp" seed="focus-whatsapp" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <div className="flex items-center gap-3"><span className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-plum"><Image src="https://picsum.photos/seed/wa1/80/80" fittingType="fill" className="w-full h-full object-cover" /></span><div className="flex-1 min-w-0"><p className="text-storm text-xs truncate">F. de Boer</p><p className="text-storm/50 text-[10px] truncate">Heb je de presentatie klaar?</p></div><span className="w-5 h-5 rounded-full bg-urgent text-plum text-[10px] font-bold flex items-center justify-center shrink-0">3</span></div>
    </Widget>
  );
}