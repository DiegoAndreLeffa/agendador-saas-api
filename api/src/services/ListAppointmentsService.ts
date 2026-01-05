import { AppDataSource } from "../database/data-source";
import { Appointment } from "../entities/Appointment";
import { Between } from "typeorm";
import { startOfDay, endOfDay, parseISO } from "date-fns";

interface IRequest {
  provider_id: string;
  date_string: string;
}

export class ListAppointmentsService {
  async execute({ provider_id, date_string }: IRequest) {
    const repo = AppDataSource.getRepository(Appointment);

    // Converte a string "2023-10-25" para um objeto Date
    const searchDate = parseISO(date_string);

    const appointments = await repo.find({
      where: {
        provider_id: provider_id,
        start_date: Between(
          startOfDay(searchDate),
          endOfDay(searchDate)
        )
      },
      relations: {
        client: true,
        service: true,
      },
      select: {
        id: true,
        start_date: true,
        end_date: true,
        status: true,
        
        client: {
          id: true,
          name: true,
          email: true,
        },
        
        service: {
          id: true,
          name: true,
          price: true,
          duration: true
        }
      },
      order: {
        start_date: "ASC"
      }
    });

    return appointments;
  }
}