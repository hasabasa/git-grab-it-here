
import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/integration/useAuth";

interface SubscriptionBadgeProps {
  plan?: "free" | "pro";
  daysLeft?: number;
}

const SubscriptionBadge = ({ 
  plan = "free", 
  daysLeft = 0 
}: SubscriptionBadgeProps) => {
  const { isDemo } = useAuth();

  const getPlanDetails = () => {
    if (isDemo) {
      return {
        label: "Демо",
        color: "bg-gray-200",
        textColor: "text-gray-700"
      };
    }
    
    switch(plan) {
      case "pro":
        return {
          label: "Pro",
          color: "bg-gradient-to-r from-purple-500 to-blue-500",
          textColor: "text-white"
        };
      default:
        return {
          label: "Free",
          color: "bg-blue-100",
          textColor: "text-blue-700"
        };
    }
  };

  const { label, color, textColor } = getPlanDetails();

  const getTooltipText = () => {
    if (isDemo) {
      return "Демо режим - данные не сохраняются";
    }
    return plan === "free" ? 
      "Подключите Pro план для полного доступа" : 
      `Ваш тариф: ${label}. Осталось: ${daysLeft} дн.`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/dashboard/subscription">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 hover:bg-gray-100"
            >
              <Crown className="h-4 w-4 text-amber-500" />
              <Badge className={`${color} ${textColor}`}>
                {label}
              </Badge>
              {plan === "pro" && daysLeft > 0 && !isDemo && (
                <span className="text-xs text-gray-500 ml-1">
                  {daysLeft} дн.
                </span>
              )}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          {getTooltipText()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionBadge;
