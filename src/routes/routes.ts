import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';
import { PatientController } from '../controllers/PatientController';
import { AppointmentController } from '../controllers/AppointmentController';
import { SpecialtyController } from '../controllers/SpecialtyController';
import { DoctorController } from '../controllers/DoctorController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const routes = Router();

const userController = new UserController();
const authController = new AuthController();
const patientController = new PatientController();
const appointmentController = new AppointmentController();
const specialtyController = new SpecialtyController();
const doctorController = new DoctorController();

// ==========================================
// ROTAS PÚBLICAS
// ==========================================
routes.post('/users', userController.create);
routes.post('/login', authController.authenticate);

// ==========================================
// ROTAS DE VERIFICAÇÃO E RBAC (REQUISITO RF10)
// ==========================================
routes.get('/users/me', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json({
    id: user?.id,
    mensagem: 'Dados do usuário autenticado recuperados com sucesso.'
  });
});

routes.get('/admin/ping', authMiddleware, roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
  return res.json({ mensagem: 'Pong! Acesso concedido exclusivamente ao perfil Administrador.' });
});

// ==========================================
// CRUD DE PACIENTES (ROTAS PROTEGIDAS)
// ==========================================
routes.post('/patients', authMiddleware, (req: Request, res: Response) => patientController.create(req, res));
routes.get('/patients', authMiddleware, (req: Request, res: Response) => patientController.list(req, res));
routes.get('/patients/:id', authMiddleware, (req: Request, res: Response) => patientController.show(req, res));
routes.put('/patients/:id', authMiddleware, (req: Request, res: Response) => patientController.update(req, res));
routes.delete('/patients/:id', authMiddleware, (req: Request, res: Response) => patientController.delete(req, res));

// ==========================================
// GESTÃO DE ESPECIALIDADES (ROTAS PROTEGIDAS)
// ==========================================
routes.post('/specialties', authMiddleware, (req: Request, res: Response) => specialtyController.create(req, res));
routes.get('/specialties', authMiddleware, (req: Request, res: Response) => specialtyController.list(req, res));

// ==========================================
// GESTÃO DE MÉDICOS (ROTAS PROTEGIDAS)
// ==========================================
routes.post('/doctors', authMiddleware, (req: Request, res: Response) => doctorController.create(req, res));
routes.get('/doctors', authMiddleware, (req: Request, res: Response) => doctorController.list(req, res));
routes.get('/doctors/:id', authMiddleware, (req: Request, res: Response) => doctorController.show(req, res));

// ==========================================
// GESTÃO DE AGENDAMENTOS (ROTAS PROTEGIDAS)
// ==========================================
routes.post('/appointments', authMiddleware, (req: Request, res: Response) => appointmentController.create(req, res));
routes.get('/appointments', authMiddleware, (req: Request, res: Response) => appointmentController.list(req, res));
routes.get('/appointments/:id', authMiddleware, (req: Request, res: Response) => appointmentController.show(req, res));
routes.delete('/appointments/:id', authMiddleware, (req: Request, res: Response) => appointmentController.delete(req, res));
export default routes;