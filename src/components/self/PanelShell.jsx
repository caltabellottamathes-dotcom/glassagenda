import React from "react";
import { Link } from "react-router-dom";

function GraphicRule({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="h-px bg-plum/15" />
      <div className="absolute left-0 top-0 h-px w-20 bg-plum" />
    </div>
  );
}

export default function PanelShell({ index, section, statement, kicker, children, context = [], actions = [] }) {
  return (
    <div className="min-h-screen w-full bg-selfbg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 85% 10%, rgba(48,23,40,0.10) 0%, rgba(48,23,40,0) 55%), radial-gradient(circle at 8% 92%, rgba(48,23,40,0.06) 0%, rgba(48,23,40,0) 50%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-10">
        <div className="rounded-[28px] border border-plum/15 bg-selfpanel/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(48,23,40,0.12)] p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span className="text-plum/15 text-6xl font-bold leading-none tabular-nums select-none">{index}</span>
              <span className="text-plum/50 text-[11px] uppercase tracking-[0.3em] pt-3">{section}</span>
            </div>
            <Link to="/self" className="shrink-0 text-plum/60 hover:text-plum text-sm pt-3">← SELF</Link>
          </div>

          <div className="mt-4">
            <h1 className="text-plum text-2xl sm:text-3xl font-bold tracking-tight">{statement}</h1>
            {kicker && <p className="text-plum/50 text-xs mt-2 tracking-[0.25em] uppercase">{kicker}</p>}
          </div>

          <GraphicRule className="my-8" />
          <div className="min-h-[280px]">{children}</div>

          {context.length > 0 && (
            <>
              <GraphicRule className="my-8" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {context.map((c, i) => (
                  <div key={c.label}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-plum/30 text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-plum text-[10px] uppercase tracking-[0.2em] font-semibold">{c.label}</p>
                    </div>
                    <p className="text-plum/70 text-sm mt-2 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <GraphicRule className="my-8" />
          <div className="flex flex-wrap gap-2.5">
            {actions.map((a, i) => a.primary ? (
              <button key={i} className="px-6 py-3 rounded-full bg-plum text-selfpanel text-xs font-semibold tracking-[0.15em] uppercase hover:brightness-110 active:scale-95 transition-all">{a.label}</button>
            ) : (
              <button key={i} className="px-6 py-3 rounded-full border border-plum/25 bg-plum/5 text-plum text-xs tracking-[0.15em] uppercase hover:bg-plum/10 transition-colors">{a.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}