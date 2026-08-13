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