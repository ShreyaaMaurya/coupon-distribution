const Claim = require("../models/Claim");

module.exports = async (req, res, next) => {
    const oneHourAgo = new Date(Date.now() - 3600000);
    const existingClaim = await Claim.findOne({ ip: req.ip, createdAt: { $gte: oneHourAgo } });

    if (existingClaim) {
        return res.status(403).json({ message: "You must wait before claiming another coupon." });
    }

    next();
};
