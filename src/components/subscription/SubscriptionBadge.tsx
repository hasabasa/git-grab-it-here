
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
import { useProfile } from "@/hooks/useProfile";

const SubscriptionBadge = () => {
  const { isDemo } = useAuth();
  const { subscriptionStatus } = useProfile();

  const getPlanDetails = () => {
    if (isDemo) {
      return {
        label: "Демо",
        color: "bg-gray-200",
        textColor: "text-gray-700"
      };
    }
    
    if (subscriptionStatus.status === 'expired') {
      return {
        label: "Истек",
        color: "bg-red-100",
        textColor: "text-red-700"
      };
    }
    
    if (subscriptionStatus.isActive) {
      return {
        label: "Free",
        color: "bg-green-100",
        textColor: "text-green-700"
      };
    }
    
    return {
      label: "Free",
      color: "bg-blue-100",
      textColor: "text-blue-700"
    };
  };

  const { label, color, textColor } = getPlanDetails();

  const getTooltipText = () => {
    if (isDemo) {
      return "Демо режим - данные не сохраняются";
    }
    
    if (subscriptionStatus.status === 'expired') {
      return "Пробный период истек. Подключите Pro план для продолжения работы";
    }
    
    if (subscriptionStatus.isActive) {
      return `Пробный период. Осталось: ${subscriptionStatus.daysLeft} дн.`;
    }
    
    return "Подключите Pro план для полного доступа";
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
              {subscriptionStatus.isActive && subscriptionStatus.daysLeft > 0 && !isDemo && (
                <span className="text-xs text-gray-500 ml-1">
                  {subscriptionStatus.daysLeft} дн.
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
