
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
    const { storeId, apiKey } = await req.json();
    
    if (!storeId) {
      return new Response(
        JSON.stringify({ error: "Store ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Создаем клиент Supabase с сервисным ключом для работы с БД
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Получаем информацию о магазине
    const { data: store, error: storeError } = await supabase
      .from("kaspi_stores")
      .select("*")
      .eq("id", storeId)
      .single();
      
    if (storeError) {
      throw new Error(`Error fetching store: ${storeError.message}`);
    }
    
    // В реальном приложении здесь бы мы делали запрос к API Kaspi 
    // для получения товаров, используя store.merchant_id и apiKey
    
    // Имитируем получение товаров с Kaspi
    const mockProducts = generateMockProducts(store.merchant_id, 10);
    
    // Сохраняем товары в БД
    for (const product of mockProducts) {
      // Проверяем, существует ли товар уже в БД
      const { data: existingProduct } = await supabase
        .from("products")
        .select("*")
        .eq("kaspi_product_id", product.kaspi_product_id)
        .eq("store_id", storeId)
        .maybeSingle();
        
      if (existingProduct) {
        // Обновляем существующий товар
        await supabase
          .from("products")
          .update({
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            category: product.category,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingProduct.id);
      } else {
        // Создаем новый товар
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert([{
            store_id: storeId,
            kaspi_product_id: product.kaspi_product_id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            category: product.category,
            bot_active: false,
            min_profit: 1000,
            max_profit: 10000
          }])
          .select()
          .single();
          
        if (insertError) {
          console.error(`Error inserting product: ${insertError.message}`);
          continue;
        }
        
        // Создаем конкурентов для товара
        const competitors = generateMockCompetitors(newProduct.id, 5);
        for (const competitor of competitors) {
          await supabase
            .from("competitors")
            .insert([competitor]);
        }
      }
    }
    
    // Обновляем информацию о последней синхронизации
    await supabase
      .from("kaspi_stores")
      .update({
        products_count: mockProducts.length,
        last_sync: new Date().toISOString()
      })
      .eq("id", storeId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully synced ${mockProducts.length} products` 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in sync-products function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Вспомогательные функции для генерации тестовых данных
function generateMockProducts(merchantId: string, count: number) {
  const categories = ["Электроника", "Бытовая техника", "Смартфоны", "Ноутбуки", "Аксессуары"];
  const products = [];
  
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 100000) + 5000;
    
    products.push({
      kaspi_product_id: `PROD-${merchantId}-${i}`,
      name: `${category} - Модель X${i}`,
      price,
      image_url: `https://picsum.photos/id/${i + 100}/200/200`,
      category
    });
  }
  
  return products;
}

function generateMockCompetitors(productId: string, count: number) {
  const competitors = [];
  const sellerNames = ["MegaShop", "TechStore", "GadgetMart", "ElectroWorld", "SmartZone"];
  
  for (let i = 0; i < count; i++) {
    const basePrice = Math.floor(Math.random() * 100000) + 5000;
    const priceChange = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 1000);
    
    competitors.push({
      product_id: productId,
      name: `Конкурент ${i + 1}`,
      price: basePrice,
      price_change: priceChange,
      rating: (Math.random() * 4 + 1).toFixed(1),
      has_delivery: Math.random() > 0.5,
      seller_name: sellerNames[Math.floor(Math.random() * sellerNames.length)]
    });
  }
  
  return competitors;
}
