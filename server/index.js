import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import { kpis, products, transactions } from "./data/data.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

const runServer = (DB, PORT) => {
  mongoose
    .connect(DB)
    .then(() => console.log("Database Engaged"))
    .then(async () => {
      app.listen(PORT, () => console.log(`Live at http://localhost:${PORT}`));
      // KPI.insertMany(kpis)
      // Product.insertMany(products)
      // Transaction.insertMany(transactions)
    })
    .catch((error) => console.log(`${error}`));
};

runServer(process.env.DB_URL, process.env.PORT);
