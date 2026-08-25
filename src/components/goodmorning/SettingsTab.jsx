import React, { useState } from "react";
import { Sunrise, BellRing, Volume2, Mic, Zap, Sparkles } from "lucide-react";
import { Ring, Headline, PriorityBar, ContentBlock, StatusItem, FooterButtons, Divider, Toggle, Chip, Stepper, Segmented, PISTACHIO } from "./viz";

const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export default function SettingsTab() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [days, setDays] = useState([true, true, true, true, true, false, false]);
  const [style, setStyle] = useState("Gentle");
  const [gradVol, setGradVol] = useState(true);
  const [snoozeInt, setSnoozeInt] = useState(5);
  const [maxSnooze, setMaxSnooze] = useState(3);
  const [voiceGuide, setVoiceGuide] = useState(true);
  const [voiceRec, setVoiceRec] = useState(true);
  const [adaptive, setAdaptive] = useState(true);
  const [tight, setTight] = useState("Skip optional");
  const [skipRule, setSkipRule] = useState("Laatste eerst");
  const [onReady, setOnReady] = useState("Morning Briefing");
  const [autoBrief, setAutoBrief] = useState(true);

  const toggleDay = (i) => setDays((d) => d.map((x, j) => (j === i ? !x : x)));

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Headline
        kicker="CONFIGURATIE"
        title="WEKKER"
        right={<span className="px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase" style={{ color: "#d8dab3", border: "1px solid rgba(216,218,179,0.25)" }}>{wakeTime}</span>}
      />
      <Divider className="my-5" />
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-10 overflow-hidden">
        <div className="col-span-4 flex flex-col gap-7 overflow-hidden">
          <div className="flex flex-col items-center">
            <Ring pct={85} size={150} stroke={6}>
              <span className="text-2xl font-bold tabular-nums leading-none" style={{ color: "#f4f4f0" }}>{wakeTime}</span>
              <span className="text-[10px] tracking-[0.3em] mt-1.5" style={{ color: "#94925d" }}>WEKTIJD</span>
            </Ring>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: "#94925d" }}>{days.filter(Boolean).length} dagen actief</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#94925d" }}>Onderdelen</p>
            <div className="space-y-2.5">
              <PriorityBar label="WAKE" count={4} max={4} />
              <PriorityBar label="SNOOZE" count={2} max={4} color="#94925d" />
              <PriorityBar label="VOICE" count={2} max={4} color="#94925d" />
              <PriorityBar label="ADAPTIEF" count={3} max={4} />
            </div>
          </div>
        </div>

        <div className="col-span-8 overflow-hidden flex flex-col">
          <ContentBlock badge="WAKE" badgeTone="olive" label="WEKTIJD" heading="Hoe word je wakker">
            <div className="flex items-center gap-3 mb-3">
              <Sunrise className="w-4 h-4" style={{ color: "#94925d" }} />
              <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="rounded-lg px-3 py-1.5 text-sm font-bold tabular-nums outline-none" style={{ background: "rgba(89,95,52,0.35)", border: "1px solid rgba(216,218,179,0.18)", color: PISTACHIO, colorScheme: "dark" }} />
              <div className="flex items-center gap-2 ml-auto"><span className="text-[10px] tracking-wider uppercase" style={{ color: "rgba(216,218,179,0.5)" }}>Gradual volume</span><Toggle checked={gradVol} onChange={setGradVol} /></div>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {DAYS.map((d, i) => <Chip key={d} active={days[i]} onClick={() => toggleDay(i)}>{d}</Chip>)}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-wider uppercase" style={{ color: "rgba(216,218,179,0.5)" }}>Style</span>
              <Segmented options={["Gentle", "Energizing", "Sunrise"]} value={style} onChange={setStyle} />
            </div>
          </ContentBlock>

          <ContentBlock badge="SNOOZE" badgeTone="earth" label="SNOOZE & VOICE" heading="Snooze en stem">
            <div className="flex items-center gap-3 mb-2.5">
              <BellRing className="w-4 h-4" style={{ color: "#94925d" }} />
              <span className="text-xs" style={{ color: "rgba(216,218,179,0.7)" }}>Interval</span>
              <Stepper value={snoozeInt} min={1} max={15} suffix="m" onChange={setSnoozeInt} />
              <span className="text-xs ml-2" style={{ color: "rgba(216,218,179,0.7)" }}>Max</span>
              <Stepper value={maxSnooze} min={0} max={10} onChange={setMaxSnooze} />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2"><Volume2 className="w-4 h-4" style={{ color: "#94925d" }} /><span className="text-xs" style={{ color: "rgba(216,218,179,0.7)" }}>Voice guidance</span><Toggle checked={voiceGuide} onChange={setVoiceGuide} /></div>
              <div className="flex items-center gap-2"><Mic className="w-4 h-4" style={{ color: "#94925d" }} /><span className="text-xs" style={{ color: "rgba(216,218,179,0.7)" }}>Recognition</span><Toggle checked={voiceRec} onChange={setVoiceRec} /></div>
            </div>
          </ContentBlock>

          <ContentBlock badge="ADAPTIEF" badgeTone="pistachio" label="RUNNING TIGHT" heading="Adaptief gedrag">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4" style={{ color: "#94925d" }} />
              <span className="text-xs" style={{ color: "rgba(216,218,179,0.7)" }}>Adaptive routine</span>
              <Toggle checked={adaptive} onChange={setAdaptive} />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] tracking-wider uppercase" style={{ color: "rgba(216,218,179,0.5)" }}>Running tight</span>
              <Segmented options={["Skip optional", "Compress", "Alert"]} value={tight} onChange={setTight} />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] tracking-wider uppercase mr-1" style={{ color: "rgba(216,218,179,0.5)" }}>Skip-regel</span>
              {["Laatste eerst", "Langste eerst", "Minste impact"].map((r) => <Chip key={r} active={skipRule === r} onClick={() => setSkipRule(r)}>{r}</Chip>)}
            </div>
          </ContentBlock>

          <ContentBlock badge="READY" badgeTone="olive" label="ON READY" heading="Wanneer je ready bent">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: "#94925d" }} />
              <Segmented options={["Morning Briefing", "Dashboard", "Focus mode"]} value={onReady} onChange={setOnReady} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "rgba(216,218,179,0.7)" }}>Automatisch naar Morning Briefing</span>
              <Toggle checked={autoBrief} onChange={setAutoBrief} />
            </div>
          </ContentBlock>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-3 gap-8">
        <StatusItem n={1} label="WEKTIJD" text={`${wakeTime} · ${days.filter(Boolean)} dagen actief.`} />
        <StatusItem n={2} label="ADAPTIEF" text="Running tight slaat optionele stappen over." />
        <StatusItem n={3} label="ACTIE" text="Sla op om toe te passen op de Wake Experience." />
      </div>
      <div className="flex justify-end mt-4">
        <FooterButtons primary="SAVE CHANGES" ghost="RESET" />
      </div>
    </div>
  );
}