const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  status: {
    type: String,
    enum: ["pending", "approved", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shipping:{
    fullName: { type: String },
    address: { type: String },
    city: { type: String },
    phone: { type: String },
  },
  stripeSessionId: { type: String, unique: true, sparse: true }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
