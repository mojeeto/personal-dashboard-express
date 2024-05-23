import { BaseMiddleware } from "../middlewares/intypes";
import { createUser, findUserByEmail } from "../repo/userRepo";
import { checkPassword, hashPassword, jsonRes } from "../utils/helper";

export const login: BaseMiddleware = async (req, res, next) => {
  try {
    // check user email is exists or not
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user)
      return jsonRes(res, "Please register first!", { statusCode: 403 });
    // check password is currect
    const userPasswrod = user.password;
    const resultOfPasswordChecking = await checkPassword(
      password,
      userPasswrod,
    );
    if (!resultOfPasswordChecking)
      return jsonRes(res, "Email or Password is not correct!", {
        statusCode: 403,
      });
    // create jwt token and send it to user
    jsonRes(res, "Welcome");
  } catch (err) {
    return jsonRes(res, "Error while login to account.", {
      statusCode: 500,
    });
  }
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
