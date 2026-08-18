import React, { useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis } from "recharts";
import ModuleShell from "@/components/modules/ModuleShell";
import { BarGrow, LiveSparkline } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const TREND = [{ d: "Ma", v: 3 }, { d: "Di", v: 5 }, { d: "Wo", v: 4 }, { d: "Do", v: 7 }, { d: "Vr", v: 6 }, { d: "Za", v: 8 }, { d: "Zo", v: 9 }];
const INSIGHTS = [
  { id: 1, title: "Je energie daalt na 15:00", conf: 88, text: "Plan zware taken vóór de middag en bewaar de late middag voor routinewerk.", c: URG },
  { id: 2, title: "Persoonlijke tijd onder druk", conf: 74, text: "Deze week is beschikbare tijd 12% lager door late afspraken.", c: SAND },
  { id: 3, title: "Concept Brons vordert snel", conf: 91, text: "Project ligt 2 dagen voor op schema — overweeg een extra reviewmoment.", c: OLIVE },
  { id: 4, title: "Contact met T. Bakker verkoelt", conf: 62, text: "Geen contact in 18 dagen. Een kort bericht helpt.", c: DARK },
];

export default function InsightsPreview() {
  const [open, setOpen] = useState(1);
  return (
    <ModuleShell index="05" section="INSIGHTS" statement={`${INSIGHTS.length} INZICHTEN`} kicker="GIULIA · GENEREERT"
      context={[
        { label: "DEZE WEEK", text: `${INSIGHTS.length} inzichten uit FOCUS, LIFE en SELF.` },
        { label: "GEM. ZEKERHEID", text: `${Math.round(INSIGHTS.reduce((s, i) => s + i.conf, 0) / INSIGHTS.length)}% gemiddeld.` },
        { label: "ACTIE", text: "Klik een inzicht om uit te klappen." },
      ]}
      actions={[{ label: "Generate More", primary: true }, { label: "Share" }, { label: "Archive" }, { label: "Open Insights" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-3">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">INSIGHTS TREND</p>
            <div className="h-32"><ResponsiveContainer width="100%" height="100%"><AreaChart data={TREND}><defs><linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SAND} stopOpacity={0.6} /><stop offset="100%" stopColor={SAND} stopOpacity={0} /></linearGradient></defs><XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} /><Area type="monotone" dataKey="v" stroke={SAND} strokeWidth={2} fill="url(#ig)" isAnimationActive animationDuration={1200} /></AreaChart></ResponsiveContainer></div>
          </div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">NIEUWE INZICHTEN · LIVE</p>
            <LiveSparkline color={URG} max={5} intervalMs={2000} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">KLIK OM UIT TE KLAPPEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {INSIGHTS.map(ins => (
              <motion.div key={ins.id} layout className="rounded-2xl border border-marble/20 bg-marble/5 overflow-hidden">
                <button onClick={() => setOpen(open === ins.id ? null : ins.id)} className="w-full flex items-center gap-3 px-4 py-3 text-left">
                  <span className="w-1.5 h-10 rounded-full shrink-0" style={{ background: ins.c }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-storm truncate">{ins.title}</p>
                    <div className="mt-1.5 max-w-[180px]"><BarGrow value={ins.conf} max={100} color={ins.c} height={5} /></div>
                  </div>
                  <span className="text-[10px] text-storm/50 tabular-nums shrink-0">{ins.conf}%</span>
                </button>
                {open === ins.id && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 pb-4 pl-9 text-storm/70 text-sm leading-relaxed">{ins.text}</motion.p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}