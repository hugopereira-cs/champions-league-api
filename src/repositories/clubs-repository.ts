import pool from "../database/connection";
import type { ClubModel } from "../models/club-model";


export const findAllClubs = async (): Promise<ClubModel[]> => {
  const result = await pool.query<ClubModel>(
    `
      SELECT id, name, country
      FROM clubs
      ORDER BY id
    `
  );
  return result.rows;
};
