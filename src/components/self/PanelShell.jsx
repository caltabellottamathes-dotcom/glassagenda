import React from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/glass";

function GraphicRule({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="h-px bg-marble/20" />
      <div className="absolute left-0 top-0 h-px w-20 bg-urgent" />
    </div>
  );
}

export default function PanelShell({ index, section, statement, kicker, children, context = [], actions = [] }) {
  return (
    <PageShell maxWidth="max-w-6xl">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-baseline gap-6">
          <span className="text-marble/12 text-7xl sm:text-8xl font-bold leading-none tabular-nums select-none">{index}</span>
          <span className="text-marble/50 text-[11px] uppercase tracking-[0.3em] pt-3">{section}</span>
        </div>
        <Link to="/self" className="shrink-0 text-marble/70 hover:text-storm text-sm tracking-wide pt-3">← SELF</Link>
      </div>

      <div className="mt-8">
        <h1 className="text-storm text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">{statement}</h1>
        {kicker && <p className="text-urgent text-sm mt-5 tracking-[0.25em] uppercase">{kicker}</p>}
      </div>

      <GraphicRule className="my-10" />

      <div className="min-h-[320px]">{children}</div>

      {context.length > 0 && (
        <>
          <GraphicRule className="my-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {context.map((c, i) => (
              <div key={c.label}>
                <div className="flex items-center gap-2.5">
                  <span className="text-marble/30 text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-urgent text-[10px] uppercase tracking-[0.2em]">{c.label}</p>
                </div>
                <p className="text-storm text-base mt-3 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <GraphicRule className="my-10" />
      <div className="flex flex-wrap gap-2.5">
        {actions.map((a, i) =>
          a.primary ? (
            <button key={i} className="px-6 py-3 rounded-full bg-urgent text-metal text-xs font-semibold tracking-[0.15em] uppercase hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(213,226,74,0.35)]">{a.label}</button>
          ) : (
            <button key={i} className="px-6 py-3 rounded-full border border-marble/30 bg-marble/5 text-storm text-xs tracking-[0.15em] uppercase hover:bg-marble/15 transition-colors">{a.label}</button>
          )
        )}
      </div>
    </PageShell>
  );
}