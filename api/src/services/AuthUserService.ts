import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

interface IAuthRequest {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: IAuthRequest) {
    const repo = AppDataSource.getRepository(User);

    // 1. Verifica se o usuário existe
    const user = await repo.findOneBy({ email });

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    // 2. Verifica se a senha bate
    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    // 3. Gera o Token JWT
    // O primeiro parametro é o payload (dados extras, não coloque dados sensíveis aqui)
    // O segundo é a chave secreta
    // O terceiro são opções (subject = ID do usuário, expiresIn = validade)
    const token = sign(
      { 
        email: user.email, 
        role: user.role 
      }, 
      process.env.JWT_SECRET as string, 
      {
        subject: user.id,
        expiresIn: "1d" // Token vale por 1 dia
      }
    );

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        role: user.role
      }
    };
  }
}