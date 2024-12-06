import express from "express";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Retrieve the PayPal Client ID from the backend server
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Middleware for serving static files
const __dirname = path.resolve(); // Set __dirname to current directory e.g. "C:\Users\Asus\Desktop\MERN Full Stack\proshop-v2"
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // To serve static files like images directly to the client.

console.log(path.join(__dirname, "/frontend/build"));
console.log(path.resolve(__dirname, "frontend", "build"));

if (process.env.NODE_ENV === "production") {
  // Set React frontend app as static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Any route that is not api will be redirected to React's index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
