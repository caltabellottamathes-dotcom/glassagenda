import React from "react";

function GraphicRule({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="h-px bg-marble/20" />
      <div className="absolute left-0 top-0 h-px w-20 bg-plum" />
    </div>
  );
}

const TABS = [
  { id: "morning", label: "MORNING" },
  { id: "routine", label: "ROUTINE" },
  { id: "settings", label: "SETTINGS" },
];

export default function GoodMorningShell({ active, onChange, children, context = [], actionLabel = "OPEN MORNING BRIEFING →" }) {
  return (
    <div className="h-[100dvh] w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.22) 0%, rgba(242,242,240,0.10) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-5 h-full">
        <div className="rounded-[28px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-5 sm:p-7 h-full flex flex-col overflow-hidden">

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-baseline gap-3">
              <span className="text-urgent text-[11px] tracking-[0.3em] uppercase font-bold">Good Morning</span>
              <span className="text-storm/30 text-[10px] tracking-[0.2em] uppercase">Panel</span>
            </div>
            <div className="flex gap-1 p-1 rounded-full border border-storm/15 bg-marble/5">
              {TABS.map((t, i) => (
                <button key={t.id} onClick={() => onChange(i)} className={`px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors ${active === i ? "bg-plum text-storm" : "text-storm/55 hover:text-storm"}`}>
                  <span className="mr-1.5 opacity-50">{String(i + 1).padStart(2, "0")}</span>{t.label}
                </button>
              ))}
            </div>
          </div>

          <GraphicRule className="my-4" />
          <div className="flex-1 min-h-0 overflow-hidden">{children}</div>

          {context.length > 0 && (
            <>
              <GraphicRule className="my-4" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {context.map((c, i) => (
                  <div key={c.label}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-storm/30 text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-storm/80 text-[10px] uppercase tracking-[0.2em] font-semibold">{c.label}</p>
                    </div>
                    <p className="text-storm/70 text-sm mt-2 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <GraphicRule className="my-4" />
          <div className="flex justify-end">
            <button className="px-6 py-3 rounded-full bg-plum text-storm text-xs font-semibold tracking-[0.15em] uppercase hover:brightness-125 active:scale-95 transition-all">{actionLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}