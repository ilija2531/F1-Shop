const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const rawToken = req.header("Authorization");
  console.log("👉 TOKEN:", rawToken);

  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = rawToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Вчитување на user од базата
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Корисникот не е пронајден." });
    }

    req.user = user;
    console.log("✅ Logged in as:", user.email);
    next();
  } catch (err) {
    console.error("❌ JWT verify error:", err.message);
    res.status(401).json({ message: "Invalid token." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only." });
  }
};

module.exports = { auth, isAdmin };
