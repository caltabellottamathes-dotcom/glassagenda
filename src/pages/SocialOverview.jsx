import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Headline, Divider, Badge, PISTACHIO, OLIVE, URG, INK } from "@/components/goodmorning/viz";
import { StateIndicator, ActivityWeek, BaselineCompare, SpaceTimeline, PeopleCard, UpcomingItem, OpportunityCard, ChangeRow } from "@/components/social/viz";

const ACTIVITY = [
  { intensity: 3, planned: 2, spontaneous: 1, meaningful: 1 },
  { intensity: 5, planned: 3, spontaneous: 2, meaningful: 1 },
  { intensity: 2, planned: 1, spontaneous: 1, meaningful: 0 },
  { intensity: 7, planned: 4, spontaneous: 3, meaningful: 2 },
  { intensity: 3, planned: 2, spontaneous: 1, meaningful: 1 },
  { intensity: 9, planned: 5, spontaneous: 4, meaningful: 2 },
  { intensity: 1, planned: 0, spontaneous: 1, meaningful: 0 },
];
const SPACE = [
  { time: "09", label: "WORK", type: "work", span: 3 },
  { time: "12", label: "FREE", type: "free", span: 2 },
  { time: "14", label: "WORK", type: "work", span: 3 },
  { time: "17", label: "FREE", type: "free", span: 2 },
  { time: "19", label: "SOCIAL", type: "social", span: 3 },
  { time: "22", label: "RECOVERY", type: "recovery", span: 2 },
];
const PEOPLE = [
  { id: 1, name: "Sophie", state: "CLOSE", lastContact: "4 days ago", change: "More active than usual" },
  { id: 2, name: "Deb", state: "ACTIVE", lastContact: "9 days ago", change: null },
  { id: 3, name: "Thomas", state: "QUIETER", lastContact: "24 days ago", change: "Quieter than usual" },
  { id: 4, name: "Lisa", state: "NEW", lastContact: "2 days ago", change: "New relationship activity" },
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
const QUICK = ["Add person", "Add Social Moment", "Create intention", "Create SocialPlan", "Add Personal Time", "Open relationship", "Open invitation"];

function Section({ n, title, right, children }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] tabular-nums" style={{ color: OLIVE }}>{n}</span>
          <h3 className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: PISTACHIO }}>{title}</h3>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

export default function SocialOverview() {
  const [action, setAction] = useState(null);
  const [value, setValue] = useState("");

  const open = (a) => { setAction(a); setValue(""); };
  const close = () => setAction(null);

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative" style={{ background: "radial-gradient(circle at 20% 8%, #595f34 0%, #43471f 42%, #2D2D23 100%)" }}>
      <div className="absolute inset-0 backdrop-blur-2xl" style={{ background: "rgba(216,218,179,0.035)" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 h-full flex flex-col">
        <Headline
          kicker="01 — OVERVIEW"
          title="THE WHOLE SOCIAL SYSTEM"
          right={<span className="px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase" style={{ color: "#d8dab3", border: "1px solid rgba(216,218,179,0.25)" }}>CONNECTED</span>}
        />
        <Divider className="mt-5 mb-6" />
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 pb-4 space-y-8" style={{ scrollbarWidth: "thin" }}>
          <Section n="01.1" title="SOCIAL STATE">
            <StateIndicator state="CONNECTED" moments={5} plans={3} invitations={1} />
          </Section>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <Section n="01.2" title="SOCIAL ACTIVITY" right={<span className="text-[10px] tracking-widest uppercase" style={{ color: OLIVE }}>This week</span>}>
                <ActivityWeek data={ACTIVITY} />
              </Section>
            </div>
            <div className="col-span-4">
              <Section n="01.3" title="PERSONAL BASELINE">
                <BaselineCompare current={80} baseline={60} label="MORE ACTIVE THAN USUAL" />
              </Section>
            </div>
          </div>

          <Section n="01.4" title="SOCIAL SPACE" right={<span className="text-[10px] tracking-widest uppercase" style={{ color: OLIVE }}>Today</span>}>
            <SpaceTimeline blocks={SPACE} />
          </Section>

          <Section n="01.5" title="IMPORTANT PEOPLE">
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
              {PEOPLE.map((p) => <PeopleCard key={p.id} {...p} onClick={() => {}} />)}
            </div>
          </Section>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <Section n="01.6" title="UPCOMING SOCIAL">
                <div>
                  {UPCOMING.map((u, i) => <UpcomingItem key={i} {...u} />)}
                </div>
              </Section>
            </div>
            <div className="col-span-5">
              <Section n="01.7" title="OPPORTUNITIES">
                <div className="space-y-3">
                  {OPPS.map((o, i) => <OpportunityCard key={i} {...o} />)}
                </div>
              </Section>
            </div>
          </div>

          <Section n="01.8" title="NOTABLE CHANGES">
            <div>{CHANGES.map((c, i) => <ChangeRow key={i} {...c} />)}</div>
          </Section>

          <Section n="01.9" title="QUICK MANAGEMENT">
            <div className="flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button key={q} onClick={() => open(q)} className="px-4 py-2.5 rounded-full text-[11px] tracking-wider uppercase font-semibold transition-all hover:brightness-110 active:scale-95" style={{ background: "rgba(216,218,179,0.10)", color: PISTACHIO, border: "1px solid rgba(216,218,179,0.2)" }}>
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" style={{ color: URG }} />{q}</span>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <AnimatePresence>
        {action && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex items-center justify-center" style={{ background: "rgba(45,45,35,0.6)", backdropFilter: "blur(6px)" }} onClick={close}>
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md mx-6 rounded-2xl p-6" style={{ background: "#2D2D23", border: "1px solid rgba(216,218,179,0.2)" }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold" style={{ color: "#f4f4f0" }}>{action}</h4>
                <button onClick={close} style={{ color: "rgba(216,218,179,0.5)" }}><X className="w-4 h-4" /></button>
              </div>
              <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder={action.includes("person") ? "Name" : action.includes("intention") ? "Intention" : "Title"} className="w-full rounded-lg px-3 py-2.5 text-sm outline-none mb-4" style={{ background: "rgba(89,95,52,0.4)", border: "1px solid rgba(216,218,179,0.18)", color: PISTACHIO, colorScheme: "dark" }} />
              <div className="flex justify-end gap-3">
                <button onClick={close} className="px-4 py-2 rounded-full text-[11px] tracking-wider uppercase" style={{ color: "rgba(216,218,179,0.7)" }}>Cancel</button>
                <button onClick={close} className="px-5 py-2 rounded-full text-[11px] tracking-wider uppercase font-bold" style={{ background: URG, color: INK }}>Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}