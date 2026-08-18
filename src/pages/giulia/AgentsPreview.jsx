import React, { useState } from "react";
import { motion } from "framer-motion";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", OLIVE = "#d8dab3", URG = "#d5e24a", DARK = "#6b6a4a";
const AGENTS = [
  { id: 1, name: "Focus Agent", role: "Taken & planning", status: "working", task: "Herschikt je middag", c: SAND },
  { id: 2, name: "Life Agent", role: "Sociaal & huishouden", status: "idle", task: "Staat klaar", c: OLIVE },
  { id: 3, name: "Self Agent", role: "State & rust", status: "working", task: "Stelt rust voor", c: DARK },
  { id: 4, name: "Scheduler", role: "Agenda-balans", status: "idle", task: "Staat klaar", c: SAND },
  { id: 5, name: "Memory Keeper", role: "Context & herinnering", status: "standby", task: "Bewaart 3 contexten", c: URG },
];
const label = { working: "WERKT", idle: "KLAAR", standby: "STANDBY" };
const R = 150;
const pos = (i, n) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return { x: Math.cos(a) * R, y: Math.sin(a) * R }; };

export default function AgentsPreview() {
  const [agents, setAgents] = useState(AGENTS);
  const toggle = (id) => setAgents(a => a.map(x => x.id === id ? { ...x, status: x.status === "working" ? "idle" : "working" } : x));
  const active = agents.filter(a => a.status === "working").length;
  return (
    <ModuleShell index="02" section="AGENTS" statement={`${active} ACTIEF`} kicker="GIULIA · CONSTELLATIE"
      context={[
        { label: "NETWERK", text: "Vijf agents verbonden met de kern; werkende agents sturen signalen." },
        { label: "ACTIEF", text: `${active} agents werken nu.` },
        { label: "ACTIE", text: "Klik een knooppunt om aan/uit te schakelen." },
      ]}
      actions={[{ label: "Run All", primary: true }, { label: "Pause" }, { label: "Open Agents" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 h-full overflow-hidden">
        <div className="flex items-center justify-center">
          <svg viewBox="-200 -200 400 400" className="w-full max-w-[440px] aspect-square">
            {agents.map((a, i) => {
              const p = pos(i, agents.length);
              return (
                <g key={a.id} onClick={() => toggle(a.id)} style={{ cursor: "pointer" }}>
                  <line x1="0" y1="0" x2={p.x} y2={p.y} stroke={a.status === "working" ? a.c : "#ffffff10"} strokeWidth={a.status === "working" ? 2 : 1} strokeDasharray="4 6">
                    {a.status === "working" && <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />}
                  </line>
                  {a.status === "working" && (
                    <circle cx={p.x} cy={p.y} r="22" fill="none" stroke={a.c} strokeWidth="1.5" strokeOpacity="0.6">
                      <animate attributeName="r" values="22;32;22" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={p.x} cy={p.y} r="20" fill="#301728" stroke={a.c} strokeWidth="2" strokeOpacity={a.status === "working" ? 1 : 0.4} />
                  <circle cx={p.x} cy={p.y} r="6" fill={a.status === "working" ? a.c : "#ffffff30"}>
                    {a.status === "working" && <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />}
                  </circle>
                  <text x={p.x} y={p.y + 38} textAnchor="middle" fontSize="9" fill="#ffffff99">{a.name.split(" ")[0]}</text>
                </g>
              );
            })}
            <circle r="34" fill="#301728" stroke={URG} strokeWidth="2" />
            <circle r="34" fill="none" stroke={URG} strokeWidth="1.5" strokeOpacity="0.5">
              <animate attributeName="r" values="34;44;34" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="6" textAnchor="middle" fontSize="20" fontWeight="700" fill={URG}>G</text>
          </svg>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">AGENTEN · KLIK OM TE WISSELEN</p>
          <div className="flex-1 overflow-auto pr-1 space-y-2">
            {agents.map(a => (
              <button key={a.id} onClick={() => toggle(a.id)} className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${a.status === "working" ? "border-sand bg-marble/10" : "border-marble/20 bg-marble/5 hover:bg-marble/8"}`}>
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.c }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-storm truncate">{a.name}</p>
                  <p className="text-[10px] text-storm/50 truncate">{a.role}</p>
                </div>
                <span className={`text-[10px] tracking-wider shrink-0 ${a.status === "working" ? "text-urgent" : "text-storm/50"}`}>{label[a.status]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}