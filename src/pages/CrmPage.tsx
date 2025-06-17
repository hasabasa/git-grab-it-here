
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TasksList from "@/components/crm/TasksList";
import TaskForm from "@/components/crm/TaskForm";
import TaskTimeline from "@/components/crm/TaskTimeline";
import { mockTasks } from "@/data/mockData";
import { Task } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

const CrmPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setIsFormOpen(false);
  };

  const handleStatusChange = (taskId: number, newStatus: "pending" | "completed" | "overdue") => {
    setTasks(
      tasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>
          {isMobile ? 'CRM' : 'CRM и напоминания'}
        </h1>
        
        <Button
          className={`gap-2 ${isMobile ? 'w-full' : ''}`}
          onClick={() => setIsFormOpen(true)}
        >
          <Bell size={16} />
          <span>{isMobile ? 'Новая задача' : 'Новая задача'}</span>
        </Button>
      </div>

      <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Timeline first on mobile */}
        {isMobile && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Таймлайн</CardTitle>
              <CardDescription className="text-sm">Предстоящие задачи</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <TaskTimeline tasks={tasks} />
            </CardContent>
          </Card>
        )}

        <div className={isMobile ? 'col-span-1' : 'lg:col-span-2'}>
          <Card>
            <CardHeader className={isMobile ? 'pb-3' : ''}>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={isMobile ? 'text-lg' : ''}>Задачи и напоминания</CardTitle>
                    <CardDescription className={`${isMobile ? 'text-sm' : ''} mt-1`}>
                      {isMobile ? 'Список задач' : 'Список задач и напоминаний клиентам'}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Mobile-optimized tabs */}
                <Tabs 
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  className="w-full"
                >
                  <TabsList className={`w-full ${isMobile ? 'h-auto p-1' : ''}`}>
                    <div className={`flex ${isMobile ? 'overflow-x-auto gap-1' : 'w-full'}`}>
                      <TabsTrigger 
                        value="all" 
                        className={isMobile ? 'text-xs px-2 py-1 whitespace-nowrap' : ''}
                      >
                        Все
                      </TabsTrigger>
                      <TabsTrigger 
                        value="pending"
                        className={isMobile ? 'text-xs px-2 py-1 whitespace-nowrap' : ''}
                      >
                        {isMobile ? 'Процесс' : 'В процессе'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="completed"
                        className={isMobile ? 'text-xs px-2 py-1 whitespace-nowrap' : ''}
                      >
                        {isMobile ? 'Готово' : 'Выполнено'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="overdue"
                        className={isMobile ? 'text-xs px-2 py-1 whitespace-nowrap' : ''}
                      >
                        {isMobile ? 'Просрочка' : 'Просрочено'}
                      </TabsTrigger>
                    </div>
                  </TabsList>
                </Tabs>

                {/* Search input */}
                <Input 
                  placeholder={isMobile ? "Поиск..." : "Поиск задач..."} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={isMobile ? 'text-base' : ''}
                />
              </div>
            </CardHeader>
            <CardContent className={isMobile ? 'pt-0' : ''}>
              <TasksList 
                tasks={filteredTasks}
                onStatusChange={handleStatusChange}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Timeline for desktop */}
        {!isMobile && (
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Таймлайн задач</CardTitle>
                <CardDescription>Предстоящие и выполненные задачи</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskTimeline tasks={tasks} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  );
};

export default CrmPage;
