import { Messages, badRequest } from "../utils/htttp-helper";
import * as service from "../services/players-services";
import type { Request, Response } from "express";
import type { StatisticsModel } from "../models/statistics-model";

export const getPlayers = async (req: Request, res: Response) => {
  // Call the getPlayersService function to retrieve player data
  const httpResponse = await service.getPlayersService();

  // Send the HTTP response with the appropriate status code and body
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getPlayerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // Parse the ID from the request parameters and validate it
  const id = parseInt(req.params.id, 10);

  // Validate the ID to ensure it is a positive integer
  if (!Number.isInteger(id) || id <= 0) {
    const response = await badRequest(Messages.INVALID_ID);
    return res
      .status(response.statusCode)
      .json({ message: response.body.message });
  }

  const httpResponse = await service.getPlayerByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const postPlayer = async (req: Request, res: Response) => {
  // Extract player data from the request body
  const bodyValue = req.body;

  // Call the service function to create a new player
  const httpResponse = await service.createPlayerService(bodyValue);

  return res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const deletePlayerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // Parse the ID from the request parameters and validate it
  const id = parseInt(req.params.id, 10);

  // Validate the ID to ensure it is a positive integer
  if (!Number.isInteger(id) || id <= 0) {
    const response = await badRequest(Messages.INVALID_ID);
    return res
      .status(response.statusCode)
      .json({ message: response.body.message });
  }

  const httpResponse = await service.deletePlayerByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updatePlayerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // Parse the ID from the request parameters and validate it
  const id = parseInt(req.params.id, 10);
  const bodyValue: StatisticsModel = req.body;

  // Validate the ID to ensure it is a positive integer
  if (!Number.isInteger(id) || id <= 0) {
    const response = await badRequest(Messages.INVALID_ID);
    return res
      .status(response.statusCode)
      .json({ message: response.body.message });
  }

  const httpResponse = await service.updatePlayerByIdService(id, bodyValue);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
