import React from "react";
import { DailyStateWidget, RoutinesWidget, WakeWidget, TherapyWidget, JournalWidget, DevelopmentWidget, PersonalTimeWidget, SelfInsightsWidget } from "@/components/widgets/SelfWidgets";
import { ActivityWidget, AgentsWidget, ApprovalsWidget, DayWidget, InsightsWidget, JeDagWidget, MemoryWidget, QuestionsWidget, VoiceWidget, ChatWidget } from "@/components/widgets/GiuliaWidgets";
import { FocusActivityWidget, AgendaWidget, DocumentsWidget, EmailWidget, KnowledgeWidget, PeopleWidget, ProjectsWidget, TaskArchiveWidget, TaskDetailWidget, TasksWidget, TimeTrackerWidget, WhatsAppWidget } from "@/components/widgets/FocusWidgets";
import { SocialPulseWidget, SocialPlannerWidget, HouseholdWidget, PersonalAdminWidget, HobbiesWidget, FoodWidget } from "@/components/widgets/LifeWidgets";
import { Section } from "./Gallery";

const ALL = [
  DailyStateWidget, RoutinesWidget, WakeWidget, TherapyWidget, JournalWidget, DevelopmentWidget, PersonalTimeWidget, SelfInsightsWidget,
  ActivityWidget, AgentsWidget, ApprovalsWidget, DayWidget, InsightsWidget, JeDagWidget, MemoryWidget, QuestionsWidget, VoiceWidget, ChatWidget,
  FocusActivityWidget, AgendaWidget, DocumentsWidget, EmailWidget, KnowledgeWidget, PeopleWidget, ProjectsWidget, TaskArchiveWidget, TaskDetailWidget, TasksWidget, TimeTrackerWidget, WhatsAppWidget,
  SocialPulseWidget, SocialPlannerWidget, HouseholdWidget, PersonalAdminWidget, HobbiesWidget, FoodWidget,
];

export default function WidgetShowcase() {
  return (
    <Section id="widgets" index="04" title="Widget Bibliotheek" desc="Alle 36 dashboard-widgets uit FOCUS, LIFE, SELF en GIULIA — bento-tegels met foto's, data-live mini-visuals en editorial statements." cols="lg:grid-cols-4">
      {ALL.map((W, i) => (
        <div key={i} className="pointer-events-none">
          <W />
        </div>
      ))}
    </Section>
  );
}