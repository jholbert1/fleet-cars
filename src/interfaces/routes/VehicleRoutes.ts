import { Router } from "express";
import { body, param, query } from "express-validator";
import { VehicleController } from "../controllers/VehicleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  [
    body("brand")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("La brand es obligatoria"),
    body("carModel")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("El carModel es obligatorio"),
    body("year")
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage("Año inválido para un vehículo"),
  ],
  VehicleController.createVehicle
);

router.get(
  "/",
  authMiddleware,
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("El número de página debe ser un entero positivo"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("El límite debe ser un entero positivo"),
  ],
  VehicleController.findAllVehicles
);

router.get(
  "/:fleetId",
  authMiddleware,
  [
    param("fleetId")
      .isMongoId()
      .withMessage("fleetId debe ser un ID válido de MongoDB"),
  ],
  VehicleController.findByFleet
);

export default router;
