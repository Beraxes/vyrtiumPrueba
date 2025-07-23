'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './use-auth';
import { apiClient, AuthError } from '@/lib/api';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  // Wrapper to handle API calls and centralize error handling
  const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
      await apiCall();
    } catch (err) {
      if (err instanceof AuthError) {
        toast.error('Session Expired', {
          description: 'Please log in again to continue.',
        });
        logout(); // This will trigger redirect via AuthContext
      } else if (err instanceof Error) {
        setError(err.message);
        toast.error('An error occurred', { description: err.message });
      } else {
        const unknownError = 'An unexpected error occurred.';
        setError(unknownError);
        toast.error(unknownError);
      }
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    await handleApiCall(async () => {
      const fetchedTasks = await apiClient.getTasks();
      setTasks(fetchedTasks);
    });
    setIsLoading(false);
  };

  const createTask = async (data: CreateTaskRequest) => {
    await handleApiCall(async () => {
      const newTask = await apiClient.createTask(data);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully!');
    });
  };

  const updateTask = async (id: string, data: UpdateTaskRequest) => {
    await handleApiCall(async () => {
      const updatedTask = await apiClient.updateTask(id, data);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
      toast.success('Task updated successfully!');
    });
  };

  const deleteTask = async (id: string) => {
    await handleApiCall(async () => {
      await apiClient.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      toast.success('Task deleted successfully!');
    });
  };

  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    // This is a specific type of update, so it uses the same logic
    await updateTask(id, { completed });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Categorize tasks
  const categorizedTasks = {
    'to-do': tasks.filter(task => !task.completed && task.category === 'to-do'),
    'in-progress': tasks.filter(task => !task.completed && task.category === 'in-progress'),
    'completed': tasks.filter(task => task.completed),
    'wont-do': tasks.filter(task => !task.completed && task.category === 'wont-do'),
  };

  return {
    tasks,
    categorizedTasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
}