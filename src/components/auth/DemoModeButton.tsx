
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/components/integration/useAuth";

const DemoModeButton = () => {
  const navigate = useNavigate();
  const { enterDemoMode } = useAuth();

  const handleDemoClick = () => {
    enterDemoMode();
    navigate("/dashboard");
  };

  return (
    <Button 
      variant="outline" 
      size="lg" 
      className="w-full text-lg py-6 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
      onClick={handleDemoClick}
    >
      <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
      Попробовать демо
    </Button>
  );
};

export default DemoModeButton;
