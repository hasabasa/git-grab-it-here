import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, isPast } from "date-fns";
import { ru } from "date-fns/locale";
import { Trash2, Calendar, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  created_at: string;
}

interface TasksListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  isDeleting?: boolean;
}

const TasksList = ({ tasks, onDeleteTask, onCompleteTask, isDeleting }: TasksListProps) => {
  const isMobile = useIsMobile();

  const getDeadlineStatus = (deadline?: string) => {
    if (!deadline) return null;
    
    const deadlineDate = new Date(deadline);
    const isOverdue = isPast(deadlineDate);
    
    return {
      isOverdue,
      text: formatDistanceToNow(deadlineDate, { addSuffix: true, locale: ru })
    };
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Calendar className="mx-auto h-12 w-12 mb-4 text-gray-300" />
        <p className={isMobile ? 'text-sm' : ''}>
          У вас пока нет задач
        </p>
        <p className={`text-sm text-gray-400 mt-1 ${isMobile ? 'text-xs' : ''}`}>
          Создайте первую задачу, нажав кнопку "Новая задача"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {tasks.map((task) => {
        const deadlineStatus = getDeadlineStatus(task.deadline);
        
        return (
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
                {task.description && (
                  <p className={`text-gray-600 ${isMobile ? 'text-xs mt-1' : 'text-sm'} line-clamp-2`}>
                    {task.description}
                  </p>
                )}
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-green-600 hover:text-green-700 hover:bg-green-50 ${
                    isMobile ? 'h-8 w-8 p-0' : ''
                  }`}
                  onClick={() => onCompleteTask(task.id)}
                  title="Выполнено"
                >
                  <Check size={isMobile ? 14 : 16} />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-red-500 hover:text-red-700 hover:bg-red-50 ${
                        isMobile ? 'h-8 w-8 p-0' : ''
                      }`}
                      disabled={isDeleting}
                    >
                      <Trash2 size={isMobile ? 14 : 16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие нельзя отменить. Задача будет удалена навсегда.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onDeleteTask(task.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className={`flex items-center justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <span className="text-gray-500">
                Создано: {formatDistanceToNow(new Date(task.created_at), { addSuffix: true, locale: ru })}
              </span>
              
              {deadlineStatus && (
                <Badge 
                  variant={deadlineStatus.isOverdue ? "destructive" : "secondary"}
                  className={isMobile ? 'text-xs' : ''}
                >
                  {deadlineStatus.isOverdue ? "Просрочено" : "До дедлайна"}: {deadlineStatus.text}
                </Badge>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TasksList;