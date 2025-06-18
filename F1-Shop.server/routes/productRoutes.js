const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts); // everyone
router.post("/", auth, isAdmin, createProduct); // admin only
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
