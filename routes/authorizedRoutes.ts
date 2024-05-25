import { Router } from "express";
import categoryRouter from "./categoryRoutes";
import { isAuthenticated } from "../middlewares/validationMiddleware";

const authorizedRoutes = Router();

// middleware for isAuthenticated Middleware
authorizedRoutes.use(isAuthenticated);
authorizedRoutes.use(categoryRouter);

export default authorizedRoutes;
