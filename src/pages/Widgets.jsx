import React from "react";
import { Link } from "react-router-dom";
import { PageShell, Divider } from "@/components/glass";
import { ActivityWidget, AgentsWidget, ApprovalsWidget, DayWidget, InsightsWidget, JeDagWidget, MemoryWidget, QuestionsWidget, VoiceWidget, ChatWidget } from "@/components/widgets/GiuliaWidgets";
import { FocusActivityWidget, AgendaWidget, DocumentsWidget, EmailWidget, KnowledgeWidget, PeopleWidget, ProjectsWidget, TaskArchiveWidget, TaskDetailWidget, TasksWidget, TimeTrackerWidget, WhatsAppWidget } from "@/components/widgets/FocusWidgets";
import { HobbiesWidget, HouseholdWidget, PersonalAdminWidget, SocialPlannerWidget, SocialPulseWidget, FoodWidget } from "@/components/widgets/LifeWidgets";
import { DailyStateWidget, RoutinesWidget, WakeWidget, TherapyWidget, JournalWidget, DevelopmentWidget, PersonalTimeWidget, SelfInsightsWidget } from "@/components/widgets/SelfWidgets";

function Section({ title, sub, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-storm text-lg font-bold tracking-tight">{title}</h2>
        <span className="text-storm/50 text-[11px] tracking-[0.2em] uppercase">{sub}</span>
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">{children}</div>
    </div>
  );
}

export default function Widgets() {
  return (
    <PageShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight">Widgets</h1>
          <p className="text-storm/60 text-sm mt-1">Live, visuele miniaturen van ieder paneel — de inhoud bepaalt de vorm.</p>
        </div>
        <Link to="/" className="text-storm/60 hover:text-storm text-sm">← Home</Link>
      </div>
      <Divider className="mb-8" />
      <Section title="GIULIA" sub="10 widgets">
        <ActivityWidget /><AgentsWidget /><ApprovalsWidget /><DayWidget /><InsightsWidget /><JeDagWidget /><MemoryWidget /><QuestionsWidget /><VoiceWidget /><ChatWidget />
      </Section>
      <Section title="FOCUS" sub="12 widgets">
        <FocusActivityWidget /><AgendaWidget /><DocumentsWidget /><EmailWidget /><KnowledgeWidget /><PeopleWidget /><ProjectsWidget /><TaskArchiveWidget /><TaskDetailWidget /><TasksWidget /><TimeTrackerWidget /><WhatsAppWidget />
      </Section>
      <Section title="LIFE" sub="6 widgets">
        <HobbiesWidget /><HouseholdWidget /><PersonalAdminWidget /><SocialPlannerWidget /><SocialPulseWidget /><FoodWidget />
      </Section>
      <Section title="SELF" sub="8 widgets">
        <DailyStateWidget /><RoutinesWidget /><WakeWidget /><TherapyWidget /><JournalWidget /><DevelopmentWidget /><PersonalTimeWidget /><SelfInsightsWidget />
      </Section>
    </PageShell>
  );
}