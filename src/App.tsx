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
import MCQRound from "./components/MCQRound";
import SubmissionRound from "./components/SubmissionRound";
import WeeklyWisdomQuizPage from "./pages/WeeklyWisdomQuizPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
