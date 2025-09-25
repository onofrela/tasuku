// src/lib/hooks/useTasks.ts
import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../../../shared/lib/database/core/types';
import { database } from '../../../shared/lib/database';

export interface UseTasksOptions {
  filter?: 'all' | 'pending' | 'completed' | 'overdue';
  tagId?: string;
  priority?: Task['priority'];
  searchTerm?: string;
}

export const useTasks = (options: UseTasksOptions = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const taskRepo = await database.getTaskRepository();
      
      let tasks: Task[] = [];

      // Aplicar filtros según las opciones
      if (options.searchTerm) {
        tasks = await taskRepo.searchByTitle(options.searchTerm);
      } else if (options.tagId) {
        tasks = await taskRepo.getByTag(options.tagId);
      } else if (options.priority) {
        tasks = await taskRepo.getByPriority(options.priority);
      } else {
        switch (options.filter) {
          case 'pending':
            tasks = await taskRepo.getPending();
            break;
          case 'completed':
            tasks = await taskRepo.getCompleted();
            break;
          case 'overdue':
            tasks = await taskRepo.getOverdue();
            break;
          default:
            tasks = await taskRepo.getAll();
        }
      }

      // Ordenar por fecha de vencimiento (las más próximas primero)
      // Las tareas sin dueDate van al final
      tasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      });
      
      setTasks(tasks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading tasks');
    } finally {
      setLoading(false);
    }
  }, [options.filter, options.tagId, options.priority, options.searchTerm]);

  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const taskRepo = await database.getTaskRepository();
      
      // Validaciones básicas
      if (!taskData.title.trim()) {
        throw new Error('El título de la tarea es requerido');
      }

      const newTask = await taskRepo.create(taskData);
      await loadTasks(); // Recargar la lista
      return newTask;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error creating task');
    }
  }, [loadTasks]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      const taskRepo = await database.getTaskRepository();
      const updatedTask = await taskRepo.update(id, {
        ...updates,
        updatedAt: new Date()
      });
      await loadTasks(); // Recargar la lista
      return updatedTask;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error updating task');
    }
  }, [loadTasks]);

  const toggleTaskCompletion = useCallback(async (id: string) => {
    try {
      const taskRepo = await database.getTaskRepository();
      const updatedTask = await taskRepo.toggleCompletion(id);
      await loadTasks(); // Recargar la lista
      return updatedTask;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error toggling task completion');
    }
  }, [loadTasks]);

  const deleteTask = useCallback(async (id: string) => {
    try {
      const taskRepo = await database.getTaskRepository();
      await taskRepo.delete(id);
      await loadTasks(); // Recargar la lista
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error deleting task');
    }
  }, [loadTasks]);

  const getTaskStats = useCallback(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(task => 
      !task.completed && task.dueDate < new Date()
    ).length;

    return { total, completed, pending, overdue };
  }, [tasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    refreshTasks: loadTasks,
    getTaskStats,
  };
};