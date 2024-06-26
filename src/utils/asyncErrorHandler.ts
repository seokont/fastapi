import { NextFunction, Request, Response } from "express";
import { logError } from "./logger";

export const asyncErrorHandler = (asyncFunction: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      return await asyncFunction(req, res, next);
    } catch (error: any) {
      logError(error, req);

      return res.status(500).json({
        error: true,
        code: 500,
        message: "Internal Server Error",
      });
    }
  };
};
