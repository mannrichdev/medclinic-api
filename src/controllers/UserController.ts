import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password_hash } = req.body;

    try {
      const userService = new UserService();
      
      const user = await userService.execute({
        name,
        email,
        password_hash
      });

      // Por segurança, removemos o hash da senha da resposta que volta para o usuário
      const { password_hash: _, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}