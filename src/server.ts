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

// Middlewares globais de segurança e logging
app.use(express.json());
app.use(cors(corsOptions));
app.use(globalRateLimiter);
app.use(httpLogger);

// Rate Limiting específico para rotas sensíveis
app.use('/auth/login', authRateLimiter);
app.use('/auth/register', authRateLimiter);

// Documentação da API
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    logger.info('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
    app.listen(3000, () => {
      logger.info('🚀 Servidor rodando na porta 3000');
      logger.info('📄 Documentação Swagger disponível em: http://localhost:3000/docs');
    });
  })
  .catch((error) => logger.error('Erro ao conectar com o banco de dados: %o', error));