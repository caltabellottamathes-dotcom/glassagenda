import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PANELS = [
  { to: "/focus/activity", n: "01", title: "Activity", desc: "Live stroom van je werk." },
  { to: "/focus/agenda", n: "02", title: "Agenda", desc: "Afspraken van vandaag." },
  { to: "/documents", n: "03", title: "Documents", desc: "Je bibliotheek." },
  { to: "/email", n: "04", title: "Email", desc: "Inbox overzicht." },
  { to: "/knowledge", n: "05", title: "Knowledge", desc: "Kennisbank." },
  { to: "/people", n: "06", title: "People", desc: "Team en netwerk." },
  { to: "/focus/projects", n: "07", title: "Projects", desc: "Portfolio en milestones." },
  { to: "/task-archive", n: "08", title: "Task Archive", desc: "Voltooid werk." },
  { to: "/task-detail", n: "09", title: "Task Detail", desc: "Eén taak diep." },
  { to: "/taken", n: "10", title: "Tasks", desc: "Taken dashboard." },
  { to: "/time-tracker", n: "11", title: "Time Tracker", desc: "Tijd per project." },
  { to: "/whatsapp", n: "12", title: "WhatsApp", desc: "Berichten." },
];

export default function FocusIndex() {
  return (
    <div className="h-[100dvh] w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.22) 0%, rgba(242,242,240,0.10) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-6 h-full">
        <div className="rounded-[28px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-5 sm:p-8 h-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-storm/60 text-[11px] uppercase tracking-[0.3em]">GIULIA OS · WAT JE MOET DOEN</span>
            <Link to="/" className="text-storm/60 hover:text-storm text-sm">← Terug</Link>
          </div>
          <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight">FOCUS</h1>
          <p className="text-storm/60 text-sm mt-2 max-w-md">12 panelen. Taken, projecten, planning, communicatie en documenten.</p>
          <div className="h-px bg-marble/20 my-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 flex-1 content-start overflow-auto pr-1">
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