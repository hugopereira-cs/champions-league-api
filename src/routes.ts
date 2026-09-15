import { Router } from "express";
import * as PlayerController from "./controllers/players-controllers";

const router = Router();

// Create a route to handle GET requests to the /players path
router.get("/players", PlayerController.getPlayer);
router.get("/players/:id", PlayerController.getPlayerById);

export default router;
