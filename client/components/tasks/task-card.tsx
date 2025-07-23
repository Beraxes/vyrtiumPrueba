'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit2, Clock, CheckCircle, XCircle, CircleDot } from 'lucide-react';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const getCategoryIcon = (category: string, completed: boolean) => {
  if (completed) return <CheckCircle className="h-4 w-4" />;
  
  switch (category) {
    case 'to-do':
      return <CircleDot className="h-4 w-4" />;
    case 'in-progress':
      return <Clock className="h-4 w-4" />;
    case 'wont-do':
      return <XCircle className="h-4 w-4" />;
    default:
      return <CircleDot className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string, completed: boolean) => {
  if (completed) return 'bg-green-100 text-green-800 border-green-200';
  
  switch (category) {
    case 'to-do':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'wont-do':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function TaskCard({ task, onToggleComplete, onDelete, onEdit }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleComplete = () => {
    onToggleComplete(task._id, !task.completed);
  };

  const displayCategory = task.completed ? 'completed' : task.category;

  return (
    <Card className={cn(
      "group hover:shadow-md transition-all duration-200",
      task.completed && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
            />
            <div className="flex-1">
              <CardTitle className={cn(
                "text-base leading-tight",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <Badge variant="outline" className={cn("w-fit", getCategoryColor(task.category, task.completed))}>
          {getCategoryIcon(task.category, task.completed)}
          <span className="ml-1 capitalize">{displayCategory.replace('-', ' ')}</span>
        </Badge>
      </CardHeader>
      
      {task.description && (
        <CardContent className="pt-0">
          <CardDescription className={cn(
            "text-sm",
            task.completed && "line-through"
          )}>
            {task.description}
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
}