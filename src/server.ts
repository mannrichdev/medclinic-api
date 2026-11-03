import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/routes';
import { AppDataSource } from './database/data-source';
import swaggerDocument from './swagger.json';
import { corsOptions } from './config/cors';
import { globalRateLimiter, authRateLimiter } from './middlewares/ratelimiter';
import { httpLogger } from './middlewares/httpLogger';
import { logger } from './config/logger';

const app = express();

// Middlewares globais de segurança, parsing e logging
app.use(express.json());
app.use(cors(corsOptions));
app.use(globalRateLimiter);
app.use(httpLogger);

// Rate Limiting específico para rotas de autenticação e criação de conta
app.use('/login', authRateLimiter);
app.use('/users', authRateLimiter);

// Documentação da API com Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da aplicação
app.use(routes);

// Inicialização do Banco de Dados e Servidor
AppDataSource.initialize()
  .then(() => {
    logger.info('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
    app.listen(3000, () => {
      logger.info('🚀 Servidor rodando na porta 3000');
      logger.info('📄 Documentação Swagger disponível em: http://localhost:3000/docs');
    });
  })
  .catch((error) => {
    logger.error('Erro ao conectar com o banco de dados: %o', error);
  });