import express, { Express } from "express";
import { db } from "./config/db";
import colors from "colors";
import { router as productRouter } from "./router";

async function connectDB () {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.blue("Database connected successfully."));
  } catch (error) {
    console.log(error);
    console.log(colors.red("Something went wrong when connecting to the database."));
    process.exit(1);
  }
}

connectDB();

const server = express();

server.use(express.json());
server.use("/api/products", productRouter);
server.use('/api', (req, res) => {
  res.json({ msg: "API running" });
});

export { server };
