
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Welcome from "./pages/Welcome";
import AuthPage from "./pages/AuthPage";
import PriceBotPage from "./pages/PriceBotPage";
import SalesPage from "./pages/SalesPage";
import UnitEconomicsPage from "./pages/UnitEconomicsPage";
import CrmPage from "./pages/CrmPage";
import NicheSearchPage from "./pages/NicheSearchPage";
import PreordersPage from "./pages/PreordersPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import IntegrationPage from "./pages/IntegrationPage";
import WhatsAppPage from "./pages/WhatsAppPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { MotionConfig } from "framer-motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/auth" element={<AuthPage />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="price-bot" replace />} />
                <Route path="price-bot" element={<PriceBotPage />} />
                <Route path="sales" element={<SalesPage />} />
                <Route path="unit-economics" element={<UnitEconomicsPage />} />
                <Route path="crm" element={<CrmPage />} />
                <Route path="niche-search" element={<NicheSearchPage />} />
                <Route path="preorders" element={<PreordersPage />} />
                <Route path="whatsapp" element={<WhatsAppPage />} />
                <Route path="subscription" element={<SubscriptionPage />} />
                <Route path="integrations" element={<IntegrationPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
};

export default App;
