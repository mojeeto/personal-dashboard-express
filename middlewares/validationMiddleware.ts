import { ZodError } from "zod";
import { userAuthZodObject } from "../models/userModel";
import { BaseMiddleware } from "./intypes";
import { jsonRes } from "../utils/helper";

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
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};
