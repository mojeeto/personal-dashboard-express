import { Router } from "express";
import { login, signup } from "../controllers/authController";
import {
  LoginValidation,
  ResgierValidation,
} from "../middlewares/validationMiddleware";

const authRouter = Router();

authRouter.post("/login", LoginValidation, login);
authRouter.post("/signup", ResgierValidation, signup);

export default authRouter;
