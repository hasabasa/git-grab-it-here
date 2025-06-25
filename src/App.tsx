
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Welcome from "@/pages/Welcome";
import AuthPage from "@/pages/AuthPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AdminOverviewPage from "@/pages/admin/AdminOverviewPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminPartnersPage from "@/pages/admin/AdminPartnersPage";
import AdminSystemPage from "@/pages/admin/AdminSystemPage";
import PriceBotPage from "@/pages/PriceBotPage";
import SalesPage from "@/pages/SalesPage";
import TasksPage from "@/pages/TasksPage";
import UnitEconomicsPage from "@/pages/UnitEconomicsPage";
import NicheSearchPage from "@/pages/NicheSearchPage";
import PreordersPage from "@/pages/PreordersPage";
import WhatsAppPage from "@/pages/WhatsAppPage";
import IntegrationPage from "@/pages/IntegrationPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/price-bot" replace />} />
            <Route path="price-bot" element={<PriceBotPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="unit-economics" element={<UnitEconomicsPage />} />
            <Route path="niche-search" element={<NicheSearchPage />} />
            <Route path="preorders" element={<PreordersPage />} />
            <Route path="whatsapp" element={<WhatsAppPage />} />
            <Route path="integration" element={<IntegrationPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/overview" replace />} />
            <Route path="overview" element={<AdminOverviewPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="partners" element={<AdminPartnersPage />} />
            <Route path="system" element={<AdminSystemPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
