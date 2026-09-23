import fs from "node:fs/promises";
import pool from "./connection";
import type { ClubModel } from "../models/club-model";
import type { PlayerModel } from "../models/player-model";

const loadJson = async <T>(path: string): Promise<T> => {
  const file = await fs.readFile(path, "utf-8");
  return JSON.parse(file) as T;
};

// The seed function is responsible for populating the database with initial data. It connects to the database, reads club and player data from JSON files, and inserts the data into the respective tables. If any error occurs during the process, it rolls back the transaction to ensure data integrity.
const seed = async () => {
  const client = await pool.connect();

  try {
    const clubs = await loadJson<ClubModel[]>("./src/data/clubs.json");
    const players = await loadJson<PlayerModel[]>("./src/data/players.json");

    await client.query("BEGIN");

    for (const club of clubs) {
      await client.query(
        `
          INSERT INTO CLUBS (id, name, country)
          VALUES ($1, $2, $3)
        `,
        [club.id, club.name, club.country]
      );
    }

    const clubIdBYName = new Map(clubs.map((club) => [club.name, club.id]));

    for (const player of players) {
      const clubId = clubIdBYName.get(player.club);

      if (!clubId) {
        throw new Error(`Clube não encontrado: ${player.club}`);
      }

      await client.query(
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
        `,
        [
          player.id,
          player.name,
          clubId,
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
    }

    await client.query("COMMIT");

    console.log(`${clubs.length} clubes inseridos.`);
    console.log(`${players.length} jogadores inseridos.`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seed cancelado. Nenhum dado foi inserido.");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
