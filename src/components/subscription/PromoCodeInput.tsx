
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { Gift, Loader2 } from "lucide-react";

const PromoCodeInput = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const { applyPromoCode } = useProfile();

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error("Введите промокод");
      return;
    }

    setIsApplying(true);
    try {
      const result = await applyPromoCode(promoCode.trim().toUpperCase());
      
      if (result.success) {
        toast.success(result.message || "Промокод успешно применен!");
        setPromoCode("");
      } else {
        toast.error(result.error || "Ошибка при применении промокода");
      }
    } catch (error) {
      toast.error("Произошла ошибка при применении промокода");
    } finally {
      setIsApplying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyPromoCode();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="promoCode" className="flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Промокод
        </Label>
        <div className="flex gap-2">
          <Input
            id="promoCode"
            placeholder="Введите промокод"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            disabled={isApplying}
            className="flex-1"
          />
          <Button 
            onClick={handleApplyPromoCode}
            disabled={isApplying || !promoCode.trim()}
            className="px-6"
          >
            {isApplying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Применить"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeInput;
