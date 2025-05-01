
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import BankConnection from "./components/BankConnection";
import GoalTracker from "./components/GoalTracker";
import ChatInterface from "./components/ChatInterface";
import NotificationSettings from "./components/NotificationSettings";
import OnboardingCarousel from "./components/OnboardingCarousel";
import GoalSelection from "./components/GoalSelection";
import BudgetAndExpenses from "./components/BudgetAndExpenses";
import SavingRecommendations from "./components/SavingRecommendations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/banking" element={<BankConnection />} />
          <Route path="/goals" element={<GoalTracker />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/notifications" element={<NotificationSettings />} />
          <Route path="/onboarding" element={<OnboardingCarousel />} />
          <Route path="/goal-selection" element={<GoalSelection />} />
          <Route path="/budget" element={<BudgetAndExpenses />} />
          <Route path="/saving-recommendations" element={<SavingRecommendations />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
