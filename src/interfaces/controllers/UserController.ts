import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserService } from "../../aplication/services/UserService.js";
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js";
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  static async register(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { nombre, email, password } = req.body;

    try {
      const user = await userService.registerUser({ nombre, email, password });
      res
        .status(201)
        .json({ message: "Usuario registrado exitosamente", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      const { token } = await userService.loginUser(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
