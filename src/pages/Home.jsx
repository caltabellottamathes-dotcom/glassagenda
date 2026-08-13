import React, { useState } from "react";
import { Search, Mail, FileText, Calendar, Plus, ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const WEEKDAYS = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
const MONTHS = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

function GlassPanel({ className = "", children }) {
  return (
    <div
      className={`rounded-[28px] border border-white/40 bg-white/15 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

function GlassButton({ active = false, className = "", children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-white/40 bg-white/15 backdrop-blur-md transition-all duration-200 hover:bg-white/25 active:scale-95 ${
        active ? "bg-white/30 shadow-inner" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-2 text-white/80">
      <span className="text-xs font-medium tabular-nums">({number})</span>
      <span className="text-xs font-medium tracking-wide">{title}</span>
    </div>
  );
}

function MiniCalendar() {
  const [view, setView] = useState({ year: 2020, month: 4 }); // May 2020
  const [selected, setSelected] = useState(17);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const next = () => setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  return (
    <GlassPanel className="p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="text-white/70 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white text-sm font-medium">
          {MONTHS[view.month].slice(0, 3)} {view.year}
        </span>
        <button onClick={next} className="text-white/70 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[10px] text-white/50 font-medium">
            {d.slice(0, 2)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <button
            key={i}
            disabled={!d}
            onClick={() => d && setSelected(d)}
            className={`aspect-square flex items-center justify-center text-xs rounded-full transition-all ${
              d === selected
                ? "bg-white text-slate-800 font-semibold shadow-md"
                : d
                ? "text-white/80 hover:bg-white/20"
                : ""
            }`}
          >
            {d || ""}
          </button>
        ))}
      </div>
      <div className="text-center text-white/40 mt-2 text-sm">—</div>
    </GlassPanel>
  );
}

export default function Home() {
  const [taskProfiles, setTaskProfiles] = useState([true, true, true, false]);
  const [contextOpen, setContextOpen] = useState(false);
  const [contextValue, setContextValue] = useState("Project Marktanalyse");

  const toggleProfile = (i) => setTaskProfiles((p) => p.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="min-h-screen w-full bg-[#d1d1d1] overflow-hidden relative">
      {/* Spotlight from top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 18% 16%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.18) 28%, rgba(209,209,209,0) 60%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-8">
        <GlassPanel className="w-full max-w-6xl p-6 sm:p-10 flex flex-col lg:flex-row gap-6">
          {/* Divider line */}
          <div className="relative flex flex-col lg:flex-row gap-6 w-full">
            {/* Left section ~40% */}
            <div className="lg:w-2/5 lg:pr-6 flex flex-col justify-between min-h-[260px]">
              <div>
                <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                  Hallo! Waarmee kan ik je vandaag helpen?
                </h1>
                <p className="text-white/75 text-sm mt-4 leading-relaxed max-w-xs">
                  Jouw assistent staat klaar. Ik kan helpen met afspraken, onderzoek, informatie-retrieval, en taakbeheer.
                </p>
              </div>
              <GlassButton className="self-start px-5 py-2.5 text-white text-sm font-medium">
                Book Giulia
              </GlassButton>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block w-px bg-white/30 mx-auto" />

            {/* Right section ~60% */}
            <div className="lg:w-3/5 flex flex-col gap-5">
              {/* Header */}
              <div>
                <p className="text-white/50 text-xs">Privé</p>
                <h2 className="text-white text-xl font-semibold tracking-tight">GIULIA Privé-assistent</h2>
              </div>

              {/* Actieve Taakprofielen */}
              <div>
                <SectionHeader number={1} title="Actieve Taakprofielen" />
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <GlassButton onClick={() => toggleProfile(0)} active={taskProfiles[0]} className="aspect-square flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </GlassButton>
                  <GlassButton onClick={() => toggleProfile(1)} active={taskProfiles[1]} className="aspect-square flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </GlassButton>
                  <GlassButton onClick={() => toggleProfile(2)} active={taskProfiles[2]} className="aspect-square flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </GlassButton>
                  <GlassButton onClick={() => toggleProfile(3)} active={taskProfiles[3]} className="aspect-square flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </GlassButton>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["Marktonderzoek", "Concept Brons", "Identiteit"].map((label, i) => (
                    <GlassButton key={label} active={taskProfiles[i]} onClick={() => toggleProfile(i)} className="aspect-square flex items-center justify-center text-center px-1">
                      <span className="text-white text-[10px] font-medium leading-tight">{label}</span>
                    </GlassButton>
                  ))}
                  <GlassButton className="aspect-square flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </GlassButton>
                </div>
              </div>

              {/* Taakcontext + Agenda */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Taakcontext */}
                <div>
                  <SectionHeader number={5} title="Taakcontext" />
                  <GlassPanel className="mt-3 p-3">
                    <button
                      onClick={() => setContextOpen((o) => !o)}
                      className="w-full flex items-center justify-between text-white text-sm"
                    >
                      <span className="font-medium">{contextValue}</span>
                      <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${contextOpen ? "rotate-180" : ""}`} />
                    </button>
                    {contextOpen && (
                      <div className="mt-2 pt-2 border-t border-white/20 space-y-1">
                        {["Project", "Delays"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setContextValue(opt);
                              setContextOpen(false);
                            }}
                            className="w-full text-left text-white/80 hover:text-white text-sm py-1 px-2 rounded-lg hover:bg-white/15 transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </GlassPanel>
                </div>

                {/* Agenda */}
                <div>
                  <SectionHeader number={9} title="Mijn Agenda" />
                  <div className="mt-3">
                    <MiniCalendar />
                  </div>
                </div>
              </div>

              {/* Main action button */}
              <div className="flex items-center justify-end gap-2 mt-1">
                <button className="px-6 py-3 rounded-full bg-white/90 text-slate-800 text-sm font-semibold hover:bg-white transition-colors shadow-lg active:scale-95">
                  Nieuwe Taak Plannen
                </button>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}