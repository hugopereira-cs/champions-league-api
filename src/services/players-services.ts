import * as PlayerRepository from "../repositories/players-repository";
import { noContent, ok } from "../utils/htttp-helper";

export const getPlayerService = async () => {
  const data = await PlayerRepository.findAllPlayers();
  let response = null;

  if (data) {
    response = await ok(data);
  } else {
    response = await noContent();
  }
  return response;
};
