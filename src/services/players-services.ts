import type { PlayerModel } from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";
import * as PlayerRepository from "../repositories/players-repository";
import * as HttpResponse from "../utils/htttp-helper";

export const getPlayersService = async () => {
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
    response = await HttpResponse.notFound(
      HttpResponse.Messages.PLAYER_NOT_FOUND
    );
  }

  return response;
};

export const createPlayerService = async (player: PlayerModel) => {
  if (!player || Object.keys(player).length === 0) {
    return HttpResponse.badRequest(HttpResponse.Messages.INVALID_PLAYER);
  }

  const result = await PlayerRepository.insertPlayer(player);

  if (result === "id_exists") {
    return HttpResponse.badRequest(HttpResponse.Messages.ID_EXISTS);
  }

  return HttpResponse.created(HttpResponse.Messages.PLAYER_CREATED);
};

export const deletePlayerByIdService = async (id: number) => {
  let response = null;
  const isDeleted = await PlayerRepository.deletePlayerById(id);

  if (isDeleted) {
    response = await HttpResponse.ok(HttpResponse.Messages.PLAYER_DELETED);
  } else {
    response = await HttpResponse.notFound(
      HttpResponse.Messages.PLAYER_NOT_FOUND
    );
  }

  return response;
};

export const updatePlayerByIdService = async (
  id: number,
  statistics: StatisticsModel
) => {
  if (!statistics || Object.keys(statistics).length === 0) {
    return HttpResponse.badRequest(HttpResponse.Messages.INVALID_PLAYER);
  }

  const player = await PlayerRepository.findPlayerById(id);

  if (!player) {
    return HttpResponse.notFound(HttpResponse.Messages.PLAYER_NOT_FOUND);
  }

  await PlayerRepository.findAndModifyPlayerById(id, statistics);

  return HttpResponse.ok(HttpResponse.Messages.PLAYER_UPDATED);
};
