import type { HttpResponse } from "../models/httpResponse-model";

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
} as const;

export const Messages = {
  INVALID_ID: "Invalid ID",
  INVALID_PLAYER: "Invalid player data",
  PLAYER_CREATED: "Player created successfully",
  PLAYER_DELETED: "Player deleted successfully",
  PLAYER_NOT_FOUND: "Player not found",
  PLAYER_UPDATED: "Player updated successfully",
  ID_EXISTS: "This ID already exists. Please choose a different ID.",
  CLUB_NOT_FOUND: "Club not found",
  DATABASE_ERROR: "Database error"
} as const;

export const ok = async (data: unknown): Promise<HttpResponse> => ({
  statusCode: HttpStatus.OK,
  body: data,
});

export const created = async (message: string): Promise<HttpResponse> => ({
  statusCode: HttpStatus.CREATED,
  body: { message },
});

export const noContent = async (): Promise<HttpResponse>  => ({
  statusCode: HttpStatus.NO_CONTENT,
  body: null,
});

export const badRequest = async (message: string): Promise<HttpResponse> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: { message },
});

export const notFound = async (message: string): Promise<HttpResponse> => ({
  statusCode: HttpStatus.NOT_FOUND,
  body: { message },
});
