import app from "./app.js";
import "dotenv/config.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Access events on http://localhost:${PORT}/`);
  console.log(`Server is running on http://localhost:${PORT}/api/events`);
});
