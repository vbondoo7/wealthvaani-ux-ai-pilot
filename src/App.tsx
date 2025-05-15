
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketing from "./pages/Marketing";
import { LanguageProvider } from "./contexts/LanguageContext";
import BlogSection from "./components/blog/BlogSection";
import BlogPost from "./components/blog/BlogPost";
import BlogAdminPanel from "./components/blog/BlogAdminPanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton={true} />
        <BrowserRouter>
          <Routes>
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
              <Route path="signup" element={null} />
              <Route path="profile" element={null} />
              <Route path="saved-nudges" element={null} />
              <Route path="transactions" element={null} />
              <Route path="subscription" element={null} />
              <Route path="advisor" element={null} />
              <Route path="festival-planning" element={null} />
              <Route path="investment-intelligence" element={null} />
              <Route path="family-management" element={null} />
              <Route path="learning-center" element={null} />
              <Route index element={<Navigate to="/landing" replace />} />
            </Route>
            
            {/* Marketing Landing Page and Blog */}
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/admin" element={<BlogAdminPanel />} />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
