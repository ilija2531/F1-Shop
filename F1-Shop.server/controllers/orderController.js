const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice,stripeSessionId, shipping } = req.body;
    if (!stripeSessionId) {
  return res.status(400).json({ error: "Недостасува Stripe Session ID." });
}

const existingOrder = await Order.findOne({ stripeSessionId });

if (existingOrder) {
  return res.status(200).json(existingOrder); 
}
    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      stripeSessionId,
      isPaid: true,
      paidAt: new Date(),
      shipping,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
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

    if (!order.user || order.user.toString() !== req.user.id.toString()) {
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

exports.statusUpdateOrder = async (req, res) => {const { status } = req.body;
  const allowed = ["pending", "approved", "shipped", "delivered", "cancelled"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Невалиден статус." });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Нарачката не е пронајдена." });

    order.status = status;
    await order.save();

    res.json({ message: "Статусот е променет успешно.", order });
  } catch (err) {
    console.error("Грешка при промена на статус:", err.message);
    res.status(500).json({ message: "Внатрешна грешка." });
  }
};
