const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, deleteMyOrder, statusUpdateOrder } = require("../controllers/orderController");
const { auth, isAdmin } = require("../middleware/authMiddleware");
router.post("/", auth, createOrder);        
router.get("/my", auth, getMyOrders);   
router.get("/all", auth, isAdmin, getAllOrders);
router.delete("/:id", auth, deleteMyOrder);
router.patch("/:id/status", auth, isAdmin, statusUpdateOrder);


module.exports = router;
