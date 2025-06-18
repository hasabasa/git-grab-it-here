
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { X, Sparkles } from "lucide-react";

interface DemoContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DemoContactForm = ({ isOpen, onClose, onSuccess }: DemoContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    setIsSubmitting(true);

    try {
      // Функция для генерации текущей даты и времени
      const getFormattedDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
        const time = now.toTimeString().split(" ")[0].slice(0,5); // HH:mm
        return `${date} ${time}`;
      };

      // Данные для отправки
      const data = {
        name: name.trim(),
        phone: phone.trim(),
        date: getFormattedDateTime()
      };

      // Отправляем данные в SheetDB API
      const response = await fetch("https://sheetdb.io/api/v1/i6w7xjkxeinb8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: data })
      });

      if (response.ok) {
        console.log('Данные отправлены:', data);
        
        toast.success("Спасибо! Данные отправлены. Открываем демо-режим...");
        
        // Небольшая задержка для показа уведомления
        setTimeout(() => {
          onSuccess();
          onClose();
          // Сбрасываем форму
          setName("");
          setPhone("");
        }, 1000);
      } else {
        throw new Error("Ошибка при отправке");
      }

    } catch (error) {
      console.error('Ошибка отправки данных:', error);
      toast.error("Произошла ошибка. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Доступ к демо-версии
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className="text-base">
              Оставьте свои контакты для доступа к демо
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Мы используем эти данные только для демонстрации возможностей системы
            </p>
          </CardHeader>
          
          <CardContent className="px-0 pb-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Имя *</Label>
                <Input
                  id="demo-name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="demo-phone">Номер телефона *</Label>
                <Input
                  id="demo-phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Получить доступ к демо"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-xs text-muted-foreground text-center">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoContactForm;
