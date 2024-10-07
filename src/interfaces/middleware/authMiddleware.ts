import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No se proporcionó un token" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
    return;
  }
};
