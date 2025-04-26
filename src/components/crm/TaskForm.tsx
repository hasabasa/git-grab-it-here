
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
}

const taskTypes = [
  { value: "call", label: "Позвонить клиенту" },
  { value: "followup", label: "Напомнить о брошенной корзине" },
  { value: "delivery", label: "Позвонить после доставки" },
  { value: "crosssell", label: "Предложить кросс-продажу" },
  { value: "custom", label: "Другое" },
];

const reminderTypes = [
  { value: "none", label: "Нет напоминаний" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "push", label: "Push-уведомление" },
];

const TaskForm = ({ isOpen, onClose, onSave, task }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [client, setClient] = useState(task?.client || "");
  const [taskType, setTaskType] = useState(task?.type || "call");
  const [reminderType, setReminderType] = useState(task?.reminderType || "none");
  const [dueDate, setDueDate] = useState<Date | undefined>(task?.dueDate ? new Date(task?.dueDate) : undefined);
  const [isCustomType, setIsCustomType] = useState(task?.type === "custom");

  const handleTaskTypeChange = (value: string) => {
    setTaskType(value);
    setIsCustomType(value === "custom");
    
    // Preset title based on task type
    if (value !== "custom") {
      const selectedType = taskTypes.find(t => t.value === value);
      if (selectedType) {
        setTitle(selectedType.label);
      }
    } else {
      setTitle("");
    }
  };

  const handleSubmit = () => {
    const newTask: Task = {
      id: task?.id || 0,
      title,
      description,
      client,
      type: taskType,
      reminderType,
      dueDate: dueDate?.toISOString(),
      status: "pending",
      createdAt: task?.createdAt || new Date().toISOString(),
    };
    
    onSave(newTask);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{task ? "Редактировать задачу" : "Добавить задачу"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="taskType">Тип задачи</Label>
            <Select value={taskType} onValueChange={handleTaskTypeChange}>
              <SelectTrigger id="taskType">
                <SelectValue placeholder="Выберите тип задачи" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isCustomType && (
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Введите название задачи" 
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Что нужно сделать?" 
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Клиент</Label>
            <Input 
              id="client" 
              value={client} 
              onChange={(e) => setClient(e.target.value)} 
              placeholder="Имя клиента или номер заказа" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Срок выполнения</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dueDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderType">Напоминание</Label>
              <Select value={reminderType} onValueChange={setReminderType}>
                <SelectTrigger id="reminderType">
                  <SelectValue placeholder="Выберите тип напоминания" />
                </SelectTrigger>
                <SelectContent>
                  {reminderTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
