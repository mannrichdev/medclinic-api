import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/routes';
import { AppDataSource } from './database/data-source';
import swaggerDocument from './swagger.json';
import { corsOptions } from './config/cors';
import { globalRateLimiter, authRateLimiter } from './middlewares/ratelimiter';

const app = express();

// Middlewares básicos e de segurança (aplicados antes das rotas)
app.use(express.json());
app.use(cors(corsOptions));
app.use(globalRateLimiter);

// Rate Limiting específico para rotas sensíveis de autenticação
app.use('/auth/login', authRateLimiter);
app.use('/auth/register', authRateLimiter);

// Documentação da API
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando na porta 3000');
      console.log('📄 Documentação Swagger disponível em: http://localhost:3000/docs');
    });
  })
  .catch((error) => console.log('Erro ao conectar com o banco:', error));