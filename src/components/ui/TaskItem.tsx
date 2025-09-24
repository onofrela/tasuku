import React from 'react';
import type { Task } from './TaskList';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  tag?: string;
  onToggle?: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps & { onEdit?: (task: Task) => void; onDelete?: (taskId: string) => void }> = ({
  id,
  title,
  completed,
  dueDate,
  tag,
  onToggle,
  onEdit,
  onDelete
}) => {
  const isToday = dueDate.toDateString() === new Date().toDateString();
  const isTomorrow = dueDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
  
  // Formatear fecha según responsive
  const formatDate = () => {
    if (isToday) {
      return dueDate.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    if (isTomorrow) {
      return 'Mañana';
    }
    
    // Para pantallas pequeñas, fecha corta
    return dueDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  // Formato completo para tooltip o pantallas grandes
  const fullDate = dueDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      className={`
        relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
        hover:bg-surface-elevated group
        ${completed 
          ? 'bg-surface border-border text-foreground-muted' 
          : 'bg-surface border-border hover:border-border-hover'
        }
      `}
    >
      {/* Indicador de prioridad (absoluto, no mueve contenido) */}
      {!completed && dueDate < new Date(Date.now() + 86400000) && (
        <div 
          className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-red-500 z-10" 
          title="Próximo a vencer" 
        />
      )}

      {/* Checkbox circular */}
      <button
        onClick={() => onToggle?.(id)}
        className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200
          flex items-center justify-center
          ${completed
            ? 'bg-foreground border-foreground'
            : 'border-border hover:border-foreground'
          }
        `}
      >
        {completed && (
          <svg 
            className="w-3 h-3 text-background" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Contenido de la tarea */}
      <div className="flex-1 min-w-0">
        <h3 className={`
          font-medium transition-all duration-200 truncate
          ${completed ? 'line-through' : ''}
        `}>
          {title}
        </h3>
        
        {/* Metadata - Responsive */}
        <div className="flex items-center justify-between mt-1">
          <span 
            className="text-sm text-foreground-muted flex items-center gap-1"
            title={fullDate}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">{fullDate.split(',')[0]}, </span>
            <span>{formatDate()}</span>
          </span>

          {/* Tag */}
          {tag && (
            <span className="text-xs px-2 py-1 rounded-full bg-surface border border-border text-foreground-muted">
              {tag}
            </span>
          )}
        </div>
      </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <button
            onClick={() => onEdit({ id, title, completed, dueDate, tag })}
            className="p-2 text-foreground-muted hover:text-foreground transition-colors"
            title="Editar tarea"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete?.(id)}
            className="p-2 text-foreground-muted hover:text-red-500 transition-colors"
            title="Eliminar tarea"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};