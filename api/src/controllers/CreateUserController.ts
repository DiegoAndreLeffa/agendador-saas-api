import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    // Desestruturação para pegar os dados
    const { name, email, password, role } = req.body;

    const service = new CreateUserService();

    try {
      // Chama o serviço
      const result = await service.execute({ name, email, password, role });

      // Retorna 201 (Created)
      return res.status(201).json(result);
    } catch (error) {
      // Se der erro (ex: email duplicado), retorna 400
      return res.status(400).json({ 
        error: error instanceof Error ? error.message : "Unexpected error" 
      });
    }
  }
}