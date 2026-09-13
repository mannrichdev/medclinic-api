import { hash } from 'bcryptjs';
import { userRepository } from '../repositories/userRepository';

interface ICreateUserRequest {
  name: string;
  email: string;
  password?: string;
}

export class UserService {
  async create({ name, email, password }: ICreateUserRequest) {
    if (!password) {
      throw new Error('A senha é obrigatória');
    }

    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('E-mail já cadastrado');
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}