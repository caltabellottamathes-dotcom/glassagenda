import React from "react";
import Widget, { GlassStat, MiniRing, MiniLive, MiniPulse, MiniBars, Num } from "@/components/widgets/Widget";

export function ActivityWidget() {
  return (
    <Widget index="01" title="Activity" to="/giulia/activity" seed="giulia-activity" size="strip" tint="linear-gradient(90deg, rgba(48,23,40,0.9), rgba(48,23,40,0.5))">
      <div className="flex items-center gap-3">
        <Num v="24" className="text-3xl" />
        <span className="text-storm/60 text-[10px] leading-tight">events vandaag<br />6 ongelezen</span>
        <div className="ml-auto"><MiniLive color="#d5e24a" w={90} h={26} max={8} /></div>
      </div>
    </Widget>
  );
}

export function AgentsWidget() {
  return (
    <Widget index="02" title="Agents" to="/giulia/agents" seed="giulia-agents" size="sq">
      <div className="relative flex items-center justify-center" style={{ height: 96 }}>
        <svg viewBox="-50 -50 100 100" className="w-full h-full">
          <circle r="7" fill="#d5e24a"><animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite" /></circle>
          {[0, 1, 2, 3, 4].map(i => { const a = (i / 5) * 2 * Math.PI - Math.PI / 2; const x = Math.cos(a) * 32, y = Math.sin(a) * 32; const on = i < 3; return (<g key={i}><line x1="0" y1="0" x2={x} y2={y} stroke={on ? "#94925d" : "#ffffff15"} strokeWidth="1" />{on && <circle cx={x} cy={y} r="9" fill="none" stroke="#d5e24a" strokeOpacity="0.5"><animate attributeName="r" values="7;13;7" dur="2s" repeatCount="indefinite" /></circle>}<circle cx={x} cy={y} r="6" fill="#301728" stroke={on ? "#94925d" : "#ffffff20"} strokeWidth="1.5" /></g>); })}
        </svg>
      </div>
      <p className="text-storm/60 text-[10px] text-center">3/5 agents actief</p>
    </Widget>
  );
}

export function ApprovalsWidget() {
  return (
    <Widget index="03" title="Approvals" to="/approvals" seed="giulia-approvals" size="card" badge="4 wacht">
      <div className="flex flex-col gap-1.5">
        {[["Factuur #204", true], ["Vergaderagenda", false], ["Concept draft", false]].map(([n, u], i) => (
          <div key={i} className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${u ? "border-urgent/40 bg-urgent/10" : "border-white/10 bg-white/5"}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${u ? "bg-urgent" : "bg-sand"}`} />
            <span className="text-storm text-[11px] truncate flex-1">{n}</span>
            <span className="text-storm/40 text-[9px] shrink-0">✓ ✕</span>
          </div>
        ))}
      </div>
    </Widget>
  );
}

export function DayWidget() {
  return (
    <Widget index="04" title="Day" to="/giulia/day" seed="giulia-day" size="tall" tint="linear-gradient(180deg, rgba(48,23,40,0.3), rgba(48,23,40,0.85))">
      <div className="flex flex-col items-center gap-2">
        <svg viewBox="-50 -50 100 100" className="w-full max-w-[120px]">
          <circle r="40" fill="none" stroke="#ffffff15" strokeWidth="8" />
          <circle r="40" fill="none" stroke="#94925d" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(58 / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`} transform="rotate(-90 0 0)" />
          <line x1="0" y1="0" x2="0" y2="-32" stroke="#d5e24a" strokeWidth="2.5" strokeLinecap="round" transform="rotate(150)" />
          <circle r="3" fill="#d5e24a" />
        </svg>
        <span className="text-storm text-lg font-bold tabular-nums">14:00</span>
        <span className="text-storm/60 text-[10px]">Marktanalyse</span>
      </div>
    </Widget>
  );
}

export function InsightsWidget() {
  return (
    <Widget index="05" title="Insights" to="/giulia/insights" seed="giulia-insights" size="wide">
      <div className="flex items-center gap-3">
        <Num v="3" className="text-2xl" suffix=" inzichten" />
        <span className="text-storm/50 text-[10px]">avg 79% zeker</span>
        <div className="ml-auto"><MiniLive color="#94925d" w={100} h={26} max={10} /></div>
      </div>
    </Widget>
  );
}

export function JeDagWidget() {
  return (
    <Widget index="06" title="Je Dag" to="/giulia/jedag" seed="giulia-jedag" size="port">
      <div className="flex flex-col gap-2">
        <span className="text-storm/60 text-[10px] tracking-wider">ENERGIECURVE</span>
        <MiniBars data={[4, 6, 8, 9, 7, 5, 3, 2, 1, 3]} color="#d5e24a" h={36} />
        <GlassStat className="mt-1"><div className="flex justify-between text-[10px]"><span className="text-storm/60">klaar voor de dag</span><span className="text-urgent font-bold">68%</span></div></GlassStat>
      </div>
    </Widget>
  );
}

export function MemoryWidget() {
  return (
    <Widget index="07" title="Memory" to="/giulia/memory" seed="giulia-memory" size="sq">
      <div className="relative flex items-center justify-center" style={{ height: 90 }}>
        <svg viewBox="-50 -50 100 100" className="w-full h-full">
          {Array.from({ length: 26 }).map((_, i) => { const a = (i * 137.5) * Math.PI / 180; const r = 6 + (i % 5) * 8; return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={i % 4 === 0 ? 2 : 1} fill={["#94925d", "#d8dab3", "#d5e24a", "#6b6a4a"][i % 4]}><animate attributeName="opacity" values="1;0.3;1" dur={`${2 + (i % 4)}s`} repeatCount="indefinite" /></circle>; })}
        </svg>
        <span className="absolute text-storm text-xl font-bold tabular-nums">135</span>
      </div>
    </Widget>
  );
}

export function QuestionsWidget() {
  return (
    <Widget index="08" title="Questions" to="/giulia/questions" seed="giulia-questions" size="card">
      <div className="flex flex-col gap-1.5">
        {[["FOCUS", "Hoogste prioriteit?"], ["SELF", "Rust vandaag?"], ["LIFE", "Wie spreken?"]].map(([d, q], i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-sand/20 text-storm shrink-0">{d}</span>
            <span className="text-storm/70 text-[11px] truncate">{q}</span>
          </div>
        ))}
      </div>
      <p className="text-storm/60 text-[10px]">2 open · 2 beantwoord</p>
    </Widget>
  );
}

export function VoiceWidget() {
  return (
    <Widget index="09" title="Voice Call" to="/giulia/voice" seed="giulia-voice" size="sq">
      <div className="flex flex-col items-center gap-2">
        <svg viewBox="-60 -60 120 120" className="w-full max-w-[110px]">
          {[0, 1, 2].map(i => <circle key={i} r="20" fill="none" stroke="#d5e24a" strokeWidth="1.5" strokeOpacity="0.5"><animate attributeName="r" values="18;52;18" dur={`${2.4 + i}s`} repeatCount="indefinite" /><animate attributeName="stroke-opacity" values="0.6;0;0.6" dur={`${2.4 + i}s`} repeatCount="indefinite" /></circle>)}
          <circle r="18" fill="#301728" stroke="#d5e24a" strokeWidth="2" />
          <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d5e24a">G</text>
        </svg>
        <span className="text-storm/60 text-[10px]">verbonden</span>
      </div>
    </Widget>
  );
}

export function ChatWidget() {
  return (
    <Widget index="10" title="Chat" to="/giulia/chat" seed="giulia-chat" size="wide" tint="linear-gradient(90deg, rgba(48,23,40,0.85), rgba(48,23,40,0.55))">
      <GlassStat className="max-w-[80%]"><p className="text-storm text-xs leading-tight">Om 11:00 zit Concept Brons — notities klaar.</p></GlassStat>
      <div className="flex items-center gap-1.5"><span className="flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-storm/50 animate-bounce" /><span className="w-1.5 h-1.5 rounded-full bg-storm/50 animate-bounce" style={{ animationDelay: "0.15s" }} /><span className="w-1.5 h-1.5 rounded-full bg-storm/50 animate-bounce" style={{ animationDelay: "0.3s" }} /></span><span className="text-storm/50 text-[10px]">GIULIA typt</span></div>
    </Widget>
  );
}