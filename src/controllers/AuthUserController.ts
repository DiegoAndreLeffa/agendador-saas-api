import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new AuthUserService();

    try {
      const result = await service.execute({ email, password });
      return res.json(result);
    } catch (error) {
      return res.status(401).json({ 
        error: error instanceof Error ? error.message : "Authentication failed" 
      });
    }
  }
}