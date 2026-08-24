import React, { useState } from "react";
import { Sunrise, BellRing, Volume2, Mic, Footprints, Link2, Zap, Check, Clock, CalendarDays, Sparkles } from "lucide-react";
import { Toggle, Chip, Stepper, Segmented, FooterAction, Label, CARD, URG, OLIVE } from "./viz";

const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export default function SettingsTab() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [days, setDays] = useState([true, true, true, true, true, false, false]);
  const [style, setStyle] = useState("Gentle");
  const [snoozeInt, setSnoozeInt] = useState(5);
  const [maxSnooze, setMaxSnooze] = useState(3);
  const [voiceGuide, setVoiceGuide] = useState(true);
  const [voiceRec, setVoiceRec] = useState(true);
  const [gradVol, setGradVol] = useState(true);
  const [wakeSound, setWakeSound] = useState("Birds");
  const [grace, setGrace] = useState(2);
  const [forceUp, setForceUp] = useState(8);
  const [routine, setRoutine] = useState("Standaard ochtend");
  const [adaptive, setAdaptive] = useState(true);
  const [tight, setTight] = useState("Skip optional");
  const [skipRule, setSkipRule] = useState("Laatste eerst");
  const [onReady, setOnReady] = useState("Morning Briefing");
  const [autoBrief, setAutoBrief] = useState(true);

  const toggleDay = (i) => setDays((d) => d.map((x, j) => (j === i ? !x : x)));

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3 flex-1 min-h-0 content-start">
        {/* Wektijd */}
        <div className={CARD}>
          <Label n={1}>Wektijd</Label>
          <div className="flex items-center gap-3">
            <Sunrise className="w-5 h-5 text-urgent" />
            <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="bg-plum/50 border border-marble/25 rounded-lg px-3 py-1.5 text-storm text-lg font-bold tabular-nums outline-none focus:border-urgent" />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-storm/60 text-[11px]">Smart wake window</span>
            <Stepper value={10} min={0} max={30} suffix="m" onChange={() => {}} />
          </div>
        </div>

        {/* Actieve dagen */}
        <div className={CARD}>
          <Label n={2}>Actieve dagen</Label>
          <div className="flex gap-1.5 flex-wrap">
            {DAYS.map((d, i) => (
              <Chip key={d} active={days[i]} onClick={() => toggleDay(i)}>{d}</Chip>
            ))}
          </div>
          <p className="text-storm/50 text-[10px] mt-3">{days.filter(Boolean).length} dagen actief</p>
        </div>

        {/* Wake style */}
        <div className={CARD}>
          <Label n={3}>Wake style</Label>
          <Segmented options={["Gentle", "Energizing", "Sunrise"]} value={style} onChange={setStyle} />
          <div className="flex items-center justify-between mt-3">
            <span className="text-storm/60 text-[11px]">Gradual volume</span>
            <Toggle checked={gradVol} onChange={setGradVol} />
          </div>
        </div>

        {/* Snooze */}
        <div className={CARD}>
          <Label n={4}>Snooze</Label>
          <div className="flex items-center gap-3 mb-3">
            <BellRing className="w-5 h-5 text-urgent" />
            <span className="text-storm/70 text-xs">Interval</span>
            <Stepper value={snoozeInt} min={1} max={15} suffix="m" onChange={setSnoozeInt} />
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-urgent" />
            <span className="text-storm/70 text-xs">Max snoozes</span>
            <Stepper value={maxSnooze} min={0} max={10} onChange={setMaxSnooze} />
          </div>
        </div>

        {/* Voice */}
        <div className={CARD}>
          <Label n={5}>Voice</Label>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Volume2 className="w-4 h-4 text-urgent" /><span className="text-storm/70 text-xs">Voice guidance</span></div>
            <Toggle checked={voiceGuide} onChange={setVoiceGuide} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Mic className="w-4 h-4 text-urgent" /><span className="text-storm/70 text-xs">Voice recognition</span></div>
            <Toggle checked={voiceRec} onChange={setVoiceRec} />
          </div>
        </div>

        {/* Wake fase + geluid */}
        <div className={CARD}>
          <Label n={6}>Wake fase</Label>
          <p className="text-storm/60 text-[11px] mb-2">Wake geluid</p>
          <div className="flex gap-1.5 flex-wrap">
            {["Birds", "Tides", "Chimes", "Drone"].map((s) => (
              <Chip key={s} active={wakeSound === s} onClick={() => setWakeSound(s)}>{s}</Chip>
            ))}
          </div>
        </div>

        {/* Get Up */}
        <div className={CARD}>
          <Label n={7}>Get Up</Label>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Footprints className="w-4 h-4 text-urgent" /><span className="text-storm/70 text-xs">Grace periode</span></div>
            <Stepper value={grace} min={0} max={10} suffix="m" onChange={setGrace} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-storm/70 text-xs">Force up na</span>
            <Stepper value={forceUp} min={2} max={20} suffix="m" onChange={setForceUp} />
          </div>
        </div>

        {/* Gekoppelde routine */}
        <div className={CARD}>
          <Label n={8}>Gekoppelde routine</Label>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-urgent" />
            <select value={routine} onChange={(e) => setRoutine(e.target.value)} className="bg-plum/50 border border-marble/25 rounded-lg px-3 py-1.5 text-storm text-xs outline-none focus:border-urgent flex-1">
              <option>Standaard ochtend</option>
              <option>Lichte ochtend</option>
              <option>Weekend ochtend</option>
            </select>
          </div>
        </div>

        {/* Adaptief + running tight */}
        <div className={CARD}>
          <Label n={9}>Adaptief</Label>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-urgent" /><span className="text-storm/70 text-xs">Adaptive routine</span></div>
            <Toggle checked={adaptive} onChange={setAdaptive} />
          </div>
          <p className="text-storm/60 text-[10px] mb-1.5">Running tight gedrag</p>
          <Segmented options={["Skip optional", "Compress", "Alert"]} value={tight} onChange={setTight} />
        </div>

        {/* On Ready */}
        <div className={CARD + " col-span-2"}>
          <Label n={10}>On Ready</Label>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-4 h-4 text-urgent" />
            <span className="text-storm/70 text-xs">Wanneer Ready</span>
            <Segmented options={["Morning Briefing", "Dashboard", "Focus mode"]} value={onReady} onChange={setOnReady} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-urgent" /><span className="text-storm/70 text-xs">Automatisch naar Morning Briefing</span></div>
            <Toggle checked={autoBrief} onChange={setAutoBrief} />
          </div>
        </div>

        {/* Skip regel */}
        <div className={CARD}>
          <Label n={11}>Skip-regel optioneel</Label>
          <div className="flex gap-1.5 flex-wrap">
            {["Laatste eerst", "Langste eerst", "Minste impact"].map((r) => (
              <Chip key={r} active={skipRule === r} onClick={() => setSkipRule(r)}>{r}</Chip>
            ))}
          </div>
        </div>
      </div>

      <FooterAction label="Save Changes" />
    </div>
  );
}