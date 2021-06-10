const router = require("express").Router();
const controllerInvoices = require('../controllers/invoices.controller');
const authorization = require("../middleware/authorization")


// fetch all invoices of a user
router.post("/all", authorization, controllerInvoices.all)

// fetch all pending invoices of a user
router.post("/", authorization, controllerInvoices.pending )

module.exports = router;