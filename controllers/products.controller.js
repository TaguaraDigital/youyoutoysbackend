const dbConnection = require("../database/connections");
const controllerProducts = {};

// Get all products
controllerProducts.all = async (req, res) => {
    try {
        // const data = dbConnection.query("SELECT * FROM products", async (err, result) => {
        const data = dbConnection.query("SELECT * FROM products p JOIN products_images i ON p.product_id = i.product_id AND main = 'si' ORDER BY p.product_id", async (err, result) => {
            if (err) {
                res.status(400).json({
                  status: 400,
                  success: false,
                  message: err.sqlMessage
                })
                return;
            }

            res.status(200).json({
                status: 200,
                success: true,
                data: {
                    products: result,
                },
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

// Get a product by Id
controllerProducts.byId = async (req, res) => {
    let salida = {};
    try {
        const data = dbConnection.query("SELECT * FROM products WHERE product_id = ?", [req.params.id], (err, result) => {
        if (err) {
          res.status(400).json({
            status: 400,
            success: false,
            message: err.sqlMessage
          })
          return;
        }
        if (result[0]) {
          salida = {
            status: 200,
            success: true,
            data: result,
            message: "ok"
          }
        } else {
          res.status(404).json({
            status: 404,
            success: true,
            data: result,
            message: "product no found"
          })
          return;
        }
      })
      const images = dbConnection.query("SELECT * FROM products_images WHERE product_id = ?", [req.params.id], (err, result) => {
        res.status(200).json({
          status: 200,
          success: true,
          data: {
            product: salida.data,
            images: result
          }
        })
      })
    } catch (err) {
      console.log(err);
    }
};

// Create a product
controllerProducts.create = async (req, res) => {
  const {code, brand, category, description, inventory, price, pack } = req.body;
  
  try {
    const data = dbConnection.query("INSERT INTO products (product_code, brand, category, description, inventory, price, pack) VALUE( ?, ?, ?, ?, ?, ?, ? )", [code, brand, category, description, inventory, price, pack ], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: "ok"
      })
    })
    } catch (err) {
        console.log(err);
    }
};
  
// Update a Product
controllerProducts.update = async (req, res) => {
    const id = req.params.id;
    const {code, brand, category, description, inventory, price, pack } = req.body;
  
    try {
      const data = dbConnection.query("UPDATE products SET product_code = ?, brand = ?, category = ?, description = ?, inventory = ?, price = ?, pack = ? WHERE product_id = ?", [code, brand, category, description, inventory, price, pack, id ], (err, result) => {
        if (err) {
          res.status(400).json({
            status: 400,
            success: false,
            message: err.sqlMessage
          })
          return;
        }
  
        if (result.affectedRows !== 0) {
            res.status(200).json({
            status: 200,
            success: true,
            data: result,
            message: "ok"
          })
        } else {
          res.status(404).json({
            status: 404,
            success: true,
            data: result,
            message: "product no found"
          })
        }
      })
      } catch (err) {
          console.log(err);
        }
};
  
// Delete a Product
controllerProducts.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
      const data = dbConnection.query(`DELETE FROM products WHERE product_id=?`, [id ], (err, result) => {
        if (err) {
          res.status(400).json({
            status: 400,
            success: false,
            message: err.sqlMessage
          })
          return;
        }
        
        if (result.affectedRows !== 0) {
          res.status(200).json({
          status: 200,
          success: true,
          data: result,
          message: "ok"
        })
      } else {
        res.status(404).json({
          status: 404,
          success: true,
          data: result,
          message: "product no found"
        })
      }
      })
      } catch (err) {
          console.log(err);
        }
};
  
  
// Add images of a product
controllerProducts.addImage = async (req, res) => {

    const product_id = req.params.id;
    const image_id = req.body.image_id;
    const main = req.body.main;
  
    try {
      const data = dbConnection.query("INSERT INTO products_images (product_id, image_id, main) VALUES (?,?, ?)", [product_id, image_id, main ], (err, result) => {
        if (err) {
          res.status(400).json({
            status: 400,
            success: false,
            message: err.sqlMessage
          })
          return;
        }
  
        res.status(200).json({
          status: 200,
          success: true,
          data: result,
          message: "ok"
        })
      })
      } catch (err) {
          console.log(err);
        }
};


// Get orders of a customer
controllerProducts.ordersGet = async (req, res) => {
  const user_id = req.params.id;

  try {
    const data = dbConnection.query(
      "SELECT p.product_id, product_code, brand, category, description, inventory, p.price, pack, amount, o.order_id, image_id FROM products AS p JOIN products_images i ON p.product_id = i.product_id AND main = 'SI' LEFT JOIN orders AS o ON o.user_id = ? AND o.order_status = 'PROCESO' LEFT JOIN orders_details AS od ON od.order_id = o.order_id AND p.product_id = od.product_id ORDER BY category, brand, product_code", [user_id], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,  
          success: false,
          message: err.sqlMessage
        })
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: "ok"
      })

    })

  } catch (err) {
    console.log(err);
  }
};

// Create orders of a customer
controllerProducts.ordersCreate = async (req, res) => {
  const user_id = req.params.id;
  const orderbody = req.body;

  try {
// 1.- verifica si el usuario tiene un pedido en proceso
    const data = dbConnection.query("SELECT * FROM orders WHERE user_id = ? AND order_status = 'PROCESO' ", [user_id], async (err, result) => {

      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }
      
      let order_id = 0;
      
      if (result.length === 0) {

// en caso que no tenga pedido en proceso
// a.- se crea una nueva orden en proceso con la fecha actual
// b.- se crea el detalle con la informacion suministrada
        const currentDate = new Date()

        try {
          const dataOrder = dbConnection.query("INSERT INTO orders(user_id, date) VALUES ( ?, ?)", [user_id, currentDate], async (err, result) => {
            if (err) {
              res.status(400).json({
                status: 400,
                success: false,
                message: err.sqlMessage
              })
              return;
            }

            let order_id = result.insertId;
            const newOrdersDetails = [];
            orderbody.map((body) => {
              newOrdersDetails.push([order_id,body.product_id,body.product_price,body.amount])
            })

            const dataOrderDetais = dbConnection.query(
              "INSERT INTO orders_details (order_id, product_id, product_price, amount) VALUES ?",
              [newOrdersDetails], async (err, result) => {
              if (err) {
                res.status(400).json({
                  status: 400,
                  success: false,
                  message: err.sqlMessage
                })
                return;
              }

              res.status(200).json({
                status: 200,
                success: true,
                data: orderbody,
                message: "ok"
              })
            })
          })
          } catch (err) {
              console.log(err);
          }
        return
      } else {

// en caso que tenga una orden en proceso
// c.- se elimina el detalle anterior
// d./ se crea el nuevo detalle
        order_id = result[0].order_id;
        try {
          const deleteOldDetails = dbConnection.query("DELETE FROM orders_details WHERE order_id = ?", 
            [order_id], async (err, result) => {
              if (err) {
                res.status(400).json({
                  status: 400,
                  success: false,
                  message: err.sqlMessage
                })
                return;
              }
            })

            const newOrdersDetails = [];
            orderbody.map((body) => {
              newOrdersDetails.push([order_id,body.product_id,body.product_price,body.amount])
            })

            const dataOrderDetais = dbConnection.query(
              "INSERT INTO orders_details (order_id, product_id, product_price, amount) VALUES ?",
              [newOrdersDetails], async (err, result) => {
              if (err) {
                res.status(400).json({
                  status: 400,
                  success: false,
                  message: err.sqlMessage
                })
                return;
              }

              res.status(200).json({
                status: 200,
                success: true,
                data: orderbody,
                message: "ok"
              })
            })
        } catch (err) {
          console.log(err);
        }
      }
    })
  } catch (err) {
    console.log(err);
  }
};

// Confirm orders of a customer
controllerProducts.ordersConfirm = async (req, res) => {
  const {user_id, order_id} = req.body;
  const currentDate = new Date();
  console.log(currentDate)
  
  try {
    const data = dbConnection.query(
      "UPDATE orders SET date=?,order_status=? WHERE order_id=? AND user_id=?", ['2121_10_11', 'CONFIRMADO', order_id, user_id], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,  
          success: false,
          message: err.sqlMessage
        })
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: "ok"
      })

    })

  } catch (err) {
    console.log(err);
  }
};

module.exports = controllerProducts;