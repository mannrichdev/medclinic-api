import request from 'supertest';
import express from 'express';
import routes from '../routes/routes';

const app = express();
app.use(express.json());
app.use(routes);

describe('Rotas Públicas / Sanity Check', () => {
  it('Deve responder com 401 ou erro esperado ao tentar acessar rota protegida sem Token', async () => {
    const response = await request(app).get('/patients');
    expect(response.status).toBe(401);
  });
});