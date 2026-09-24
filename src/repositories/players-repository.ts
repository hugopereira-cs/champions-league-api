import type { PlayerModel } from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";
import pool from "../database/connection";
import fs from "node:fs/promises"

export const readPlayers = async (): Promise<PlayerModel[]> => {
  const result = await pool.query(
    `
      SELECT
        p.id,
        p.name,
        p.nationality,
        p.position,
        p.club_id AS "clubId",
        p.overall,
        p.pace,
        p.shooting,
        p.passing,
        p.dribbling,
        p.physical,
        c.name As club
      FROM players p
      INNER JOIN clubs c ON c.id = p.club_id
      ORDER BY p.id
    `
  );

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    club: row.club,
    nationality: row.nationality,
    position: row.position,
    statistics: {
      Overall: row.overall,
      Pace: row.pace,
      Shooting: row.shooting,
      Passing: row.passing,
      Dribbling: row.dribbling,
      Physical: row.physical,
    },
  }));
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
