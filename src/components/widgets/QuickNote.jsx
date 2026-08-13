import React, { useState, useEffect } from "react";
import { SectionHeader } from "@/components/glass";

export default function QuickNote() {
  const [note, setNote] = useState(() => {
    try { return localStorage.getItem("giulia_note") || ""; } catch { return ""; }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      try { localStorage.setItem("giulia_note", note); } catch {}
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1200);
      return () => clearTimeout(t);
    }, 400);
    return () => clearTimeout(id);
  }, [note]);

  return (
    <div className="rounded-2xl border border-marble/20 bg-marble/5 p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <SectionHeader number={2} title="Snelle Notitie" />
        <span className={`text-[10px] text-urgent transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>opgeslagen</span>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Schrijf een snelle gedachte of actiepunt..."
        className="mt-3 w-full flex-1 min-h-[96px] bg-transparent text-storm text-sm placeholder:text-marble/40 outline-none resize-none"
      />
    </div>
  );
}