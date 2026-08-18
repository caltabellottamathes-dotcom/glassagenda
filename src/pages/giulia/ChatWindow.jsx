import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";

const SAND = "#94925d", URG = "#d5e24a";
const SEED = [
  { id: 1, me: false, text: "Hoi! Drie belangrijke momenten vandaag.", time: "09:01", ctx: ["FOCUS"] },
  { id: 2, me: true, text: "Geef me de eerste maar.", time: "09:02", ctx: [] },
  { id: 3, me: false, text: "Om 11:00 Concept Brons — notities klaar.", time: "09:02", ctx: ["FOCUS", "LIFE"] },
];
const REPLIES = [
  { text: "Begrepen, ik regel het.", ctx: ["FOCUS"] },
  { text: "Wil je dat ik je agenda aanpas?", ctx: ["SELF", "FOCUS"] },
  { text: "Ik houd dat in de gaten.", ctx: ["LIFE"] },
  { text: "Top — vastgelegd in je memory.", ctx: ["GIULIA"] },
];
const QUICK = ["Plan mijn dag", "Wat is mijn energie?", "Herinner me eraan", "Samenvatten"];
const ctxC = { FOCUS: SAND, LIFE: "#d8dab3", SELF: "#6b6a4a", GIULIA: URG };

export default function ChatWindow() {
  const [msgs, setMsgs] = useState(SEED);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [glow, setGlow] = useState(null);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  const send = (val) => {
    const t = (val ?? text).trim(); if (!t) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMsgs(m => [...m, { id: Date.now(), me: true, text: t, time, ctx: [] }]);
    setText("");
    setTimeout(() => { setTyping(true); setTimeout(() => { const r = REPLIES[Math.floor(Math.random() * REPLIES.length)]; setTyping(false); setMsgs(m => [...m, { id: Date.now() + 1, me: false, text: r.text, time, ctx: r.ctx }]); r.ctx.forEach((c, i) => setTimeout(() => setGlow(c), i * 400)); setTimeout(() => setGlow(null), 1600); }, 1600); }, 400);
  };
  return (
    <ModuleShell index="10" section="CHAT" statement="GIULIA" kicker="PRAAT MET CONTEXT-AURA"
      context={[
        { label: "AURA", text: "GIULIA koppelt context — de chips FOCUS/LIFE/SELF lichten op als zij verbindt." },
        { label: "STATUS", text: "Online, reageert direct." },
        { label: "ACTIE", text: "Stuur een bericht of gebruik een snelle actie." },
      ]}
      actions={[{ label: "New Chat", primary: true }, { label: "Voice" }, { label: "Open Chat" }]}>
      <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-marble/20 bg-marble/5">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-marble/15">
          <span className="relative"><span className="w-8 h-8 rounded-full bg-plum/40 text-storm text-[10px] font-semibold flex items-center justify-center">G</span><span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-urgent border-2 border-metal" /></span>
          <div><p className="text-sm text-storm">GIULIA</p><p className="text-[10px] text-storm/50">online · verbindt context</p></div>
        </div>
        <div className="flex-1 overflow-auto px-4 py-4 space-y-2">
          <AnimatePresence>
            {msgs.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[72%] px-3 py-2 rounded-2xl text-sm ${m.me ? "bg-sand text-storm ml-auto rounded-br-sm" : "bg-plum/50 text-storm rounded-bl-sm"}`}>
                {m.text}
                <div className="flex gap-1 mt-1.5">{m.ctx.map(c => <span key={c} className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: `${ctxC[c]}33`, color: ctxC[c] }}>{c}</span>)}</div>
                <span className="block text-[8px] text-storm/50 mt-0.5 text-right">{m.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 px-3 py-2 w-fit rounded-2xl bg-plum/50 rounded-bl-sm"><span className="w-1.5 h-1.5 rounded-full bg-storm/60 animate-bounce" /><span className="w-1.5 h-1.5 rounded-full bg-storm/60 animate-bounce" style={{ animationDelay: "0.15s" }} /><span className="w-1.5 h-1.5 rounded-full bg-storm/60 animate-bounce" style={{ animationDelay: "0.3s" }} /></motion.div>}
          <div ref={endRef} />
        </div>
        <div className="px-3 pt-2 flex flex-wrap gap-1.5">
          {Object.keys(ctxC).map(c => (
            <span key={c} className="text-[9px] px-2 py-1 rounded-full border transition-all" style={{ background: glow === c ? `${ctxC[c]}33` : "transparent", borderColor: glow === c ? ctxC[c] : "#ffffff20", color: glow === c ? ctxC[c] : "#ffffff60" }}>{c}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 px-3 pb-1.5">
          {QUICK.map(q => <button key={q} onClick={() => send(q)} className="text-[10px] px-2.5 py-1 rounded-full border border-marble/25 bg-marble/5 text-storm/70 hover:bg-marble/10 transition-colors">{q}</button>)}
        </div>
        <div className="flex items-center gap-2 p-3 border-t border-marble/15">
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Schrijf tegen GIULIA..." className="flex-1 rounded-full border border-marble/30 bg-marble/5 px-4 py-2.5 text-sm text-storm placeholder:text-storm/40 focus:outline-none focus:border-sand" />
          <button onClick={() => send()} className="w-11 h-11 rounded-full bg-urgent text-plum flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"><Sparkles className="w-5 h-5" /></button>
        </div>
      </div>
    </ModuleShell>
  );
}