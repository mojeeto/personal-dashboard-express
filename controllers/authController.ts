import { BaseMiddleware } from "../middlewares/intypes";
import { jsonRes } from "../utils/helper";

export const login: BaseMiddleware = (req, res, next) => {
  jsonRes(res, "Login");
};
export const signup: BaseMiddleware = (req, res, next) => {};
