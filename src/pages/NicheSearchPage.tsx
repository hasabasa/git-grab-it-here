
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import AuthComponent from "@/components/integration/AuthComponent";
import { Link } from "lucide-react";
import { useStoreConnection } from "@/hooks/useStoreConnection";
import ConnectStoreButton from "@/components/store/ConnectStoreButton";
import LoadingScreen from "@/components/ui/loading-screen";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useMobileResponsive } from "@/hooks/use-mobile-responsive";
import { cn } from "@/lib/utils";

const NicheSearchPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { isConnected, needsConnection, loading: storeLoading } = useStoreConnection();
  const { isMobile, isIPhoneMini, getMobileSpacing, getTouchTargetSize } = useMobileResponsive();
  const [productUrl, setProductUrl] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Show loading screen while authentication or stores are loading
  if (authLoading || storeLoading) {
    return <LoadingScreen text="Загрузка данных..." />;
  }

  // If user is not authenticated, show auth component
  if (!user) {
    return (
      <div className={cn("space-y-4 md:space-y-6", getMobileSpacing())}>
        <div>
          <h1 className={cn("text-2xl md:text-3xl font-bold", isMobile && "text-center")}>
            Анализ товаров
          </h1>
          <p className={cn("text-gray-600 mt-2", isMobile && "text-center text-sm")}>
            Для использования анализа товаров необходима авторизация
          </p>
        </div>
        <AuthComponent />
      </div>
    );
  }

  const analyzeProduct = async (url: string) => {
    if (!user) {
      toast.error("Для анализа товара необходимо авторизоваться");
      return;
    }

    if (!url.trim()) {
      toast.error("Введите ссылку на товар Kaspi");
      return;
    }

    // Проверяем, что это ссылка на Kaspi
    if (!url.includes('kaspi.kz')) {
      toast.error("Введите корректную ссылку на товар с Kaspi.kz");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Имитируем анализ товара (в реальном приложении здесь будет API вызов)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Имитация загрузки
      
      // Генерируем случайные данные для демонстрации
      const mockAnalysis = {
        productName: "Мышь Hoco GM21 черный",
        totalReviews: Math.floor(Math.random() * 50) + 5,
        estimatedSales: Math.floor(Math.random() * 200) + 50,
        periods: {
          month1: {
            reviews: Math.floor(Math.random() * 5) + 1,
            sales: Math.floor(Math.random() * 20) + 5
          },
          month3: {
            reviews: Math.floor(Math.random() * 10) + 3,
            sales: Math.floor(Math.random() * 60) + 30
          },
          month6: {
            reviews: Math.floor(Math.random() * 15) + 7,
            sales: Math.floor(Math.random() * 100) + 60
          },
          year1: {
            reviews: Math.floor(Math.random() * 20) + 10,
            sales: Math.floor(Math.random() * 150) + 80
          }
        }
      };
      
      setAnalysisResult(mockAnalysis);
      toast.success("Анализ товара завершен");
    } catch (error: any) {
      console.error("Error analyzing product:", error);
      toast.error("Ошибка при анализе товара: " + (error.message || ''));
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-4 md:space-y-6", getMobileSpacing())}>
      <div className={isMobile ? "text-center" : ""}>
        <h1 className="text-2xl md:text-3xl font-bold">Анализ товаров</h1>
        <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
          Анализ продаж и отзывов товаров на Kaspi по ссылке
        </p>
      </div>

      {!isConnected && (
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <AlertDescription className="text-blue-700 text-xs md:text-sm">
            <div className={cn("flex flex-col gap-3", !isMobile && "flex-row items-center justify-between")}>
              <span>Подключите магазин для расширенной аналитики и персонализированных рекомендаций</span>
              <ConnectStoreButton 
                variant="outline"
                size="sm"
                className={cn("border-blue-300 text-blue-700 hover:bg-blue-100", getTouchTargetSize())}
              />
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader className={cn("pb-3 md:pb-4", getMobileSpacing())}>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Link className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            <span className={isIPhoneMini ? "text-base" : ""}>Ссылка на товар Kaspi</span>
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Вставьте ссылку на товар для анализа продаж и отзывов
          </CardDescription>
        </CardHeader>
        <CardContent className={getMobileSpacing()}>
          <div className="grid gap-3 md:gap-4">
            <div className={cn("flex gap-2 md:gap-4", isMobile && "flex-col")}>
              <Input
                placeholder="https://kaspi.kz/shop/p/..."
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                disabled={isLoading}
                className={cn(
                  "flex-1 text-sm md:text-base h-11 md:h-10",
                  getTouchTargetSize()
                )}
              />
              
              <Button 
                onClick={() => analyzeProduct(productUrl)} 
                disabled={isLoading || !productUrl.trim()}
                className={cn(
                  "text-sm md:text-base font-medium",
                  getTouchTargetSize(),
                  isMobile && "w-full"
                )}
              >
                {isLoading ? "Анализируем..." : "Анализ"}
              </Button>
            </div>
            
            {isLoading && (
              <div className="flex justify-center py-6 md:py-8">
                <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary"></div>
              </div>
            )}

            {analysisResult && (
              <Card className="mt-4 md:mt-6">
                <CardHeader className={getMobileSpacing()}>
                  <CardTitle className="text-base md:text-lg">
                    📊 Статистика по товару: {analysisResult.productName}
                  </CardTitle>
                </CardHeader>
                <CardContent className={cn("space-y-3 md:space-y-4", getMobileSpacing())}>
                  <div className={cn("grid gap-3 md:gap-4", !isMobile && "grid-cols-2")}>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        🔹 Всего отзывов: <span className="font-bold">{analysisResult.totalReviews}</span>
                      </p>
                      <p className="text-sm font-medium">
                        🔹 Примерно продаж: <span className="font-bold">{analysisResult.estimatedSales}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6">
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">📅 По периодам:</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm md:text-base">▪️ 1 мес:</span>
                        <span className="text-sm md:text-base">
                          {analysisResult.periods.month1.reviews} (~{analysisResult.periods.month1.sales} продаж)
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm md:text-base">▪️ 3 мес:</span>
                        <span className="text-sm md:text-base">
                          {analysisResult.periods.month3.reviews} (~{analysisResult.periods.month3.sales} продаж)
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm md:text-base">▪️ 6 мес:</span>
                        <span className="text-sm md:text-base">
                          {analysisResult.periods.month6.reviews} (~{analysisResult.periods.month6.sales} продаж)
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm md:text-base">▪️ 1 год:</span>
                        <span className="text-sm md:text-base">
                          {analysisResult.periods.year1.reviews} (~{analysisResult.periods.year1.sales} продаж)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!analysisResult && !isLoading && (
              <div className="text-center p-8 md:p-10">
                <p className="text-gray-500 text-sm md:text-base">
                  Введите ссылку на товар Kaspi для начала анализа
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NicheSearchPage;
