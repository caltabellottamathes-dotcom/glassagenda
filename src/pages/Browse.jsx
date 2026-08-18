import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import DailyStatePanel from "@/pages/self/DailyStatePanel";
import RoutinesPanel from "@/pages/self/RoutinesPanel";
import WakePanel from "@/pages/self/WakePanel";
import TherapyPanel from "@/pages/self/TherapyPanel";
import JournalPanel from "@/pages/self/JournalPanel";
import DevelopmentPanel from "@/pages/self/DevelopmentPanel";
import PersonalTimePanel from "@/pages/self/PersonalTimePanel";
import InsightsPanel from "@/pages/self/InsightsPanel";
import FoodPanel from "@/pages/self/FoodPanel";
import ActivityPreview from "@/pages/giulia/ActivityPreview";
import AgentsPreview from "@/pages/giulia/AgentsPreview";
import DayView from "@/pages/giulia/DayView";
import InsightsPreview from "@/pages/giulia/InsightsPreview";
import JeDagPreview from "@/pages/giulia/JeDagPreview";
import MemoryPreview from "@/pages/giulia/MemoryPreview";
import QuestionsPreview from "@/pages/giulia/QuestionsPreview";
import ChatVoiceCall from "@/pages/giulia/ChatVoiceCall";
import ChatWindow from "@/pages/giulia/ChatWindow";
import AgendaPreview from "@/pages/focus/AgendaPreview";
import ProjectsPreview from "@/pages/focus/ProjectsPreview";
import HobbiesPreview from "@/pages/life/HobbiesPreview";
import HouseholdPreview from "@/pages/life/HouseholdPreview";
import PersonalAdminPreview from "@/pages/life/PersonalAdminPreview";
import SocialPlannerPreview from "@/pages/life/SocialPlannerPreview";
import SocialPulsePreview from "@/pages/life/SocialPulsePreview";
import Taken from "@/pages/modules/Taken";
import Email from "@/pages/modules/Email";
import Notifications from "@/pages/modules/Notifications";
import Approvals from "@/pages/modules/Approvals";
import DocumentsPreview from "@/pages/modules/DocumentsPreview";
import KnowledgePreview from "@/pages/modules/KnowledgePreview";
import PeoplePreview from "@/pages/modules/PeoplePreview";
import ProjectAddPanel from "@/pages/modules/ProjectAddPanel";
import TaskArchivePreview from "@/pages/modules/TaskArchivePreview";
import TaskDetailPreview from "@/pages/modules/TaskDetailPreview";
import TimeTrackerPreview from "@/pages/modules/TimeTrackerPreview";
import WeekView from "@/pages/modules/WeekView";
import WhatsAppPreview from "@/pages/modules/WhatsAppPreview";

const PANELS = [
  { name: "Daily State", Comp: DailyStatePanel },
  { name: "Routines", Comp: RoutinesPanel },
  { name: "Wake", Comp: WakePanel },
  { name: "Therapy", Comp: TherapyPanel },
  { name: "Journal", Comp: JournalPanel },
  { name: "Development", Comp: DevelopmentPanel },
  { name: "Personal Time", Comp: PersonalTimePanel },
  { name: "Insights", Comp: InsightsPanel },
  { name: "Food", Comp: FoodPanel },
  { name: "Activity", Comp: ActivityPreview },
  { name: "Agents", Comp: AgentsPreview },
  { name: "Day", Comp: DayView },
  { name: "Insights", Comp: InsightsPreview },
  { name: "Je Dag", Comp: JeDagPreview },
  { name: "Memory", Comp: MemoryPreview },
  { name: "Questions", Comp: QuestionsPreview },
  { name: "Voice Call", Comp: ChatVoiceCall },
  { name: "Chat", Comp: ChatWindow },
  { name: "Agenda", Comp: AgendaPreview },
  { name: "Projects", Comp: ProjectsPreview },
  { name: "Hobbies", Comp: HobbiesPreview },
  { name: "Household", Comp: HouseholdPreview },
  { name: "Personal Admin", Comp: PersonalAdminPreview },
  { name: "Social Planner", Comp: SocialPlannerPreview },
  { name: "Social Pulse", Comp: SocialPulsePreview },
  { name: "Taken", Comp: Taken },
  { name: "Email", Comp: Email },
  { name: "Notifications", Comp: Notifications },
  { name: "Approvals", Comp: Approvals },
  { name: "Documents", Comp: DocumentsPreview },
  { name: "Knowledge", Comp: KnowledgePreview },
  { name: "People", Comp: PeoplePreview },
  { name: "New Project", Comp: ProjectAddPanel },
  { name: "Task Archive", Comp: TaskArchivePreview },
  { name: "Task Detail", Comp: TaskDetailPreview },
  { name: "Time Tracker", Comp: TimeTrackerPreview },
  { name: "Week", Comp: WeekView },
  { name: "WhatsApp", Comp: WhatsAppPreview },
];

export default function Browse() {
  const [i, setI] = useState(0);
  const total = PANELS.length;
  const next = useCallback(() => setI((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setI((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const Current = PANELS[i].Comp;

  return (
    <div className="relative">
      <Current />
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-marble/30 bg-plum/80 backdrop-blur-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        <button onClick={prev} aria-label="Vorige" className="w-8 h-8 rounded-full flex items-center justify-center text-storm/80 hover:text-storm hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="px-1 text-center min-w-[140px]">
          <div className="text-storm/45 text-[8px] tracking-[0.25em] uppercase">Panel</div>
          <div className="text-storm text-[11px] font-semibold tabular-nums tracking-wider">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {PANELS[i].name}</div>
        </div>
        <button onClick={next} aria-label="Volgende" className="w-8 h-8 rounded-full flex items-center justify-center text-storm/80 hover:text-storm hover:bg-white/10 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
        <span className="w-px h-6 bg-marble/25 mx-1" />
        <Link to="/" aria-label="Sluiten" className="w-8 h-8 rounded-full flex items-center justify-center text-storm/60 hover:text-storm hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}