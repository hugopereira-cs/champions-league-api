# Champions League API ⚽

A REST API built with Node.js, Express, and TypeScript for managing Champions League clubs and players. The project uses JSON files as its data source and persistence layer.

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
- CORS
- Biome
- `tsx` for development and watch mode
- JSON files for data storage

## 📁 Project Structure

```text
src/
├── controllers/    # HTTP request handlers
├── data/           # JSON data files
├── models/         # TypeScript interfaces
├── repositories/   # File-based data access
├── services/       # Application rules
├── app.ts          # Express application setup
├── routes.ts       # API routes
└── server.ts       # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

Set the server port in a `.env` file:

```env
PORT=3000
```

### Run the API

Start the development server:

```bash
npm run start:dev
```

Start the server with file watching enabled:

```bash
npm run start:watch
```

The server uses the port configured by `PORT` and exposes the API under the `/api` prefix.

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

The player ID must not already exist. A successful request returns `201 Created`.

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
| `npm run dist`        | Build the project with `tsdown`                    |
| `npm run typecheck`   | Run the TypeScript compiler without emitting files |
| `npm run lint`        | Check the project with Biome                       |
| `npm run format`      | Format the project with Biome                      |

## 💾 Data Storage

The API stores its data in:

- `src/data/players.json`
- `src/data/clubs.json`

Player create, update, and delete operations write changes directly to `players.json`.
