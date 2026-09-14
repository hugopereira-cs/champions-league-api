import { noContent, ok } from "../utils/htttp-helper";

export const getPlayerService = async () => {
  const data = null;
  let response = null;

  if (data) {
    response = await ok(data);
  } else {
    response = await noContent();
  }
  return response;
}