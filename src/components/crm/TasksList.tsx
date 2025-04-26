
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/types";
import { formatDistanceToNow, isAfter } from "date-fns";
import { ru } from "date-fns/locale";
import { Check, Phone, MessageSquare } from "lucide-react";

interface TasksListProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newStatus: "pending" | "completed" | "overdue") => void;
}

const TasksList = ({ tasks, onStatusChange }: TasksListProps) => {
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
        return "В процессе";
      case "completed":
        return "Выполнено";
      case "overdue":
        return "Просрочено";
      default:
        return status;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Нет задач для отображения
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <Badge variant={getBadgeVariant(task.status) as any}>
              {getStatusText(task.status)}
            </Badge>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>Клиент:</span>
            <span className="font-medium ml-1">{task.client}</span>
            <span className="mx-2">•</span>
            <span>
              {task.dueDate && formatDistanceToNow(new Date(task.dueDate), { addSuffix: true, locale: ru })}
            </span>
          </div>

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
        </motion.div>
      ))}
    </div>
  );
};

export default TasksList;
