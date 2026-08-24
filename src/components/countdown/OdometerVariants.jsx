import React from "react";
import { motion } from "framer-motion";
import { pad } from "./CountdownClocks";

const URG = "#d5e24a", SAND = "#94925d", OLIVE = "#d8dab3";
const CELL_H = 56, CELL_W = 36;

function Digits({ dir, className }) {
  return Array.from({ length: 10 }).map((_, i) => <span key={i} className={className} style={{ [dir === "row" ? "width" : "height"]: dir === "row" ? CELL_W : CELL_H, flex: "0 0 auto" }}>{i}</span>);
}

function Group({ v, Cell, label }) {
  const [a, b] = pad(v);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1"><Cell v={+a} /><Cell v={+b} /></div>
      <span className="text-storm/40 text-[8px] tracking-widest">{label}</span>
    </div>
  );
}

function ClockRow({ d, h, m, Cell }) {
  const sep = <span className="text-storm/30 text-xl pb-4">:</span>;
  return (
    <div className="flex items-center" style={{ gap: 6 }}>
      <Group v={d} Cell={Cell} label="DAG" />
      {sep}
      <Group v={h} Cell={Cell} label="UUR" />
      {sep}
      <Group v={m} Cell={Cell} label="MIN" />
    </div>
  );
}

const spring = { type: "spring", stiffness: 120, damping: 18 };
const bounce = { type: "spring", stiffness: 200, damping: 10 };

/* 1 — Vertical Roll */
const VRoll = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-metal border border-marble/30">
    <motion.div className="flex flex-col" animate={{ y: -v * CELL_H }} transition={spring}>
      <Digits className="flex items-center justify-center text-storm text-2xl font-bold tabular-nums" />
    </motion.div>
  </div>
);
export const VerticalRoll = (p) => <ClockRow {...p} Cell={VRoll} />;

/* 2 — Horizontal Slide */
const HRoll = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-metal border border-marble/30">
    <motion.div className="flex flex-row" animate={{ x: -v * CELL_W }} transition={spring}>
      <Digits dir="row" className="flex items-center justify-center text-storm text-2xl font-bold tabular-nums" />
    </motion.div>
  </div>
);
export const HorizontalSlide = (p) => <ClockRow {...p} Cell={HRoll} />;

/* 3 — Slot Spin */
const SlotCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-plum border-2 border-urgent/60">
    <motion.div className="flex flex-col" animate={{ y: [-200, -v * CELL_H] }} transition={{ type: "spring", stiffness: 40, damping: 10 }}>
      <Digits className="flex items-center justify-center text-urgent text-2xl font-bold tabular-nums" />
    </motion.div>
    <div className="absolute top-0 left-0 right-0 h-2 bg-urgent/30" />
    <div className="absolute bottom-0 left-0 right-0 h-2 bg-urgent/30" />
  </div>
);
export const SlotSpin = (p) => <ClockRow {...p} Cell={SlotCell} />;

/* 4 — Flip Flap */
const FlipCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-metal border border-marble/30">
    <div className="absolute inset-0 flex items-center justify-center text-storm/60 text-2xl font-bold" style={{ clipPath: "inset(0 0 50% 0)" }}>{v}</div>
    <motion.div key={v} className="absolute inset-0" style={{ clipPath: "inset(50% 0 0 0)", transformOrigin: "top" }} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.35 }}>
      <span className="flex items-center justify-center w-full h-full text-storm text-2xl font-bold">{v}</span>
    </motion.div>
  </div>
);
export const FlipFlap = (p) => <ClockRow {...p} Cell={FlipCell} />;

/* 5 — 3D Cylinder */
const CylCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-plum border border-marble/30" style={{ perspective: 80 }}>
    <motion.div className="flex flex-col" style={{ transform: "skewY(-5deg)" }} animate={{ y: -v * CELL_H }} transition={spring}>
      <Digits className="flex items-center justify-center text-storm text-2xl font-bold tabular-nums" />
    </motion.div>
    <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(48,23,40,0.7) 0%, transparent 30%, transparent 70%, rgba(48,23,40,0.7) 100%)" }} />
  </div>
);
export const Cylinder3D = (p) => <ClockRow {...p} Cell={CylCell} />;

/* 6 — Neon Roll */
const NeonCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-plum border border-urgent/50" style={{ boxShadow: "0 0 8px #d5e24a66, inset 0 0 6px #d5e24a33" }}>
    <motion.div className="flex flex-col" animate={{ y: -v * CELL_H }} transition={spring}>
      <Digits className="flex items-center justify-center text-urgent text-2xl font-bold tabular-nums" />
    </motion.div>
  </div>
);
export const NeonRoll = (p) => <ClockRow {...p} Cell={NeonCell} />;

/* 7 — Block Roll */
const BlockCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-metal border border-marble/30 font-mono">
    <motion.div className="flex flex-col" animate={{ y: -v * CELL_H }} transition={bounce}>
      <Digits className="flex items-center justify-center text-storm text-2xl font-black tabular-nums" />
    </motion.div>
  </div>
);
export const BlockRoll = (p) => <ClockRow {...p} Cell={BlockCell} />;

/* 8 — Tumble */
const TumbleCell = ({ v }) => (
  <div className="w-9 h-14 flex items-center justify-center overflow-hidden rounded-md bg-plum border border-marble/30">
    <motion.span key={v} initial={{ rotateY: 180, opacity: 0, y: -12 }} animate={{ rotateY: 0, opacity: 1, y: 0 }} transition={bounce} className="text-storm text-2xl font-bold tabular-nums">{v}</motion.span>
  </div>
);
export const Tumble = (p) => <ClockRow {...p} Cell={TumbleCell} />;

/* 9 — Stack Flip */
const StackCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-metal border border-marble/30">
    <motion.span key={v} initial={{ rotateX: -90, y: "-100%" }} animate={{ rotateX: 0, y: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center justify-center text-storm text-2xl font-bold tabular-nums bg-plum">{v}</motion.span>
  </div>
);
export const StackFlip = (p) => <ClockRow {...p} Cell={StackCell} />;

/* 10 — Slide Up */
const SlideCell = ({ v }) => (
  <div className="relative w-9 h-14 overflow-hidden rounded-md bg-metal border border-marble/30">
    <motion.span key={v} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="absolute inset-0 flex items-center justify-center text-storm text-2xl font-bold tabular-nums">{v}</motion.span>
  </div>
);
export const SlideUp = (p) => <ClockRow {...p} Cell={SlideCell} />;

export const ODOMETER_VARIANTS = [
  { C: VerticalRoll, title: "Vertical Roll", sub: "Klassiek omhoog-rollen" },
  { C: HorizontalSlide, title: "Horizontal Slide", sub: "Schuift horizontaal" },
  { C: SlotSpin, title: "Slot Spin", sub: "Goudkleurige slot-machine" },
  { C: FlipFlap, title: "Flip Flap", sub: "Split-flap klapt om" },
  { C: Cylinder3D, title: "3D Cylinder", sub: "Perspectief-drum" },
  { C: NeonRoll, title: "Neon Roll", sub: "Glowende neon-roll" },
  { C: BlockRoll, title: "Block Roll", sub: "Bouncerige blok-cijfers" },
  { C: Tumble, title: "Tumble", sub: "Cijfers tuimelen in" },
  { C: StackFlip, title: "Stack Flip", sub: "Kaart stapt naar voren" },
  { C: SlideUp, title: "Slide Up", sub: "Glijdt omhoog" },
];