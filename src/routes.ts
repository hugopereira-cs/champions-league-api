import { Router } from "express";
import { getPlayer } from "./controllers/players-controllers";

const router = Router();

// Create a route to handle GET requests to the /players path
router.get("/players", getPlayer);

export default router;
