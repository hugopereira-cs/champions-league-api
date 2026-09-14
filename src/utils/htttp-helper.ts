interface HttpResponse {
  statusCode: number;
  body: any;
};

export const ok = async (data: any): Promise<HttpResponse> => ({
  statusCode: 200,
  body: data,
});
