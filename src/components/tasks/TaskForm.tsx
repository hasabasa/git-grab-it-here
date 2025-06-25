
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
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description: string; deadline: string | null }) => void;
}

const TaskForm = ({ isOpen, onClose, onSave }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [deadlineTime, setDeadlineTime] = useState("09:00");
  const isMobile = useIsMobile();

  const handleSubmit = () => {
    if (!title.trim()) return;

    let deadlineString: string | null = null;
    
    if (deadline) {
      const [hours, minutes] = deadlineTime.split(':');
      const deadlineWithTime = new Date(deadline);
      deadlineWithTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      deadlineString = deadlineWithTime.toISOString();
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      deadline: deadlineString
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline(undefined);
    setDeadlineTime("09:00");
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDeadline(undefined);
    setDeadlineTime("09:00");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] h-[90vh] max-h-[90vh] overflow-y-auto' : 'max-w-lg'}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className={isMobile ? 'text-lg' : ''}>
            Создать задачу
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
              placeholder="Опишите что нужно сделать" 
              rows={3}
              className={isMobile ? 'text-base min-h-[80px]' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label className={isMobile ? 'text-sm' : ''}>
              Дедлайн (необязательно)
            </Label>
            
            <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !deadline && "text-muted-foreground",
                      isMobile && "h-12 text-base"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP", { locale: ru }) : "Выберите дату"}
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

              {deadline && (
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="time"
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                    className={cn("pl-10", isMobile && "h-12 text-base")}
                  />
                </div>
              )}
            </div>

            {deadline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeadline(undefined)}
                className="text-red-600 hover:text-red-700"
              >
                Убрать дедлайн
              </Button>
            )}
          </div>
        </div>
        
        <DialogFooter className={`${isMobile ? 'flex-col-reverse gap-2 pt-2' : ''}`}>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className={isMobile ? 'w-full h-12 text-base' : ''}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!title.trim()}
            className={isMobile ? 'w-full h-12 text-base' : ''}
          >
            Создать задачу
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
