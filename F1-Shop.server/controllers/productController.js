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

    

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Грешка при вчитување на производите." });
  }
};


const createProduct = async (req, res) => {
  try {
    const { name, description, team, price, image } = req.body;

    if (!name || !price || !team || !image) {
      return res.status(400).json({ message: "Сите полиња се задолжителни." });
    }

    const product = new Product({
      name,
      description,
      team,
      price,
      image,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Грешка при зачувување на производот." });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
