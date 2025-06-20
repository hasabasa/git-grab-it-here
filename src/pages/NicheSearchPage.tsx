
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import { AuthComponent } from "@/components/integration/AuthComponent";
import { Link } from "lucide-react";

const NicheSearchPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [productUrl, setProductUrl] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для анализа товара по ссылке
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

  // Если идет загрузка аутентификации, показываем индикатор загрузки
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Если пользователь не авторизован, показываем компонент авторизации
  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Анализ товаров</h1>
        <p className="text-gray-600">Для использования анализа товаров необходима авторизация</p>
        <AuthComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Анализ товаров</h1>
      <p className="text-gray-600">
        Анализ продаж и отзывов товаров на Kaspi по ссылке
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Ссылка на товар Kaspi
          </CardTitle>
          <CardDescription>Вставьте ссылку на товар для анализа продаж и отзывов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <Input
                placeholder="https://kaspi.kz/shop/p/..."
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              
              <Button 
                onClick={() => analyzeProduct(productUrl)} 
                disabled={isLoading || !productUrl.trim()}
              >
                {isLoading ? "Анализируем..." : "Анализ"}
              </Button>
            </div>
            
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            {analysisResult && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>📊 Статистика по товару: {analysisResult.productName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">🔹 Всего отзывов: <span className="font-bold">{analysisResult.totalReviews}</span></p>
                      <p className="text-sm font-medium">🔹 Примерно продаж: <span className="font-bold">{analysisResult.estimatedSales}</span></p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">📅 По периодам:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">▪️ 1 мес:</span>
                        <span>{analysisResult.periods.month1.reviews} (~{analysisResult.periods.month1.sales} продаж)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">▪️ 3 мес:</span>
                        <span>{analysisResult.periods.month3.reviews} (~{analysisResult.periods.month3.sales} продаж)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">▪️ 6 мес:</span>
                        <span>{analysisResult.periods.month6.reviews} (~{analysisResult.periods.month6.sales} продаж)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">▪️ 1 год:</span>
                        <span>{analysisResult.periods.year1.reviews} (~{analysisResult.periods.year1.sales} продаж)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!analysisResult && !isLoading && (
              <div className="text-center p-10">
                <p className="text-gray-500">Введите ссылку на товар Kaspi для начала анализа</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NicheSearchPage;
