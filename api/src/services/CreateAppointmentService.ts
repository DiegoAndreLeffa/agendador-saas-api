import { AppDataSource } from "../database/data-source";
import { Appointment } from "../entities/Appointment";
import { Service } from "../entities/Service";
import { addMinutes } from "date-fns";
import { LessThan, MoreThan, And } from "typeorm";

interface IRequest {
  provider_id: string;
  client_id: string;
  service_id: string;
  start_date: string; // Vem como string do JSON (ISO format)
}

export class CreateAppointmentService {
  async execute({ provider_id, client_id, service_id, start_date }: IRequest) {
    const appointmentRepo = AppDataSource.getRepository(Appointment);
    const serviceRepo = AppDataSource.getRepository(Service);

    // 1. Verificar se o serviço existe para pegar a duração
    const service = await serviceRepo.findOneBy({ id: service_id });
    if (!service) {
      throw new Error("Service not found");
    }

    // 2. Calcular a Data Final
    // Convertemos a string recebida para objeto Date
    const startDateObj = new Date(start_date); 
    // Somamos a duração do serviço na data inicial
    const endDateObj = addMinutes(startDateObj, service.duration);

    // 3. O PULO DO GATO: Verificar Conflito no Banco 🐱
    // Buscamos se existe agendamento que colida com esse horário PARA ESSE PRESTADOR
    const conflictingAppointment = await appointmentRepo.findOne({
      where: {
        provider_id: provider_id,
        // Lógica: Se o agendamento do banco começa ANTES do meu terminar
        // E termina DEPOIS do meu começar, então tem conflito.
        start_date: LessThan(endDateObj),
        end_date: MoreThan(startDateObj)
      }
    });

    if (conflictingAppointment) {
      throw new Error("This time slot is already booked.");
    }

    // 4. Se passou, cria o agendamento
    const appointment = appointmentRepo.create({
      provider_id,
      client_id,
      service_id,
      start_date: startDateObj,
      end_date: endDateObj,
      status: "CONFIRMED" // Por simplicidade, já nasce confirmado
    });

    await appointmentRepo.save(appointment);

    return appointment;
  }
}