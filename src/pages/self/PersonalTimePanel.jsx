import React from "react";
import PanelShell from "@/components/self/PanelShell";

const ROWS = [
  { label: "WORK", cells: 14, tone: "bg-olive", hrs: "8h 24m" },
  { label: "PERSONAL", cells: 4, tone: "bg-plum", hrs: "2h 24m" },
  { label: "APPOINTMENT", cells: 3, tone: "bg-urgent", hrs: "1h 48m" },
  { label: "FREE", cells: 0, tone: "bg-plum/8", hrs: "—" },
  { label: "REST", cells: 0, tone: "bg-plum/8", hrs: "—" },
];

const COMP = [
  { w: 14, c: "bg-olive" },
  { w: 4, c: "bg-plum" },
  { w: 3, c: "bg-urgent" },
  { w: 9, c: "bg-plum/10" },
];

export default function PersonalTimePanel() {
  return (
    <PanelShell
      index="07"
      section="PERSONAL TIME"
      statement="AVAILABLE"
      context={[
        { label: "PROTECTED", text: "Persoonlijke tijd bewust gereserveerd vandaag." },
        { label: "AVAILABLE", text: "Nog vrije ruimte in de late middag en avond." },
        { label: "AT RISK", text: "Persoonlijke tijd mogelijk onder druk door late afspraak." },
      ]}
      actions={[
        { label: "Protect Time", primary: true },
        { label: "Add Rest" },
        { label: "Add Free Time" },
        { label: "Adjust Day" },
        { label: "Open Personal Time" },
      ]}
    >
      <div className="flex items-end gap-6 mb-8">
        <div>
          <p className="text-plum text-7xl sm:text-8xl font-bold tabular-nums leading-none">02:10</p>
          <p className="text-plum text-[11px] mt-3 tracking-[0.25em]">AVAILABLE TODAY</p>
        </div>
        <p className="text-plum/55 text-sm pb-3 max-w-xs leading-relaxed">De dag als één ruimtelijke structuur. Open ruimtes zijn visueel dominant.</p>
      </div>

      <div className="mb-8">
        <p className="text-plum/50 text-[10px] uppercase tracking-[0.25em] mb-3">Day composition</p>
        <div className="flex h-8 rounded-xl overflow-hidden gap-0.5">
          {COMP.map((seg, i) => (
            <div key={i} className={seg.c} style={{ width: `${(seg.w / 30) * 100}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-plum/40 text-[10px] tracking-wider mt-2">
          <span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center gap-5">
            <span className="w-32 text-plum text-sm font-medium tracking-wide">{row.label}</span>
            <div className="flex-1 flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`h-12 flex-1 rounded-md ${i < row.cells ? row.tone : "bg-plum/6 border border-plum/10"}`} />
              ))}
            </div>
            <span className="w-14 text-right text-plum/50 text-xs tabular-nums">{row.hrs}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 mt-6">
        <span className="flex items-center gap-2 text-[10px] tracking-wider text-plum/70"><span className="w-3 h-3 rounded-sm bg-olive"/>WORK</span>
        <span className="flex items-center gap-2 text-[10px] tracking-wider text-plum"><span className="w-3 h-3 rounded-sm bg-plum"/>PERSONAL</span>
        <span className="flex items-center gap-2 text-[10px] tracking-wider text-urgent"><span className="w-3 h-3 rounded-sm bg-urgent"/>APPOINTMENT · AT RISK</span>
        <span className="flex items-center gap-2 text-[10px] tracking-wider text-plum/40"><span className="w-3 h-3 rounded-sm border border-plum/30"/>FREE / REST</span>
      </div>
    </PanelShell>
  );
}