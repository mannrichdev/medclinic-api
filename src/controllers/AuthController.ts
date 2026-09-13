import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authService = new AuthService();
      const result = await authService.execute({ email, password });
      return res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}