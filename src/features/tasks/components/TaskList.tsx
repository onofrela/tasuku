import React from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle?: (taskId: string) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskToggle }) => {
  // Separar tareas completadas e incompletas
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-4">
      {/* Tareas pendientes */}
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          {incompleteTasks.map(task => (
            <TaskItem
              key={task.id}
              {...task}
              onToggle={onTaskToggle}
            />
          ))}
        </div>
      )}

      {/* Separador para tareas completadas */}
      {completedTasks.length > 0 && incompleteTasks.length > 0 && (
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-sm text-foreground-muted">
            Completadas
          </span>
          <div className="flex-grow border-t border-border"></div>
        </div>
      )}

      {/* Tareas completadas */}
      {completedTasks.length > 0 && (
        <div className="space-y-3 opacity-70">
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              {...task}
              onToggle={onTaskToggle}
            />
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-foreground-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-foreground-muted">No hay tareas creadas</p>
        </div>
      )}
    </div>
  );
};