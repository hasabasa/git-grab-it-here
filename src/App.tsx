
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route element={<DashboardLayout />}>
            <Route path="/price-bot" element={<PriceBotPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/unit-economics" element={<UnitEconomicsPage />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/niche-search" element={<NicheSearchPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
