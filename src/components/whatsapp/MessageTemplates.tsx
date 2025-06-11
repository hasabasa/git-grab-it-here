
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageTemplate } from "@/types";
import { Plus, Edit2, Trash2, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface MessageTemplatesProps {
  templates: MessageTemplate[];
  onTemplatesChange: (templates: MessageTemplate[]) => void;
}

const MessageTemplates = ({ templates, onTemplatesChange }: MessageTemplatesProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    category: "Общие",
    isDefault: false
  });

  const categories = ["Общие", "Приветствие", "Заказы", "Оплата", "Доставка", "Поддержка"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    if (editingTemplate) {
      // Редактирование существующего шаблона
      const updatedTemplates = templates.map(template =>
        template.id === editingTemplate.id
          ? { ...template, ...formData }
          : template
      );
      onTemplatesChange(updatedTemplates);
      toast.success("Шаблон обновлен");
    } else {
      // Создание нового шаблона
      const newTemplate: MessageTemplate = {
        ...formData,
        id: Date.now().toString()
      };
      onTemplatesChange([...templates, newTemplate]);
      toast.success("Шаблон создан");
    }

    // Сброс формы
    setFormData({
      name: "",
      content: "",
      category: "Общие",
      isDefault: false
    });
    setEditingTemplate(null);
    setIsFormOpen(false);
  };

  const handleEdit = (template: MessageTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      content: template.content,
      category: template.category,
      isDefault: template.isDefault
    });
    setIsFormOpen(true);
  };

  const handleDelete = (templateId: string) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    onTemplatesChange(updatedTemplates);
    toast.success("Шаблон удален");
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Текст скопирован в буфер обмена");
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, MessageTemplate[]>);

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопка добавления */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Шаблоны сообщений</h2>
          <p className="text-muted-foreground">
            Создавайте и управляйте шаблонами для быстрой отправки сообщений
          </p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setEditingTemplate(null);
            setFormData({
              name: "",
              content: "",
              category: "Общие",
              isDefault: false
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить шаблон
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Редактировать шаблон" : "Новый шаблон"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название шаблона *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Введите название"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Текст сообщения *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Введите текст сообщения..."
                  className="min-h-[100px]"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Можно использовать переменные: {"{order_number}"}, {"{amount}"}, {"{name}"}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">
                  {editingTemplate ? "Сохранить" : "Создать"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Список шаблонов по категориям */}
      {Object.keys(groupedTemplates).length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">Нет шаблонов</h3>
            <p className="text-muted-foreground text-center">
              Создайте первый шаблон для быстрой отправки сообщений
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-3">{category}</h3>
              <div className="grid gap-4">
                {categoryTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          {template.isDefault && (
                            <Badge variant="secondary">По умолчанию</Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(template.content)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(template)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(template.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {template.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageTemplates;
