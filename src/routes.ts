import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const routes = Router();

// Instanciamos o controller
const createUserController = new CreateUserController();

// Definimos a rota
routes.post("/users", createUserController.handle);

export { routes };