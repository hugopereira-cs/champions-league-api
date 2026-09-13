import express, { Request, Response } from "express";

// Create a function to create the Express app
function createApp() {
  const app = express();

  // Create a middleware to parse JSON request bodies
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ player: "messi" });
  });

  return app;
};

export default createApp;
