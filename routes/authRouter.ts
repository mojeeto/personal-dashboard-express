import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { LoginValidation } from "../middlewares/validationMiddleware";

const authRouter = Router();

authRouter.post("/login", LoginValidation, login);
authRouter.post("/signup", signup);

export default authRouter;
