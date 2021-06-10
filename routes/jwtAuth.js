const router = require("express").Router();
const controllerAuth = require('../controllers/auth.controller');
const authorization = require("../middleware/authorization")
const validInfo = require("../middleware/validInfo")


// register
router.post("/register", validInfo, controllerAuth.register )

// login
router.post("/login", validInfo, controllerAuth.login)

// verify if user is verified 
router.get("/is-verify", authorization, controllerAuth.verify)


module.exports = router;