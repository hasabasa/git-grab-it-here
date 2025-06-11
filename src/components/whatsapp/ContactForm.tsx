
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { WhatsAppContact } from "@/types";
import { X } from "lucide-react";

interface ContactFormProps {
  onSubmit: (contact: Omit<WhatsAppContact, 'id' | 'createdAt'>) => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    tags: [] as string[],
    status: "active" as const
  });
  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    onSubmit({
      ...formData,
      lastMessage: undefined,
      lastMessageDate: undefined
    });

    // Сброс формы
    setFormData({
      name: "",
      phone: "",
      company: "",
      tags: [],
      status: "active"
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Имя контакта *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Введите имя контакта"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Номер телефона *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="+7 777 123 45 67"
          required
        />
        <p className="text-xs text-muted-foreground">
          Введите номер в международном формате (например: +77771234567)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Компания (необязательно)</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          placeholder="Название компании"
        />
      </div>

      <div className="space-y-2">
        <Label>Теги</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Добавить тег"
          />
          <Button type="button" onClick={addTag} variant="outline">
            Добавить
          </Button>
        </div>
        
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">
          Добавить контакт
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
