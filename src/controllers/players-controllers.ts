import type { Request, Response } from "express";
import { getPlayerService } from "../services/players-services";
import { ok } from "../utils/htttp-helper";

export const getPlayer = async (req: Request, res: Response) => {
  // Call the getPlayerService function to retrieve player data
  const data = await getPlayerService();

  // Use the ok function to create a standardized HTTP response
  const response = await ok(data);
  res.status(response.statusCode).json(response.body);
};
