import { Request, Response } from "express";
import { ListAppointmentsService } from "../services/ListAppointmentsService";

export class ListAppointmentsController {
  async handle(req: Request, res: Response) {
    // Pegamos a data do query param
    const { date } = req.query; 
    
    // O provider é o usuário logado (estamos assumindo que ele quer ver a própria agenda)
    const provider_id = req.user_id;

    const service = new ListAppointmentsService();

    try {
      const appointments = await service.execute({
        provider_id,
        date_string: date as string // Forçamos que é string
      });

      return res.json(appointments);
    } catch (error) {
      return res.status(400).json({ error: "Error fetching appointments" });
    }
  }
}