import { Router } from "express";
import categoryRouter from "./categoryRoutes";
import { isAuthenticated } from "../middlewares/validationMiddleware";
import currencyRouter from "./currencyRoutes";

const authorizedRoutes = Router();

// middleware for isAuthenticated Middleware
authorizedRoutes.use(isAuthenticated);
authorizedRoutes.use(categoryRouter);
authorizedRoutes.use(currencyRouter);

export default authorizedRoutes;
