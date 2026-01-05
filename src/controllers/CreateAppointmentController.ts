import { Request, Response } from "express";
import { CreateAppointmentService } from "../services/CreateAppointmentService";

export class CreateAppointmentController {
  async handle(req: Request, res: Response) {
    const { provider_id, service_id, start_date } = req.body;
    
    // O cliente é quem está logado
    const client_id = req.user_id;

    const service = new CreateAppointmentService();

    try {
      const result = await service.execute({
        provider_id,
        client_id,
        service_id,
        start_date
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Error" });
    }
  }
}