
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* All routes go through Index component which handles the navigation */}
          <Route path="/" element={<Index />}>
            <Route path="dashboard" element={null} />
            <Route path="banking" element={null} />
            <Route path="goals" element={null} />
            <Route path="chat" element={null} />
            <Route path="notifications" element={null} />
            <Route path="onboarding" element={null} />
            <Route path="goal-selection" element={null} />
            <Route path="budget" element={null} />
            <Route path="saving-recommendations" element={null} />
            <Route path="analytics" element={null} />
            <Route path="landing" element={null} />
            <Route path="login" element={null} />
          </Route>
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
