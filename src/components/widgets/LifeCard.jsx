import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

export const lifePhoto = (seed, w = 800, h = 700) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export default function LifeCard({ index, title, kicker, kickerTone = "urgent", statement, sub, seed, to, stats = [], note, children, overlay }) {
  const kickerCls = kickerTone === "muted" ? "border-storm/30 text-storm/70" : "border-urgent/40 text-urgent";
  return (
    <Link to={to} className="group relative block overflow-hidden rounded-[20px] border border-marble/25 bg-plum shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 mb-4 break-inside-avoid">
      {seed && <Image src={lifePhoto(seed)} fittingType="fill" className="absolute inset-0 w-full h-full object-cover opacity-35" />}
      <div className="absolute inset-0" style={{ background: overlay || "linear-gradient(165deg, rgba(48,23,40,0.55) 0%, rgba(48,23,40,0.84) 55%, rgba(45,45,35,0.95) 100%)" }} />
      <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/10" />
      <div className="relative z-10 p-5 flex flex-col gap-3 min-h-[300px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-storm/35 text-[10px] tabular-nums tracking-wider">{index}</span>
            <span className="text-storm text-[11px] font-semibold tracking-[0.22em] uppercase">{title}</span>
          </div>
          {kicker && <span className={`text-[9px] px-2 py-0.5 rounded-full border tracking-[0.15em] uppercase ${kickerCls}`}>{kicker}</span>}
        </div>
        <div>
          {statement && <h2 className="text-storm text-[26px] leading-[1.02] font-bold tracking-tight">{statement}</h2>}
          {sub && <p className="text-storm/50 text-[10px] mt-2 tracking-[0.18em] uppercase">{sub}</p>}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-3">{children}</div>
        {note && <p className="text-storm/40 text-[10px] tracking-wide">{note}</p>}
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className={`text-[13px] font-bold tabular-nums ${s.tone === "urgent" ? "text-urgent" : "text-storm"}`}>{s.v}</span>
                <span className="text-storm/45 text-[9px] tracking-[0.15em] uppercase">{s.l}</span>
              </div>
            ))}
          </div>
          <span className="shrink-0 text-[10px] px-3 py-1 rounded-full border border-storm/25 text-storm/80 tracking-[0.2em] uppercase group-hover:bg-storm group-hover:text-plum transition-colors">Open →</span>
        </div>
      </div>
    </Link>
  );
}

export function VBar({ v = 0.6, color = "#6b4d5d", max = 70 }) {
  return <div className="rounded-t-md" style={{ width: 18, height: Math.max(6, v * max), background: color }} />;
}

export function Row({ label, meta, value, tone }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-storm text-[11px] flex-1 truncate">{label}</span>
      <span className="text-storm/45 text-[9px] tabular-nums w-7 text-right">{meta}</span>
      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: tone === "urgent" ? "#d5e24a" : "#6b4d5d" }} />
      </div>
    </div>
  );
}