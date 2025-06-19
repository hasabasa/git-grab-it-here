
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { useScreenSize } from "@/hooks/use-screen-size";
import { StoreContextProvider } from "@/contexts/StoreContext";
import { ModuleConfigProvider } from "@/contexts/ModuleConfigContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMobile, isDesktop, isLargeDesktop, isExtraLargeDesktop } = useScreenSize();

  // Responsive sidebar widths
  const getSidebarWidth = () => {
    if (isMobile) return sidebarOpen ? "w-64" : "w-0";
    if (!sidebarOpen) return "w-16";
    if (isExtraLargeDesktop) return "w-80";
    if (isLargeDesktop) return "w-72";
    return "w-64";
  };

  const getMainMargin = () => {
    if (isMobile) return "ml-0";
    if (!sidebarOpen) return "ml-16";
    if (isExtraLargeDesktop) return "ml-80";
    if (isLargeDesktop) return "ml-72";
    return "ml-64";
  };

  const getMainPadding = () => {
    if (isMobile) return "p-4";
    if (isExtraLargeDesktop) return "p-8";
    if (isLargeDesktop) return "p-6";
    return "p-6";
  };

  const getMaxWidth = () => {
    if (isExtraLargeDesktop) return "max-w-none";
    if (isLargeDesktop) return "max-w-7xl mx-auto";
    return "max-w-6xl mx-auto";
  };

  return (
    <ModuleConfigProvider>
      <StoreContextProvider>
        <div className="min-h-screen bg-gray-50">
          <Sidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen}
            width={getSidebarWidth()}
          />
          
          <div className={cn(
            "transition-all duration-300 ease-in-out min-h-screen",
            getMainMargin()
          )}>
            <Header 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
              isMobile={isMobile}
              sidebarOpen={sidebarOpen}
            />
            <main className={cn(
              getMainPadding(),
              isDesktop && "min-h-[calc(100vh-80px)]"
            )}>
              <div className={cn(
                "w-full",
                getMaxWidth()
              )}>
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </StoreContextProvider>
    </ModuleConfigProvider>
  );
};

export default DashboardLayout;
