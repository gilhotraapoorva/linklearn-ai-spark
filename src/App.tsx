import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HackathonDetails from "./pages/HackathonDetails";
import ProgressReport from "./pages/ProgressReport";
import NotFound from "./pages/NotFound";
import QuestPage from "./pages/DailyQuest";
import MCQRound from "./pages/MCQRound";
import SubmissionRound from "./pages/SubmissionRound";
import WeeklyWisdomQuizPage from "./pages/WeeklyWisdomQuizPage";
import RedeemXP from "./pages/RedeemXP";
import AuthDemo from "./pages/AuthDemo";
import { UserProvider } from "./lib/UserContext";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quest/:questId" element={<QuestPage />} />
            <Route path="/hackathon/:id" element={<HackathonDetails />} />
            <Route path="/hackathon/:id/mcq" element={<MCQRound />} />
            <Route path="/hackathon/:id/submission" element={<SubmissionRound />} />
            <Route path="/progress" element={<ProgressReport />} />
            <Route path="/weekly-wisdom-quiz" element={<WeeklyWisdomQuizPage />} />
            <Route path="/redeem-xp" element={<RedeemXP />} />
            <Route path="/auth-demo" element={<AuthDemo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
