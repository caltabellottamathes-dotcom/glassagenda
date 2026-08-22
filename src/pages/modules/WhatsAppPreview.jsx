import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, CheckCheck, Send, Maximize2 } from "lucide-react";
import ModuleShell from "@/components/modules/ModuleShell";
import { CHATS, initials, grad, seedMessages, replyFor } from "@/lib/whatsapp";

const FILTERS = ["Alle", "Ongelezen"];

export default function WhatsAppPreview() {
  const [active, setActive] = useState(1);
  const [msgs, setMsgs] = useState(seedMessages(1));
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  const chat = CHATS.find((c) => c.id === active);
  const filtered = CHATS.filter((c) => {
    if (filter === "Ongelezen" && c.unread === 0) return false;
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const open = (id) => { setActive(id); setMsgs(seedMessages(id)); setTyping(false); };

  const send = () => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const outgoing = text;
    setMsgs((m) => [...m, { me: true, text: outgoing, time, status: "sent" }]);
    setText("");
    setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [...m, { me: false, text: replyFor(outgoing), time, status: "read" }]);
      }, 1600);
    }, 500);
  };

  return (
    <ModuleShell index="13" section="WHATSAPP" statement="CHATS" kicker={`${CHATS.reduce((s, c) => s + c.unread, 0)} ONGELEZEN`}
      context={[
        { label: "ONLINE", text: `${CHATS.filter((c) => c.online).length} contacten nu online.` },
        { label: "CONVERSATIES", text: `${CHATS.length} actieve threads in jouw netwerk.` },
        { label: "ACTIEF", text: "Type een bericht — je krijgt een live reactie." },
      ]}
      actions={[{ label: "New Chat", primary: true }, { label: "Archive" }, { label: "Open WhatsApp" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] h-full overflow-hidden rounded-2xl border border-marble/20 bg-marble/5">
        {/* chat list */}
        <div className="flex flex-col border-r border-marble/15 overflow-hidden">
          <div className="p-2.5 space-y-2 border-b border-marble/15">
            <div className="flex items-center gap-2 rounded-full border border-marble/25 bg-marble/5 px-3 py-1.5">
              <Search className="w-3 h-3 text-storm/40" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoeken..." className="flex-1 bg-transparent text-[11px] text-storm placeholder:text-storm/40 focus:outline-none" />
            </div>
            <div className="flex gap-1.5">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-0.5 rounded-full text-[9px] tracking-wider uppercase transition-colors ${filter === f ? "bg-urgent text-plum font-semibold" : "border border-marble/25 text-storm/60 hover:bg-marble/10"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {filtered.map((c) => (
              <button key={c.id} onClick={() => open(c.id)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${active === c.id ? "bg-marble/15" : "hover:bg-marble/8"}`}>
                <span className="relative shrink-0">
                  <span className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad(c.id)} text-storm text-[10px] font-bold flex items-center justify-center`}>{initials(c.name)}</span>
                  {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-urgent border-2 border-metal" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-storm truncate flex items-center gap-1">{c.name}{c.group && <span className="text-[7px] px-1 rounded bg-marble/20 text-storm/60 uppercase">grp</span>}</p>
                  <p className="text-[10px] text-storm/50 truncate">{c.last}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[8px] text-storm/40">{c.time}</span>
                  {c.unread > 0 && <span className="text-[8px] px-1.5 min-w-[16px] text-center rounded-full bg-urgent text-plum font-semibold">{c.unread}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* conversation */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-marble/15">
            <span className="relative shrink-0">
              <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad(active)} text-storm text-[10px] font-bold flex items-center justify-center`}>{initials(chat.name)}</span>
              {chat.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-urgent border-2 border-metal" />}
            </span>
            <div className="flex-1">
              <p className="text-[12px] text-storm font-semibold leading-none">{chat.name}</p>
              <p className="text-[9px] text-storm/50 mt-1">{typing ? "aan het typen…" : chat.online ? "online" : "offline"}</p>
            </div>
            <Link to="/whatsapp/page" title="Volledige weergave" className="w-7 h-7 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><Maximize2 className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="flex-1 overflow-auto px-4 py-3 space-y-2">
            <div className="text-center"><span className="text-[8px] tracking-[0.2em] uppercase text-storm/40 bg-marble/5 px-2.5 py-0.5 rounded-full border border-marble/15">Vandaag</span></div>
            <AnimatePresence>
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[72%] px-3 py-1.5 rounded-2xl text-[12px] ${m.me ? "bg-sand text-storm rounded-br-sm" : "bg-plum/60 text-storm rounded-bl-sm"}`}>
                    {m.text}
                    <span className="flex items-center justify-end gap-1 mt-0.5">
                      <span className="text-[7px] text-storm/50">{m.time}</span>
                      {m.me && (m.status === "read" ? <CheckCheck className="w-2.5 h-2.5 text-urgent" /> : <Check className="w-2.5 h-2.5 text-storm/50" />)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex gap-1 px-3 py-2 rounded-2xl rounded-bl-sm bg-plum/60">
                  {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-storm/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </motion.div>
            )}
            <div ref={endRef} />
          </div>
          <div className="flex items-center gap-2 p-2.5 border-t border-marble/15">
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Bericht..." className="flex-1 rounded-full border border-marble/25 bg-marble/5 px-3.5 py-2 text-[12px] text-storm placeholder:text-storm/40 focus:outline-none focus:border-sand" />
            <button onClick={send} className="w-9 h-9 rounded-full bg-urgent text-plum flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"><Send className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}