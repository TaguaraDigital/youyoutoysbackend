const router = require("express").Router();
const controllerImages = require('../controllers/images.controller');
const authorization = require("../middleware/authorization")


// upload a image
router.post("/", controllerImages.load )

module.exports = router;