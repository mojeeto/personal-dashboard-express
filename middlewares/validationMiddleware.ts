import { userModelValidation } from "../models/userModel";
import { BaseMiddleware } from "./intypes";

export const LoginValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userModelValidation.parseAsync({ email, password });
    return next();
  } catch (error) {
    throw error;
  }
};
