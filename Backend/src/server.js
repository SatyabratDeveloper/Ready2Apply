import app from "./app.js";
import { PORT } from "./constant.js";

app.listen(PORT, () => {
  console.log(
    `🚀 Server started successfully and is listening on http://localhost:${PORT}`
  );
});
