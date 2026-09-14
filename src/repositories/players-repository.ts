interface PlayerModel {
  id: number,
  name: string,
}

const database: PlayerModel[] = [
  {id: 1, name: "lautaro"},
  {id: 2, name: "messi"},
];

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  return database;
};

export const findPalyerById = async (id: number): Promise<PlayerModel | undefined> => {
  return database.find(player => player.id === id);
}
