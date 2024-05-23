import { BaseMiddleware } from "../middlewares/intypes";
import { jsonRes } from "../utils/helper";

export const login: BaseMiddleware = (req, res, next) => {
  // check user email is exists or not
  // check password is currect
  // create jwt token and send it to user
  jsonRes(res, "Login");
};
export const signup: BaseMiddleware = (req, res, next) => {
  // check email is exists or not, if exists then register process failed
  // make password hash
  // return message that user created
  jsonRes(res, "Sign-UP");
};
