import express, { Express } from "express";
import { db } from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { router as productRouter } from "./router";


export async function connectDB () {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.blue("Database connected successfully."));
  } catch (error) {
    console.log(error);
    console.log(colors.red("Something went wrong when connecting to the database."));
  }
}

connectDB();

const server = express();

server.use(express.json());
server.use("/api/products", productRouter);

// docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { server };
