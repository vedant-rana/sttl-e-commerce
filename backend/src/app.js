import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";

config({
  path: "./src/.env",
});

// ENV Constants
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

console.log(MONGO_URI);

// connecting to mongoDB
await connectToMongoDb(MONGO_URI);

// creating express instance app
const app = express();

// parsing body with express json
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//making uploads folder available to users as static
app.use("/uploads", express.static("uploads"));

// setting up routes with app
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { RouteStrings } from "./utils/constants/routeStrings.js";
import { connectToMongoDb } from "./utils/dbConnection.js";
app.use(RouteStrings.USER_URL, userRoutes);
app.use(RouteStrings.PRODUCT_URL, productRoutes);
app.use(RouteStrings.CART_URL, cartRoutes);

// custom error handler middleware
import { errorMiddleware } from "./middlewares/errorMiddlesware.js";
import cookieParser from "cookie-parser";
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
