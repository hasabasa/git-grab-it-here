
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

const CrmPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">CRM и напоминания</h1>
        
        <div className="flex gap-2">
          <Button
            className="gap-2"
            onClick={() => setIsFormOpen(true)}
          >
            <Bell size={16} />
            <span>Новая задача</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Задачи и напоминания</CardTitle>
                <Tabs 
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <TabsList>
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="pending">В процессе</TabsTrigger>
                    <TabsTrigger value="completed">Выполнено</TabsTrigger>
                    <TabsTrigger value="overdue">Просрочено</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>Список задач и напоминаний клиентам</CardDescription>
              <div className="mt-2">
                <Input 
                  placeholder="Поиск задач..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <TasksList 
                tasks={filteredTasks}
                onStatusChange={handleStatusChange}
              />
            </CardContent>
          </Card>
        </div>
        
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
