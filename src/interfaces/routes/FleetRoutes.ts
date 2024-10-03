import { Router } from "express";
import { FleetController } from "../controllers/FleetController.js";

const router = Router();

router.post("/", FleetController.createFleet);
router.get("/", FleetController.findAllFleet);

export default router;
