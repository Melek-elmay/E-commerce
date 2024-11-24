const db = require('../database/index')




const postProduct = async function(req,res) {
    
    try {
        let x = await db.cart_product.findAll()
        console.log("xxxxxxx", x)
        var Cart = await db.Cart.findByPk(req.params.id)
           if(!Cart) {
            Cart = await db.Cart.create({id:req.params.id})
           }
        var product = await db.product.findByPk(req.body.ProductId)
         await db.cart_product.create({ProductId: product.dataValues.id, CartId: Cart.dataValues.id, quantity: req.body.quantity })

        console.log("cart", Cart)
        // console.log("add", db.Cart.addProduct)
        
        res.send("product created in cart")
    }
    catch(err) {
    console.log(err)
    }
  
}

module.exports = postProduct