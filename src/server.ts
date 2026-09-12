import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database/data-source';
import routes from './routes/routes'; // <-- 1. Importamos as rotas

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
    
    const app = express();

    app.use(express.json()); // <-- 2. Ensinamos o Express a ler JSON
    app.use(routes);         // <-- 3. Injetamos as nossas rotas

    app.listen(3000, () => {
      console.log('🚀 Servidor rodando na porta 3000');
    });
  })
  .catch((error) => console.log('Erro ao conectar com o banco de dados:', error));