import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMobileResponsive } from "@/hooks/use-mobile-responsive";
import { cn } from "@/lib/utils";

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
  const { isMobile, isIPhoneMini, getMobileSpacing, getTouchTargetSize } = useMobileResponsive();

  const handleConnectStore = () => {
    navigate("/dashboard/integrations");
  };

  if (variant === "card") {
    return (
      <Card className={cn(
        "text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
        getMobileSpacing(),
        className
      )}>
        <CardHeader className={cn("pb-4", isMobile && "pb-3")}>
          <div className={cn(
            "mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center",
            isMobile ? "w-12 h-12" : "w-16 h-16"
          )}>
            <Store className={cn("text-white", isMobile ? "h-6 w-6" : "h-8 w-8")} />
          </div>
          <CardTitle className={cn(
            "text-blue-900",
            isMobile ? "text-lg" : "text-xl"
          )}>
            {title}
          </CardTitle>
          <CardDescription className={cn(
            "text-blue-700 mx-auto",
            isMobile ? "text-sm max-w-sm" : "text-base max-w-md"
          )}>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={handleConnectStore}
            size={isMobile ? "default" : "lg"}
            className={cn(
              "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white",
              isMobile && "w-full text-xs px-3",
              getTouchTargetSize()
            )}
          >
            <Zap className={cn(isMobile ? "h-3 w-3 mr-1" : "h-5 w-5 mr-2")} />
            <span className={isMobile ? "text-xs" : "text-base"}>
              {isMobile ? "Подключить" : "Подключить магазин"}
            </span>
            <ArrowRight className={cn(isMobile ? "h-3 w-3 ml-1" : "h-5 w-5 ml-2")} />
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
      className={cn(
        className,
        variant === "default" && "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white",
        isMobile && "text-xs px-2",
        getTouchTargetSize()
      )}
    >
      <Store className={cn(isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2")} />
      <span className={isMobile ? "text-xs" : "text-base"}>
        {isMobile ? "Подключить" : "Подключить магазин"}
      </span>
      <ArrowRight className={cn(isMobile ? "h-3 w-3 ml-1" : "h-4 w-4 ml-2")} />
    </Button>
  );
};

export default ConnectStoreButton;
