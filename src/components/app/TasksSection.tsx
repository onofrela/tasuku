// src/components/app/TasksSection.tsx
import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { TaskList, type Task } from '../ui/TaskList';
import { Button } from '../ui/Button';
import { TaskModal } from '../ui/TaskModal';
import { useTasksWithTags } from '../../lib/hooks/useTasksWithTags';

export const TasksSection: React.FC = () => {
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    toggleTaskCompletion, 
    deleteTask,
    refreshTasks,
    getTaskStats 
  } = useTasksWithTags();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleTaskToggle = async (taskId: string) => {
    try {
      await toggleTaskCompletion(taskId);
    } catch (err) {
      console.error('Error al cambiar estado de la tarea:', err);
    }
  };

  const handleAddTask = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCreateTask = async (taskData: any) => {
    await createTask(taskData);
  };

  const handleUpdateTask = async (taskData: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        console.error('Error al eliminar la tarea:', err);
        alert('Error al eliminar la tarea');
      }
    }
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const stats = getTaskStats();

  return (
    <>
      <Container size="lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Typography variant="h1" className="mb-2">
              Tareas
            </Typography>
            <Typography variant="body" className="text-foreground-muted">
              {`${stats.pending} pendientes, ${stats.completed} completadas`}
            </Typography>
            {error && (
              <Typography variant="caption" className="text-red-500 mt-1">
                Error: {error}
              </Typography>
            )}
          </div>
          <Button 
            onClick={handleAddTask}
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{loading ? 'Cargando...' : 'Nueva Tarea'}</span>
          </Button>
        </div>

        {/* Estadísticas rápidas */}
        {!loading && tasks.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Typography variant="h3" className="text-foreground">
                {stats.total}
              </Typography>
              <Typography variant="caption">Total</Typography>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Typography variant="h3" className="text-green-500">
                {stats.completed}
              </Typography>
              <Typography variant="caption">Completadas</Typography>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Typography variant="h3" className="text-orange-500">
                {stats.pending}
              </Typography>
              <Typography variant="caption">Pendientes</Typography>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Typography variant="h3" className="text-red-500">
                {stats.overdue}
              </Typography>
              <Typography variant="caption">Vencidas</Typography>
            </div>
          </div>
        )}

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
            <Typography variant="body" className="text-foreground-muted">
              Cargando tareas...
            </Typography>
          </div>
        )}

        {/* Lista de tareas */}
        {!loading && (
          <TaskList 
            tasks={tasks} 
            onTaskToggle={handleTaskToggle}
            onTaskEdit={handleEditTask}
            onTaskDelete={handleDeleteTask}
          />
        )}

        {/* Mensaje cuando no hay tareas */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-foreground-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <Typography variant="h3" className="text-foreground-muted mb-2">
              No hay tareas creadas
            </Typography>
            <Typography variant="body" className="text-foreground-muted mb-4">
              Comienza creando tu primera tarea para organizar tus actividades.
            </Typography>
            <Button 
              onClick={handleAddTask}
              variant="primary"
              size="lg"
            >
              Crear Primera Tarea
            </Button>
          </div>
        )}

        {/* Botón de recargar en caso de error */}
        {error && !loading && (
          <div className="text-center py-4">
            <Button 
              onClick={refreshTasks}
              variant="secondary"
              size="md"
            >
              Reintentar Carga
            </Button>
          </div>
        )}
      </Container>

      {/* Modal para crear nueva tarea */}
      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleCreateTask}
        tags={[]} // Se pasarán via useTasksWithTags
        mode="create"
      />

      {/* Modal para editar tarea */}
      <TaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
        tags={[]} // Se pasarán via useTasksWithTags
        mode="edit"
      />
    </>
  );
};