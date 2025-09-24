// src/lib/hooks/useTags.ts
import { useState, useEffect, useCallback } from 'react';
import type { Tag } from '../database/core/types';
import { database } from '../database';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const initializeDatabase = useCallback(async () => {
    try {
      await database.init();
      setInitialized(true);
    } catch (err) {
      setError('Error inicializando la base de datos');
      console.error('Database init error:', err);
    }
  }, []);

  const loadTags = useCallback(async () => {
    if (!initialized) {
      await initializeDatabase();
    }

    try {
      setLoading(true);
      const tagRepo = await database.getTagRepository();
      const allTags = await tagRepo.getAll();
      setTags(allTags);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading tags');
    } finally {
      setLoading(false);
    }
  }, [initialized, initializeDatabase]);

  const createTag = useCallback(async (name: string, color?: string) => {
    try {
      const tagRepo = await database.getTagRepository();
      
      // Validar que el nombre no exista
      const exists = await tagRepo.checkNameExists(name);
      if (exists) {
        throw new Error('Ya existe un tag con ese nombre');
      }

      const newTag = await tagRepo.create({ name, color });
      await loadTags(); // Recargar la lista
      return newTag;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error creating tag');
    }
  }, [loadTags]);

  const deleteTag = useCallback(async (id: string) => {
    try {
      const tagRepo = await database.getTagRepository();
      await tagRepo.delete(id);
      await loadTags(); // Recargar la lista
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error deleting tag');
    }
  }, [loadTags]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return {
    tags,
    loading,
    error,
    createTag,
    deleteTag,
    refreshTags: loadTags,
  };
};