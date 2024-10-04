import { Router } from "express";
import { body, param, query } from "express-validator";
import { VehicleController } from "../controllers/VehicleController.js";

const router = Router();

router.post(
  "/",
  [
    body("marca")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("La marca es obligatoria"),
    body("modelo")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("El modelo es obligatorio"),
    body("año")
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage("Año inválido para un vehículo"),
  ],
  VehicleController.createVehicle
);

router.get(
  "/",
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
  [
    param("fleetId")
      .isMongoId()
      .withMessage("fleetId debe ser un ID válido de MongoDB"),
  ],
  VehicleController.findByFleet
);

export default router;
