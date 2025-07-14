import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "./lib/UserContext";
import { XPProvider } from "./lib/XPContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "sonner";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Index from "./pages/Index";
import QuestPage from "./pages/DailyQuest";
import HackathonDetails from "./pages/HackathonDetails";
import MCQRound from "./pages/MCQRound";
import SubmissionRound from "./pages/SubmissionRound";
import ProgressReport from "./pages/ProgressReport";
import WeeklyWisdomQuizPage from "./pages/WeeklyWisdomQuizPage";
import RedeemXP from "./pages/RedeemXP";
import AuthDemo from "./pages/AuthDemo";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Redirect to auth page but save the attempted location
    return <Navigate to="/auth-demo" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <XPProvider>
        <TooltipProvider>
          <Toaster />
          {/* Add Sonner container for toasts */}
          <div />
          <BrowserRouter>
            <Routes>
              {/* Public route - Auth */}
              <Route path="/auth-demo" element={<AuthDemo />} />

              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              } />
              <Route path="/quest/:questId" element={
                <ProtectedRoute>
                  <QuestPage />
                </ProtectedRoute>
              } />
              <Route path="/hackathon/:id" element={
                <ProtectedRoute>
                  <HackathonDetails />
                </ProtectedRoute>
              } />
              <Route path="/hackathon/:id/mcq" element={
                <ProtectedRoute>
                  <MCQRound />
                </ProtectedRoute>
              } />
              <Route path="/hackathon/:id/submission" element={
                <ProtectedRoute>
                  <SubmissionRound />
                </ProtectedRoute>
              } />
              <Route path="/progress" element={
                <ProtectedRoute>
                  <ProgressReport />
                </ProtectedRoute>
              } />
              <Route path="/weekly-wisdom-quiz" element={
                <ProtectedRoute>
                  <WeeklyWisdomQuizPage />
                </ProtectedRoute>
              } />
              <Route path="/redeem-xp" element={
                <ProtectedRoute>
                  <RedeemXP />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </XPProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
