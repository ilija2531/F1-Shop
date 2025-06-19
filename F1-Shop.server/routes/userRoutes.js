const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/authMiddleware");

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