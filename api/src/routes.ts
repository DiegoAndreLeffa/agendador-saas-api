import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateBarbershopController } from "./controllers/CreateBarbershopController";
import { CreateServiceController } from "./controllers/CreateServiceController";
import { CreateAppointmentController } from "./controllers/CreateAppointmentController";
import { ListAppointmentsController } from "./controllers/ListAppointmentsController";

const routes = Router();

// Instanciamos o controller
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const createBarbershopController = new CreateBarbershopController();
const createServiceController = new CreateServiceController();
const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();

// Definimos a rota
routes.post("/users", createUserController.handle);
routes.post("/login", authUserController.handle);

// Rotas Privadas (Precisam estar logado)
routes.post("/barbershops", ensureAuthenticated, createBarbershopController.handle);
routes.post("/services", ensureAuthenticated, createServiceController.handle);
routes.post("/appointments", ensureAuthenticated, createAppointmentController.handle);
routes.get("/appointments", ensureAuthenticated, listAppointmentsController.handle);

export { routes };