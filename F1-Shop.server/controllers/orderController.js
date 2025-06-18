const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const order = new Order({
      user: req.user.userId,
      items,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
