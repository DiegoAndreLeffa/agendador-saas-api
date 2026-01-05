import { AppDataSource } from "../database/data-source";
import { Barbershop } from "../entities/Barbershop";
import { User } from "../entities/User";

interface IRequest {
  name: string;
  address: string;
  user_id: string; // ID do dono (vai vir do token)
}

export class CreateBarbershopService {
  async execute({ name, address, user_id }: IRequest) {
    const repo = AppDataSource.getRepository(Barbershop);
    const userRepo = AppDataSource.getRepository(User);

    // Verifica se o usuário existe (só por segurança)
    const user = await userRepo.findOneBy({ id: user_id });

    if (!user) {
      throw new Error("User does not exists");
    }

    const barbershop = repo.create({
      name,
      address,
      owner_id: user_id
    });

    await repo.save(barbershop);

    return barbershop;
  }
}