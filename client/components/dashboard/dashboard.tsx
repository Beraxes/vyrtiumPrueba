'use client';

import { useState } from 'react';
import { Header } from './header';
import { TaskList } from '../tasks/task-list';
import { TaskForm } from '../tasks/task-form';
import { useTasks } from '@/hooks/use-tasks';
import { Task, CreateTaskRequest } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
  const {
    categorizedTasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTasks();

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = async (data: CreateTaskRequest) => {
    await createTask(data);
  };

  const handleEditTask = async (data: CreateTaskRequest) => {
    if (editingTask) {
      await updateTask(editingTask._id, data);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await toggleTaskCompletion(id, completed);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateTask={() => setIsCreateFormOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <div>
            <TaskList
              tasks={categorizedTasks['to-do']}
              title="To Do"
              emptyMessage="No tasks to do"
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditClick}
            />
          </div>
          
          <div>
            <TaskList
              tasks={categorizedTasks['in-progress']}
              title="In Progress"
              emptyMessage="No tasks in progress"
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditClick}
            />
          </div>
          
          <div>
            <TaskList
              tasks={categorizedTasks['completed']}
              title="Completed"
              emptyMessage="No completed tasks"
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditClick}
            />
          </div>
          
          <div>
            <TaskList
              tasks={categorizedTasks['wont-do']}
              title="Won't Do"
              emptyMessage="No tasks marked as won't do"
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditClick}
            />
          </div>
        </div>
      </main>

      <TaskForm
        open={isCreateFormOpen}
        onOpenChange={setIsCreateFormOpen}
        onSubmit={handleCreateTask}
      />

      <TaskForm
        open={!!editingTask}
        onOpenChange={() => setEditingTask(null)}
        onSubmit={handleEditTask}
        task={editingTask || undefined}
        isEditing={true}
      />
    </div>
  );
}