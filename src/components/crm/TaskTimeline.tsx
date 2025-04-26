
import { Task } from "@/types";
import { format, isToday, isTomorrow, isYesterday, isThisWeek, isAfter } from "date-fns";
import { ru } from "date-fns/locale";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface TaskTimelineProps {
  tasks: Task[];
}

const TaskTimeline = ({ tasks }: TaskTimelineProps) => {
  // Sort tasks by date
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
    return dateA - dateB;
  });

  const getDateLabel = (dateString: string | undefined) => {
    if (!dateString) return "Без срока";
    
    const date = new Date(dateString);
    
    if (isToday(date)) return "Сегодня";
    if (isTomorrow(date)) return "Завтра";
    if (isYesterday(date)) return "Вчера";
    if (isThisWeek(date)) return format(date, "EEEE", { locale: ru });
    
    return format(date, "d MMMM", { locale: ru });
  };

  // Group tasks by date
  const groupedTasks: Record<string, Task[]> = {};
  
  sortedTasks.forEach(task => {
    const dateLabel = getDateLabel(task.dueDate);
    
    if (!groupedTasks[dateLabel]) {
      groupedTasks[dateLabel] = [];
    }
    
    groupedTasks[dateLabel].push(task);
  });

  const timelineVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-8 relative">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
      
      <motion.div
        variants={timelineVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {Object.entries(groupedTasks).map(([dateLabel, dateTasks]) => (
          <div key={dateLabel} className="relative">
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 rounded-full bg-primary z-10"></div>
              <h4 className="ml-4 font-medium text-gray-900">{dateLabel}</h4>
            </div>
            
            <div className="ml-8 space-y-3">
              {dateTasks.map(task => (
                <motion.div 
                  key={task.id}
                  variants={itemVariants}
                  className="p-3 bg-white rounded-lg border shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-sm">{task.title}</h5>
                      <p className="text-xs text-gray-500">{task.client}</p>
                    </div>
                    <Badge variant={
                      task.status === "completed" ? "success" as any : 
                      task.status === "overdue" ? "destructive" as any : 
                      "outline" as any
                    }>
                      {task.status === "completed" ? "Выполнено" : 
                       task.status === "overdue" ? "Просрочено" : 
                       "В процессе"}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TaskTimeline;
