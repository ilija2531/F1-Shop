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

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMyOrder = async (req, res) => {
   try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Нарачката не е пронајдена." });
    }

    if (!order.user || order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Немате дозвола да ја откажете оваа нарачка." });
    }

    if (order.isPaid) {
      return res.status(400).json({ message: "Не може да се откаже платена нарачка." });
    }

    await order.deleteOne();
    res.json({ message: "Нарачката е откажана успешно." });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ error: "Грешка при откажување на нарачката." });
  }
};
