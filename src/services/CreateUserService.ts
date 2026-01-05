import { hash } from "bcryptjs";
import { AppDataSource } from "../database/data-source";
import { User, UserRole } from "../entities/User";

// DTO (Data Transfer Object) - Define o que precisamos receber
interface IUserRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole; // Opcional, se não mandar vira CLIENT
}

export class CreateUserService {
  async execute({ name, email, password, role }: IUserRequest): Promise<User> {
    const repo = AppDataSource.getRepository(User);

    // 1. Verificar se o e-mail já existe
    const userAlreadyExists = await repo.findOneBy({ email });

    if (userAlreadyExists) {
      // Por enquanto vamos lançar um erro genérico, depois trataremos isso melhor
      throw new Error("User already exists");
    }

    // 2. Criptografar a senha (O hash impede que admins vejam a senha real)
    const passwordHash = await hash(password, 8);

    // 3. Criar o objeto do usuário
    const user = repo.create({
      name,
      email,
      password_hash: passwordHash,
      role: role || UserRole.CLIENT // Se não vier role, assume que é cliente
    });

    // 4. Salvar no banco
    await repo.save(user);

    // 5. Retornar (mas não queremos retornar a senha nem o hash para o frontend!)
    // @ts-ignore - Vamos ignorar o erro de tipo temporariamente para remover o hash do retorno
    delete user.password_hash; 
    
    return user;
  }
}