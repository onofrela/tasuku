import React from 'react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { Grid } from '../ui/Grid';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { TaskList, type Task } from '../ui/TaskList';
import { TagList } from '../ui/TagList';

// Datos de ejemplo para el dashboard
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Revisar documentación del proyecto Tasuku',
    completed: false,
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    tag: 'Trabajo'
  },
  {
    id: '2',
    title: 'Preparar presentación para la reunión de equipo',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    tag: 'Escuela'
  },
  {
    id: '3',
    title: 'Comprar materiales de oficina',
    completed: false,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    tag: 'Personal'
  }
];

const popularTags = [
  'Trabajo',
  'Escuela',
  'Desarrollo',
  'Personal',
  'Urgente',
  'Proyectos'
];

const statsData = {
  totalTasks: 15,
  completedTasks: 8,
  pendingTasks: 7,
  overdueTasks: 2
};

export const InicioSection: React.FC = () => {
  const handleTaskToggle = (taskId: string) => {
    console.log('Toggle task:', taskId);
  };

  const handleTagClick = (tag: string) => {
    console.log('Tag clickeado:', tag);
  };

  const handleQuickAction = (action: string) => {
    console.log('Acción rápida:', action);
  };

  return (
    <Container size="lg" className="py-8">
      {/* Header de bienvenida */}
      <div className="text-center md:text-start mb-12">
        <Typography variant="h1" className="mb-4">
          ¡Bienvenido a Tasuku!
        </Typography>
        <Typography variant="body" className="max-w-2xl mx-auto md:mx-0">
          Tu centro de control para gestionar tareas y organizar tu día. 
          Mantén todo bajo control y aumenta tu productividad.
        </Typography>
      </div>

      {/* Estadísticas rápidas */}
      <Grid cols={4} gap="lg" className="mb-12">
        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <Typography variant="h2" className="text-foreground mb-2">
              {statsData.totalTasks}
            </Typography>
            <Typography variant="body" className="text-foreground-muted">
              Total Tareas
            </Typography>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <Typography variant="h2" className="text-green-500 mb-2">
              {statsData.completedTasks}
            </Typography>
            <Typography variant="body" className="text-foreground-muted">
              Completadas
            </Typography>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <Typography variant="h2" className="text-orange-500 mb-2">
              {statsData.pendingTasks}
            </Typography>
            <Typography variant="body" className="text-foreground-muted">
              Pendientes
            </Typography>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div className="text-center">
            <Typography variant="h2" className="text-red-500 mb-2">
              {statsData.overdueTasks}
            </Typography>
            <Typography variant="body" className="text-foreground-muted">
              Vencidas
            </Typography>
          </div>
        </Card>
      </Grid>

      {/* Contenido principal en dos columnas */}
      <Grid cols={2} gap="lg" className="mb-8">
        {/* Columna izquierda - Tareas recientes */}
        <Card variant="default" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h2">Tareas Recientes</Typography>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleQuickAction('ver-todas-tareas')}
            >
              Ver todas
            </Button>
          </div>
          
          <TaskList 
            tasks={mockTasks} 
            onTaskToggle={handleTaskToggle}
          />
          
          <div className="mt-6">
            <Button 
              variant="primary" 
              size="md" 
              className="w-full"
              onClick={() => handleQuickAction('nueva-tarea')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Nueva Tarea
            </Button>
          </div>
        </Card>

        {/* Columna derecha - Tags populares y acciones rápidas */}
        <div className="space-y-6">
          {/* Tags populares */}
          <Card variant="default" padding="lg">
            <Typography variant="h2" className="mb-4">Tags Populares</Typography>
            <TagList 
              tags={popularTags} 
              onTagClick={handleTagClick}
              showDelete={false}
            />
            
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full"
                onClick={() => handleQuickAction('gestionar-tags')}
              >
                Gestionar Todos los Tags
              </Button>
            </div>
          </Card>

          {/* Acciones rápidas */}
          <Card variant="default" padding="lg">
            <Typography variant="h2" className="mb-4">Acciones Rápidas</Typography>
            <div className="space-y-3">
              <Button 
                variant="secondary" 
                size="md" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('buscar-tareas')}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar Tareas
              </Button>
              
              <Button 
                variant="secondary" 
                size="md" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('filtros-avanzados')}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filtros Avanzados
              </Button>
              
              <Button 
                variant="secondary" 
                size="md" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('exportar-datos')}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Datos
              </Button>
            </div>
          </Card>
        </div>
      </Grid>

      {/* Progreso del día */}
      <Card variant="default" padding="lg">
        <Typography variant="h2" className="mb-4">Progreso del Día</Typography>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="w-full bg-surface-elevated rounded-full h-4">
              <div 
                className="bg-foreground h-4 rounded-full transition-all duration-500"
                style={{ width: `${(statsData.completedTasks / statsData.totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
          <Typography variant="body" className="text-foreground-muted whitespace-nowrap">
            {Math.round((statsData.completedTasks / statsData.totalTasks) * 100)}% completado
          </Typography>
        </div>
      </Card>
    </Container>
  );
};