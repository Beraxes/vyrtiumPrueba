'use client';

import { TaskCard } from './task-card';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  title: string;
  emptyMessage: string;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskList({
  tasks,
  title,
  emptyMessage,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}