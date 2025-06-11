
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/integration/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isDemo } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute: user:", !!user, "loading:", loading, "isDemo:", isDemo, "localStorage demo:", localStorage.getItem('kaspi-demo-mode'));
  }, [user, loading, isDemo]);

  // Check localStorage directly for demo mode as backup
  const isDemoFromStorage = localStorage.getItem('kaspi-demo-mode') === 'true';

  // If still loading and not in demo mode, show loading screen
  if (loading && !isDemo && !isDemoFromStorage) {
    console.log("ProtectedRoute: Still loading...");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  // Allow access if user is authenticated OR in demo mode (from state or localStorage)
  if (!user && !isDemo && !isDemoFromStorage) {
    console.log("ProtectedRoute: Redirecting to auth - no user and not demo");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute: Access granted - user:", !!user, "isDemo:", isDemo, "isDemoFromStorage:", isDemoFromStorage);
  return <>{children}</>;
};

export default ProtectedRoute;
