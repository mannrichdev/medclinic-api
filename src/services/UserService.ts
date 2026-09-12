import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

// Tipagem para garantir que o serviço receba os dados corretos
interface ICreateUserRequest {
  name: string;
  email: string;
  password_hash: string;
}

export class UserService {
  async execute({ name, email, password_hash }: ICreateUserRequest) {
    // 1. Verifica se o e-mail já está cadastrado
    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('Já existe um usuário com este e-mail');
    }

    // 2. Criptografa a senha (complexidade 8)
    const hashedPassword = await bcrypt.hash(password_hash, 8);

    // 3. Prepara o novo usuário na memória
    const user = userRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    // 4. Salva de fato no banco de dados
    await userRepository.save(user);

    return user;
  }
}