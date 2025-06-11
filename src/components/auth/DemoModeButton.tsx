
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
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
      className="w-full text-lg py-6"
      onClick={handleDemoClick}
    >
      <Play className="mr-2 h-5 w-5" />
      Попробовать демо
    </Button>
  );
};

export default DemoModeButton;
