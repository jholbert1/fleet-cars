import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController.js";

const router = Router();

router.post("/", VehicleController.createVehicle);
router.get("/", VehicleController.findAllVehicles);

export default router;
