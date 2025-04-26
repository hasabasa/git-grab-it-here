
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import NicheSearchResults from "@/components/niche-search/NicheSearchResults";
import NicheChart from "@/components/niche-search/NicheChart";
import { mockNiches } from "@/data/mockData";

const NicheSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any | null>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search with mock data
    setTimeout(() => {
      const results = mockNiches.find(niche => 
        niche.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || null;
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Поиск ниш</h1>
      <p className="text-gray-600">
        Анализ спроса и предложения товаров на Kaspi
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Поиск товаров</CardTitle>
          <CardDescription>Введите название товара для анализа ниши</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Например: iPhone 13, Samsung TV, наушники..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Поиск..." : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Найти
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults && (
        <>
          <NicheSearchResults results={searchResults} />
          
          <Card>
            <CardHeader>
              <CardTitle>График спроса и предложения</CardTitle>
              <CardDescription>Динамика за последние 6 месяцев</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <NicheChart data={searchResults.chartData} />
            </CardContent>
          </Card>
        </>
      )}

      {searchQuery && !searchResults && !isSearching && (
        <div className="text-center p-10">
          <p className="text-gray-500">По вашему запросу ничего не найдено. Попробуйте другое название товара.</p>
        </div>
      )}
    </div>
  );
};

export default NicheSearchPage;
