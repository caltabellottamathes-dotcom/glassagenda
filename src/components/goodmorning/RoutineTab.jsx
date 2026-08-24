import React from "react";
import { Droplets, Bath, Shirt, Coffee, Sun } from "lucide-react";
import { AnimatedRing } from "@/components/modules/viz";

const panel = "rounded-2xl border border-marble/20 bg-plum/30 p-4 flex flex-col";
const labelCls = "text-storm/40 text-[9px] tracking-[0.2em] uppercase font-semibold";

const STEPS = [
  { n: "01", name: "Water", icon: Droplets, dur: "2 MIN", req: true, voice: true },
  { n: "02", name: "Bathroom", icon: Bath, dur: "8 MIN", req: true, voice: true },
  { n: "03", name: "Dressed", icon: Shirt, dur: "7 MIN", req: true, voice: false },
  { n: "04", name: "Coffee", icon: Coffee, dur: "5 MIN", req: false, voice: true },
  { n: "05", name: "Breakfast", icon: Sun, dur: "10 MIN", req: false, voice: false },
];

function RoutineFlow() {
  return (
    <div className={panel + " justify-center"}>
      <p className={labelCls}>Routine Flow</p>
      <div className="relative mt-6">
        <div className="absolute top-[11px] left-3 right-3 h-px bg-marble/25" />
        <div className="relative flex justify-between">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-marble/40 bg-plum flex items-center justify-center">
                  <Icon className="w-3 h-3 text-storm/70" />
                </div>
                <div className="text-storm/60 text-[9px] tabular-nums font-bold">{s.n}</div>
                <div className="text-storm/40 text-[8px] tracking-widest uppercase">{s.dur}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepCard({ s }) {
  const Icon = s.icon;
  return (
    <div className={`rounded-xl border border-marble/20 bg-metal/40 p-3 flex flex-col gap-1.5 hover:border-urgent/40 transition-colors cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div className="w-7 h-7 rounded-lg bg-plum flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-storm/80" />
        </div>
        <span className="text-storm/30 text-[9px] tabular-nums font-bold">{s.n}</span>
      </div>
      <div className="text-storm text-sm font-bold">{s.name}</div>
      <div className="flex items-center gap-2">
        <span className="text-storm/60 text-[9px] tracking-widest">{s.dur}</span>
        <span className={`text-[8px] px-1.5 py-0.5 rounded-full tracking-widest uppercase font-semibold ${s.req ? "bg-urgent/20 text-urgent" : "bg-marble/10 text-storm/50"}`}>{s.req ? "Required" : "Optional"}</span>
      </div>
      <div className="flex items-center gap-1 mt-0.5">
        <span className={`w-1.5 h-1.5 rounded-full ${s.voice ? "bg-urgent" : "bg-storm/20"}`} />
        <span className="text-storm/40 text-[8px] tracking-widest uppercase">Voice</span>
      </div>
    </div>
  );
}

function StepCards() {
  return (
    <div className={panel + " min-h-0"}>
      <p className={labelCls}>Routine Step Cards</p>
      <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-2 mt-3 min-h-0">
        <StepCard s={STEPS[0]} />
        <StepCard s={STEPS[1]} />
        <StepCard s={STEPS[2]} />
        <StepCard s={STEPS[3]} />
        <div className="col-span-2"><StepCard s={STEPS[4]} /></div>
      </div>
    </div>
  );
}

function TotalDuration() {
  return (
    <div className={panel + " items-center justify-center text-center"}>
      <p className={labelCls + " self-start"}>Total Duration</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <AnimatedRing pct={100} size={120} stroke={9} color="#94925d" label={<span className="text-storm text-2xl font-bold">32<span className="text-sm ml-1">MIN</span></span>} sub="TOTAL ROUTINE" />
        <div className="flex gap-4 text-[9px] tracking-[0.2em] uppercase">
          <div><span className="text-storm font-bold">5</span> <span className="text-storm/40">Steps</span></div>
          <div><span className="text-urgent font-bold">3</span> <span className="text-storm/40">Required</span></div>
        </div>
      </div>
    </div>
  );
}

function Adaptive() {
  return (
    <div className={panel + " justify-center"}>
      <div className="flex items-center justify-between">
        <p className={labelCls}>Adaptive</p>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-urgent/20 text-urgent tracking-widest uppercase font-bold">On</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="text-storm text-sm font-semibold">Running tight</div>
        <p className="text-storm/60 text-xs leading-relaxed">Optional steps may be skipped when your morning is running tight.</p>
      </div>
    </div>
  );
}

export default function RoutineTab() {
  return (
    <div className="grid h-full gap-3" style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "auto 1fr" }}>
      <RoutineFlow />
      <TotalDuration />
      <StepCards />
      <Adaptive />
    </div>
  );
}