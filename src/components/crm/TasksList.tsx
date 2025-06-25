
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/types";
import { formatDistanceToNow, isAfter } from "date-fns";
import { ru } from "date-fns/locale";
import { Check, Phone, MessageSquare, MoreHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TasksListProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newStatus: "pending" | "completed" | "overdue") => void;
}

const TasksList = ({ tasks, onStatusChange }: TasksListProps) => {
  const isMobile = useIsMobile();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "completed":
        return "success";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return isMobile ? "Процесс" : "В процессе";
      case "completed":
        return isMobile ? "Готово" : "Выполнено";
      case "overdue":
        return isMobile ? "Просрочка" : "Просрочено";
      default:
        return status;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 md:py-10 text-gray-500">
        <p className={isMobile ? 'text-sm' : ''}>
          Нет задач для отображения
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-xl hover:shadow-md transition-shadow ${
            isMobile ? 'p-3' : 'p-4'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium ${isMobile ? 'text-sm' : ''} truncate`}>
                {task.title}
              </h3>
              <p className={`text-gray-600 ${isMobile ? 'text-xs mt-1' : 'text-sm'} line-clamp-2`}>
                {task.description}
              </p>
            </div>
            <Badge 
              variant={getBadgeVariant(task.status) as any}
              className={isMobile ? 'text-xs ml-2 flex-shrink-0' : 'ml-2'}
            >
              {getStatusText(task.status)}
            </Badge>
          </div>

          <div className={`flex items-center text-gray-500 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <span>Клиент:</span>
            <span className="font-medium ml-1 truncate">{task.client}</span>
            <span className="mx-2">•</span>
            <span className="truncate">
              {task.dueDate && formatDistanceToNow(new Date(task.dueDate), { addSuffix: true, locale: ru })}
            </span>
          </div>

          {/* Mobile-optimized action buttons */}
          {isMobile ? (
            <div className="flex gap-2">
              {task.status !== "completed" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onStatusChange(task.id, "completed")}
                  className="gap-1 flex-1 text-xs h-8"
                >
                  <Check size={14} />
                  <span>Готово</span>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="gap-2">
                    <Phone size={14} />
                    <span>Позвонить</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <MessageSquare size={14} />
                    <span>Написать</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              {task.status !== "completed" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onStatusChange(task.id, "completed")}
                  className="gap-1"
                >
                  <Check size={16} />
                  <span>Выполнено</span>
                </Button>
              )}
              
              <Button variant="outline" size="sm" className="gap-1">
                <Phone size={16} />
                <span>Позвонить</span>
              </Button>
              
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare size={16} />
                <span>Написать</span>
              </Button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TasksList;
