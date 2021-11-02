import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectToDatabase } from "./utilities/database.js";
import { errorHandler } from "./utilities/error-handling.js";

import rootRouter from "./routes/root.js";
import shopRouter from "./routes/shop.js";
import accountRouter from "./routes/account.js";
import ordersRouter from "./routes/orders.js";
import eventsRouter from "./routes/events.js";
import productsRouter from "./routes/products.js";
import teamRouter from "./routes/team.js";
import settingsRouter from "./routes/settings.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use("/", rootRouter);
app.use("/shop", shopRouter);
app.use("/account", accountRouter);
app.use("/orders", ordersRouter);
app.use("/events", eventsRouter);
app.use("/products", productsRouter);
app.use("/team", teamRouter);
app.use("/settings", settingsRouter);

app.use(errorHandler);

const startServer = async () => {
  const port = process.env.PORT || 3000;
  const devEnv = process.env.NODE_ENV === "development";
  const server = `http://localhost:${port}`;
  try {
    await connectToDatabase();
    app.listen(port, () => {
      if (devEnv) {
        console.log(`Serving on ${server}`);
      }
    });
  } catch (error) {
    if (devEnv) {
      console.log(error);
    }
  }
};

startServer();
