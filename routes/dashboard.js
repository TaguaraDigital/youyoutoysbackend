const router = require("express").Router();
const controllerDashboard = require('../controllers/dashboard.controller');
const authorization = require("../middleware/authorization")


// Home
router.get("/", authorization, controllerDashboard.home )


module.exports = router;