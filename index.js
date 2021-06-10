require("dotenv").config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3500;

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// ROUTES

// register & login routes
app.use("/api/v1/auth", require("./routes/jwtAuth"));

// verify user dashboard (Homepage for authenticated user)
app.use("/api/v1/dashboard", require("./routes/dashboard"));

// invoices
app.use("/invoices", require("./routes/invoices"));

// payment
app.use("/payments", require("./routes/payments"));

// orders
app.use("/api/v1/orders", require("./routes/orders"));

// products
app.use("/api/v1/products", require("./routes/products"));

// images
app.use("/api/v1/images", require("./routes/images"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})