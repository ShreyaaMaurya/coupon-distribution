const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Claim", ClaimSchema);
