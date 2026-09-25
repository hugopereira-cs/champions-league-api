import express from "express";
import router from "./routes";
import cors from "cors";

// Create a function to create the Express app
function createApp() {
  const app = express();
  
  // Enable CORS for all routes
  app.use(cors());

  // Create a middleware to parse JSON request bodies
  app.use(express.json());

  // Use the router for handling routes
  app.use("/api", router);
  
  return app;
}

export default createApp;
