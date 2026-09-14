/**
 * Middleware de autorizacao RBAC para verificar permissoes de perfil (ADMIN / ATENDENTE).
 */

import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (rolesPermitidas: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.role) {
      return res.status(401).json({ error: 'Usuário não autenticado ou perfil não informado' });
    }

    if (!rolesPermitidas.includes(user.role)) {
      return res.status(403).json({ error: 'Acesso negado: Perfil sem permissão suficiente' });
    }

    return next();
  };
};