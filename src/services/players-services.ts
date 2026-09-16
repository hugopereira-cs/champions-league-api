import type { PlayerModel } from "../models/player-model";
import * as PlayerRepository from "../repositories/players-repository";
import * as HttpResponse from "../utils/htttp-helper";

export const getPlayerService = async () => {
  const data = await PlayerRepository.findAllPlayers();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getPlayerByIdService = async (id: number) => {
  // Request from the data repository
  const data = await PlayerRepository.findPlayerById(id);
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const createPlayerService = async (player: PlayerModel) => {
  if (!player || Object.keys(player).length === 0) {
    return HttpResponse.badRequest(HttpResponse.Messages.INVALID_PLAYER);
  }

  await PlayerRepository.insertPlayer(player);

  return HttpResponse.created(HttpResponse.Messages.PLAYER_CREATED);
};

export const deletePlayerByIdService = async (id: number) => {
  const deletePlayerId = id;
  let data = await PlayerRepository.findAllPlayers();
  const playerExists = data.some((player) => player.id === deletePlayerId);
  let response = null;

  if (playerExists) {
    data = data.filter(player => player.id !== deletePlayerId);
    await PlayerRepository.deletePlayerById(deletePlayerId);
    response = await HttpResponse.ok(HttpResponse.Messages.PLAYER_DELETED);
  } else {
    response = await HttpResponse.notFound(HttpResponse.Messages.PLAYER_NOT_FOUND);
  }

  return response;
}
