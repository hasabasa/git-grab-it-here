
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Парсим тело запроса
    const { category, userId } = await req.json();
    
    if (!category) {
      return new Response(
        JSON.stringify({ error: "Category is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Создаем клиент Supabase с сервисным ключом для работы с БД
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // В реальном приложении здесь мы делали бы запрос к API Kaspi 
    // для получения данных по категории
    
    // Имитируем получение данных о нишах
    const nichesData = generateMockNichesData(category);
    
    // Сохраняем историю поиска в БД
    if (userId) {
      await supabase
        .from("niche_search_history")
        .insert([{
          user_id: userId, 
          category, 
          results_count: nichesData.length
        }])
        .select();
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: nichesData
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in search-niches function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Функция для генерации тестовых данных по нишам
function generateMockNichesData(category: string) {
  const niches = [];
  const count = Math.floor(Math.random() * 10) + 5;
  
  const competitions = ["Низкая", "Средняя", "Высокая"];
  
  for (let i = 0; i < count; i++) {
    const totalSales = Math.floor(Math.random() * 10000000) + 100000;
    const lowestPrice = Math.floor(Math.random() * 100000) + 5000;
    const sellersCount = Math.floor(Math.random() * 50) + 1;
    const competition = competitions[Math.floor(Math.random() * competitions.length)];
    
    // Генерируем данные за 6 месяцев для графика
    const chartData = [];
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    
    for (let month = 0; month < 6; month++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      chartData.push({
        month: currentDate.toISOString().substr(0, 7),
        sales: Math.floor(Math.random() * 1000000) + 100000
      });
    }
    
    niches.push({
      name: `${category} - Модель ${String.fromCharCode(65 + i)}`,
      category,
      totalSales,
      lowestPrice,
      sellersCount,
      competition,
      chartData
    });
  }
  
  return niches;
}
