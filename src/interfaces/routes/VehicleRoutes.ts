import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController.js";

const router = Router();

router.post("/", VehicleController.createVehicle);
router.get("/", VehicleController.findAllVehicles);
router.get("/:fleetId", VehicleController.findByFleet);

export default router;
