require("dotenv").config();
const mongoose = require("mongoose");

// Define Coupon Schema
const couponSchema = new mongoose.Schema({
    code: String,
    claimed: { type: Boolean, default: false }
});

// Create Model
const Coupon = mongoose.model("Coupon", couponSchema);

// Connect to MongoDB and Insert Coupons
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ MongoDB connected...");

        // Optional: Clear existing coupons to prevent duplicates
        await Coupon.deleteMany(); 
        console.log("🔄 Old coupons deleted.");

        // Insert new coupons
        const coupons = [
            { code: "DISCOUNT10", claimed: false },
            { code: "DISCOUNT20", claimed: false },
            { code: "FREE50", claimed: false }
        ];

        await Coupon.insertMany(coupons);
        console.log("🎉 Coupons added successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Error inserting coupons:", error);
        process.exit(1);
    }
};

// Run the function
connectDB();
