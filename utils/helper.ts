import { Response } from "express";
import { ValidationErrorType } from "../middlewares/validationMiddleware";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import env from "./env";
import { findUserByEmail } from "../repo/userRepo";

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

export async function checkPassword(
  givenPassword: string,
  storedPassword: string,
) {
  return await compare(givenPassword, storedPassword);
}

export function jwtCreateToken(data: string | object) {
  return sign(data, env.JWT_TOKEN_SECRET);
}

export async function isJWTValid(jwt_token: string) {
  try {
    const verifyResult = verify(jwt_token, env.JWT_TOKEN_SECRET) as {
      email: string;
    };
    const userEmail = verifyResult.email;
    const user = await findUserByEmail(userEmail);
    if (user) return user;
  } catch {}
  return null;
}
