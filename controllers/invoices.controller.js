const bcrypt = require("bcrypt");
const dbConnection = require("../database/connections");
const jwtGenerator = require("../utils/jwtGenerator");
const controllerInvoices = {};

// All Invoices
controllerInvoices.all = async (req, res) => {
    try {
        dbConnection.query("SELECT * FROM invoices WHERE invoices.user_id = ?", [req.body.user_id], async (err, result) => {
        res.status(200).json({
            status: 200,
            success: true,
            count: 1,
            data: {
                invoices: result,
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

// pending invoices
controllerInvoices.pending = async (req, res) => {
    try {
        dbConnection.query("SELECT * FROM invoices WHERE invoices.user_id = ? AND invoice_status = 0", [req.body.user_id], async (err, result) => {
        res.status(200).json({
            status: 200,
            success: true,
            count: 1,
            data: {
                invoices: result,
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

module.exports = controllerInvoices;