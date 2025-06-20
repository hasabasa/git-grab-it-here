
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/components/integration/useAuth";
import DemoContactForm from "@/components/demo/DemoContactForm";

const DemoModeButton = () => {
  const navigate = useNavigate();
  const { enterDemoMode } = useAuth();
  const [showContactForm, setShowContactForm] = useState(false);

  const handleDemoClick = async (e: React.MouseEvent) => {
    console.log("DemoModeButton: Кнопка нажата!");
    
    // Предотвращаем стандартное поведение
    e.preventDefault();
    e.stopPropagation();
    
    // Показываем форму для ввода контактов
    setShowContactForm(true);
  };

  const handleDirectDemoEntry = async () => {
    try {
      console.log("DemoModeButton: Прямой вход в демо режим без формы...");
      
      // Входим в демо режим и ждем завершения
      await enterDemoMode();
      
      console.log("DemoModeButton: Демо режим активирован, переходим на dashboard");
      
      // Принудительная навигация
      window.location.href = "/dashboard";
      
      console.log("DemoModeButton: Навигация завершена");
    } catch (error) {
      console.error("DemoModeButton: Ошибка при входе в демо режим:", error);
    }
  };

  const handleContactFormSuccess = async () => {
    try {
      console.log("DemoModeButton: Контакты собраны, запускаем демо режим...");
      
      // Отмечаем, что форма была заполнена
      localStorage.setItem('kaspi-demo-form-filled', 'true');
      
      // Входим в демо режим и ждем завершения
      await enterDemoMode();
      
      console.log("DemoModeButton: Демо режим активирован, переходим на dashboard");
      
      // Принудительная навигация
      window.location.href = "/dashboard";
      
      console.log("DemoModeButton: Навигация завершена");
    } catch (error) {
      console.error("DemoModeButton: Ошибка при входе в демо режим:", error);
    }
  };

  return (
    <>
      <Button 
        size="lg" 
        className="w-full text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 min-h-[48px] border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
        variant="outline"
        onClick={handleDemoClick}
        type="button"
      >
        <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
        <span className="truncate">Попробовать демо</span>
      </Button>
      
      <DemoContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        onSuccess={handleContactFormSuccess}
      />
    </>
  );
};

export default DemoModeButton;
