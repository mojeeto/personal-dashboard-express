import { Response } from "express";
import { ValidationErrorType } from "../middlewares/validationMiddleware";
import { hash } from "bcryptjs";

export function jsonRes(
  res: Response,
  message: string,
  options?: {
    statusCode?: number;
    data?: string | object | Array<string> | Array<number> | Array<object>;
    validationData?: ValidationErrorType | Array<ValidationErrorType>;
  },
) {
  let data, validationData;
  const statusCode = options?.statusCode || 200;
  if (options) {
    data = options.data;
    validationData = options.validationData;
  }
  res.status(statusCode).json({
    statusCode,
    message,
    data,
    validationData,
  });
}

export async function hashPassword(password: string) {
  return await hash(password, 12);
}
