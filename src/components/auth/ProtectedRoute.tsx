
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/integration/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isDemo } = useAuth();
  const location = useLocation();

  // Check localStorage directly as backup
  const isDemoFromStorage = localStorage.getItem('kaspi-demo-mode') === 'true';
  const isUserAuthenticated = !!user;
  const isDemoActive = isDemo || isDemoFromStorage;

  useEffect(() => {
    console.log("ProtectedRoute: State check - user:", isUserAuthenticated, "loading:", loading, "isDemo:", isDemo, "localStorage:", isDemoFromStorage);
  }, [user, loading, isDemo, isUserAuthenticated, isDemoFromStorage]);

  // Show loading only if we're actually loading auth and not in demo mode
  if (loading && !isDemoActive) {
    console.log("ProtectedRoute: Loading auth state...");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  // Allow access if user is authenticated OR in demo mode
  if (!isUserAuthenticated && !isDemoActive) {
    console.log("ProtectedRoute: Access denied - redirecting to auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute: Access granted - authenticated:", isUserAuthenticated, "demo:", isDemoActive);
  return <>{children}</>;
};

export default ProtectedRoute;
