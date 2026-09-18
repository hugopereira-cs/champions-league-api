import type { PlayerModel } from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";
import fs from "node:fs/promises";

export const readPlayers = async (): Promise<PlayerModel[]> => {
  const data = await fs.readFile("./src/data/players.json", "utf-8");
  const players: PlayerModel[] = JSON.parse(data);
  return players;
};

export const writePlayers = async (players: PlayerModel[]): Promise<void> => {
  const data = JSON.stringify(players, null, 2);
  await fs.writeFile("./src/data/players.json", data, "utf-8");
};

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  const players = await readPlayers();
  return players;
};

export const findPlayerById = async (
  id: number
): Promise<PlayerModel | undefined> => {
  const players = await readPlayers();
  return players.find((player) => player.id === id);
};

export const insertPlayer = async (player: PlayerModel) => {
  const players = await readPlayers();
  const idExists = players.filter((p) => p.id === player.id).length > 0;

  if (idExists) {
    return true;
  }
  players.push(player);
  await writePlayers(players);
  return false;
};

export const deletePlayerById = async (id: number) => {
  const players = await readPlayers();
  const index = players.findIndex((player) => player.id === id);

  if (index !== -1) {
    players.splice(index, 1);
    await writePlayers(players);
    return true;
  }
  return false;
};

export const findAndModifyPlayerById = async (
  id: number,
  statistics: StatisticsModel
): Promise<PlayerModel | undefined> => {
  const players = await readPlayers();
  const playerIndex = players.findIndex((player) => player.id === id);

  if (playerIndex !== -1) {
    players[playerIndex].statistics = statistics;
    await writePlayers(players);
  }

  return players[playerIndex];
};
