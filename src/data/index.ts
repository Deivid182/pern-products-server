import { exit } from "node:process";
import colors from "colors"
import { db } from "../config/db";

export const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log(colors.blue("Database cleared successfully."));
    exit(0)
  } catch (error) {
    console.log(error);
    exit(1);
  }
}
console.log(process.argv)
if(process.argv[2] === "--clear") {
  clearDB()
}

