import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const defaultData = {
  events: [],
};
const adapter = new JSONFile("./src/data/db.json");
const db = new Low(adapter, defaultData);

await db.read();
export { db };
