const router = require("express").Router();
const controllerOrders = require('../controllers/orders.controller');
const authorization = require("../middleware/authorization")

// Get all Orders
router.get("/", controllerOrders.all)

// Get order byId
router.get("/:id/", controllerOrders.byId)

// Get order byIdSummary
router.get("/:id/header", controllerOrders.byIdHeader)

// Delete order byId
router.delete("/:id/orderDelete", controllerOrders.delete)

module.exports = router;