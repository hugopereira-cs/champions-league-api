import fs from "node:fs/promises"
import type { ClubModel } from "../models/club-model";


export const findAllClubs = async (): Promise<ClubModel[]> => {
  const rawData = await fs.readFile("./src/data/clubs.json", "utf-8");
  const clubs: ClubModel[] = JSON.parse(rawData);
  return clubs;
};
