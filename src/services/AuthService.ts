import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';

interface IAuthenticateRequest {
  email: string;
  password?: string;
}

export class AuthService {
  async execute({ email, password }: IAuthenticateRequest) {
    if (!password) {
      throw new Error('A senha é obrigatória');
    }

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('E-mail ou senha incorretos');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos');
    }

  const token = sign({ role: user.role }, process.env.JWT_SECRET || 'default_secret', {
    subject: user.id,
    expiresIn: '1d',
});

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}