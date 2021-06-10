const dbConnection = require('../database/connections');
const Stripe = require('stripe');

const controllerPagos = {};

// PAYMENTS
controllerPagos.stripe = async (req, res) => {
  const stripe = new Stripe("sk_test_51IH9hULbPZwPVRy01f0RkPdvV4TRRVCnEAeEh5SuUOE3vz4HrVmURWswqZYiEp79tQHbQE7QPGxevFhk7qssPcxC00PVvzQy41")
  const { paymentMethod, invoices } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
    
      amount: 25000,
      currency: "USD",
      description: "Cobro de recibos",
      payment_method: paymentMethod.id,
      confirm: true, //confirm the payment at the same time
    });
    
    const reci = [];
    let amount_collected = 0;
    invoices.map( (invoice) => {
      amount_collected = amount_collected+ invoice.invoice_amount; 
      reci.push(invoice.invoice_id)
    })
    
    currentDate = new Date()
      const sql = `UPDATE invoices SET invoice_status = ?, payment_date = ?, payment_reference = ? WHERE invoice_id IN (${reci})`;
      dbConnection.query(sql, [1, currentDate, payment.id], async (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }
      console.log(result);
      return res.status(200).json({
        status: 200,
        success: true,
        invoices_collect: result.affectedRows,
        amount_collected,
        message: "Successful Payment"
      });
    })
  } catch (error) {
    console.log('hay un error', error);
      return res.json({ message: error.raw.message });
  }
}

module.exports = controllerPagos;