import React, { useState } from "react";
import { Search, Mail, FileText, Calendar, Plus, ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const WEEKDAYS = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
const MONTHS = ["JAN", "FEB", "MRT", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"];

const C = {
  metal: "#2D2D23",
  clay: "#868564",
  sand: "#94925D",
  sky: "#B1BEC6",
  marble: "#E0DED3",
  storm: "#F2F2F0",
  urgent: "#D5E24A",
};

function GlassPanel({ className = "", children, style }) {
  return (
    <div
      style={style}
      className={`rounded-[6px] border-2 border-black/70 bg-white/15 backdrop-blur-2xl shadow-[6px_6px_0_0_rgba(45,45,35,0.85)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({ number, title, color = C.metal }) {
  return (
    <div className="flex items-baseline gap-3" style={{ color }}>
      <span
        className="text-3xl font-black tabular-nums leading-none"
        style={{ fontFamily: "'ui-monospace, monospace'", color: C.urgent, WebkitTextStroke: `1.5px ${color}` }}
      >
        {number}
      </span>
      <span className="text-xs font-black uppercase tracking-[0.2em]">{title}</span>
    </div>
  );
}

function MiniCalendar() {
  const [view, setView] = useState({ year: 2020, month: 4 });
  const [selected, setSelected] = useState(17);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const next = () => setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  return (
    <GlassPanel className="p-4" style={{ background: `${C.sky}55` }}>
      <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black/40">
        <button onClick={prev} className="text-black/80 hover:text-black transition-colors border-2 border-black/60 rounded px-1.5 py-0.5">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-black font-black text-sm tracking-widest uppercase">
          {MONTHS[view.month]} {view.year}
        </span>
        <button onClick={next} className="text-black/80 hover:text-black transition-colors border-2 border-black/60 rounded px-1.5 py-0.5">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[10px] text-black/60 font-black tracking-wider">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <button
            key={i}
            disabled={!d}
            onClick={() => d && setSelected(d)}
            className={`aspect-square flex items-center justify-center text-xs font-bold rounded transition-all ${
              d === selected
                ? "text-black"
                : d
                ? "text-black/70 hover:bg-black/10"
                : ""
            }`}
            style={d === selected ? { background: C.urgent, boxShadow: `2px 2px 0 0 ${C.metal}` } : {}}
          >
            {d || ""}
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}

export default function Home() {
  const [taskProfiles, setTaskProfiles] = useState([true, true, true, false]);
  const [contextOpen, setContextOpen] = useState(false);
  const [contextValue, setContextValue] = useState("Project Marktanalyse");

  const toggleProfile = (i) => setTaskProfiles((p) => p.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: C.marble }}>
      {/* Bold color block accents */}
      <div className="absolute top-0 left-0 w-[40%] h-[45%] rounded-br-[200px]" style={{ background: C.clay, opacity: 0.35 }} />
      <div className="absolute bottom-0 right-0 w-[35%] h-[40%] rounded-tl-[200px]" style={{ background: C.sand, opacity: 0.3 }} />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: C.urgent, opacity: 0.25 }} />

      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 12%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.15) 30%, rgba(224,222,211,0) 65%)",
        }}
      />

      {/* Top brutalist bar */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4 border-b-2 border-black/70" style={{ background: `${C.metal}cc` }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full" style={{ background: C.urgent }} />
          <span className="text-white font-black text-lg tracking-tight uppercase">Giulia</span>
        </div>
        <span className="text-white/60 text-xs font-mono tracking-widest hidden sm:block">PRIVÉ-ASSISTENT // v2.0</span>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 sm:px-8 py-8">
        <GlassPanel className="w-full max-w-6xl p-6 sm:p-10 flex flex-col lg:flex-row gap-6" style={{ background: `${C.storm}30` }}>
          {/* Left section */}
          <div className="lg:w-2/5 lg:pr-6 flex flex-col justify-between min-h-[280px] relative">
            <div>
              <span className="inline-block text-xs font-mono font-bold tracking-widest mb-4 px-2 py-1" style={{ background: C.urgent, color: C.metal }}>
                ● ONLINE
              </span>
              <h1 className="font-black leading-[0.95] tracking-tight uppercase" style={{ color: C.metal, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                Hallo!<br />
                <span style={{ color: C.clay }}>Waarmee</span><br />
                kan ik je<br />
                <span style={{ background: C.urgent, padding: "0 6px" }}>vandaag</span><br />
                helpen?
              </h1>
              <p className="text-sm mt-5 leading-relaxed max-w-xs font-medium" style={{ color: C.metal, opacity: 0.75 }}>
                Jouw assistent staat klaar. Ik kan helpen met afspraken, onderzoek, informatie-retrieval, en taakbeheer.
              </p>
            </div>
            <button
              className="self-start px-6 py-3 mt-6 font-black text-sm uppercase tracking-widest border-2 border-black/70 active:translate-x-1 active:translate-y-1 transition-transform"
              style={{ background: `${C.metal}99`, color: C.storm, boxShadow: `4px 4px 0 0 ${C.metal}`, backdropFilter: "blur(12px)" }}
            >
              Book Giulia →
            </button>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block w-0.5 bg-black/40 mx-auto" />

          {/* Right section */}
          <div className="lg:w-3/5 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-mono tracking-widest" style={{ color: C.clay }}>PRIVÉ</p>
                <h2 className="text-2xl font-black tracking-tight uppercase" style={{ color: C.metal }}>
                  Giulia <span style={{ color: C.sand }}>Privé-assistent</span>
                </h2>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-black/70 flex items-center justify-center" style={{ background: C.urgent }}>
                <Sparkles className="w-5 h-5" style={{ color: C.metal }} />
              </div>
            </div>

            {/* Actieve Taakprofielen */}
            <div>
              <SectionHeader number={1} title="Actieve Taakprofielen" color={C.metal} />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { icon: Search, bg: C.clay },
                  { icon: Mail, bg: C.sand },
                  { icon: FileText, bg: C.sky },
                  { icon: Calendar, bg: C.urgent },
                ].map(({ icon: Icon, bg }, i) => (
                  <button
                    key={i}
                    onClick={() => toggleProfile(i)}
                    className={`aspect-square flex items-center justify-center rounded-[6px] border-2 border-black/70 transition-all active:translate-x-0.5 active:translate-y-0.5 ${taskProfiles[i] ? "scale-100" : "opacity-50"}`}
                    style={{ background: `${bg}66`, backdropFilter: "blur(12px)", boxShadow: `3px 3px 0 0 ${C.metal}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: C.metal }} />
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["Marktonderzoek", "Concept Brons", "Identiteit"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => toggleProfile(i)}
                    className={`aspect-square flex items-center justify-center text-center px-1 rounded-[6px] border-2 border-black/70 transition-all active:translate-x-0.5 active:translate-y-0.5 ${taskProfiles[i] ? "" : "opacity-50"}`}
                    style={{ background: `${C.storm}40`, backdropFilter: "blur(12px)", boxShadow: `3px 3px 0 0 ${C.metal}` }}
                  >
                    <span className="text-[10px] font-black uppercase leading-tight" style={{ color: C.metal }}>{label}</span>
                  </button>
                ))}
                <button
                  className="aspect-square flex items-center justify-center rounded-[6px] border-2 border-dashed border-black/70 transition-all active:translate-x-0.5 active:translate-y-0.5"
                  style={{ background: `${C.urgent}33`, backdropFilter: "blur(12px)" }}
                >
                  <Plus className="w-6 h-6" style={{ color: C.metal }} />
                </button>
              </div>
            </div>

            {/* Taakcontext + Agenda */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <SectionHeader number={5} title="Taakcontext" color={C.metal} />
                <GlassPanel className="mt-3 p-4" style={{ background: `${C.clay}40` }}>
                  <button
                    onClick={() => setContextOpen((o) => !o)}
                    className="w-full flex items-center justify-between font-black text-sm uppercase tracking-wide"
                    style={{ color: C.metal }}
                  >
                    <span>{contextValue}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${contextOpen ? "rotate-180" : ""}`} style={{ color: C.metal }} />
                  </button>
                  {contextOpen && (
                    <div className="mt-3 pt-3 border-t-2 border-black/30 space-y-1">
                      {["Project", "Delays"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setContextValue(opt); setContextOpen(false); }}
                          className="w-full text-left text-sm font-bold uppercase tracking-wide py-2 px-3 rounded transition-colors hover:bg-black/10"
                          style={{ color: C.metal }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </GlassPanel>
              </div>

              <div>
                <SectionHeader number={9} title="Mijn Agenda" color={C.metal} />
                <div className="mt-3">
                  <MiniCalendar />
                </div>
              </div>
            </div>

            {/* Main action button */}
            <div className="flex items-center justify-end gap-3 mt-1">
              <button
                className="px-8 py-4 font-black text-base uppercase tracking-widest border-2 border-black/70 active:translate-x-1 active:translate-y-1 transition-transform"
                style={{ background: C.urgent, color: C.metal, boxShadow: `5px 5px 0 0 ${C.metal}` }}
              >
                Nieuwe Taak Plannen
              </button>
              <Sparkles className="w-7 h-7" style={{ color: C.metal }} />
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}