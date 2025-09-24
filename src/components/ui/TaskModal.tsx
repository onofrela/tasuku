// src/components/ui/TaskModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { Typography } from './Typography';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => Promise<void>;
  initialData?: any;
  tags: Array<{ id: string; name: string }>;
  mode: 'create' | 'edit';
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  tags,
  mode
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    tagId: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        const dueDate = new Date(initialData.dueDate);
        setFormData({
          title: initialData.title,
          description: initialData.description || '',
          dueDate: dueDate.toISOString().split('T')[0],
          dueTime: dueDate.toTimeString().slice(0, 5),
          tagId: initialData.tagId || '',
          priority: initialData.priority || 'medium'
        });
      } else {
        // Reset form for create mode
        setFormData({
          title: '',
          description: '',
          dueDate: new Date().toISOString().split('T')[0],
          dueTime: '12:00',
          tagId: '',
          priority: 'medium'
        });
      }
      setError('');
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('El título de la tarea es requerido');
      return;
    }

    setIsSubmitting(true);
    try {
      const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`);
      
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: dueDateTime,
        tagId: formData.tagId || undefined,
        priority: formData.priority,
        completed: mode === 'edit' ? initialData?.completed : false
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la tarea');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Crear Nueva Tarea' : 'Editar Tarea'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="body" className="text-red-600">
              {error}
            </Typography>
          </div>
        )}

        <Input
          label="Título de la tarea"
          value={formData.title}
          onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
          placeholder="Ej: Revisar documentación"
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Descripción (opcional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe los detalles de la tarea..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-foreground-muted focus:border-border-active focus:ring-2 focus:ring-border-active transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-border-active focus:ring-2 focus:ring-border-active transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Hora
            </label>
            <input
              type="time"
              value={formData.dueTime}
              onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-border-active focus:ring-2 focus:ring-border-active transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prioridad
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-border-active focus:ring-2 focus:ring-border-active transition-all duration-200"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Etiqueta (opcional)
            </label>
            <select
              value={formData.tagId}
              onChange={(e) => setFormData(prev => ({ ...prev, tagId: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-border-active focus:ring-2 focus:ring-border-active transition-all duration-200"
            >
              <option value="">Sin etiqueta</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !formData.title.trim()}
          >
            {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear Tarea' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};