const bcrypt = require("bcrypt");
const dbConnection = require("../database/connections");
const jwtGenerator = require("../utils/jwtGenerator");
const controllerDashboard = {};


// Home
controllerDashboard.home = async (req, res) => {
    try {
        // dbConnection.query("SELECT * FROM users WHERE user_id = 1", async (err, result) => {
        dbConnection.query("SELECT * FROM users WHERE email = ?", [req.user], async (err, result) => {
            
            res.status(200).json({
                status: 200,
                success: true,
                count: 1,
                data: {
                    user_id: result[0].user_id,
                    name: result[0].name,
                    email: result[0].email,
                    role: result[0].role,
                },
                token: req.token,
                message: "ok"
            })
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Server Error"
        })
    }
}

module.exports = controllerDashboard;