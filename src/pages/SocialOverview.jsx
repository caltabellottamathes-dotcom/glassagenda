import React from "react";
import PanelShell from "@/components/self/PanelShell";
import { PulseWave } from "@/components/modules/viz";
import { StateField, MetricTile, ActivityChart, BaselineBlock, SpaceTimeline, PeopleCard, UpcomingItem, OpportunityCard, ChangeRow } from "@/components/social/elements";

const PLUM = "#301728", URG = "#d5e24a", OLIVE = "#d8dab3";

const ARCS = [
  { pct: 80, r: 100, c: PLUM, label: "ACTIVITY" },
  { pct: 60, r: 78, c: URG, label: "BASELINE" },
  { pct: 70, r: 56, c: OLIVE, label: "SPACE" },
];
const METRICS = [
  { v: 5, l: "MEANINGFUL", c: PLUM },
  { v: 3, l: "PLANS", c: URG },
  { v: 1, l: "INVITATIONS", c: OLIVE },
];
const WEEK = [
  { d: "MON", v: 3, m: 1 }, { d: "TUE", v: 5, m: 1 }, { d: "WED", v: 2, m: 0 },
  { d: "THU", v: 7, m: 2 }, { d: "FRI", v: 3, m: 1 }, { d: "SAT", v: 9, m: 2 }, { d: "SUN", v: 1, m: 0 },
];
const SPACE = [
  { t: "09", l: "WORK", s: 3, c: PLUM },
  { t: "12", l: "FREE", s: 2, c: "rgba(216,218,179,0.18)" },
  { t: "14", l: "WORK", s: 3, c: PLUM },
  { t: "17", l: "FREE", s: 2, c: "rgba(216,218,179,0.18)" },
  { t: "19", l: "SOCIAL", s: 3, c: URG },
  { t: "22", l: "RECOVERY", s: 2, c: OLIVE },
];
const PEOPLE = [
  { n: "Sophie", s: "CLOSE", c: OLIVE, days: "4d", change: "More active than usual" },
  { n: "Deb", s: "ACTIVE", c: OLIVE, days: "9d", change: null },
  { n: "Thomas", s: "QUIETER", c: PLUM, days: "24d", change: "Quieter than usual" },
  { n: "Lisa", s: "NEW", c: URG, days: "2d", change: "New relationship activity" },
];
const UPCOMING = [
  { date: "FRI", time: "18:30", type: "Dinner", person: "Sophie", status: "confirmed" },
  { date: "SAT", time: "14:00", type: "Coffee", person: "Deb", status: "planned" },
  { date: "SUN", time: "—", type: "Open", person: "—", status: "proposed" },
];
const OPPS = [
  { title: "Saturday afternoon is open", text: "Sophie hasn't been seen in 24 days. A low-key plan could rebuild momentum.", action: "Plan something" },
  { title: "Wednesday evening has space", text: "You have capacity for one more meaningful moment this week.", action: "Use the space" },
];
const CHANGES = [
  { dir: "up", name: "Sophie", text: "More active than usual" },
  { dir: "down", name: "Thomas", text: "Quieter than usual" },
  { dir: "plus", name: "Lisa", text: "New relationship activity" },
  { dir: "right", name: "Saturday", text: "More social space available" },
];

export default function SocialOverview() {
  return (
    <PanelShell
      index="01"
      section="SOCIAL OVERVIEW"
      statement="CONNECTED"
      context={[
        { label: "WHAT'S COMING UP", text: "Dinner · Sophie · Fri 18:30 (confirmed). Coffee · Deb · Sat 14:00 (planned). Sunday is open." },
        { label: "OPEN OPPORTUNITIES", text: "Saturday afternoon is open and Sophie hasn't been seen in 24 days — a low-key plan could rebuild momentum." },
        { label: "NOTABLE CHANGES", text: "Sophie more active than usual · Thomas quieter · Lisa is new activity · Saturday has more social space." },
      ]}
      actions={[
        { label: "Add Person", primary: true },
        { label: "Add Social Moment" },
        { label: "Create Intention" },
        { label: "Create SocialPlan" },
        { label: "Add Personal Time" },
        { label: "Open Relationship" },
        { label: "Open Invitation" },
      ]}
    >
      <div className="w-full h-full overflow-y-auto pr-1 flex flex-col gap-6 pb-2">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <StateField arcs={ARCS} state="CONNECTED" sub="SOCIAL STATE" />
          <div className="flex-1 w-full grid grid-cols-3 divide-x divide-marble/20 border-y border-marble/20">
            {METRICS.map((m) => <MetricTile key={m.l} {...m} />)}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8"><ActivityChart data={WEEK} /></div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <BaselineBlock current={80} baseline={60} label="MORE ACTIVE THAN USUAL" up />
            <div>
              <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">LIVE SOCIAL PULSE</p>
              <PulseWave color={URG} />
            </div>
          </div>
        </div>

        <SpaceTimeline blocks={SPACE} />

        <div>
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">IMPORTANT PEOPLE</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {PEOPLE.map((p) => <PeopleCard key={p.n} {...p} />)}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">UPCOMING SOCIAL</p>
            <div>{UPCOMING.map((u, i) => <UpcomingItem key={i} {...u} />)}</div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-3">OPPORTUNITIES</p>
            <div className="space-y-3">{OPPS.map((o, i) => <OpportunityCard key={i} {...o} />)}</div>
          </div>
        </div>

        <div>
          <p className="text-storm/50 text-[10px] tracking-[0.25em] mb-2">NOTABLE CHANGES</p>
          <div>{CHANGES.map((c, i) => <ChangeRow key={i} {...c} />)}</div>
        </div>
      </div>
    </PanelShell>
  );
}