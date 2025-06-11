
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
      enterDemoMode();
      console.log("Demo mode entered, navigating...");
      // Navigate immediately after setting demo mode
      navigate("/dashboard");
      console.log("Navigation to dashboard completed");
    } catch (error) {
      console.error("Error entering demo mode:", error);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="lg" 
      className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[48px]"
      onClick={handleDemoClick}
    >
      <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
      <span className="truncate">Попробовать демо</span>
    </Button>
  );
};

export default DemoModeButton;
