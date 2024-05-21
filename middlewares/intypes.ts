import { Request, Response, NextFunction } from "express";

export type BaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
