import { Request, Response } from "express";
import { CreateServiceService } from "../services/CreateServiceService";

export class CreateServiceController {
  async handle(req: Request, res: Response) {
    // Vamos pegar o barbershop_id direto do corpo da requisição ou dos parametros da rota.
    // Para simplificar agora, vamos mandar tudo no body.
    const { name, price, duration, barbershop_id } = req.body;

    const service = new CreateServiceService();

    try {
      const result = await service.execute({
        name,
        price,
        duration,
        barbershop_id
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Error creating service" });
    }
  }
}