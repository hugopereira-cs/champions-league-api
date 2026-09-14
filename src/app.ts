import express, { Request, Response } from "express";
import { getPlayer } from "./controllers/players-controllers";

// Create a function to create the Express app
function createApp() {
  const app = express();

  // Create a middleware to parse JSON request bodies
  app.use(express.json());

  // Create a route to handle GET requests to the root path
  app.get("/", getPlayer);

  return app;
};

export default createApp;
