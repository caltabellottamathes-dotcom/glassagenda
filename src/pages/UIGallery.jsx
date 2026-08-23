import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Surfaces from "@/components/gallery/Surfaces";
import Rings from "@/components/gallery/Rings";
import Charts from "@/components/gallery/Charts";
import Infographics from "@/components/gallery/Infographics";
import NewElements from "@/components/gallery/NewElements";
import Animated from "@/components/gallery/Animated";
import Live from "@/components/gallery/Live";
import BarsDiagrams from "@/components/gallery/BarsDiagrams";
import Planning from "@/components/gallery/Planning";
import AudioReactive from "@/components/gallery/AudioReactive";

const SECTIONS = [
  { id: "surfaces", label: "Surfaces & Typografie" },
  { id: "rings", label: "Ringen & Progress" },
  { id: "charts", label: "Charts & Sparklines" },
  { id: "infographics", label: "Infographics" },
  { id: "new", label: "Nieuwe Elementen" },
  { id: "animated", label: "Geanimeerd" },
  { id: "live", label: "Live" },
  { id: "bars", label: "Staven & Diagrammen" },
  { id: "planning", label: "Planning & Tijd" },
  { id: "audio", label: "Audio-Reactief" },
];

export default function UIGallery() {
  return (
    <div className="min-h-screen w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.22) 0%, rgba(242,242,240,0.10) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-8 py-8">
        <div className="rounded-[28px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="text-storm/10 text-6xl font-bold leading-none tabular-nums select-none">UI</span>
              <div>
                <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight">UI Gallery</h1>
                <p className="text-storm/50 text-[11px] tracking-[0.25em] uppercase mt-1">Visuele bibliotheek · 132 elementen</p>
              </div>
            </div>
            <Link to="/" className="shrink-0 text-storm/60 hover:text-storm text-sm flex items-center gap-1.5 pt-2"><ArrowLeft className="w-4 h-4" /> Home</Link>
          </div>

          <nav className="flex flex-wrap gap-2 mt-6">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="text-[10px] px-3 py-1.5 rounded-full border border-storm/20 bg-marble/5 text-storm/70 tracking-wider uppercase hover:bg-urgent hover:text-plum hover:border-urgent transition-colors">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-16">
            <Surfaces />
            <Rings />
            <Charts />
            <Infographics />
            <NewElements />
            <Animated />
            <Live />
            <BarsDiagrams />
            <Planning />
            <AudioReactive />
          </div>

          <div className="h-px bg-marble/20 my-10" />
          <p className="text-storm/40 text-center text-[10px] tracking-[0.25em] uppercase">Einde van de bibliotheek · GIULIA OS Design System</p>
        </div>
      </div>
    </div>
  );
}