import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { TagList } from '../ui/TagList';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';

// Datos iniciales
const initialTags = [
  'Tecnología',
  'Diseño',
  'Arte',
  'Música',
  'Naturaleza',
  'Deportes',
  'Cocina',
  'Viajes',
];

export const TagsSection: React.FC = () => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [error, setError] = useState('');

  const handleCreateTag = () => {
    // Validaciones
    if (!newTagName.trim()) {
      setError('El nombre del tag es requerido');
      return;
    }

    if (tags.includes(newTagName.trim())) {
      setError('Este tag ya existe');
      return;
    }

    if (newTagName.trim().length > 20) {
      setError('El tag no puede tener más de 20 caracteres');
      return;
    }

    // Crear nuevo tag
    setTags(prev => [...prev, newTagName.trim()]);
    setNewTagName('');
    setError('');
    setIsModalOpen(false);
  };

  const handleTagClick = (tag: string) => {
    console.log('Tag clickeado:', tag);
    // Aquí puedes implementar la lógica de filtrado, navegación, etc.
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToDelete));
  };

  return (
    <>
      <Container size="lg">
        {/* Header con título y botón */}
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Tags</Typography>
          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="md"
          >
            + Nuevo Tag
          </Button>
        </div>

        {/* Lista de tags */}
        <TagList 
          tags={tags} 
          onTagClick={handleTagClick}
          onTagDelete={handleDeleteTag}
          showDelete
        />

        {/* Mensaje cuando no hay tags */}
        {tags.length === 0 && (
          <div className="text-center py-8">
            <Typography variant="body" className="text-foreground-muted">
              No hay tags creados. ¡Crea el primero!
            </Typography>
          </div>
        )}
      </Container>

      {/* Modal para crear nuevo tag */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewTagName('');
          setError('');
        }}
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
            error={error}
          />
          
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setIsModalOpen(false);
                setNewTagName('');
                setError('');
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateTag}
            >
              Crear Tag
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};