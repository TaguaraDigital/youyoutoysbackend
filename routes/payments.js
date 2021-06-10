const express = require('express');
const router = express.Router();
const controllerPayments = require('../controllers/payments.controller')

router.put('/payment', controllerPayments.stripe); // cobro de recibos usando la pasarela de pago de stripe


module.exports = router;