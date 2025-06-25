
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UnitEconomicsForm from "@/components/unit-economics/UnitEconomicsForm";
import UnitEconomicsResults from "@/components/unit-economics/UnitEconomicsResults";
import { KaspiCommission, DeliveryRate } from "@/types";
import { calculateDeliveryCost, calculateCommission } from "@/lib/economicsUtils";
import { mockGoldCommissions, mockRedKreditCommissions, mockInstallmentCommissions } from "@/data/mockData";
import { useStoreConnection } from "@/hooks/useStoreConnection";
import ConnectStoreButton from "@/components/store/ConnectStoreButton";
import LoadingScreen from "@/components/ui/loading-screen";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const UnitEconomicsPage = () => {
  const { isConnected, loading: storeLoading } = useStoreConnection();
  const [unitData, setUnitData] = useState({
    costPrice: 10000,
    sellingPrice: 15000,
    category: "Электроника",
    weight: 1,
    deliveryScope: "По городу",
    paymentType: "Gold",
  });

  const [results, setResults] = useState({
    costPrice: 10000,
    sellingPrice: 15000,
    commission: 0,
    commissionPercent: 0,
    deliveryCost: 0,
    profit: 0,
  });

  useEffect(() => {
    const commissionPercent = calculateCommission(
      unitData.category,
      unitData.paymentType,
      mockGoldCommissions,
      mockRedKreditCommissions,
      mockInstallmentCommissions
    );

    const commissionAmount = (unitData.sellingPrice * commissionPercent) / 100;
    
    const deliveryCost = calculateDeliveryCost(
      unitData.sellingPrice,
      unitData.weight,
      unitData.deliveryScope
    );

    const profit = unitData.sellingPrice - unitData.costPrice - commissionAmount - deliveryCost;

    setResults({
      costPrice: unitData.costPrice,
      sellingPrice: unitData.sellingPrice,
      commission: commissionAmount,
      commissionPercent: commissionPercent,
      deliveryCost: deliveryCost,
      profit: profit,
    });
  }, [unitData]);

  // Show loading screen while stores are loading
  if (storeLoading) {
    return <LoadingScreen text="Загрузка данных..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Юнит-экономика</h1>
        <p className="text-gray-600">
          Рассчитайте прибыль с учетом комиссий и стоимости доставки Kaspi
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Параметры товара</CardTitle>
            <CardDescription>Введите данные для расчета</CardDescription>
          </CardHeader>
          <CardContent>
            <UnitEconomicsForm 
              data={unitData} 
              onChange={setUnitData} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Результаты расчета</CardTitle>
            <CardDescription>Прибыль и расходы</CardDescription>
          </CardHeader>
          <CardContent>
            <UnitEconomicsResults results={results} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitEconomicsPage;
