import { Request, Response } from "express";
import { CreateBarbershopService } from "../services/CreateBarbershopService";

export class CreateBarbershopController {
  async handle(req: Request, res: Response) {
    const { name, address } = req.body;
    
    // O PULO DO GATO: Pegamos o ID do usuário que o Middleware injetou!
    const user_id = req.user_id; 

    const service = new CreateBarbershopService();

    try {
      const result = await service.execute({ name, address, user_id });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Error" });
    }
  }
}