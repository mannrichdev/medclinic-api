import request from 'supertest';
import express from 'express';
import routes from '../routes/routes';

const app = express();
app.use(express.json());
app.use(routes);

describe('Módulo de Autenticação / Login', () => {
  it('Deve retornar erro 400 ou 401 ao tentar realizar login com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'invalido@medclinic.com', password: 'senha' });

    expect([400, 401]).toContain(response.status);
  });
});