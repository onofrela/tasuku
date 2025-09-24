// src/lib/hooks/useTasksWithTags.ts
import { useCallback } from 'react';
import { useTasks } from './useTasks';
import { useTags } from './useTags';
import { taskToMockFormat } from '../utils/taskUtils';

export const useTasksWithTags = (options: any = {}) => {
  const { tasks, ...taskMethods } = useTasks(options);
  const { tags } = useTags();

  // Convertir tasks a formato compatible con TaskList incluyendo nombres de tags
  const getTasksWithTagNames = useCallback(() => {
    return tasks.map(task => {
      const tag = tags.find(t => t.id === task.tagId);
      return taskToMockFormat(task, tag?.name);
    });
  }, [tasks, tags]);

  // Buscar tagId por nombre (para compatibilidad)
  const findTagIdByName = useCallback((tagName: string) => {
    const tag = tags.find(t => t.name === tagName);
    return tag?.id;
  }, [tags]);

  return {
    tasks: getTasksWithTagNames(),
    tags,
    ...taskMethods,
    findTagIdByName
  };
};