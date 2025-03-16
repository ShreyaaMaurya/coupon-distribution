require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const connectDB = require("./db");

const couponRoutes = require("./routes/coupons");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Connect to database
connectDB();

// Routes
app.use("/api/coupons", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
