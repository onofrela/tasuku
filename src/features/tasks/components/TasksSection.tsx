// src/components/app/TasksSection.tsx
import React, { useState } from 'react';
import { Container } from '../../../shared/ui/core/Container';
import { Typography } from '../../../shared/ui/core/Typography';
import { Button } from '../../../shared/ui/core/Button';
import { useTasksWithTags } from '../hooks/useTasksWithTags';
import { PlusIcon } from '../../../shared/ui/icons';
import type { Task } from '../types/task';
import { TaskList } from './TaskList';
import { TaskModal } from './TaskModal';

export const TasksSection: React.FC = () => {
  const { 
    tasks,
    tags, 
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
            <PlusIcon />
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

      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleCreateTask}
        tags={tags} // ← Pasar los tags reales
        mode="create"
      />

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
        tags={tags} // ← Pasar los tags reales
        mode="edit"
      />
    </>
  );
};