
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description?: string; deadline?: string }) => void;
  isLoading?: boolean;
}

const TaskForm = ({ isOpen, onClose, onSave, isLoading }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>();
  const isMobile = useIsMobile();

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      deadline: deadline?.toISOString() || undefined,
    };
    
    onSave(taskData);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDeadline(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] h-[90vh] max-h-[90vh] overflow-y-auto' : 'max-w-lg'}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className={isMobile ? 'text-lg' : ''}>
            Создать новую задачу
          </DialogTitle>
        </DialogHeader>
        
        <div className={`space-y-4 ${isMobile ? 'py-2' : 'py-4'}`}>
          <div className="space-y-2">
            <Label htmlFor="title" className={isMobile ? 'text-sm' : ''}>
              Название задачи *
            </Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Введите название задачи"
              className={isMobile ? 'h-12 text-base' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={isMobile ? 'text-sm' : ''}>
              Описание
            </Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Добавьте описание задачи (необязательно)" 
              rows={4}
              className={isMobile ? 'text-base min-h-[100px]' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className={isMobile ? 'text-sm' : ''}>
              Дедлайн
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="deadline"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deadline && "text-muted-foreground",
                    isMobile && "h-12 text-base"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP", { locale: ru }) : "Выберите дату дедлайна"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <DialogFooter className={`${isMobile ? 'flex-col-reverse gap-2 pt-2' : ''}`}>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className={isMobile ? 'w-full h-12 text-base' : ''}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit}
            className={isMobile ? 'w-full h-12 text-base' : ''}
            disabled={!title.trim() || isLoading}
          >
            {isLoading ? 'Создание...' : 'Создать задачу'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
