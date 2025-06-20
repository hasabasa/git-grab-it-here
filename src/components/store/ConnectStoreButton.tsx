
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConnectStoreButtonProps {
  title?: string;
  description?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "card";
}

const ConnectStoreButton = ({
  title = "Подключите магазин",
  description = "Для работы с этим модулем необходимо подключить ваш магазин Kaspi.kz",
  className = "",
  size = "default",
  variant = "card"
}: ConnectStoreButtonProps) => {
  const navigate = useNavigate();

  const handleConnectStore = () => {
    navigate("/dashboard/integrations");
  };

  if (variant === "card") {
    return (
      <Card className={`text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 ${className}`}>
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Store className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl text-blue-900">{title}</CardTitle>
          <CardDescription className="text-blue-700 max-w-md mx-auto">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={handleConnectStore}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          >
            <Zap className="h-5 w-5 mr-2" />
            Подключить магазин
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button 
      onClick={handleConnectStore}
      size={size}
      variant={variant === "outline" ? "outline" : "default"}
      className={`${className} ${variant === "default" ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white" : ""}`}
    >
      <Store className="h-4 w-4 mr-2" />
      Подключить магазин
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  );
};

export default ConnectStoreButton;
