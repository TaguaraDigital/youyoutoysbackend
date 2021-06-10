const router = require("express").Router();
const controllerProducts = require('../controllers/products.controller');
const authorization = require("../middleware/authorization")


// Get all products
router.get("/", controllerProducts.all)

// Get a product by Id
router.get("/:id", controllerProducts.byId);

// Create a product
router.post("/", controllerProducts.create);

// Update a product
router.put("/:id", controllerProducts.update);

// Delete a product
router.delete("/:id", controllerProducts.delete);

// Add a Images of product
router.post("/:id/image", controllerProducts.addImage);

// Get all products join with orders of a customer
router.get("/:id/ordersGet", controllerProducts.ordersGet)

// Create orders of a customer
router.post("/:id/ordersCreate", controllerProducts.ordersCreate)

// Confirm orders of a customer
router.put("/:id/ordersConfirm", controllerProducts.ordersConfirm)


module.exports = router;