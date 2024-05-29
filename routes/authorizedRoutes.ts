import { Router } from "express";
import categoryRouter from "./categoryRoutes";
import { isAuthenticated } from "../middlewares/validationMiddleware";
import currencyRouter from "./currencyRoutes";
import contactRouter from "./contactRoutes";

const authorizedRoutes = Router();

// middleware for isAuthenticated Middleware
authorizedRoutes.use(isAuthenticated);
authorizedRoutes.use(categoryRouter);
authorizedRoutes.use(currencyRouter);
authorizedRoutes.use(contactRouter);

export default authorizedRoutes;
