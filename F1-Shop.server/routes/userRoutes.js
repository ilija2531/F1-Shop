const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");


router.put("/profile", auth, async (req, res) => {
  try {
    console.log("✅ req.user:", req.user);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Корисникот не е пронајден." });

    user.name = req.body.name || user.name;
    if (req.body.password) user.password = req.body.password;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
    });
  } catch (err) {
    console.error("❌ Error updating profile:", err.message);
    res.status(500).json({ message: "Грешка при ажурирање на профилот." });
  }
});



router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Грешка при вчитување корисници." });
  }
});
router.get("/:id", auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Корисникот не е пронајден." });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Грешка при вчитување на корисникот." });
  }
});





module.exports = router;