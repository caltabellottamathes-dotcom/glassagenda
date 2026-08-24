import React, { useState } from "react";
import { Sunrise, BellRing, Volume2, Mic, Footprints, Link2, Zap, Check, Clock, Sparkles } from "lucide-react";
import { Toggle, Chip, Stepper, Segmented, Divider, FooterAction, PISTACHIO, OLIVE, EARTH, URGENT } from "./viz";

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
  const [adaptive, setAdaptive] = useState(true);
  const [tight, setTight] = useState("Skip optional");
  const [onReady, setOnReady] = useState("Briefing");
  const [autoBrief, setAutoBrief] = useState(true);

  const toggleDay = (i) => setDays((d) => d.map((x, j) => (j === i ? !x : x)));

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-3.5">
        {/* Wektijd */}
        <Row icon={Sunrise} label="Wektijd">
          <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-storm text-base font-bold tabular-nums outline-none focus:border-[#d8dab3]" />
          <div className="flex items-center gap-2"><span className="text-storm/45 text-[10px]">Smart wake</span><Stepper value={10} min={0} max={30} suffix="m" onChange={() => {}} /></div>
        </Row>

        <Divider />

        {/* Actieve dagen */}
        <Row icon={Clock} label="Actieve dagen">
          <div className="flex gap-1 flex-wrap">
            {DAYS.map((d, i) => <Chip key={d} active={days[i]} onClick={() => toggleDay(i)}>{d}</Chip>)}
          </div>
        </Row>

        <Divider />

        {/* Wake style + geluid */}
        <Row icon={Volume2} label="Wake style">
          <Segmented options={["Gentle", "Energizing", "Sunrise"]} value={style} onChange={setStyle} />
          <div className="flex items-center justify-between mt-1">
            <span className="text-storm/45 text-[10px]">Geluid</span>
            <div className="flex gap-1 flex-wrap">{["Birds", "Tides", "Chimes", "Drone"].map((s) => <Chip key={s} active={wakeSound === s} onClick={() => setWakeSound(s)}>{s}</Chip>)}</div>
          </div>
          <div className="flex items-center justify-between mt-1"><span className="text-storm/45 text-[10px]">Gradual volume</span><Toggle checked={gradVol} onChange={setGradVol} /></div>
        </Row>

        <Divider />

        {/* Snooze */}
        <Row icon={BellRing} label="Snooze">
          <div className="flex items-center gap-2"><span className="text-storm/45 text-[10px]">Interval</span><Stepper value={snoozeInt} min={1} max={15} suffix="m" onChange={setSnoozeInt} /></div>
          <div className="flex items-center gap-2"><span className="text-storm/45 text-[10px]">Max snoozes</span><Stepper value={maxSnooze} min={0} max={10} onChange={setMaxSnooze} /></div>
        </Row>

        <Divider />

        {/* Voice */}
        <Row icon={Mic} label="Voice">
          <div className="flex items-center justify-between"><span className="text-storm/65 text-[11px]">Voice guidance</span><Toggle checked={voiceGuide} onChange={setVoiceGuide} /></div>
          <div className="flex items-center justify-between"><span className="text-storm/65 text-[11px]">Voice recognition</span><Toggle checked={voiceRec} onChange={setVoiceRec} /></div>
        </Row>

        <Divider />

        {/* Get Up */}
        <Row icon={Footprints} label="Get Up">
          <div className="flex items-center gap-2"><span className="text-storm/45 text-[10px]">Grace</span><Stepper value={grace} min={0} max={10} suffix="m" onChange={setGrace} /></div>
          <div className="flex items-center gap-2"><span className="text-storm/45 text-[10px]">Force up na</span><Stepper value={forceUp} min={2} max={20} suffix="m" onChange={setForceUp} /></div>
        </Row>

        <Divider />

        {/* Adaptief */}
        <Row icon={Zap} label="Adaptief">
          <div className="flex items-center justify-between"><span className="text-storm/65 text-[11px]">Adaptive routine</span><Toggle checked={adaptive} onChange={setAdaptive} /></div>
          <div className="flex items-center justify-between mt-1"><span className="text-storm/45 text-[10px]">Running tight</span><Segmented options={["Skip optional", "Compress", "Alert"]} value={tight} onChange={setTight} /></div>
        </Row>

        <Divider />

        {/* On Ready */}
        <Row icon={Sparkles} label="On Ready">
          <div className="flex items-center justify-between"><span className="text-storm/45 text-[10px]">Wanneer Ready</span><Segmented options={["Briefing", "Dashboard", "Focus"]} value={onReady} onChange={setOnReady} /></div>
          <div className="flex items-center justify-between mt-1"><span className="text-storm/65 text-[11px]">Auto naar Briefing</span><Toggle checked={autoBrief} onChange={setAutoBrief} /></div>
        </Row>
      </div>

      <Divider className="my-3" />
      <FooterAction label="Save Changes" />
    </div>
  );
}

function Row({ icon: Icon, label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3.5 h-3.5 text-[#94925d]" />
        <span className="text-storm/60 text-[9px] uppercase tracking-[0.22em] font-semibold">{label}</span>
      </div>
      <div className="pl-5 space-y-1.5">{children}</div>
    </div>
  );
}