const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, createOrder);        
router.get("/my", auth, getMyOrders);       

module.exports = router;
