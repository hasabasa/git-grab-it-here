import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header = ({
  toggleSidebar
}: HeaderProps) => {
  return <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      
      
      <div className="text-xl font-semibold text-gray-800">
        Kaspi Price
      </div>
      
      <div className="flex items-center gap-4">
        <SubscriptionBadge plan="free" daysLeft={0} />
        <Button variant="outline" size="sm">
          Помощь
        </Button>
        <Button size="sm">
          Настройки
        </Button>
      </div>
    </header>;
};
export default Header;