import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IAuthRequest {
  email: string;
  password_hash: string; // Senha pura vinda da requisição
}

export class AuthService {
  async execute({ email, password_hash }: IAuthRequest) {
    // 1. Verifica se o usuário existe
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('E-mail ou senha incorretos'); // Mensagem genérica por segurança
    }

    // 2. Compara a senha digitada com a criptografada no banco
    const passwordMatch = await bcrypt.compare(password_hash, user.password_hash);
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos');
    }

    // 3. Gera o Token de acesso válido por 1 dia
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1d' }
    );

    // Retorna os dados do usuário (sem a senha) e o token
    return { 
      user: { id: user.id, name: user.name, email: user.email }, 
      token 
    };
  }
}