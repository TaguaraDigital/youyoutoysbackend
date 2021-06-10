require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {

    const token = req.header("token");

    if (!token) {
        return res.status(403).json({ msg: "authorization denied" });
    }

    try {
        const verify = jwt.verify(token, process.env.jwtSecrect);
        req.user = verify.user; // user_email
        req.token = token;
        req.email = req.body.email
        next();
  
    } catch (err) {
        return res.status(403).json({
            status: 403,
            success: false,
            message: err.message
        })
    }
};