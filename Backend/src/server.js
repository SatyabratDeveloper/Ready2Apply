import dotenv from "dotenv";
import app from "./app.js";
import { PORT } from "./constants.js";
import mongoDB from "./db/index.js";

dotenv.config();

// Connect MongoDB and start Express server
mongoDB()
  .then(() => {
    app.on("error", (error) => console.log("Express error: ", error));
    app.listen(PORT, () => {
      console.log(
        `🚀 Server started successfully and is listening on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => console.log("MongoDB connection failed: ", error));
