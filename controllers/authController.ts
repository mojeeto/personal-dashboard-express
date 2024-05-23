import { BaseMiddleware } from "../middlewares/intypes";
import { createUser, findUserByEmail } from "../repo/userRepo";
import { hashPassword, jsonRes } from "../utils/helper";

export const login: BaseMiddleware = (req, res, next) => {
  // check user email is exists or not
  // check password is currect
  // create jwt token and send it to user
  jsonRes(res, "Login");
};
export const signup: BaseMiddleware = async (req, res, next) => {
  try {
    // check email is exists or not, if exists then register process failed
    const { forename, surname, email, password } = req.body;
    let user = await findUserByEmail(email);
    if (user)
      return jsonRes(res, "User is exists.", {
        statusCode: 403,
      });
    // make password hash and create user
    const hashedPassword = await hashPassword(password);
    user = await createUser({
      forename,
      surname,
      email,
      password: hashedPassword,
    });
    if (!user)
      return jsonRes(res, "Creating User Failed.", { statusCode: 500 });
    // return message that user created
    jsonRes(res, "User created!", {
      statusCode: 201,
    });
  } catch (error) {
    return jsonRes(res, "Error while creating user.", {
      statusCode: 500,
    });
  }
};
