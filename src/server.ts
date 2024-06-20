import express, { Express } from "express";
import { db } from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { router as productRouter } from "./router";
import cors, { CorsOptions } from "cors";
import { CLIENT_URL } from "./config/envs";
import morgan from "morgan";

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

const server = express()

const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    if(origin === CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", productRouter);

// docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { server };
