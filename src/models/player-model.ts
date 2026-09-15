// This file defines the PlayerModel interface, which represents the structure of a player object in the application. It includes properties such as id, name, club, nationality, position, and statistics.
export interface PlayerModel {
  id: number;
  name: string;
  club: string;
  nationality: string;
  position: string;
  statistics: {
    Overall: number;
    Pace: number;
    Shooting: number;
    Passing: number;
    Dribbling: number;
    Physical: number;
  }
};
