import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'aws-1-us-east-1.pooler.supabase.com', // Confira se o seu termina em .com
  port: 6543,
  username: 'postgres.epkespwvvpmgknzwnlkp', // Use o formato usuario.id-do-projeto
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  synchronize: true, // Cria as tabelas automaticamente
  //dropSchema: true,  // ATENÇÃO: Isso apaga TODAS as tabelas toda vez que o servidor reinicia
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});