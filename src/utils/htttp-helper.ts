import type { HttpResponse } from "../models/httpResponse-model";

export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  NO_CONTENT: 204,
} as const;

export const Messages = {
  INVALID_ID: "Invalid ID",
} as const;

export const ok = async (data: unknown): Promise<HttpResponse> => ({
  statusCode: HttpStatus.OK,
  body: data,
});

export const noContent = async (): Promise<HttpResponse>  => ({
  statusCode: HttpStatus.NO_CONTENT,
  body: null,
});

export const badRequest = async (message: string): Promise<HttpResponse> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: { message },
});