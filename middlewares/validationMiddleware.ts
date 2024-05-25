import { ZodError } from "zod";
import {
  isAuthenticatedZodObject,
  userAuthZodObject,
  userResgierZodObject,
} from "../models/userModel";
import { BaseMiddleware } from "./intypes";
import { jsonRes, isJWTValid } from "../utils/helper";
import { CategoryZodObject } from "../models/catergoryModel";

export type ValidationErrorType = {
  field_name: string;
  message: string;
};

function ZodErrorHandler(zError: ZodError): ValidationErrorType[] {
  const findedError: ValidationErrorType[] = [];

  zError.errors.map((zodIssue) => {
    const fieldName = zodIssue.path[0].toString();
    const message = zodIssue.message;
    findedError.push({
      field_name: fieldName,
      message,
    });
  });

  return findedError;
}

export const LoginValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userAuthZodObject.parseAsync({ email, password });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const ResgierValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { forename, surname, email, password } = req.body;
    await userResgierZodObject.parseAsync({
      forename,
      surname,
      email,
      password,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const isAuthenticated: BaseMiddleware = async (req, res, next) => {
  try {
    const { jwt_token } = req.body;
    await isAuthenticatedZodObject.parseAsync({ jwt_token });
    // check jwt_token is valid or not
    const user = await isJWTValid(jwt_token);
    if (!user)
      return jsonRes(res, "JWT token is not valid, Please login first!");
    req.userId = user.id;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const CategoryValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { title } = req.body;
    await CategoryZodObject.parseAsync({
      title,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};
