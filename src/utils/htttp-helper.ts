import type { HttpResponse } from "../models/httpResponse-model";


export const ok = async (data: any): Promise<HttpResponse> => ({
  statusCode: 200,
  body: data,
});

export const noContent = async (): Promise<HttpResponse> => ({
  statusCode: 204,
  body: null,
});
