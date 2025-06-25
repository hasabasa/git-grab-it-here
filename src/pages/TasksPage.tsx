
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import { toast } from "sonner";
import TaskForm from "@/components/tasks/TaskForm";
import TasksList from "@/components/tasks/TasksList";
import TasksPagination from "@/components/tasks/TasksPagination";

interface Task {
  id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  created_at: string;
  user_id: string;
}

const TASKS_PER_PAGE = 10;

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const loadTasks = async (page = 1, search = "") => {
    if (!user) return;

    setIsLoading(true);
    try {
      const offset = (page - 1) * TASKS_PER_PAGE;
      
      let query = supabase
        .from('tasks')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + TASKS_PER_PAGE - 1);

      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      setTasks(data || []);
      setTotalTasks(count || 0);
    } catch (error: any) {
      console.error('Error loading tasks:', error);
      toast.error('Ошибка при загрузке задач');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(currentPage, searchQuery);
  }, [user, currentPage, searchQuery]);

  const handleAddTask = async (taskData: { title: string; description: string; deadline: string | null }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .insert([{
          ...taskData,
          user_id: user.id
        }]);

      if (error) throw error;

      toast.success('Задача успешно создана');
      setIsFormOpen(false);
      loadTasks(currentPage, searchQuery);
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error('Ошибка при создании задачи');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      toast.success('Задача удалена');
      loadTasks(currentPage, searchQuery);
    } catch (error: any) {
      console.error('Error deleting task:', error);
      toast.error('Ошибка при удалении задачи');
    }
  };

  const totalPages = Math.ceil(totalTasks / TASKS_PER_PAGE);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Пожалуйста, войдите в систему для просмотра задач</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>
          Задачи и напоминания
        </h1>
        
        <Button
          className={`gap-2 ${isMobile ? 'w-full' : ''}`}
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={16} />
          <span>Новая задача</span>
        </Button>
      </div>

      <Card>
        <CardHeader className={isMobile ? 'pb-3' : ''}>
          <div className="flex flex-col gap-3">
            <div>
              <CardTitle className={isMobile ? 'text-lg' : ''}>Мои задачи</CardTitle>
              <CardDescription className={`${isMobile ? 'text-sm' : ''} mt-1`}>
                Всего задач: {totalTasks}
              </CardDescription>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Поиск задач..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className={`pl-10 ${isMobile ? 'text-base' : ''}`}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className={isMobile ? 'pt-0' : ''}>
          <TasksList 
            tasks={tasks}
            isLoading={isLoading}
            onDeleteTask={handleDeleteTask}
          />
          
          {totalPages > 1 && (
            <TasksPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </CardContent>
      </Card>

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  );
};

export default TasksPage;
