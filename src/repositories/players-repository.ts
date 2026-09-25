import type { PlayerModel } from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";
import pool from "../database/connection";

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

type InsertPlayerResult = "created" | "id_exists" | "club_not_found";

export const insertPlayer = async (
  player: PlayerModel
): Promise<InsertPlayerResult> => {
  const clubResult = await pool.query(
    `
      SELECT id
      FROM clubs
      WHERE name = $1
    `,
    [player.club]
  );

  const club = clubResult.rows[0];

  if (!club) return "club_not_found";

  const playerResult = await pool.query(
    `
      INSERT INTO players (
        id,
        name,
        club_id,
        nationality,
        position,
        overall,
        pace,
        shooting,
        passing,
        dribbling,
        physical
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    `,
    [
      player.id,
      player.name,
      club.id,
      player.nationality,
      player.position,
      player.statistics.Overall,
      player.statistics.Pace,
      player.statistics.Shooting,
      player.statistics.Passing,
      player.statistics.Dribbling,
      player.statistics.Physical,
    ]
  );

  if (playerResult.rowCount === 0) return "id_exists";

  return "created";
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
