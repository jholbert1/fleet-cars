import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers/UserController.js";

const router = Router();

router.post(
  "/register",
  [
    body("nombre").not().isEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Debe proporcionar un email válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  UserController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe proporcionar un email válido"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña es obligatoria"),
  ],
  UserController.login
);

export default router;
