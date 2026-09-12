import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';
import { PatientController } from '../controllers/PatientController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();
const userController = new UserController();
const authController = new AuthController();
const patientController = new PatientController();

// Rotas públicas
routes.post('/users', userController.create);
routes.post('/login', authController.authenticate);

// Rotas protegidas
routes.get('/perfil', authMiddleware, (req: Request, res: Response) => {
  return res.json({ mensagem: 'Você acessou uma área VIP da MedClinic!' });
});

// CRUD Pacientes
routes.post('/patients', authMiddleware, patientController.create);
routes.get('/patients', authMiddleware, patientController.list);
routes.get('/patients/:id', authMiddleware, patientController.show);
routes.put('/patients/:id', authMiddleware, patientController.update);
routes.delete('/patients/:id', authMiddleware, patientController.delete);

export default routes;