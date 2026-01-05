import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string; // O ID do usuário que guardamos no 'subject'
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  // 1. Receber o token do cabeçalho da requisição
  const authToken = req.headers.authorization;

  // 2. Validar se o token está preenchido
  if (!authToken) {
    return res.status(401).json({ error: "Token missing" });
  }

  // O token vem assim: "Bearer dhuahduahduahd..."
  // Precisamos separar a palavra "Bearer" do hash
  const [, token] = authToken.split(" ");

  try {
    // 3. Validar o token
    const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    // 4. Recuperar informações do usuário e passar para frente
    // Hackzinho do Express: Vamos injetar o ID do usuário dentro da requisição
    // para que as próximas rotas saibam QUEM está chamando.
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}