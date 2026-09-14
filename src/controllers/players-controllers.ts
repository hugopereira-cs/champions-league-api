import type { Request, Response } from "express";
import { getPlayerService } from "../services/players-services";

export const getPlayer = async (req: Request, res: Response) => {
  // Call the getPlayerService function to retrieve player data
  const httpResponse = await getPlayerService();
  
  // Send the HTTP response with the appropriate status code and body
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
