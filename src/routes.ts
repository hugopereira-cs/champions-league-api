import { Router } from "express";
import * as ClubController from "./controllers/clubs-controller";
import * as PlayerController from "./controllers/players-controllers";

const router = Router();

router.get("/players", PlayerController.getPlayers);
router.post("/players", PlayerController.postPlayer);

router.get("/players/:id", PlayerController.getPlayerById);
router.delete("/players/:id", PlayerController.deletePlayerById);
router.patch("/players/:id", PlayerController.updatePlayerById);

router.get("/clubs", ClubController.getClubs);

export default router;
