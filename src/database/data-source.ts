import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config'; // Carrega o .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // ⚠️ Em produção deve ser FALSE. Em dev cria tabelas automático.
  logging: false,
  entities: [`${__dirname}/../entities/*.{ts,js}`], // Busca as tabelas aqui
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  subscribers: [],
});