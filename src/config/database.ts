import 'reflect-metadata';
import { AppDataSource } from './dataSource';

export const connectDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database Connected');
  } catch (error) {
    console.error('Error during DataSource Initialization', error);
    process.exit(1);
  }
};
