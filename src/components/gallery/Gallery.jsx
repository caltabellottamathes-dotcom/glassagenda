import React from "react";

export function GalleryItem({ n, title, desc, className = "", children }) {
  return (
    <div className={`rounded-2xl border border-marble/20 bg-marble/5 p-4 flex flex-col gap-3 ${className}`}>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-storm text-sm font-semibold">{title}</h3>
        <span className="text-storm/30 text-[10px] tabular-nums tracking-wider">№{String(n).padStart(2, "0")}</span>
      </div>
      {desc && <p className="text-storm/45 text-[10px] leading-relaxed">{desc}</p>}
      <div className="flex-1 flex items-center justify-center min-h-[130px] rounded-xl bg-plum/40 border border-marble/15 p-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function Section({ id, index, title, desc, children, cols = "lg:grid-cols-3" }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-urgent text-xs tabular-nums tracking-[0.2em]">/{index}</span>
        <h2 className="text-storm text-xl font-bold tracking-tight">{title}</h2>
      </div>
      {desc && <p className="text-storm/50 text-[11px] mb-5 max-w-2xl leading-relaxed">{desc}</p>}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4 mt-4`}>{children}</div>
    </section>
  );
}