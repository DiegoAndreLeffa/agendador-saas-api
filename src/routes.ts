import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateBarbershopController } from "./controllers/CreateBarbershopController";

const routes = Router();

// Instanciamos o controller
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const createBarbershopController = new CreateBarbershopController();

// Definimos a rota
routes.post("/users", createUserController.handle);
routes.post("/login", authUserController.handle);

// Rotas Privadas (Precisam estar logado)
// Veja como o middleware entra antes do controller
routes.post("/barbershops", ensureAuthenticated, createBarbershopController.handle);

export { routes };