import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/routes';
import { AppDataSource } from './database/data-source';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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