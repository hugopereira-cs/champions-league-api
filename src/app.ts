import express from "express";
import router from "./routes";

// Create a function to create the Express app
function createApp() {
  const app = express();

  // Create a middleware to parse JSON request bodies
  app.use(express.json());

  // Use the router for handling routes
  app.use("/api", router);

  return app;
}

export default createApp;
