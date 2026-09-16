import { Router } from "express";
import * as PlayerController from "./controllers/players-controllers";

const router = Router();

router.get("/players", PlayerController.getPlayer);
router.post("/players", PlayerController.postPlayer);

router.get("/players/:id", PlayerController.getPlayerById);
router.delete("/players/:id", PlayerController.deletePlayerById);
router.patch("/players/:id", PlayerController.updatePlayerById);

export default router;
