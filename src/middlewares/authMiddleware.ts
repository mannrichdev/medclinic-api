import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Pega o token enviado no cabeçalho da requisição
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // O padrão é "Bearer <token>". O split separa a palavra do token em si.
  const [, token] = authorization.split(' ');

  try {
    // Tenta validar o token com a nossa chave secreta
    jwt.verify(token, process.env.JWT_SECRET as string);
    
    // Se for válido, deixa a requisição continuar para o Controller
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}