const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const Claim = require("../models/Claim");
const abuseCheck = require("../middleware/abuseCheck");

router.post("/claim", abuseCheck, async (req, res) => {
    try {
        const availableCoupon = await Coupon.findOne({ claimed: false });

        if (!availableCoupon) {
            return res.status(400).json({ message: "No coupons available" });
        }

        await Claim.create({ ip: req.ip, coupon: availableCoupon._id });
        availableCoupon.claimed = true;
        await availableCoupon.save();

        res.json({ coupon: availableCoupon.code });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
