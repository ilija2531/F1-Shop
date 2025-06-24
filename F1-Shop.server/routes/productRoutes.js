const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");
const { auth, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Product = require("../models/Product");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Сите производи
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Враќа листа на производи
 */
router.get("/", getProducts); // everyone
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Додај нов производ (само за админи)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               team:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Производот е креиран
 */
router.post("/", auth, isAdmin, createProduct);
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/upload", auth, isAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Невалиден ID." });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Производот не е пронајден." });
    }

    console.log("🗑️ Избришан производ:", deletedProduct._id);
    res.json({ message: "✅ Производот е избришан успешно." });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Грешка при бришење на производот." });
  }
});


module.exports = router;
