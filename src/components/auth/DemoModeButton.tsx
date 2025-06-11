
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/components/integration/useAuth";

const DemoModeButton = () => {
  const navigate = useNavigate();
  const { enterDemoMode } = useAuth();

  const handleDemoClick = async () => {
    console.log("DemoModeButton: Demo button clicked");
    
    try {
      // Enter demo mode and wait for state to be set
      console.log("DemoModeButton: Entering demo mode...");
      await enterDemoMode();
      
      console.log("DemoModeButton: Demo mode entered, navigating to dashboard");
      
      // Navigate after demo mode is properly set
      navigate("/dashboard");
      
      console.log("DemoModeButton: Navigation completed");
    } catch (error) {
      console.error("DemoModeButton: Error entering demo mode:", error);
    }
  };

  return (
    <Button 
      size="lg" 
      className="w-full text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 min-h-[48px] border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
      variant="outline"
      onClick={handleDemoClick}
    >
      <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
      <span className="truncate">Попробовать демо</span>
    </Button>
  );
};

export default DemoModeButton;
