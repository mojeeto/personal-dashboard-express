import { ZodError, z } from "zod";
import {
  isAuthenticatedZodObject,
  userAuthZodObject,
  userResgierZodObject,
} from "../models/userModel";
import { BaseMiddleware } from "./intypes";
import { jsonRes, isJWTValid } from "../utils/helper";
import { CategoryZodObject } from "../models/catergoryModel";
import { CurrencyZodObject } from "../models/currencyModel";

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
    const { title, new_title } = req.body;
    const method = req.method.toLowerCase();
    if (["post", "delete"].includes(method)) {
      await CategoryZodObject.parseAsync({
        title,
      });
    } else if (method === "patch") {
      await CategoryZodObject.required({ new_title: true });
    } else {
      return jsonRes(res, "Bad method!", { statusCode: 404 });
    }
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

export const currencyValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { name, currency } = req.body;
    const method = req.method.toLowerCase();
    if (["post", "delete"].includes(method)) {
      await CurrencyZodObject.required({ name: true }).parseAsync(req.body);
      return next();
    } else if (method === "get") {
      await CurrencyZodObject.parseAsync(req.body);
      return next();
    }
    return jsonRes(res, "Bad Method!", {
      statusCode: 403,
    });
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

export const IdParamValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    await z
      .object({
        id: z
          .string({
            required_error: "Id is required for this path!",
          })
          .trim(),
      })
      .parseAsync({ id });
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
