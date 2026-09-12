import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password_hash } = req.body;

    try {
      const authService = new AuthService();
      
      const auth = await authService.execute({
        email,
        password_hash
      });

      return res.status(200).json(auth);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message }); // 401: Unauthorized
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}