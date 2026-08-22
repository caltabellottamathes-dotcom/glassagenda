import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile, Send, Check, CheckCheck, Star, Archive } from "lucide-react";
import { CHATS, initials, grad, seedMessages, replyFor } from "@/lib/whatsapp";

const FILTERS = ["Alle", "Ongelezen", "Groepen"];

export default function WhatsAppPage() {
  const [active, setActive] = useState(1);
  const [msgs, setMsgs] = useState(seedMessages(1));
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const endRef = useRef(null);

  const chat = CHATS.find((c) => c.id === active);
  const filtered = CHATS.filter((c) => {
    if (filter === "Ongelezen" && c.unread === 0) return false;
    if (filter === "Groepen" && !c.group) return false;
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
      }, 1700);
    }, 500);
  };

  return (
    <div className="h-[100dvh] w-full bg-metal overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 16%, rgba(224,222,211,0.18) 0%, rgba(242,242,240,0.06) 28%, rgba(45,45,35,0) 60%)" }} />
      <div className="relative z-10 h-full mx-auto max-w-[1400px] px-4 py-4">
        <div className="h-full rounded-[24px] border border-marble/30 bg-marble/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-marble/15">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-storm/50 hover:text-storm"><ArrowLeft className="w-4 h-4" /></Link>
              <div className="w-8 h-8 rounded-full bg-urgent/20 border border-urgent/40 flex items-center justify-center text-urgent text-xs font-bold">W</div>
              <div>
                <h1 className="text-storm text-base font-bold tracking-tight leading-none">WhatsApp</h1>
                <p className="text-storm/45 text-[10px] tracking-[0.2em] uppercase mt-1">Volledige weergave</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><Archive className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          {/* body */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_260px] overflow-hidden">
            {/* chat list */}
            <div className="flex flex-col border-r border-marble/15 overflow-hidden">
              <div className="p-3 space-y-2 border-b border-marble/15">
                <div className="flex items-center gap-2 rounded-full border border-marble/25 bg-marble/5 px-3 py-2">
                  <Search className="w-3.5 h-3.5 text-storm/40" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoeken..." className="flex-1 bg-transparent text-sm text-storm placeholder:text-storm/40 focus:outline-none" />
                </div>
                <div className="flex gap-1.5">
                  {FILTERS.map((f) => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-[10px] tracking-wider uppercase transition-colors ${filter === f ? "bg-urgent text-plum font-semibold" : "border border-marble/25 text-storm/60 hover:bg-marble/10"}`}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {filtered.map((c) => (
                  <button key={c.id} onClick={() => open(c.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${active === c.id ? "bg-marble/15" : "hover:bg-marble/8"}`}>
                    <span className="relative shrink-0">
                      <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${grad(c.id)} text-storm text-[11px] font-bold flex items-center justify-center`}>{initials(c.name)}</span>
                      {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-urgent border-2 border-metal" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-storm truncate flex items-center gap-1.5">{c.name}{c.group && <span className="text-[8px] px-1 rounded bg-marble/20 text-storm/60 uppercase">grp</span>}</p>
                      <p className="text-[11px] text-storm/50 truncate">{c.last}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[9px] text-storm/40">{c.time}</span>
                      {c.unread > 0 && <span className="text-[9px] px-1.5 min-w-[18px] text-center rounded-full bg-urgent text-plum font-semibold">{c.unread}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* conversation */}
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-marble/15">
                <span className="relative shrink-0">
                  <span className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad(active)} text-storm text-[11px] font-bold flex items-center justify-center`}>{initials(chat.name)}</span>
                  {chat.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-urgent border-2 border-metal" />}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-storm font-semibold leading-none">{chat.name}</p>
                  <p className="text-[10px] text-storm/50 mt-1">{typing ? "aan het typen…" : chat.online ? "online" : "laatst gezien vandaag 09:20"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><Phone className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><Video className="w-4 h-4" /></button>
                  <button onClick={() => setShowInfo((s) => !s)} className={`w-8 h-8 rounded-full flex items-center justify-center text-storm/60 hover:bg-marble/15 ${showInfo ? "bg-marble/15" : ""}`}><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-auto px-5 py-4 space-y-2">
                <div className="text-center my-2"><span className="text-[9px] tracking-[0.2em] uppercase text-storm/40 bg-marble/5 px-3 py-1 rounded-full border border-marble/15">Vandaag</span></div>
                <AnimatePresence>
                  {msgs.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[65%] px-3.5 py-2 rounded-2xl text-sm ${m.me ? "bg-sand text-storm rounded-br-sm" : "bg-plum/60 text-storm rounded-bl-sm"}`}>
                        {m.text}
                        <span className="flex items-center justify-end gap-1 mt-0.5">
                          <span className="text-[8px] text-storm/50">{m.time}</span>
                          {m.me && (m.status === "read" ? <CheckCheck className="w-3 h-3 text-urgent" /> : <Check className="w-3 h-3 text-storm/50" />)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex gap-1 px-3 py-2.5 rounded-2xl rounded-bl-sm bg-plum/60">
                      {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-storm/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                    </div>
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 border-t border-marble/15">
                <button className="w-9 h-9 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><Smile className="w-4 h-4" /></button>
                <button className="w-9 h-9 rounded-full hover:bg-marble/15 flex items-center justify-center text-storm/60"><Paperclip className="w-4 h-4" /></button>
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Bericht..." className="flex-1 rounded-full border border-marble/25 bg-marble/5 px-4 py-2.5 text-sm text-storm placeholder:text-storm/40 focus:outline-none focus:border-sand" />
                <button onClick={send} className="w-10 h-10 rounded-full bg-urgent text-plum flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"><Send className="w-4 h-4" /></button>
              </div>
            </div>

            {/* info rail */}
            {showInfo && (
              <div className="hidden lg:flex flex-col border-l border-marble/15 overflow-auto p-5 gap-4">
                <div className="flex flex-col items-center gap-2 py-4">
                  <span className={`w-16 h-16 rounded-full bg-gradient-to-br ${grad(active)} text-storm text-lg font-bold flex items-center justify-center`}>{initials(chat.name)}</span>
                  <p className="text-storm text-sm font-semibold">{chat.name}</p>
                  <p className="text-storm/50 text-[11px]">{chat.online ? "online" : "offline"}</p>
                </div>
                <div className="rounded-xl border border-marble/15 bg-marble/5 p-3 space-y-2">
                  <div className="flex justify-between text-[11px]"><span className="text-storm/50">Rol</span><span className="text-storm">{chat.role}</span></div>
                  <div className="flex justify-between text-[11px]"><span className="text-storm/50">Berichten</span><span className="text-storm tabular-nums">{msgs.length}</span></div>
                  <div className="flex justify-between text-[11px]"><span className="text-storm/50">Ongelezen</span><span className="text-storm tabular-nums">{chat.unread}</span></div>
                </div>
                <div>
                  <p className="text-storm/40 text-[9px] tracking-[0.2em] uppercase mb-2">Gedeelde media</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["wa-m1", "wa-m2", "wa-m3"].map((s) => <div key={s} className="aspect-square rounded-lg overflow-hidden bg-marble/10"><img src={`https://picsum.photos/seed/${s}/120/120`} className="w-full h-full object-cover" alt="" /></div>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-full border border-marble/25 text-storm/70 text-[10px] tracking-wider uppercase py-2 hover:bg-marble/10 flex items-center justify-center gap-1.5"><Star className="w-3 h-3" /> Favoriet</button>
                  <button className="flex-1 rounded-full border border-marble/25 text-storm/70 text-[10px] tracking-wider uppercase py-2 hover:bg-marble/10 flex items-center justify-center gap-1.5"><Archive className="w-3 h-3" /> Archief</button>
                </div>
                <Link to="/whatsapp" className="text-center text-[10px] tracking-[0.2em] uppercase text-storm/50 hover:text-storm border-t border-marble/15 pt-3">← Panel weergave</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}