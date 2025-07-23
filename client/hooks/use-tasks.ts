'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await apiClient.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (data: CreateTaskRequest) => {
    try {
      const newTask = await apiClient.createTask(data);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id: string, data: UpdateTaskRequest) => {
    try {
      const updatedTask = await apiClient.updateTask(id, data);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await apiClient.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const toggleTaskCompletion = async (id: string, completed: boolean) => {
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