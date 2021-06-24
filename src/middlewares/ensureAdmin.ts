import { Request, Response, NextFunction } from "express";

export default function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  const admin = true;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    status: "Unauthorized",
    message: "User not authorized to perform this action",
  });
}
