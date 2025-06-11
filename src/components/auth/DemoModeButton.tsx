
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/components/integration/useAuth";

const DemoModeButton = () => {
  const navigate = useNavigate();
  const { enterDemoMode } = useAuth();

  const handleDemoClick = () => {
    console.log("Demo button clicked");
    try {
      // Enter demo mode immediately
      enterDemoMode();
      console.log("Demo mode entered, navigating immediately...");
      
      // Navigate to dashboard
      navigate("/dashboard");
      console.log("Navigation to dashboard completed");
    } catch (error) {
      console.error("Error entering demo mode:", error);
    }
  };

  return (
    <Button 
      size="lg" 
      className="w-full text-base sm:text-lg py-5 sm:py-6 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
      variant="outline"
      onClick={handleDemoClick}
    >
      <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
      Попробовать демо
    </Button>
  );
};

export default DemoModeButton;
