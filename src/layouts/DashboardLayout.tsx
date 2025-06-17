
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : (sidebarOpen ? "ml-64" : "ml-16")
      )}>
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />
        <main className={cn(
          "p-6",
          isMobile && "p-4"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
