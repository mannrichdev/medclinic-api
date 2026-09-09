import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();

// Permite que nossa API entenda requisições no formato JSON
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
});