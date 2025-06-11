
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
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate("/dashboard");
        console.log("Navigation to dashboard completed");
      }, 100);
    } catch (error) {
      console.error("Error entering demo mode:", error);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="lg" 
      className="w-full text-base py-4 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
      onClick={handleDemoClick}
    >
      <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
      Попробовать демо
    </Button>
  );
};

export default DemoModeButton;
