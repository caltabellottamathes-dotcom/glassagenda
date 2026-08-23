import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Home from './pages/Home';
import Takenoverzicht from './pages/Takenoverzicht';
import Statistieken from './pages/Statistieken';
import AgendaOverzicht from './pages/AgendaOverzicht';
import Weekplanning from './pages/Weekplanning';
import Dagplanning from './pages/Dagplanning';
import Projecten from './pages/Projecten';
import Contacten from './pages/Contacten';
import TaakDetails from './pages/TaakDetails';
import PrioriteitenMatrix from './pages/PrioriteitenMatrix';
import Notitieblok from './pages/Notitieblok';
import Instellingen from './pages/Instellingen';
import Tijdsregistratie from './pages/Tijdsregistratie';
import Archief from './pages/Archief';
import FocusModus from './pages/FocusModus';
import DagelijkseBriefing from './pages/DagelijkseBriefing';
import DoelenDashboard from './pages/DoelenDashboard';
import VergaderNotities from './pages/VergaderNotities';
import InspiratieBord from './pages/InspiratieBord';
import SelfIndex from './pages/self/Index';
import DailyStatePanel from './pages/self/DailyStatePanel';
import RoutinesPanel from './pages/self/RoutinesPanel';
import WakePanel from './pages/self/WakePanel';
import TherapyPanel from './pages/self/TherapyPanel';
import JournalPanel from './pages/self/JournalPanel';
import DevelopmentPanel from './pages/self/DevelopmentPanel';
import PersonalTimePanel from './pages/self/PersonalTimePanel';
import InsightsPanel from './pages/self/InsightsPanel';
import FoodPanel from './pages/self/FoodPanel';
import Taken from './pages/modules/Taken';
import Email from './pages/modules/Email';
import Notifications from './pages/modules/Notifications';
import Approvals from './pages/modules/Approvals';
import DocumentsPreview from './pages/modules/DocumentsPreview';
import KnowledgePreview from './pages/modules/KnowledgePreview';
import PeoplePreview from './pages/modules/PeoplePreview';
import ProjectAddPanel from './pages/modules/ProjectAddPanel';
import TaskArchivePreview from './pages/modules/TaskArchivePreview';
import TaskDetailPreview from './pages/modules/TaskDetailPreview';
import TimeTrackerPreview from './pages/modules/TimeTrackerPreview';
import WeekView from './pages/modules/WeekView';
import WhatsAppPreview from './pages/modules/WhatsAppPreview';
import GiuliaIndex from './pages/giulia/Index';
import ActivityPreview from './pages/giulia/ActivityPreview';
import AgentsPreview from './pages/giulia/AgentsPreview';
import DayView from './pages/giulia/DayView';
import InsightsPreview from './pages/giulia/InsightsPreview';
import JeDagPreview from './pages/giulia/JeDagPreview';
import MemoryPreview from './pages/giulia/MemoryPreview';
import QuestionsPreview from './pages/giulia/QuestionsPreview';
import ChatVoiceCall from './pages/giulia/ChatVoiceCall';
import ChatWindow from './pages/giulia/ChatWindow';
import FocusIndex from './pages/focus/Index';
import AgendaPreview from './pages/focus/AgendaPreview';
import ProjectsPreview from './pages/focus/ProjectsPreview';
import LifeIndex from './pages/life/Index';
import Widgets from './pages/Widgets';
import LifeGallery from './pages/LifeGallery';
import Browse from './pages/Browse';
import UIGallery from './pages/UIGallery';
import WhatsAppPage from './pages/WhatsAppPage';
import HobbiesPreview from './pages/life/HobbiesPreview';
import HouseholdPreview from './pages/life/HouseholdPreview';
import PersonalAdminPreview from './pages/life/PersonalAdminPreview';
import SocialPlannerPreview from './pages/life/SocialPlannerPreview';
import SocialPulsePreview from './pages/life/SocialPulsePreview';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route path="/" element={<Home />} />
      <Route path="/takenoverzicht" element={<Takenoverzicht />} />
      <Route path="/statistieken" element={<Statistieken />} />
      <Route path="/agenda-overzicht" element={<AgendaOverzicht />} />
      <Route path="/weekplanning" element={<Weekplanning />} />
      <Route path="/dagplanning" element={<Dagplanning />} />
      <Route path="/projecten" element={<Projecten />} />
      <Route path="/contacten" element={<Contacten />} />
      <Route path="/taak-details" element={<TaakDetails />} />
      <Route path="/prioriteiten-matrix" element={<PrioriteitenMatrix />} />
      <Route path="/notitieblok" element={<Notitieblok />} />
      <Route path="/instellingen" element={<Instellingen />} />
      <Route path="/tijdsregistratie" element={<Tijdsregistratie />} />
      <Route path="/archief" element={<Archief />} />
      <Route path="/focus-modus" element={<FocusModus />} />
      <Route path="/dagelijkse-briefing" element={<DagelijkseBriefing />} />
      <Route path="/doelen-dashboard" element={<DoelenDashboard />} />
      <Route path="/vergader-notities" element={<VergaderNotities />} />
      <Route path="/inspiratie-bord" element={<InspiratieBord />} />
      <Route path="/self" element={<SelfIndex />} />
      <Route path="/self/daily-state" element={<DailyStatePanel />} />
      <Route path="/self/routines" element={<RoutinesPanel />} />
      <Route path="/self/wake" element={<WakePanel />} />
      <Route path="/self/therapy" element={<TherapyPanel />} />
      <Route path="/self/journal" element={<JournalPanel />} />
      <Route path="/self/development" element={<DevelopmentPanel />} />
      <Route path="/self/personal-time" element={<PersonalTimePanel />} />
      <Route path="/self/insights" element={<InsightsPanel />} />
      <Route path="/self/food" element={<FoodPanel />} />
      <Route path="/taken" element={<Taken />} />
      <Route path="/email" element={<Email />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/approvals" element={<Approvals />} />
      <Route path="/documents" element={<DocumentsPreview />} />
      <Route path="/knowledge" element={<KnowledgePreview />} />
      <Route path="/people" element={<PeoplePreview />} />
      <Route path="/project-add" element={<ProjectAddPanel />} />
      <Route path="/task-archive" element={<TaskArchivePreview />} />
      <Route path="/task-detail" element={<TaskDetailPreview />} />
      <Route path="/time-tracker" element={<TimeTrackerPreview />} />
      <Route path="/week" element={<WeekView />} />
      <Route path="/whatsapp" element={<WhatsAppPreview />} />
      <Route path="/whatsapp/page" element={<WhatsAppPage />} />
      <Route path="/widgets" element={<Widgets />} />
      <Route path="/life-gallery" element={<LifeGallery />} />
      <Route path="/bladeren" element={<Browse />} />
      <Route path="/UI-gallery" element={<UIGallery />} />
      <Route path="/giulia" element={<GiuliaIndex />} />
      <Route path="/giulia/activity" element={<ActivityPreview />} />
      <Route path="/giulia/agents" element={<AgentsPreview />} />
      <Route path="/giulia/day" element={<DayView />} />
      <Route path="/giulia/insights" element={<InsightsPreview />} />
      <Route path="/giulia/jedag" element={<JeDagPreview />} />
      <Route path="/giulia/memory" element={<MemoryPreview />} />
      <Route path="/giulia/questions" element={<QuestionsPreview />} />
      <Route path="/giulia/voice" element={<ChatVoiceCall />} />
      <Route path="/giulia/chat" element={<ChatWindow />} />
      <Route path="/focus" element={<FocusIndex />} />
      <Route path="/focus/activity" element={<ActivityPreview />} />
      <Route path="/focus/agenda" element={<AgendaPreview />} />
      <Route path="/focus/projects" element={<ProjectsPreview />} />
      <Route path="/life" element={<LifeIndex />} />
      <Route path="/life/hobbies" element={<HobbiesPreview />} />
      <Route path="/life/household" element={<HouseholdPreview />} />
      <Route path="/life/admin" element={<PersonalAdminPreview />} />
      <Route path="/life/social-planner" element={<SocialPlannerPreview />} />
      <Route path="/life/social-pulse" element={<SocialPulsePreview />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App