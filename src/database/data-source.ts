import 'dotenv/config'; // <-- Adicione esta linha no topo
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Patient } from '../entities/Patient';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '041225',
  database: process.env.DB_NAME || 'medclinic',
  synchronize: true,
  logging: true,
  entities: [User, Patient],
  subscribers: [],
  migrations: [],
});