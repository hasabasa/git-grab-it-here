
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Welcome from "./pages/Welcome";
import PriceBotPage from "./pages/PriceBotPage";
import SalesPage from "./pages/SalesPage";
import UnitEconomicsPage from "./pages/UnitEconomicsPage";
import CrmPage from "./pages/CrmPage";
import NicheSearchPage from "./pages/NicheSearchPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import IntegrationPage from "./pages/IntegrationPage";
import NotFound from "./pages/NotFound";
import { MotionConfig } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Инициализация Supabase клиента при загрузке приложения
  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Проверяем текущую сессию
        const { data } = await supabase.auth.getSession();
        console.log("Supabase initialized, session:", data?.session ? "active" : "none");
      } catch (error) {
        console.error("Error initializing Supabase:", error);
      }
    };

    initializeSupabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route element={<DashboardLayout />}>
                <Route path="/price-bot" element={<PriceBotPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/unit-economics" element={<UnitEconomicsPage />} />
                <Route path="/crm" element={<CrmPage />} />
                <Route path="/niche-search" element={<NicheSearchPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/integrations" element={<IntegrationPage />} />
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
