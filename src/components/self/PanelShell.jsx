import React from "react";
import { Link } from "react-router-dom";
import { PageShell, GlassButton, Divider } from "@/components/glass";

export default function PanelShell({ section, statement, kicker, children, context = [], actions = [] }) {
  return (
    <PageShell>
      <div className="flex items-center justify-between mb-8">
        <span className="text-marble/50 text-[11px] uppercase tracking-[0.25em]">{section}</span>
        <Link to="/self"><GlassButton className="px-4 py-2 text-storm text-sm">← SELF</GlassButton></Link>
      </div>

      <h1 className="text-storm text-4xl sm:text-6xl font-bold tracking-tight leading-[1.02]">{statement}</h1>
      {kicker && <p className="text-marble/50 text-sm mt-3 tracking-[0.2em] uppercase">{kicker}</p>}

      <Divider className="my-8" />
      <div className="min-h-[280px]">{children}</div>

      {context.length > 0 && (
        <>
          <Divider className="my-8" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {context.map((c) => (
              <div key={c.label}>
                <p className="text-marble/50 text-[10px] uppercase tracking-wider">{c.label}</p>
                <p className="text-storm text-sm mt-2 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <Divider className="my-8" />
      <div className="flex flex-wrap gap-2">
        {actions.map((a, i) =>
          a.primary ? (
            <button key={i} className="px-5 py-2.5 rounded-full bg-urgent text-metal text-sm font-semibold hover:brightness-105 active:scale-95 transition-all">{a.label}</button>
          ) : (
            <GlassButton key={i} className="px-5 py-2.5 text-storm text-sm">{a.label}</GlassButton>
          )
        )}
      </div>
    </PageShell>
  );
}