import React, { useState } from 'react';
import { Container } from '../../../shared/ui/core/Container';
import { Typography } from '../../../shared/ui/core/Typography';
import { Button } from '../../../shared/ui/core/Button';
import { Modal } from '../../../shared/ui/core/Modal';
import { Input } from '../../../shared/ui/core/Input';
import { useTags } from '../hooks/useTags';
import { TagList } from './TagList';

export const TagsSection: React.FC = () => {
  const { tags, loading, error, createTag, deleteTag, refreshTags } = useTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTag = async () => {
    // Validaciones del cliente
    if (!newTagName.trim()) {
      setFormError('El nombre del tag es requerido');
      return;
    }

    if (newTagName.trim().length > 20) {
      setFormError('El tag no puede tener más de 20 caracteres');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await createTag(newTagName.trim());
      setNewTagName('');
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al crear el tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagClick = (tagName: string) => {
    console.log('Tag clickeado:', tagName);
    // Aquí puedes implementar la lógica de filtrado, navegación, etc.
  };

  const handleDeleteTag = async (tagToDelete: string) => {
    try {
      // Encontrar el tag por nombre para obtener el ID
      const tagToDeleteObj = tags.find(tag => tag.name === tagToDelete);
      if (tagToDeleteObj) {
        await deleteTag(tagToDeleteObj.id);
      }
    } catch (err) {
      console.error('Error deleting tag:', err);
      // Podrías mostrar un toast o mensaje de error aquí
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTagName('');
    setFormError('');
  };

  // Convertir tags de la base de datos a formato esperado por TagList
  const tagNames = tags.map(tag => tag.name);

  return (
    <>
      <Container size="lg">
        {/* Header con título y botón */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Typography variant="h2" className="mb-1">Tags</Typography>
            {error && (
              <Typography variant="caption" className="text-red-500">
                Error: {error}
              </Typography>
            )}
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="md"
            disabled={loading}
          >
            {loading ? 'Cargando...' : '+ Nuevo Tag'}
          </Button>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-2"></div>
            <Typography variant="body" className="text-foreground-muted">
              Cargando tags...
            </Typography>
          </div>
        )}

        {/* Lista de tags */}
        {!loading && (
          <TagList 
            tags={tagNames} 
            onTagClick={handleTagClick}
            onTagDelete={handleDeleteTag}
            showDelete
          />
        )}

        {/* Mensaje cuando no hay tags */}
        {!loading && tags.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center py-8">
                <svg 
                    className="w-16 h-16 mx-auto text-foreground-muted mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <Typography variant="body" className="text-foreground-muted mb-4">
                    No hay tags creados. ¡Crea el primero!
                </Typography>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="md"
                >
                    Crear Primer Tag
                </Button>
                </div>
          </div>
        )}

        {/* Botón de recargar en caso de error */}
        {error && !loading && (
          <div className="text-center py-4">
            <Button 
              onClick={refreshTags}
              variant="secondary"
              size="md"
            >
              Reintentar Carga
            </Button>
          </div>
        )}
      </Container>

      {/* Modal para crear nuevo tag */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Crear Nuevo Tag"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Nombre del tag"
            value={newTagName}
            onChange={setNewTagName}
            placeholder="Ej: Programación"
            required
            error={formError}
            disabled={isSubmitting}
            onKeyPress={(e: { key: string; }) => {
              if (e.key === 'Enter' && newTagName.trim() && !isSubmitting) {
                handleCreateTag();
              }
            }}
          />
          
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="ghost"
              onClick={handleModalClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateTag}
              disabled={!newTagName.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear Tag'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};