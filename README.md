# Champions League API ⚽

A REST API built with Node.js, Express, TypeScript, and PostgreSQL for managing Champions League clubs and players.

## ✨ Features

- List Champions League clubs
- List all players
- Find a player by ID
- Create a player
- Update a player's statistics
- Delete a player
- CORS enabled for the Express application

## 🧰 Tech Stack

- Node.js
- TypeScript
- Express 5
- PostgreSQL
- `pg` for PostgreSQL access
- CORS
- Biome
- `tsx` for development and watch mode

## 📁 Project Structure

```text
src/
├── controllers/    # HTTP request handlers
├── data/           # JSON source data used by the initial seed
├── database/       # PostgreSQL connection, migration and seed
├── models/         # TypeScript interfaces
├── repositories/   # PostgreSQL data access
├── services/       # Application rules
├── app.ts          # Express application setup
├── routes.ts       # API routes
└── server.ts       # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Installation

```bash
npm install
```

Create a PostgreSQL database, for example:

```sql
CREATE DATABASE champions_league;
```

Create a `.env` file in the project root with the server port and connection URL:

```env
PORT=3333
DATABASE_URL=postgresql://username:password@localhost:5432/champions_league
```

Replace `username` and `password` with the PostgreSQL credentials for your local environment. Keep `.env` out of version control; it contains credentials.

### Create the database tables

Run the initial SQL migration from the project root:

```bash
psql -U username -d champions_league -f src/database/migrations/001-create-tables.sql
```

This creates the `clubs` and `players` tables. Each player references a club through `players.club_id`, and database constraints validate the relationship and the statistics range.

### Import the initial data

After creating the tables, run:

```bash
npm run seed
```

The seed reads `src/data/clubs.json` and `src/data/players.json`, then inserts the clubs and players into PostgreSQL. Clubs are inserted first because players reference them. This is an initial import script; do not run it again against an already populated database, because duplicate IDs will cause the transaction to fail.

### Run the API

Start the development server:

```bash
npm run start:dev
```

Start the server with file watching enabled:

```bash
npm run start:watch
```

The server checks the PostgreSQL connection before listening. It uses the port configured by `PORT` and exposes the API under the `/api` prefix.

## 📡 API Endpoints

| Method   | Endpoint           | Description                   |
| -------- | ------------------ | ----------------------------- |
| `GET`    | `/api/players`     | List all players              |
| `GET`    | `/api/players/:id` | Find a player by ID           |
| `POST`   | `/api/players`     | Create a player               |
| `PATCH`  | `/api/players/:id` | Replace a player's statistics |
| `DELETE` | `/api/players/:id` | Delete a player               |
| `GET`    | `/api/clubs`       | List all clubs                |

### Create a player

`POST /api/players` expects a player object with the following shape:

```json
{
  "id": 100,
  "name": "Example Player",
  "club": "Example Club",
  "nationality": "Example Country",
  "position": "CM",
  "statistics": {
    "Overall": 80,
    "Pace": 75,
    "Shooting": 70,
    "Passing": 85,
    "Dribbling": 82,
    "Physical": 78
  }
}
```

The player ID must not already exist, and `club` must match a club in the database. Each statistic must be an integer from `0` to `99`. A successful request returns `201 Created`.

### Update player statistics

`PATCH /api/players/:id` expects a statistics object:

```json
{
  "Overall": 84,
  "Pace": 78,
  "Shooting": 73,
  "Passing": 88,
  "Dribbling": 85,
  "Physical": 80
}
```

The update replaces the selected player's existing `statistics` object.

## 🛠️ Available Scripts

| Script                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npm run start:dev`   | Start the development server                       |
| `npm run start:watch` | Start the server in watch mode                     |
| `npm run start:dist`  | Build and start the compiled server                |
| `npm run seed`        | Import the initial JSON data into PostgreSQL        |
| `npm run dist`        | Build the project with `tsdown`                    |
| `npm run typecheck`   | Run the TypeScript compiler without emitting files |
| `npm run lint`        | Check the project with Biome                       |
| `npm run format`      | Format the project with Biome                      |

## 💾 Data Storage

PostgreSQL is the API's persistence layer. The JSON files in `src/data/` are retained as the source for the initial seed; after import, API reads and writes go directly to PostgreSQL.
