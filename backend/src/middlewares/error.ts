
import { NextFunction, Request, Response } from "express";
import HttpError from "@/utils/errorHandler.js";
import { config } from "@/config/index.js";

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {

  err.message ||= "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  const response: {
    success: boolean,
    message: string,
    error?: HttpError
  } = {
    success: false,
    message: err.message,
  };

  if (config.NODE_ENV === "DEVELOPMENT") {
    console.log(err)
    response.error = err;
  }

  return res.status(err.statusCode).json(response);
};

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<unknown, Record<string, unknown>>>;

export const TryCatch = (passedFunc: ControllerType) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

