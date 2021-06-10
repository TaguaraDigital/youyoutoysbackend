const bcrypt = require("bcrypt");
const dbConnection = require("../database/connections");
const jwtGenerator = require("../utils/jwtGenerator");
const controllerAuth = {};


// signup a new user (create user)
controllerAuth.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        dbConnection.query("SELECT * FROM users WHERE email = ? OR name = ? LIMIT 1", [email, name], async (err, result) => {

            if (result.length) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    msg: 'Error => User already exist'
                })
            }
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);

            dbConnection.query("INSERT INTO users (name, email, password) VALUES ( ?, ?, ?)", [name, email, bcryptPassword], (err, result) => {
                if (err) {
                    return res.status(400).json({
                      status: 400,
                      success: false,
                      message: "Error =" + err.sqlMessage
                    })
                }
                
                const token = jwtGenerator(email)
            
                  res.status(200).json({
                    status: 200,
                    success: true,
                    count: 1,
                    data: {
                        user_id: result.insertId,
                        name,
                        email,
                    },
                    token,
                    message: "ok"
                  })
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

// login
controllerAuth.login = async (req, res) => {
    const { email, password } = req.body;
        
    try {
        dbConnection.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            
            if (result.length === 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    msg: 'User Not exist'
                })
            }
            const validPassword = await bcrypt.compare(password,result[0].password);
            
            if (!validPassword) {
                res.status(403).json({
                    status: 403,
                    success: false,
                    msg: 'Wrong Credential'
                })
                return
            }

            const token = jwtGenerator(result[0].email)
            
            res.status(200).json({
                status: 200,
                success: true,
                count: 1,
                data: {
                    user_id: result[0].user_id,
                    name: result[0].name,
                    email: email,
                },
                token,
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


// verify if user is veriefied
controllerAuth.verify = async (req, res) => {

    try {
        res.status(200).json({
            status: 200,
            success: true,
            token: req.token,
            email: req.user,
            message: "ok"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Token is not valid"
        })
    }
}

module.exports = controllerAuth;