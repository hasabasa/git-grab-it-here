
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { format, isAfter, isToday, isTomorrow } from "date-fns";
import { ru } from "date-fns/locale";

interface Task {
  id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  created_at: string;
  user_id: string;
}

interface TasksListProps {
  tasks: Task[];
  isLoading: boolean;
  onDeleteTask: (taskId: string) => void;
}

const TasksList = ({ tasks, isLoading, onDeleteTask }: TasksListProps) => {
  const isMobile = useIsMobile();

  const getDeadlineLabel = (deadlineString: string | null) => {
    if (!deadlineString) return null;
    
    const deadline = new Date(deadlineString);
    
    if (isToday(deadline)) return { text: "Сегодня", color: "text-red-600" };
    if (isTomorrow(deadline)) return { text: "Завтра", color: "text-orange-600" };
    if (isAfter(deadline, new Date())) {
      return { 
        text: format(deadline, "d MMMM yyyy, HH:mm", { locale: ru }), 
        color: "text-gray-600" 
      };
    }
    
    return { 
      text: `Просрочено: ${format(deadline, "d MMMM yyyy, HH:mm", { locale: ru })}`, 
      color: "text-red-600" 
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 md:py-10 text-gray-500">
        <p className={isMobile ? 'text-sm' : ''}>
          Нет задач для отображения
        </p>
        <p className={`text-xs mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          Создайте первую задачу, нажав "Новая задача"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {tasks.map((task) => {
        const deadlineInfo = getDeadlineLabel(task.deadline);
        
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
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
                className={`text-red-600 hover:text-red-700 hover:bg-red-50 ${isMobile ? 'h-8 w-8 p-0' : ''}`}
              >
                <Trash2 size={isMobile ? 14 : 16} />
              </Button>
            </div>

            <div className={`flex items-center justify-between text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar size={isMobile ? 12 : 14} />
                  <span>
                    {format(new Date(task.created_at), "d MMM yyyy", { locale: ru })}
                  </span>
                </div>
                
                {deadlineInfo && (
                  <div className={`flex items-center gap-1 ${deadlineInfo.color}`}>
                    <Clock size={isMobile ? 12 : 14} />
                    <span className="font-medium">
                      {deadlineInfo.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TasksList;
