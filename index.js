require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB BEFORE app.listen
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://web-advance-bc.vercel.app/'],
  credentials: true
}));

// routes
const bookRoutes = require('./src/books/book.route'); 
const orderRoutes = require("./src/orders/order.route");
const userRoutes =  require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Optional root endpoint
app.get("/", (req, res) => {
  res.send("✅ Book Store Server is running!");
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
