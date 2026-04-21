import app from "./app.js";
import "dotenv/config.js";
import connectToDatabase from "./data/connect.js";

connectToDatabase();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/events`);
});
