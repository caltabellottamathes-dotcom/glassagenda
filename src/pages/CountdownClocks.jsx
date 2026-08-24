import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCountdown } from "@/components/countdown/CountdownClocks";
import { OrbitRings, LiquidDigits, FlipClock, NeonSeven, PolarArc, ParticleDigits, BarStack, SpiralClock, RingPulse, Odometer } from "@/components/countdown/CountdownClocks";

const DESIGNS = [
  { C: OrbitRings, title: "Orbit Rings", sub: "Dagen · Uren · Min · Sec", units: "DHMS" },
  { C: LiquidDigits, title: "Liquid Digits", sub: "Dagen · Uren · Min", units: "DHM" },
  { C: FlipClock, title: "Flip Clock", sub: "Dagen · Uren · Min · Sec", units: "DHMS" },
  { C: NeonSeven, title: "Neon 7-Segment", sub: "Dagen · Uren · Min", units: "DHM" },
  { C: PolarArc, title: "Polar Arc", sub: "Dagen · Uren · Min · Sec", units: "DHMS" },
  { C: ParticleDigits, title: "Particle Digits", sub: "Dagen · Uren · Min", units: "DHM" },
  { C: BarStack, title: "Bar Stack", sub: "Dagen · Uren · Min · Sec", units: "DHMS" },
  { C: SpiralClock, title: "Spiral Clock", sub: "Dagen · Uren · Min", units: "DHM" },
  { C: RingPulse, title: "Ring Pulse", sub: "Dagen · Uren · Min · Sec", units: "DHMS" },
  { C: Odometer, title: "Odometer Roll", sub: "Dagen · Uren · Min", units: "DHM" },
];

export default function CountdownClocks() {
  const target = useMemo(() => { const t = new Date(); t.setDate(t.getDate() + 45); t.setHours(9, 30, 0, 0); return t.getTime(); }, []);
  const time = useCountdown(target);
  return (
    <div className="min-h-screen w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.22) 0%, rgba(242,242,240,0.10) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-8">
        <div className="rounded-[28px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-6 sm:p-8">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-storm/60 text-[11px] uppercase tracking-[0.3em]">UI Gallery · 13</span>
              <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight mt-1">Aftelklokken</h1>
              <p className="text-storm/50 text-xs mt-1 tracking-[0.2em] uppercase">10 grafische, geanimeerde ontwerpen</p>
            </div>
            <Link to="/UI-gallery" className="text-storm/60 hover:text-storm text-sm">← Gallery</Link>
          </div>
          <div className="h-px bg-marble/20 my-6"><div className="h-px w-20 bg-plum" /></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESIGNS.map(({ C, title, sub, units }, i) => {
              const props = units === "DHMS" ? { ...time, maxD: 45 } : { d: time.d, h: time.h, m: time.m, maxD: 45 };
              return (
                <div key={i} className="rounded-2xl border border-marble/20 bg-plum/30 p-5 flex flex-col">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-storm/30 text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-storm/40 text-[9px] tracking-widest uppercase">{sub}</span>
                  </div>
                  <h3 className="text-storm text-sm font-bold tracking-wide mb-4">{title}</h3>
                  <div className="flex-1 flex items-center justify-center min-h-[140px]">
                    <C {...props} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}