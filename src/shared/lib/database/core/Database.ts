// src/lib/database/core/Database.ts

export class Database {
  private db: IDBDatabase | null = null;
  private readonly dbName: string;
  private readonly version: number;

  constructor(dbName: string, version: number = 2) { // Versión 2 para agregar tasks
    this.dbName = dbName;
    this.version = version;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createStores(db);
      };
    });
  }

  private createStores(db: IDBDatabase): void {
    // Store para tags
    if (!db.objectStoreNames.contains('tags')) {
      const store = db.createObjectStore('tags', { keyPath: 'id' });
      store.createIndex('name', 'name', { unique: true });
      store.createIndex('createdAt', 'createdAt');
    }

    // Store para tasks
    if (!db.objectStoreNames.contains('tasks')) {
      const store = db.createObjectStore('tasks', { keyPath: 'id' });
      store.createIndex('title', 'title');
      store.createIndex('completed', 'completed');
      store.createIndex('dueDate', 'dueDate');
      store.createIndex('tagId', 'tagId');
      store.createIndex('priority', 'priority');
      store.createIndex('createdAt', 'createdAt');
    }
  }

  getDB(): IDBDatabase {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}