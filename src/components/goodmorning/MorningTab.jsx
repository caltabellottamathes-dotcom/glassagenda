import React from "react";
import { HelpCircle } from "lucide-react";
import { Ring, Headline, PriorityBar, ContentBlock, StatusItem, FooterButtons, Divider } from "./viz";

const PHASES = [
  { label: "WAKE", n: 8 },
  { label: "GET UP", n: 4 },
  { label: "ROUTINE", n: 24 },
  { label: "READY", n: 6 },
];
const MAX_PHASE = 24;

export default function MorningTab() {
  const total = 42, target = 35;
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Headline
        kicker="SESSIE · VANDAAG 24 AUG"
        title="GOEDEMORGEN"
        right={
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase" style={{ color: "#d8dab3", border: "1px solid rgba(216,218,179,0.25)" }}>07:42 READY</span>
            <HelpCircle className="w-4 h-4" style={{ color: "#94925d" }} />
          </div>
        }
      />
      <Divider className="my-5" />
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-10 overflow-hidden">
        <div className="col-span-4 flex flex-col gap-7 overflow-hidden">
          <div className="flex flex-col items-center">
            <Ring pct={Math.min(100, (total / target) * 100)} size={150} stroke={6}>
              <span className="text-4xl font-bold tabular-nums leading-none" style={{ color: "#f4f4f0" }}>42</span>
              <span className="text-[10px] tracking-[0.3em] mt-1.5" style={{ color: "#94925d" }}>MIN</span>
            </Ring>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: "#94925d" }}>Opstartduur · doel 35m</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#94925d" }}>Fases</p>
            <div className="space-y-2.5">
              {PHASES.map((p) => <PriorityBar key={p.label} label={p.label} count={p.n} max={MAX_PHASE} />)}
            </div>
          </div>
        </div>
        <div className="col-span-8 overflow-hidden flex flex-col">
          <ContentBlock badge="READY" badgeTone="pistachio" label="07:42 · VANDAAG" heading="Opgestart in 42 minuten" text="Je bent vandaag 7 minuten over je doel van 35 minuten. Wake begon om 07:00, ready om 07:42." tags={["Doel 35m", "+7m", "3× snooze"]} />
          <ContentBlock badge="ROUTINE" badgeTone="olive" label="24 MIN · 6/8 STAPPEN" heading="Routine grotendeels uitgevoerd" text="Stretching en reflectie zijn overgeslagen. De overige zes stappen zijn voltooid binnen de geschatte tijd." tags={["2 overgeslagen", "Adaptief"]} />
          <ContentBlock badge="PATTERN" badgeTone="earth" label="GIULIA INSIGHT" heading="Snooze-patroon herkend" text="Je snoozt gemiddeld 3× per ochtend — zo'n 12 minuten. Op doordeweekse dagen schuift je ready-tijd later." tags={["12 min verspild", "Doordeweeks erger"]} />
        </div>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-3 gap-8">
        <StatusItem n={1} label="DUUR" text="42 minuten opstart vandaag." />
        <StatusItem n={2} label="SNOOZE" text="3× · 12 minuten verspild." />
        <StatusItem n={3} label="ACTIE" text="Open Morning Briefing voor de volle context." />
      </div>
      <div className="flex justify-end mt-4">
        <FooterButtons primary="OPEN MORNING BRIEFING" ghost="BEKIJK HISTORIE" />
      </div>
    </div>
  );
}