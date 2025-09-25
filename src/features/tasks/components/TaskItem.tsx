import React from 'react';
import { ClockIcon, DeleteIcon, EditIcon } from '../../../shared/ui/icons';
import type { Task } from '../types/task';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  tag?: string;
  onToggle?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  dueDate,
  tag,
  onToggle,
  onEdit,
  onDelete
}) => {
  const isToday = dueDate && dueDate.toDateString() === new Date().toDateString();
  const isTomorrow = dueDate && dueDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
  
  // Formatear fecha según responsive
  const formatDate = () => {
    if (!dueDate) return 'Sin fecha';
    
    if (isToday) {
      // Si es hoy, mostrar hora si tiene hora específica
      const hasSpecificTime = dueDate.getHours() !== 23 || dueDate.getMinutes() !== 59;
      if (hasSpecificTime) {
        return dueDate.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      }
      return 'Hoy';
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

  // Formato completo para tooltip
  const fullDate = dueDate ? dueDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(dueDate.getHours() !== 23 || dueDate.getMinutes() !== 59 ? {
      hour: '2-digit',
      minute: '2-digit'
    } : {})
  }) : 'Sin fecha límite';

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
            <ClockIcon size="sm" />
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
            <EditIcon 
              size="sm" 
              className="text-foreground-muted hover:text-foreground"
            />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete?.(id)}
            className="p-2 text-foreground-muted hover:text-red-500 transition-colors"
            title="Eliminar tarea"
          >
            <DeleteIcon 
              size="sm"
              className="text-foreground-muted hover:text-red-500"
            />
          </button>
        )}
      </div>
    </div>
  );
};