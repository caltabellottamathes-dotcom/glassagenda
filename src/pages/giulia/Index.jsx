import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PANELS = [
  { to: "/giulia/activity", n: "01", title: "Activity", desc: "Live stroom van alles dat gebeurt." },
  { to: "/giulia/agents", n: "02", title: "Agents", desc: "GIULIA's actieve intelligentielaag." },
  { to: "/approvals", n: "03", title: "Approvals", desc: "Wacht op jouw goedkeuring." },
  { to: "/giulia/day", n: "04", title: "Day", desc: "Vandaag, uur voor uur." },
  { to: "/giulia/insights", n: "05", title: "Insights", desc: "Wat GIULIA opviel over je week." },
  { to: "/giulia/jedag", n: "06", title: "Je Dag", desc: "Je dagelijkse briefing." },
  { to: "/giulia/memory", n: "07", title: "Memory", desc: "Wat GIULIA over je onthoudt." },
  { to: "/giulia/questions", n: "08", title: "Questions", desc: "Open vragen van GIULIA." },
  { to: "/giulia/voice", n: "09", title: "Voice Call", desc: "Spreek met GIULIA." },
  { to: "/giulia/chat", n: "10", title: "Chat", desc: "Gesprek met GIULIA." },
];

export default function GiuliaIndex() {
  return (
    <div className="h-[100dvh] w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.22) 0%, rgba(242,242,240,0.10) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-6 h-full">
        <div className="rounded-[28px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-5 sm:p-8 h-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-storm/60 text-[11px] uppercase tracking-[0.3em]">GIULIA OS · INTELLIGENTIELAAG</span>
            <Link to="/" className="text-storm/60 hover:text-storm text-sm">← Terug</Link>
          </div>
          <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight">GIULIA</h1>
          <p className="text-storm/60 text-sm mt-2 max-w-md">10 panelen. De laag die FOCUS, LIFE en SELF verbindt en helpt uitvoeren.</p>
          <div className="h-px bg-marble/20 my-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1 content-start overflow-auto pr-1">
            {PANELS.map(p => (
              <Link key={p.to} to={p.to} className="group rounded-2xl border border-marble/30 bg-marble/5 p-4 hover:bg-marble/10 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-storm/40 text-xs tabular-nums">{p.n}</span>
                  <ArrowRight className="w-4 h-4 text-storm/40 group-hover:text-urgent transition-colors" />
                </div>
                <h3 className="text-storm text-base font-semibold mt-3">{p.title}</h3>
                <p className="text-storm/55 text-[11px] mt-1 leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}