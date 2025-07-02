import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import TasksList from "@/components/tasks/TasksList";
import TaskForm from "@/components/tasks/TaskForm";
import TasksPagination from "@/components/tasks/TasksPagination";
import { useTasks } from "@/hooks/useTasks";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useIsMobile } from "@/hooks/use-mobile";

const TasksPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const { 
    data: tasksData, 
    isLoading, 
    error 
  } = useTasks({ 
    search: searchQuery, 
    page: currentPage 
  });

  const createTaskMutation = useCreateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCreateTask = async (taskData: {
    title: string;
    description?: string;
    deadline?: string;
  }) => {
    await createTaskMutation.mutateAsync(taskData);
    setIsFormOpen(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTaskMutation.mutateAsync(taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
  };

  const allTasks = tasksData?.tasks || [];
  const tasks = allTasks.filter(task => !completedTasks.has(task.id));
  const totalPages = tasksData?.totalPages || 1;

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
          <CardTitle className={isMobile ? 'text-lg' : ''}>Мои задачи</CardTitle>
          <CardDescription className={`${isMobile ? 'text-sm' : ''} mt-1`}>
            Управление задачами и напоминаниями
          </CardDescription>
          
          <Input 
            placeholder={isMobile ? "Поиск задач..." : "Поиск по названию или описанию..."} 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className={isMobile ? 'text-base' : ''}
          />
        </CardHeader>
        
        <CardContent className={isMobile ? 'pt-0' : ''}>
          {isLoading ? (
            <div className="text-center py-8">
              <p>Загрузка задач...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>Ошибка загрузки задач</p>
            </div>
          ) : (
            <>
              <TasksList 
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onCompleteTask={handleCompleteTask}
                isDeleting={deleteTaskMutation.isPending}
              />
              
              {totalPages > 1 && (
                <div className="mt-6">
                  <TasksPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSave={handleCreateTask}
        isLoading={createTaskMutation.isPending}
      />
    </div>
  );
};

export default TasksPage;