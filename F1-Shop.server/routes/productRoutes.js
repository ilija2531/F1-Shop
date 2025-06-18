const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");
const { auth, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

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
router.post("/upload", auth, isAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});


module.exports = router;
