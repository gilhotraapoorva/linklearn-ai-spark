import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./lib/UserContext";
import { XPProvider } from "./lib/XPContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "sonner";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./pages/Index";
import QuestPage from "./pages/DailyQuest";
import HackathonDetails from "./pages/HackathonDetails";
import MCQRound from "./pages/MCQRound";
import SubmissionRound from "./pages/SubmissionRound";
import ProgressReport from "./pages/ProgressReport";
import WeeklyWisdomQuizPage from "./pages/WeeklyWisdomQuizPage";
import RedeemXP from "./pages/RedeemXP";
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
              {/* Redirect auth and home to learning dashboard */}
              <Route path="/auth-demo" element={<Navigate to="/learning-companion" replace />} />
              <Route path="/" element={<Navigate to="/learning-companion" replace />} />
              
              {/* Main routes - no protection needed */}
              <Route path="/learning-companion" element={<Index />} />
              <Route path="/dashboard" element={<Navigate to="/learning-companion" replace />} />
              <Route path="/quest/:questId" element={<QuestPage />} />
              <Route path="/hackathon/:id" element={<HackathonDetails />} />
              <Route path="/hackathon/:id/mcq" element={<MCQRound />} />
              <Route path="/hackathon/:id/submission" element={<SubmissionRound />} />
              <Route path="/progress" element={<ProgressReport />} />
              <Route path="/weekly-wisdom-quiz" element={<WeeklyWisdomQuizPage />} />
              <Route path="/redeem-xp" element={<RedeemXP />} />

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
