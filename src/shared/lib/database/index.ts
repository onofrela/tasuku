// src/lib/database/index.ts
import { Database } from './core/Database';
import { TagRepository } from './repositories/TagRepository';
import { TaskRepository } from './repositories/TaskRepository';

class DatabaseService {
  private db: Database;
  private tagRepository: TagRepository | null = null;
  private taskRepository: TaskRepository | null = null;

  constructor() {
    this.db = new Database('TasukuDB', 2); // Versión 2
  }

  async init(): Promise<void> {
    await this.db.init();
    
    // Inicializar con datos de ejemplo si está vacío
    await this.initializeSampleData();
  }

  async getTagRepository(): Promise<TagRepository> {
    if (!this.tagRepository) {
      this.tagRepository = new TagRepository(this.db.getDB());
    }
    return this.tagRepository;
  }

  async getTaskRepository(): Promise<TaskRepository> {
    if (!this.taskRepository) {
      this.taskRepository = new TaskRepository(this.db.getDB());
    }
    return this.taskRepository;
  }

  private async initializeSampleData(): Promise<void> {
    try {
      const tagRepo = await this.getTagRepository();
      const taskRepo = await this.getTaskRepository();
      
      const existingTags = await tagRepo.getAll();
      const existingTasks = await taskRepo.getAll();

      // Solo crear datos de ejemplo si la base está vacía
      if (existingTags.length === 0 && existingTasks.length === 0) {
        await this.createSampleData(tagRepo, taskRepo);
      }
    } catch (error) {
      console.warn('Error initializing sample data:', error);
    }
  }

  private async createSampleData(tagRepo: TagRepository, taskRepo: TaskRepository): Promise<void> {
    // Crear tags de ejemplo
    const sampleTags = await Promise.all([
      tagRepo.create({ name: 'Trabajo', color: '#3B82F6' }),
      tagRepo.create({ name: 'Escuela', color: '#10B981' }),
      tagRepo.create({ name: 'Desarrollo', color: '#8B5CF6' }),
      tagRepo.create({ name: 'Mantenimiento', color: '#F59E0B' }),
      tagRepo.create({ name: 'Personal', color: '#EF4444' }),
    ]);

    // Crear tareas de ejemplo
    const now = new Date();
    await Promise.all([
      taskRepo.create({
        title: 'Revisar documentación del proyecto Tasuku',
        completed: false,
        dueDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), // En 2 horas
        tagId: sampleTags[0].id,
        priority: 'high'
      }),
      taskRepo.create({
        title: 'Preparar presentación para la reunión de equipo',
        completed: false,
        dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Mañana
        tagId: sampleTags[1].id,
        priority: 'medium'
      }),
      taskRepo.create({
        title: 'Investigar nuevas tecnologías de frontend',
        completed: true,
        dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Hace 2 días
        tagId: sampleTags[2].id,
        priority: 'low'
      }),
      taskRepo.create({
        title: 'Revisar pull requests pendientes',
        completed: false,
        dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // En 3 días
        tagId: sampleTags[0].id,
        priority: 'medium'
      }),
      taskRepo.create({
        title: 'Actualizar dependencias del proyecto',
        completed: true,
        dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // Ayer
        tagId: sampleTags[3].id,
        priority: 'low'
      })
    ]);
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}

export const database = new DatabaseService();

// Inicializar al cargar la app
database.init().catch(console.error);