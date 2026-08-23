import React from "react";
import { Check, CheckCheck } from "lucide-react";
import { GlassPanel, GlassButton, Divider, SectionHeader, StatusBadge } from "@/components/glass";
import { CountUp } from "@/components/modules/viz";
import { GalleryItem, Section } from "./Gallery";

export default function Surfaces() {
  return (
    <Section id="surfaces" index="01" title="Glass Surfaces & Typografie" desc="Frosted-glass containers, knoppen, regels en het typografische numerale systeem dat door het hele OS loopt.">
      <GalleryItem n={1} title="GlassPanel" desc="Backdrop-blur container met marble-rand.">
        <GlassPanel className="p-4 w-full">
          <p className="text-storm text-xs font-semibold">GlassPanel</p>
          <Divider className="my-2" />
          <p className="text-storm/50 text-[10px]">backdrop-blur-2xl · shadow</p>
        </GlassPanel>
      </GalleryItem>
      <GalleryItem n={2} title="GlassButton" desc="Inkapselbare knop met active-ring.">
        <div className="flex gap-2">
          <GlassButton active>Actief</GlassButton>
          <GlassButton>Normaal</GlassButton>
        </div>
      </GalleryItem>
      <GalleryItem n={3} title="Divider / Graphic Rule" desc="Hairline met plum-accent.">
        <div className="w-full">
          <p className="text-storm/60 text-[10px] mb-2">boven</p>
          <Divider />
          <p className="text-storm/60 text-[10px] mt-2">onder</p>
        </div>
      </GalleryItem>
      <GalleryItem n={4} title="SectionHeader" desc="Genummerde sectiekop.">
        <SectionHeader number="04" title="Projecten" />
      </GalleryItem>
      <GalleryItem n={5} title="StatusBadge" desc="Status-pillen voor voortgang.">
        <div className="flex flex-wrap gap-2 justify-center">
          <StatusBadge status="voltooid" />
          <StatusBadge status="lopend" />
          <StatusBadge status="gepland" />
        </div>
      </GalleryItem>
      <GalleryItem n={6} title="CountUp" desc="Animatie naar doelgetal.">
        <CountUp to={128} duration={1.4} className="text-storm text-5xl font-bold tabular-nums" />
      </GalleryItem>
      <GalleryItem n={7} title="Index Numeral" desc="Oversize ghost-nummer.">
        <span className="text-storm/10 text-7xl font-bold leading-none tabular-nums select-none">07</span>
      </GalleryItem>
      <GalleryItem n={8} title="Online Dot" desc="Aanwezigheidsindicator.">
        <div className="flex items-center gap-3">
          <span className="relative w-10 h-10 rounded-full bg-plum/60" />
          <span className="relative w-10 h-10 rounded-full bg-plum/60">
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-urgent border-2 border-metal" />
          </span>
        </div>
      </GalleryItem>
      <GalleryItem n={9} title="Unread Badge" desc="Urgent teller-pill.">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-plum/60" />
          <span className="text-[10px] px-1.5 min-w-[18px] text-center rounded-full bg-urgent text-plum font-semibold">12</span>
        </div>
      </GalleryItem>
      <GalleryItem n={10} title="Read Receipts" desc="Leesbevestiging-icons.">
        <div className="flex items-center gap-4 text-storm">
          <Check className="w-5 h-5 text-storm/50" />
          <CheckCheck className="w-5 h-5 text-storm/50" />
          <CheckCheck className="w-5 h-5 text-urgent" />
        </div>
      </GalleryItem>
      <GalleryItem n={11} title="Pill Tags" desc="Categorie- en kennischips.">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {["Research 86%", "Brand", "Urgent", "Proces"].map((t, i) => (
            <span key={t} className={`text-[10px] px-2.5 py-1 rounded-full border tracking-wide ${i === 2 ? "bg-urgent text-plum border-urgent font-semibold" : "border-storm/20 text-storm/70"}`}>{t}</span>
          ))}
        </div>
      </GalleryItem>
      <GalleryItem n={12} title="Kicker Label" desc="Uppercase tracking micro-label.">
        <div className="flex flex-col gap-1 text-center">
          <span className="text-urgent text-[9px] px-2 py-0.5 rounded-full border border-urgent/40 tracking-[0.15em] uppercase w-fit">3 aandacht</span>
          <span className="text-storm/45 text-[10px] tracking-[0.25em] uppercase">Sub-kicker</span>
        </div>
      </GalleryItem>
    </Section>
  );
}