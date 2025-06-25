
import { Task } from "@/types";
import { format, isToday, isTomorrow, isYesterday, isThisWeek, isAfter } from "date-fns";
import { ru } from "date-fns/locale";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskTimelineProps {
  tasks: Task[];
}

const TaskTimeline = ({ tasks }: TaskTimelineProps) => {
  const isMobile = useIsMobile();

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
    <div className={`space-y-6 md:space-y-8 relative ${isMobile ? 'max-h-96 overflow-y-auto' : ''}`}>
      <div className={`absolute top-0 bottom-0 w-px bg-gray-200 ${isMobile ? 'left-2' : 'left-3'}`}></div>
      
      <motion.div
        variants={timelineVariants}
        initial="hidden"
        animate="show"
        className={`space-y-6 ${isMobile ? 'md:space-y-8' : 'md:space-y-8'}`}
      >
        {Object.entries(groupedTasks).map(([dateLabel, dateTasks]) => (
          <div key={dateLabel} className="relative">
            <div className="flex items-center mb-3 md:mb-4">
              <div className={`rounded-full bg-primary z-10 ${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`}></div>
              <h4 className={`ml-3 md:ml-4 font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>
                {dateLabel}
              </h4>
            </div>
            
            <div className={`space-y-2 md:space-y-3 ${isMobile ? 'ml-6' : 'ml-8'}`}>
              {dateTasks.map(task => (
                <motion.div 
                  key={task.id}
                  variants={itemVariants}
                  className={`bg-white rounded-lg border shadow-sm ${isMobile ? 'p-2' : 'p-3'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h5 className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'} truncate`}>
                        {task.title}
                      </h5>
                      <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'} truncate`}>
                        {task.client}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        task.status === "completed" ? "success" as any : 
                        task.status === "overdue" ? "destructive" as any : 
                        "outline" as any
                      }
                      className={isMobile ? 'text-xs scale-75 ml-1' : 'text-xs ml-2'}
                    >
                      {task.status === "completed" ? (isMobile ? "✓" : "Выполнено") : 
                       task.status === "overdue" ? (isMobile ? "!" : "Просрочено") : 
                       (isMobile ? "○" : "В процессе")}
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
