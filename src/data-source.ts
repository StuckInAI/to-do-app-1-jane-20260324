import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './entities/Todo';

const databasePath = process.env.DATABASE_URL || './database.sqlite';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: true, // In production, use migrations instead
  logging: false,
  entities: [Todo],
  migrations: [],
  subscribers: [],
});

// Initialize the data source if needed elsewhere
AppDataSource.initialize().catch((error) => console.error('Database initialization error:', error));