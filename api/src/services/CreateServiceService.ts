import { AppDataSource } from "../database/data-source";
import { Service } from "../entities/Service";
import { Barbershop } from "../entities/Barbershop";

interface IRequest {
  name: string;
  price: number;
  duration: number; // Em minutos
  barbershop_id: string;
}

export class CreateServiceService {
  async execute({ name, price, duration, barbershop_id }: IRequest) {
    const serviceRepo = AppDataSource.getRepository(Service);
    const barbershopRepo = AppDataSource.getRepository(Barbershop);

    // Validar se a barbearia existe
    const barbershop = await barbershopRepo.findOneBy({ id: barbershop_id });

    if (!barbershop) {
      throw new Error("Barbershop does not exist");
    }

    const service = serviceRepo.create({
      name,
      price,
      duration,
      barbershop_id
    });

    await serviceRepo.save(service);

    return service;
  }
}