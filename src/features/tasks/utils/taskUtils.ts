// src/lib/utils/taskUtils.ts
import type { Task } from '../../../lib/database/core/types';

export const taskToMockFormat = (task: Task, tagName?: string) => ({
  id: task.id,
  title: task.title,
  completed: task.completed,
  dueDate: task.dueDate,
  tag: tagName // Para compatibilidad con tu componente TaskList existente
});

export const mockToTaskFormat = (mockTask: any, tagId?: string): Omit<Task, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: mockTask.title,
  completed: mockTask.completed || false,
  dueDate: mockTask.dueDate,
  tagId: tagId,
  priority: mockTask.priority || 'medium',
  description: mockTask.description || ''
});