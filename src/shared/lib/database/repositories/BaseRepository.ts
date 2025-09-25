// src/lib/database/repositories/BaseRepository.ts
// src/lib/database/repositories/BaseRepository.ts
import type { Repository } from '../core/types';

export abstract class BaseRepository<T> implements Repository<T> {
  protected db: IDBDatabase;
  protected storeName: string;

  constructor(
    db: IDBDatabase,
    storeName: string
  ) {
    this.db = db;
    this.storeName = storeName;
  }

  protected getStore(mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    const transaction = this.db.transaction([this.storeName], mode);
    return transaction.objectStore(this.storeName);
  }

  async getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async create(data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const timestamp = new Date();
      const entity = {
        ...data,
        id: this.generateId(),
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const request = store.add(entity);

      request.onsuccess = () => resolve(entity as T);
      request.onerror = () => reject(request.error);
    });
  }

  async update(id: string, data: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const existing = await this.getById(id);
      if (!existing) {
        reject(new Error('Entity not found'));
        return;
      }

      const store = this.getStore('readwrite');
      const updatedEntity = {
        ...existing,
        ...data,
        updatedAt: new Date(),
      };

      const request = store.put(updatedEntity);

      request.onsuccess = () => resolve(updatedEntity as T);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}