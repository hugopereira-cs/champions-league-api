import type { PlayerModel } from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";
import pool from "../database/connection";
import fs from "node:fs/promises";

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
      WHERE p.id = $1
    `,
    [id]
  );

  const row = result.rows[0];

  if (!row) return undefined;

  return {
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
  };
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

export const deletePlayerById = async (id: number): Promise<boolean> => {
  const result = await pool.query(
    `
      DELETE FROM players
      WHERE id = $1
      RETURNING id
    `,
    [id]
  );

  return result.rowCount === 1;
};

export const findAndModifyPlayerById = async (
  id: number,
  statistics: StatisticsModel
): Promise<PlayerModel | undefined> => {
  const result = await pool.query(
    `
      UPDATE players
      SET
        overall = $1,
        pace = $2,
        shooting = $3,
        passing = $4,
        dribbling = $5,
        physical = $6
      WHERE id = $7
      RETURNING id, name, nationality, position, club_id, overall, pace, shooting, passing, dribbling, physical
    `,
    [
      statistics.Overall,
      statistics.Pace,
      statistics.Shooting,
      statistics.Passing,
      statistics.Dribbling,
      statistics.Physical,
      id,
    ]
  );

  const row = result.rows[0];

  if (!row) return undefined;

  const clubResult = await pool.query(
    `
      SELECT name
      FROM clubs
      WHERE id = $1
    `,
    [row.club_id]
  );

  return {
    id: row.id,
    name: row.name,
    club: clubResult.rows[0].name,
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
  };
};
