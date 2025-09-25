// src/lib/database/repositories/TaskRepository.ts
import { BaseRepository } from './BaseRepository';
import type { Task } from '../core/types';

export class TaskRepository extends BaseRepository<Task> {
  constructor(db: IDBDatabase) {
    super(db, 'tasks');
  }

  async getByTag(tagId: string): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const index = store.index('tagId');
      const request = index.getAll(tagId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPending(): Promise<Task[]> {
    return this.getByCompletionStatus(false);
  }

  async getCompleted(): Promise<Task[]> {
    return this.getByCompletionStatus(true);
  }

  async getOverdue(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const index = store.index('dueDate');
      const range = IDBKeyRange.upperBound(new Date());
      const request = index.getAll(range);

      request.onsuccess = () => {
        const tasks = request.result.filter(task => !task.completed);
        resolve(tasks);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getByPriority(priority: Task['priority']): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const index = store.index('priority');
      const request = index.getAll(priority);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async toggleCompletion(id: string): Promise<Task> {
    const task = await this.getById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    return this.update(id, { 
      completed: !task.completed,
      updatedAt: new Date()
    });
  }

  async searchByTitle(searchTerm: string): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const index = store.index('title');
      const range = IDBKeyRange.bound(searchTerm, searchTerm + '\uffff');
      const request = index.getAll(range);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getByCompletionStatus(completed: boolean): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const index = store.index('completed');
      const request = index.getAll(completed as unknown as IDBValidKey);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}