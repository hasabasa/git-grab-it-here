
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth } from "./components/integration/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Компонент для защиты маршрутов, требующих авторизации
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Показываем индикатор загрузки во время проверки аутентификации
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Если пользователь не аутентифицирован, перенаправляем на страницу приветствия
  if (!user) {
    return <Navigate to="/" />;
  }

  // Если пользователь аутентифицирован, показываем защищенный маршрут
  return <>{children}</>;
};

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
                <Route 
                  path="/price-bot" 
                  element={
                    <ProtectedRoute>
                      <PriceBotPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/sales" 
                  element={
                    <ProtectedRoute>
                      <SalesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/unit-economics" 
                  element={
                    <ProtectedRoute>
                      <UnitEconomicsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/crm" 
                  element={
                    <ProtectedRoute>
                      <CrmPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/niche-search" 
                  element={
                    <ProtectedRoute>
                      <NicheSearchPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/subscription" 
                  element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/integrations" 
                  element={
                    <ProtectedRoute>
                      <IntegrationPage />
                    </ProtectedRoute>
                  } 
                />
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
