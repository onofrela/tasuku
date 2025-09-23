import React from 'react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { TaskList, type Task } from '../ui/TaskList';
import { Button } from '../ui/Button';

// Datos de ejemplo para la maqueta
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Revisar documentación del proyecto Tasuku',
    completed: false,
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // En 2 horas
    tag: 'Trabajo'
  },
  {
    id: '2',
    title: 'Preparar presentación para la reunión de equipo',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana
    tag: 'Escuela'
  },
  {
    id: '3',
    title: 'Investigar nuevas tecnologías de frontend',
    completed: true,
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Hace 2 días
    tag: 'Desarrollo'
  },
  {
    id: '4',
    title: 'Revisar pull requests pendientes',
    completed: false,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // En 3 días
    tag: 'Trabajo'
  },
  {
    id: '5',
    title: 'Actualizar dependencias del proyecto',
    completed: true,
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Ayer
    tag: 'Mantenimiento'
  }
];

export const TasksSection: React.FC = () => {
  const handleTaskToggle = (taskId: string) => {
    console.log('Toggle task:', taskId);
    // Aquí iría la lógica para marcar como completada/no completada
  };

  const handleAddTask = () => {
    console.log('Abrir modal para nueva tarea');
    // Aquí iría la lógica para abrir modal de creación
  };

  return (
    <Container size="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Typography variant="h1" className="mb-2">
            Tareas
          </Typography>
          <Typography variant="body" className="text-foreground-muted">
            Gestiona tus actividades pendientes
          </Typography>
        </div>
        <Button 
          onClick={handleAddTask}
          variant="primary"
          size="lg"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nueva Tarea</span>
        </Button>
      </div>

      {/* Lista de tareas */}
      <TaskList 
        tasks={mockTasks} 
        onTaskToggle={handleTaskToggle}
      />
    </Container>
  );
};