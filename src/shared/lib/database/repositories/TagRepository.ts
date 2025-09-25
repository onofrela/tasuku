// src/lib/database/repositories/TagRepository.ts
import { BaseRepository } from './BaseRepository';
import type { Tag } from '../core/types';

export class TagRepository extends BaseRepository<Tag> {
  constructor(db: IDBDatabase) {
    super(db, 'tags');
  }

  async getByName(name: string): Promise<Tag | null> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const index = store.index('name');
      const request = index.get(name);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async checkNameExists(name: string, excludeId?: string): Promise<boolean> {
    const tag = await this.getByName(name);
    return tag ? tag.id !== excludeId : false;
  }
}