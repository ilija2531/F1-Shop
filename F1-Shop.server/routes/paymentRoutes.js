require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, user } = req.body;

    if (!items || !user) {
      return res.status(400).json({ error: "Недостасуваат податоци." });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "mkd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        cart: JSON.stringify(items),
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        userEmail: user.email,
        userName: user.name,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe session error:", err.message);
    res.status(500).json({ error: "Stripe сесијата не успеа." });
  }
});


router.get("/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json(session);
  } catch (err) {
    console.error("❌ Stripe session fetch error:", err.message);
    res.status(500).json({ error: "Неуспешно подигнување Stripe сесија." });
  }
});

module.exports = router;
