import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";
import { AnimatedRing, PulseWave } from "@/components/modules/viz";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const AGENTS = [
  { id: 1, name: "Focus Agent", role: "Taken & planning", status: "working", task: "Herschikt je middag na late afspraak", c: SAND },
  { id: 2, name: "Life Agent", role: "Sociaal & huishouden", status: "idle", task: "Staat klaar", c: OLIVE },
  { id: 3, name: "Self Agent", role: "State & rust", status: "working", task: "Stelt rust voor na lage energie", c: DARK },
  { id: 4, name: "Scheduler", role: "Agenda-balans", status: "idle", task: "Staat klaar", c: SAND },
  { id: 5, name: "Memory Keeper", role: "Context & herinnering", status: "standby", task: "Bewaart 3 nieuwe contexten", c: URG },
];
const label = { working: "WERKT", idle: "KLAAR", standby: "STANDBY" };

export default function AgentsPreview() {
  const [agents, setAgents] = useState(AGENTS);
  const active = agents.filter(a => a.status === "working").length;
  const toggle = (id) => setAgents(as => as.map(a => a.id === id ? { ...a, status: a.status === "working" ? "idle" : "working" } : a));
  return (
    <ModuleShell index="02" section="AGENTS" statement={`${active} ACTIEF`} kicker="GIULIA · INTELLIGENTIELAAG"
      context={[
        { label: "ACTIEF", text: `${active} agents werken nu voor je.` },
        { label: "KLAAR", text: `${agents.filter(a => a.status === "idle").length} agents in stand-by.` },
        { label: "DOEL", text: "Klik een agent om in/uit te schakelen." },
      ]}
      actions={[{ label: "Run All", primary: true }, { label: "Pause" }, { label: "Configure" }, { label: "Open Agents" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 h-full overflow-hidden">
        <div className="flex flex-col gap-6 overflow-auto pr-1">
          <div className="flex flex-col items-center"><AnimatedRing pct={Math.round(active / agents.length * 100)} size={180} color={URG} label={`${active}/${agents.length}`} sub="ACTIEF" /></div>
          <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">DENKEN · LIVE</p>
            <PulseWave color={SAND} bars={22} height={40} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">AGENTEN · KLIK OM TE WISSELEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {agents.map(a => (
              <button key={a.id} onClick={() => toggle(a.id)} className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${a.status === "working" ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                <span className="relative w-10 h-10 rounded-full bg-plum/40 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-storm" />
                  {a.status === "working" && <motion.span className="absolute inset-0 rounded-full border-2 border-urgent" animate={{ opacity: [0.8, 0, 0.8] }} transition={{ duration: 1.6, repeat: Infinity }} />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-storm">{a.name}</p>
                  <p className="text-[10px] text-storm/50 truncate">{a.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-[10px] tracking-wider ${a.status === "working" ? "text-urgent" : "text-storm/50"}`}>{label[a.status]}</p>
                  <p className="text-[10px] text-storm/45 mt-0.5 max-w-[160px]">{a.task}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}