const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const query = {};

    
    if (req.query.team) {
      query.team = req.query.team;
    }

    
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    
    if (req.query.min || req.query.max) {
      query.price = {};
      if (req.query.min) {
        query.price.$gte = Number(req.query.min);
      }
      if (req.query.max) {
        query.price.$lte = Number(req.query.max);
      }
    }

   if (req.query.category) {
  query.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
}



    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("Грешка при вчитување на производите:", err.message);
    res.status(500).json({ error: "Грешка при вчитување на производите." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description,category, team, driver, price, image } = req.body;

    if (!name ||!category || !price || !image) {
      return res.status(400).json({ message: "Сите полиња се задолжителни." });
    }

    const product = new Product({
      name,
      category,
      description,
      team,
      driver,
      price,
      image,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Грешка при зачувување на производот:", err.message);
    res.status(500).json({ error: "Грешка при зачувување на производот." });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
